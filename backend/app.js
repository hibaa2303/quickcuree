const crypto = require('crypto');
const path = require('path');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const { MEMBERSHIPS, LAB_TESTS, LAB_TESTS_BY_ID } = require('./catalogue');

const ORDER_STATUSES = ['Placed'];
const MAX_ORDER_QUANTITY = 99;

function apiError(status, message) {
  const error = new Error(message);
  error.status = status;
  error.safeMessage = true;
  return error;
}

function parsePriceToPaise(value) {
  const normalized = String(value ?? '').replace(/[₹,\s]/g, '');
  if (!/^\d+(?:\.\d{1,2})?$/.test(normalized)) return null;
  const amount = Number(normalized);
  if (!Number.isFinite(amount) || amount < 0) return null;
  return Math.round(amount * 100);
}

function normalizeOrderItems(items) {
  if (!Array.isArray(items) || items.length === 0 || items.length > 100) {
    throw apiError(400, 'Add at least one medicine to the order.');
  }

  const quantities = new Map();
  let membershipCount = 0;
  for (const item of items) {
    if (!item || typeof item !== 'object') throw apiError(400, 'The cart contains an invalid product. Please refresh it and try again.');
    const type = item.type || 'medicine';
    const productId = String(item.productId || '');
    const validProduct = type === 'medicine'
      ? ObjectId.isValid(productId)
      : type === 'labTest'
        ? Boolean(LAB_TESTS_BY_ID[productId])
        : type === 'membership'
          ? Boolean(MEMBERSHIPS[productId])
          : false;
    if (!validProduct) throw apiError(400, 'The cart contains an invalid or unavailable product. Please refresh it and try again.');
    if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > MAX_ORDER_QUANTITY) {
      throw apiError(400, `Quantities must be between 1 and ${MAX_ORDER_QUANTITY}.`);
    }
    if (type === 'membership') {
      membershipCount += 1;
      if (membershipCount > 1 || item.quantity !== 1) throw apiError(400, 'An order can include one membership plan at a time.');
    }
    const key = `${type}:${productId}`;
    const quantity = (quantities.get(key)?.quantity || 0) + item.quantity;
    if (quantity > MAX_ORDER_QUANTITY) {
      throw apiError(400, `A medicine quantity cannot exceed ${MAX_ORDER_QUANTITY}.`);
    }
    quantities.set(key, { type, productId, quantity });
  }
  return quantities;
}

async function syncMembershipPurchase(db, order) {
  const purchase = order.items.find((item) => item.type === 'membership');
  if (!purchase) return;
  const membership = MEMBERSHIPS[purchase.productId];
  if (!membership) throw apiError(500, 'The saved membership plan could not be verified.');
  await db.collection('memberships').updateOne(
    { userId: order.userId },
    {
      $set: {
        userId: order.userId,
        membershipActive: true,
        membershipTier: membership.tier,
        membershipName: membership.name,
        monthlyPrice: membership.price,
        currency: 'INR',
        period: membership.period,
        orderId: order.orderId,
        updatedAt: order.updatedAt,
      },
    },
    { upsert: true }
  );
}

function getIdempotentOrderId(userId, idempotencyKey) {
  const digest = crypto.createHash('sha256').update(`${userId}:${idempotencyKey}`).digest('hex');
  return new ObjectId(digest.slice(0, 24));
}

