const test = require('node:test');
const assert = require('node:assert/strict');
const { ObjectId } = require('mongodb');
const { createApp, parsePriceToPaise, normalizeOrderItems } = require('./app');

const TEST_SECRET = 'quickcure-tests-use-an-injected-key-only';

class MemoryCollection {
  constructor(documents = [], uniqueOrderKeys = false) {
    this.documents = documents;
    this.uniqueOrderKeys = uniqueOrderKeys;
  }

  async createIndex() { return 'test-index'; }

  async findOne(query) {
    return this.documents.find((document) => Object.entries(query).every(([key, expected]) => {
      const value = document[key];
      if (expected instanceof ObjectId) return String(value) === String(expected);
      if (expected && expected.$regex) return new RegExp(expected.$regex, expected.$options).test(String(value || ''));
      return String(value) === String(expected);
    })) || null;
  }

  find(query = {}) {
    let matches = this.documents.filter((document) => {
      if (query._id?.$in) return query._id.$in.some((id) => String(id) === String(document._id));
      if (query.userId) return String(document.userId) === String(query.userId);
      if (query.category) return document.category === query.category;
      return true;
    });
    const cursor = {
      sort() { matches = [...matches].sort((a, b) => b.createdAt - a.createdAt); return cursor; },
      async toArray() { return matches; },
    };
    return cursor;
  }

  async insertOne(document) {
    if (this.uniqueOrderKeys && this.documents.some((existing) =>
      existing.userId === document.userId && existing.idempotencyKey === document.idempotencyKey
    )) {
      const error = new Error('Duplicate key');
      error.code = 11000;
      throw error;
    }
    if (!document._id) document._id = new ObjectId();
    this.documents.push(document);
    return { insertedId: document._id };
  }

  async updateOne(query, update, options = {}) {
    let document = this.documents.find((item) => Object.entries(query).every(([key, value]) => String(item[key]) === String(value)));
    if (!document && options.upsert) {
      document = { ...query, ...update.$set };
      this.documents.push(document);
    } else if (document) {
      Object.assign(document, update.$set || {});
    }
    return { acknowledged: true, matchedCount: document ? 1 : 0 };
  }
}

function createMemoryDb() {
  const productId = new ObjectId('66d939f6468e9cc6a4e8d233');
  const collections = {
    signup: new MemoryCollection(),
    tablets: new MemoryCollection([{ _id: productId, name: 'Test Medicine', category: 'general', price: '₹12.50' }]),
    orders: new MemoryCollection([], true),
    memberships: new MemoryCollection(),
    addresses: new MemoryCollection(),
  };
  return {
    productId,
    collections,
    collection(name) { return collections[name]; },
  };
}

async function withApi(run) {
  const db = createMemoryDb();
  const server = createApp({ db, jwtSecret: TEST_SECRET, logger: { error() {} } }).listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  try {
    await run({ db, baseUrl });
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
}

async function withUnavailableApi(run) {
  const server = createApp({ db: null, jwtSecret: TEST_SECRET, logger: { error() {} } }).listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  try {
    await run(baseUrl);
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
}

async function createAccount(baseUrl, email) {
  const signup = await fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ fname: 'Test User', email, password: 'safe-test-password' }),
  });
  assert.equal(signup.status, 201);
  const login = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password: 'safe-test-password' }),
  });
  assert.equal(login.status, 200);
  return (await login.json()).data;
}

test('validates account input, stores a password hash, and returns a signed token on login', async () => {
  await withApi(async ({ db, baseUrl }) => {
    const invalidSignup = await fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ fname: 'Test', email: 'bad-email', password: 'short' }),
    });
    assert.equal(invalidSignup.status, 400);

    const user = await createAccount(baseUrl, 'Student@Example.test');
    assert.ok(user.token);
    assert.ok(user.id);
    const record = db.collections.signup.documents[0];
    assert.notEqual(record.password, 'safe-test-password');
    assert.equal(JSON.stringify(user).includes('safe-test-password'), false);

    const duplicate = await fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ fname: 'Other', email: 'student@example.test', password: 'safe-test-password' }),
    });
    assert.equal(duplicate.status, 409);

    const invalidLogin = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: 'student@example.test', password: 'wrong-password' }),
    });
    assert.equal(invalidLogin.status, 401);
  });
});

