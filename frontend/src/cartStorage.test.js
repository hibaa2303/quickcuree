import { addCartItem, clearCart, moveCart, readCart, readMembershipSelection, removeOrderedItems, writeCart, writeMembershipSelection } from './cartStorage';

const userId = 'user-123';

beforeEach(() => {
  localStorage.clear();
});

test('cart persists across reloads and stays scoped to the signed-in account', () => {
  writeCart([{ _id: 'guest-med', name: 'Guest medicine', price: '₹10', quantity: 1 }], null);
  localStorage.setItem('user', JSON.stringify({ id: userId }));
  localStorage.setItem('token', 'test-token');

  expect(readCart()).toEqual([]);
  addCartItem({ _id: 'user-med', name: 'Account medicine', price: '₹15' });
  expect(readCart()).toHaveLength(1);
  expect(readCart()[0].quantity).toBe(1);
  expect(readCart(null)[0].name).toBe('Guest medicine');

  clearCart();
  expect(readCart()).toEqual([]);
  expect(readCart(null)).toHaveLength(1);
});

test('two user carts and membership choices remain isolated from each other and the guest cart', () => {
  const otherUser = 'user-789';
  writeCart([{ _id: 'ravi-med', name: 'Ravi medicine', quantity: 1 }], userId);
  writeCart([{ _id: 'other-med', name: 'Other medicine', quantity: 2 }], otherUser);
  writeMembershipSelection('silver', userId);
  writeMembershipSelection('platinum', otherUser);

  localStorage.setItem('user', JSON.stringify({ id: userId }));
  localStorage.setItem('token', 'ravi-token');
  expect(readCart().map((item) => item.name)).toEqual(['Ravi medicine']);
  expect(readMembershipSelection()).toBe('silver');

  localStorage.setItem('user', JSON.stringify({ id: otherUser }));
  localStorage.setItem('token', 'other-token');
  expect(readCart().map((item) => item.name)).toEqual(['Other medicine']);
  expect(readMembershipSelection()).toBe('platinum');
  expect(readCart(null)).toEqual([]);
});

test('cart quantities are bounded and malformed storage is handled safely', () => {
  writeCart([
    { name: 'Zero quantity', quantity: 0 },
    { name: 'Over limit', quantity: 250 },
    { name: 'Invalid quantity', quantity: 'many' },
  ], null);
  expect(readCart(null).map((item) => item.quantity)).toEqual([1, 99, 1]);

  const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
  localStorage.setItem('cartItems', '{broken json');
  expect(readCart(null)).toEqual([]);
  consoleError.mockRestore();
});

test('moving a guest cart into an account merges without overwriting and clears the guest copy only after saving', () => {
  writeCart([
    { _id: 'shared-med', name: 'Shared medicine', quantity: 2 },
    { _id: 'guest-med', name: 'Guest medicine', quantity: 1 },
  ], null);
  writeCart([
    { _id: 'shared-med', name: 'Shared medicine', quantity: 3 },
    { _id: 'account-med', name: 'Account medicine', quantity: 1 },
  ], userId);

  moveCart(null, userId);

  expect(readCart(userId).map(({ _id, quantity }) => [_id, quantity])).toEqual([
    ['shared-med', 5],
    ['account-med', 1],
    ['guest-med', 1],
  ]);
  expect(readCart(null)).toEqual([]);
});

test('removing an ordered snapshot preserves quantities added after checkout started', () => {
  const latestCart = [
    { _id: 'ordered-med', name: 'Ordered medicine', quantity: 3 },
    { _id: 'new-med', name: 'Added during checkout', quantity: 1 },
  ];

  expect(removeOrderedItems(latestCart, [{ productId: 'ordered-med', quantity: 2 }])).toEqual([
    { _id: 'ordered-med', name: 'Ordered medicine', quantity: 1 },
    { _id: 'new-med', name: 'Added during checkout', quantity: 1 },
  ]);
});