function createApp({ db, jwtSecret, logger = console } = {}) {
  if (!jwtSecret || typeof jwtSecret !== 'string') {
    throw new Error('A runtime JWT signing key is required.');
  }

  const app = express();
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://quickcure-a.netlify.app',
  ];

  app.use(cors({ origin: allowedOrigins, methods: ['GET', 'POST', 'PUT', 'DELETE'], credentials: true }));
  app.use(express.json({ limit: '32kb' }));
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.use((req, res, next) => {
    if (!db) return res.status(503).json({ status: 'error', message: 'The data service is unavailable. Please try again shortly.' });
    next();
  });

  function requireAuth(req, res, next) {
    const authorization = (req.get('authorization') || '').trim().split(/\s+/);
    const [scheme, token] = authorization;
    if (authorization.length !== 2 || scheme !== 'Bearer' || !token) {
      return res.status(401).json({ status: 'error', message: 'Please log in to continue.' });
    }
    try {
      const payload = jwt.verify(token, jwtSecret, { issuer: 'quickcure', algorithms: ['HS256'] });
      if (!ObjectId.isValid(String(payload.sub || ''))) throw new Error('Invalid subject');
      req.auth = { userId: String(payload.sub) };
      next();
    } catch {
      res.status(401).json({ status: 'error', message: 'Your session is invalid or expired. Please log in again.' });
    }
  }

  app.post('/signup', async (req, res, next) => {
    const fname = typeof req.body?.fname === 'string' ? req.body.fname.trim() : '';
    const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const password = typeof req.body?.password === 'string' ? req.body.password : '';
    if (!fname || fname.length > 80) return res.status(400).json({ status: 'fail', message: 'Enter a name using 1 to 80 characters.' });
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ status: 'fail', message: 'Enter a valid email address.' });
    }
    if (password.length < 8 || Buffer.byteLength(password, 'utf8') > 72) {
      return res.status(400).json({ status: 'fail', message: 'Use a password of at least 8 characters and no more than 72 UTF-8 bytes.' });
    }

    try {
      const existingUser = await db.collection('signup').findOne({ email: { $regex: `^${email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, $options: 'i' } });
      if (existingUser) return res.status(409).json({ status: 'fail', message: 'An account with this email already exists.' });

      const hashedPassword = await bcrypt.hash(password, 12);
      const result = await db.collection('signup').insertOne({ fname, email, password: hashedPassword });
      res.status(201).json({ status: 'success', data: { id: result.insertedId.toString(), email, fname } });
    } catch (error) {
      if (error.code === 11000) return res.status(409).json({ status: 'fail', message: 'An account with this email already exists.' });
      next(error);
    }
  });

  app.post('/login', async (req, res, next) => {
    const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const password = typeof req.body?.password === 'string' ? req.body.password : '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 1 || password.length > 128) {
      return res.status(400).json({ status: 'fail', message: 'Enter a valid email and password.' });
    }

    try {
      const user = await db.collection('signup').findOne({ email: { $regex: `^${email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, $options: 'i' } });
      if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ status: 'error', message: 'Invalid email or password.' });
      }
      const userId = user._id.toString();
      const token = jwt.sign({}, jwtSecret, { subject: userId, expiresIn: '7d', issuer: 'quickcure', algorithm: 'HS256' });
      res.json({
        status: 'success',
        data: {
          id: userId,
          email: user.email,
          firstName: user.fname,
          username: user.username || user.email.split('@')[0],
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  });

  app.get('/medicines', async (req, res, next) => {
    try {
      const category = typeof req.query.category === 'string' ? req.query.category.trim().toLowerCase() : '';
      const medicines = await db.collection('tablets').find(category ? { category } : {}).toArray();
      res.json({ status: 'success', data: medicines });
    } catch (error) {
      next(error);
    }
  });

  app.get('/medicines/:id', async (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ status: 'fail', message: 'Invalid medicine ID.' });
    try {
      const medicine = await db.collection('tablets').findOne({ _id: new ObjectId(req.params.id) });
      if (!medicine) return res.status(404).json({ status: 'fail', message: 'Medicine not found.' });
      res.json({ status: 'success', data: medicine });
    } catch (error) {
      next(error);
    }
  });

  app.get('/lab-tests', (req, res) => {
    res.json({ status: 'success', data: LAB_TESTS });
  });

  app.get('/search', async (req, res, next) => {
    const keyword = typeof req.query.keyword === 'string' ? req.query.keyword.trim() : '';
    if (!keyword) return res.status(400).json({ status: 'fail', message: 'Enter a medicine name to search.' });
    if (keyword.length > 100) return res.status(400).json({ status: 'fail', message: 'Search text is too long.' });
    const safeKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    try {
      const items = await db.collection('tablets').find({ name: new RegExp(safeKeyword, 'i') }).toArray();
      res.json({ status: 'success', items });
    } catch (error) {
      next(error);
    }
  });

  app.post('/add-membership', requireAuth, async (req, res, next) => {
    try {
      await db.collection('memberships').updateOne(
        { userId: req.auth.userId },
        { $set: { membershipActive: true } },
        { upsert: true }
      );
      res.json({ status: 'success', message: 'Membership added successfully!' });
    } catch (error) {
      next(error);
    }
  });

  app.post('/add-address', requireAuth, async (req, res, next) => {
    const { address } = req.body || {};
    if (!address || typeof address !== 'object' || Array.isArray(address)) {
      return res.status(400).json({ status: 'fail', message: 'Enter a valid address.' });
    }
    try {
      await db.collection('addresses').updateOne(
        { userId: req.auth.userId },
        { $push: { addresses: address } },
        { upsert: true }
      );
      res.json({ status: 'success', message: 'Address added successfully!' });
    } catch (error) {
      next(error);
    }
  });

  async function createOrder(req, res, next) {
    try {
      const items = Array.isArray(req.body?.items)
        ? req.body.items
        : Array.isArray(req.body?.cartDetails)
          ? req.body.cartDetails.map((item) => ({ productId: item?._id, quantity: item?.quantity }))
          : [];
      const quantities = normalizeOrderItems(items);
      const idempotencyKey = req.get('Idempotency-Key') || req.body?.idempotencyKey;
      if (typeof idempotencyKey !== 'string' || idempotencyKey.length < 8 || idempotencyKey.length > 100) {
        throw apiError(400, 'Checkout request is missing a valid retry-protection key. Please retry checkout.');
      }

      const orders = db.collection('orders');
      const orderObjectId = getIdempotentOrderId(req.auth.userId, idempotencyKey);
      const existingOrder = await orders.findOne({ _id: orderObjectId, userId: req.auth.userId });
      if (existingOrder) {
        await syncMembershipPurchase(db, existingOrder);
        return res.status(200).json({ status: 'success', data: publicOrder(existingOrder), duplicate: true });
      }

      const medicineIds = Array.from(quantities.values())
        .filter((item) => item.type === 'medicine')
        .map((item) => new ObjectId(item.productId));
      const products = medicineIds.length
        ? await db.collection('tablets').find({ _id: { $in: medicineIds } }).toArray()
        : [];
      const productsById = new Map(products.map((product) => [product._id.toString(), product]));
      if (productsById.size !== medicineIds.length) {
        throw apiError(422, 'One or more cart items are no longer available. Refresh your cart and try again.');
      }

      const orderItems = [];
      let totalPaise = 0;
      for (const { type, productId, quantity } of quantities.values()) {
        const product = type === 'medicine'
          ? productsById.get(productId)
          : type === 'labTest'
            ? LAB_TESTS_BY_ID[productId]
            : MEMBERSHIPS[productId];
        const unitPricePaise = type === 'medicine'
          ? parsePriceToPaise(product?.price)
          : parsePriceToPaise(product?.price);
        if (!product?.name || unitPricePaise === null || unitPricePaise <= 0) {
          throw apiError(422, 'A cart item has incomplete catalogue pricing and cannot be ordered.');
        }
        const lineTotalPaise = unitPricePaise * quantity;
        if (!Number.isSafeInteger(lineTotalPaise) || !Number.isSafeInteger(totalPaise + lineTotalPaise)) {
          throw apiError(422, 'The order total is outside the supported range.');
        }
        totalPaise += lineTotalPaise;
        orderItems.push({
          productId,
          type,
          name: product.name,
          quantity,
          unitPrice: unitPricePaise / 100,
          lineTotal: lineTotalPaise / 100,
          ...(type === 'membership' ? { billingPeriod: product.period } : {}),
        });
      }

      const now = new Date();
      const order = {
        _id: orderObjectId,
        orderId: `QC-${orderObjectId.toString().toUpperCase()}`,
        userId: req.auth.userId,
        items: orderItems,
        totalAmount: totalPaise / 100,
        currency: 'INR',
        status: ORDER_STATUSES[0],
        idempotencyKey,
        createdAt: now,
        updatedAt: now,
      };
      await orders.insertOne(order);
      await syncMembershipPurchase(db, order);
      res.status(201).json({ status: 'success', data: publicOrder(order) });
    } catch (error) {
      if (error.code === 11000) {
        try {
          const retryKey = req.get('Idempotency-Key') || req.body?.idempotencyKey;
          const duplicateId = getIdempotentOrderId(req.auth.userId, retryKey);
          const order = await db.collection('orders').findOne({ _id: duplicateId, userId: req.auth.userId });
          if (order) {
            await syncMembershipPurchase(db, order);
            return res.status(200).json({ status: 'success', data: publicOrder(order), duplicate: true });
          }
        } catch (lookupError) {
          return next(lookupError);
        }
      }
      next(error);
    }
  }

  app.post('/orders', requireAuth, createOrder);
  app.post('/checkout', requireAuth, createOrder);
  app.get('/orders', requireAuth, async (req, res, next) => {
    try {
      const orders = await db.collection('orders')
        .find({ userId: req.auth.userId })
        .sort({ createdAt: -1 })
        .toArray();
      res.json({ status: 'success', data: orders.map(publicOrder) });
    } catch (error) {
      next(error);
    }
  });

  app.get('/orders/:id', requireAuth, async (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ status: 'fail', message: 'Invalid order ID.' });
    try {
      const order = await db.collection('orders').findOne({ _id: new ObjectId(req.params.id), userId: req.auth.userId });
      if (!order) return res.status(404).json({ status: 'fail', message: 'Order not found.' });
      res.json({ status: 'success', data: publicOrder(order) });
    } catch (error) {
      next(error);
    }
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });

  app.use((error, req, res, next) => {
    if (res.headersSent) return next(error);
    if (error.safeMessage) return res.status(error.status).json({ status: 'fail', message: error.message });
    if (error.status === 400 || error.status === 413) {
      return res.status(error.status).json({ status: 'fail', message: 'The request data is invalid or too large.' });
    }
    logger.error('Request failed:', { name: error.name, code: error.code });
    res.status(500).json({ status: 'error', message: 'The request could not be completed. Please try again.' });
  });

  return app;
}

function publicOrder(order) {
  const { userId, idempotencyKey, ...safeOrder } = order;
  return { ...safeOrder, orderId: order.orderId || order._id?.toString() };
}

module.exports = { createApp, parsePriceToPaise, normalizeOrderItems, ORDER_STATUSES };