test('creates idempotent orders from trusted catalogue prices and scopes reads by user', async () => {
  await withApi(async ({ db, baseUrl }) => {
    const owner = await createAccount(baseUrl, 'owner@example.test');
    const other = await createAccount(baseUrl, 'other@example.test');
    const preflight = await fetch(`${baseUrl}/orders`, {
      method: 'OPTIONS',
      headers: {
        origin: 'http://localhost:3001',
        'access-control-request-method': 'POST',
        'access-control-request-headers': 'authorization,content-type,idempotency-key',
      },
    });
    assert.equal(preflight.status, 204);
    assert.equal(preflight.headers.get('access-control-allow-origin'), 'http://localhost:3001');
    const orderHeaders = {
      'content-type': 'application/json',
      authorization: `Bearer ${owner.token}`,
      'idempotency-key': 'test-order-key-0001',
    };

    const unauthorized = await fetch(`${baseUrl}/orders`);
    assert.equal(unauthorized.status, 401);
    const unauthenticatedCheckout = await fetch(`${baseUrl}/orders`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'idempotency-key': 'test-order-key-unauth' },
      body: JSON.stringify({ items: [{ productId: db.productId.toString(), quantity: 1 }] }),
    });
    assert.equal(unauthenticatedCheckout.status, 401);
    assert.equal((await unauthenticatedCheckout.json()).message, 'Please log in to continue.');
    const invalidTokenCheckout = await fetch(`${baseUrl}/orders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer invalid-token',
        'idempotency-key': 'test-order-key-invalid',
      },
      body: JSON.stringify({ items: [{ productId: db.productId.toString(), quantity: 1 }] }),
    });
    assert.equal(invalidTokenCheckout.status, 401);
    assert.equal((await invalidTokenCheckout.json()).message, 'Your session is invalid or expired. Please log in again.');

    const request = {
      userId: other.id,
      status: 'Delivered',
      items: [{ productId: db.productId.toString(), quantity: 2, price: 0.01 }],
    };
    const placed = await fetch(`${baseUrl}/orders`, {
      method: 'POST', headers: orderHeaders, body: JSON.stringify(request),
    });
    assert.equal(placed.status, 201);
    const placedData = (await placed.json()).data;
    assert.equal(placedData.totalAmount, 25);
    assert.equal(placedData.items[0].unitPrice, 12.5);
    assert.equal(placedData.items[0].name, 'Test Medicine');
    assert.equal(placedData.status, 'Placed');
    assert.equal(db.collections.orders.documents[0].userId, owner.id);

    const repeated = await fetch(`${baseUrl}/orders`, {
      method: 'POST', headers: orderHeaders, body: JSON.stringify(request),
    });
    assert.equal(repeated.status, 200);
    assert.equal((await repeated.json()).data._id.toString(), placedData._id.toString());
    assert.equal(db.collections.orders.documents.length, 1);

    const ownerHistory = await fetch(`${baseUrl}/orders`, { headers: { authorization: `Bearer ${owner.token}` } });
    assert.equal((await ownerHistory.json()).data.length, 1);
    const hiddenFromOther = await fetch(`${baseUrl}/orders/${placedData._id}`, {
      headers: { authorization: `Bearer ${other.token}` },
    });
    assert.equal(hiddenFromOther.status, 404);
    const otherHistory = await fetch(`${baseUrl}/orders`, { headers: { authorization: `Bearer ${other.token}` } });
    assert.equal((await otherHistory.json()).data.length, 0);

    const invalidQuantity = await fetch(`${baseUrl}/orders`, {
      method: 'POST',
      headers: { ...orderHeaders, 'idempotency-key': 'test-order-key-0002' },
      body: JSON.stringify({ items: [{ productId: db.productId.toString(), quantity: 0 }] }),
    });
    assert.equal(invalidQuantity.status, 400);
    assert.equal(db.collections.orders.documents.length, 1);

    const unavailableProduct = await fetch(`${baseUrl}/orders`, {
      method: 'POST',
      headers: { ...orderHeaders, 'idempotency-key': 'test-order-key-0003' },
      body: JSON.stringify({ items: [{ productId: '66d939f6468e9cc6a4e8d234', quantity: 1 }] }),
    });
    assert.equal(unavailableProduct.status, 422);
    assert.equal(db.collections.orders.documents.length, 1);
  });
});

test('price and order validators reject malformed catalogue values and cart entries', () => {
  assert.equal(parsePriceToPaise('₹1,234.50'), 123450);
  assert.equal(parsePriceToPaise('unavailable'), null);
  assert.throws(() => normalizeOrderItems([{ productId: 'not-an-id', quantity: 1 }]), { status: 400 });
});

test('prices mixed medicine, lab, and membership order lines from server catalogues', async () => {
  await withApi(async ({ db, baseUrl }) => {
    const user = await createAccount(baseUrl, 'mixed@example.test');
    const response = await fetch(`${baseUrl}/orders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${user.token}`,
        'idempotency-key': 'mixed-order-key-0001',
      },
      body: JSON.stringify({
        items: [
          { productId: db.productId.toString(), type: 'medicine', quantity: 2, price: 0.01 },
          { productId: 'lab-comprehensive-gold-full-body', type: 'labTest', quantity: 1, price: 1 },
          { productId: 'membership-silver', type: 'membership', quantity: 1, price: 0.01 },
        ],
      }),
    });

    assert.equal(response.status, 201);
    const order = (await response.json()).data;
    assert.equal(order.totalAmount, 2123);
    assert.deepEqual(order.items.map((item) => [item.type, item.unitPrice, item.lineTotal]), [
      ['medicine', 12.5, 25],
      ['labTest', 1999, 1999],
      ['membership', 99, 99],
    ]);
    assert.equal(order.items[1].name, 'Comprehensive Gold Full Body');
    assert.equal(order.items[2].billingPeriod, 'month');
    assert.deepEqual(db.collections.memberships.documents[0], {
      userId: user.id,
      membershipActive: true,
      membershipTier: 'Silver',
      membershipName: 'Silver Membership',
      monthlyPrice: 99,
      currency: 'INR',
      period: 'month',
      orderId: order.orderId,
      updatedAt: db.collections.orders.documents[0].updatedAt,
    });

    const history = await fetch(`${baseUrl}/orders`, { headers: { authorization: `Bearer ${user.token}` } });
    const historyOrders = (await history.json()).data;
    assert.equal(historyOrders[0].items.find((item) => item.type === 'labTest').name, 'Comprehensive Gold Full Body');
    assert.equal(historyOrders[0].items.find((item) => item.type === 'membership').unitPrice, 99);
  });
});

test('rejects unknown lab products and multiple membership purchases without saving an order', async () => {
  await withApi(async ({ db, baseUrl }) => {
    const user = await createAccount(baseUrl, 'invalid-mixed@example.test');
    const headers = {
      'content-type': 'application/json',
      authorization: `Bearer ${user.token}`,
      'idempotency-key': 'invalid-mixed-order-01',
    };
    const unknownLab = await fetch(`${baseUrl}/orders`, {
      method: 'POST', headers,
      body: JSON.stringify({ items: [{ productId: 'lab-unknown', type: 'labTest', quantity: 1 }] }),
    });
    assert.equal(unknownLab.status, 400);
    const multipleMemberships = await fetch(`${baseUrl}/orders`, {
      method: 'POST',
      headers: { ...headers, 'idempotency-key': 'invalid-mixed-order-02' },
      body: JSON.stringify({ items: [
        { productId: 'membership-silver', type: 'membership', quantity: 1 },
        { productId: 'membership-gold', type: 'membership', quantity: 1 },
      ] }),
    });
    assert.equal(multipleMemberships.status, 400);
    assert.equal(db.collections.orders.documents.length, 0);
  });
});

test('reports unavailable database access with a safe service error', async () => {
  await withUnavailableApi(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/medicines`);
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), {
      status: 'error',
      message: 'The data service is unavailable. Please try again shortly.',
    });
  });
});
