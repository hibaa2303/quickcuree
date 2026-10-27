import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios';
import CartDetails from './Cartdetails';
import { readCart, readMembershipSelection, writeCart } from './cartStorage';
import { getLabProductId } from './labProductId';

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  isCancel: jest.fn(() => false),
}));
jest.mock('react-toastify', () => ({
  ToastContainer: () => null,
  toast: { info: jest.fn(), success: jest.fn(), error: jest.fn() },
}));

const userId = 'user-123';
const medicineId = '66d939f6468e9cc6a4e8d233';

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem('user', JSON.stringify({ id: userId }));
  localStorage.setItem('token', 'test-token');
  writeCart([{ _id: medicineId, name: 'Test Medicine', price: '₹8', quantity: 2 }], userId);
  axios.get.mockImplementation((url) => Promise.resolve({
    data: {
      data: url.endsWith('/lab-tests')
        ? [{ id: getLabProductId('Comprehensive Gold Full Body'), name: 'Comprehensive Gold Full Body', price: 1999, type: 'labTest' }]
        : [{ _id: medicineId, name: 'Test Medicine', price: '₹12.50', img: '' }],
    },
  }));
  axios.post.mockReset();
});

test('failed order placement preserves the user cart and uses server-side item inputs', async () => {
  axios.post.mockRejectedValue({ response: { status: 500, data: { message: 'Order could not be saved.' } } });
  const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
  render(
    <MemoryRouter initialEntries={['/cartdetails']}>
      <Routes><Route path="/cartdetails" element={<CartDetails />} /></Routes>
    </MemoryRouter>
  );

  const placeOrder = await screen.findByRole('button', { name: 'Place demo order' });
  await waitFor(() => expect(placeOrder).toBeEnabled());
  fireEvent.click(placeOrder);
  expect(await screen.findByRole('alert')).toHaveTextContent('Order could not be saved.');

  expect(axios.post).toHaveBeenCalledWith(
    expect.stringMatching(/\/orders$/),
    { items: [{ productId: medicineId, type: 'medicine', quantity: 2 }] },
    expect.objectContaining({ headers: expect.objectContaining({ Authorization: 'Bearer test-token' }) })
  );
  expect(readCart(userId)).toHaveLength(1);
  expect(readCart(userId)[0].quantity).toBe(2);
  expect(readCart(userId)[0].price).toBe('₹12.50');
  consoleError.mockRestore();
});

test('cart controls update quantities within bounds and remove the item', async () => {
  render(
    <MemoryRouter initialEntries={['/cartdetails']}>
      <Routes><Route path="/cartdetails" element={<CartDetails />} /></Routes>
    </MemoryRouter>
  );

  const placeOrder = await screen.findByRole('button', { name: 'Place demo order' });
  await waitFor(() => expect(placeOrder).toBeEnabled());
  fireEvent.click(screen.getByRole('button', { name: 'Increase Test Medicine quantity' }));
  expect(readCart(userId)[0].quantity).toBe(3);

  fireEvent.click(screen.getByRole('button', { name: 'Decrease Test Medicine quantity' }));
  expect(readCart(userId)[0].quantity).toBe(2);

  fireEvent.click(screen.getByRole('button', { name: 'Remove Test Medicine' }));
  expect(readCart(userId)).toEqual([]);
});

test('successful order clears only that signed-in user cart', async () => {
  axios.post.mockResolvedValue({ data: { status: 'success', data: { _id: 'order-id-123' } } });
  writeCart([{ _id: 'guest-med', name: 'Guest Medicine', price: '₹4' }], null);
  render(
    <MemoryRouter initialEntries={['/cartdetails']}>
      <Routes>
        <Route path="/cartdetails" element={<CartDetails />} />
        <Route path="/orders/:id" element={<p>Order detail opened</p>} />
      </Routes>
    </MemoryRouter>
  );

  const placeOrder = await screen.findByRole('button', { name: 'Place demo order' });
  await waitFor(() => expect(placeOrder).toBeEnabled());
  fireEvent.click(placeOrder);
  expect(await screen.findByText('Order detail opened')).toBeInTheDocument();
  expect(readCart(userId)).toEqual([]);
  expect(readCart(null)[0].name).toBe('Guest Medicine');
});

test('successful order preserves medicine quantities and items added while checkout is in flight', async () => {
  let finishOrder;
  axios.post.mockImplementation(() => new Promise((resolve) => { finishOrder = resolve; }));
  render(
    <MemoryRouter initialEntries={['/cartdetails']}>
      <Routes>
        <Route path="/cartdetails" element={<CartDetails />} />
        <Route path="/orders/:id" element={<p>Order detail opened</p>} />
      </Routes>
    </MemoryRouter>
  );

  const placeOrder = await screen.findByRole('button', { name: 'Place demo order' });
  await waitFor(() => expect(placeOrder).toBeEnabled());
  fireEvent.click(placeOrder);
  await waitFor(() => expect(axios.post).toHaveBeenCalled());

  fireEvent.click(screen.getByRole('button', { name: 'Add to cart' }));
  expect(readCart(userId)[0].quantity).toBe(3);
  finishOrder({ data: { status: 'success', data: { _id: 'order-id-456' } } });

  expect(await screen.findByText('Order detail opened')).toBeInTheDocument();
  expect(readCart(userId)).toEqual([{ _id: medicineId, name: 'Test Medicine', price: '₹12.50', img: '', quantity: 1, unavailable: false }]);
});

function LoginDestination() {
  const location = useLocation();
  return <div>Login return: {location.state?.from?.pathname} | {String(location.state?.cartOwnerId ?? 'guest')}</div>;
}

test('logged-out checkout returns to cart after login and preserves the guest cart', async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  writeCart([{ _id: medicineId, name: 'Test Medicine', price: '₹8', quantity: 1 }], null);
  render(
    <MemoryRouter initialEntries={['/cartdetails']}>
      <Routes>
        <Route path="/cartdetails" element={<CartDetails />} />
        <Route path="/login" element={<LoginDestination />} />
      </Routes>
    </MemoryRouter>
  );

  const placeOrder = await screen.findByRole('button', { name: 'Place demo order' });
  await waitFor(() => expect(placeOrder).toBeEnabled());
  fireEvent.click(placeOrder);
  expect(await screen.findByText('Login return: /cartdetails | guest')).toBeInTheDocument();
  expect(readCart(null)).toHaveLength(1);
});

test('expired session preserves the account cart and supplies a return path and message', async () => {
  axios.post.mockRejectedValue({ response: { status: 401, data: { message: 'Invalid or expired session.' } } });
  const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
  render(
    <MemoryRouter initialEntries={['/cartdetails']}>
      <Routes>
        <Route path="/cartdetails" element={<CartDetails />} />
        <Route path="/login" element={<LoginDestination />} />
      </Routes>
    </MemoryRouter>
  );

  const placeOrder = await screen.findByRole('button', { name: 'Place demo order' });
  await waitFor(() => expect(placeOrder).toBeEnabled());
  fireEvent.click(placeOrder);
  expect(await screen.findByText('Login return: /cartdetails | user-123')).toBeInTheDocument();
  expect(localStorage.getItem('token')).toBeNull();
  expect(readCart(userId)).toHaveLength(1);
  consoleError.mockRestore();
});

test('Care Plan membership price is included once and is removed cleanly', async () => {
  render(
    <MemoryRouter initialEntries={['/cartdetails']}>
      <Routes><Route path="/cartdetails" element={<CartDetails />} /></Routes>
    </MemoryRouter>
  );

  await screen.findByRole('button', { name: 'Place demo order' });
  fireEvent.click(screen.getByRole('button', { name: 'Add Membership' }));
  fireEvent.click(screen.getByLabelText('Gold Membership — ₹199/month'));
  fireEvent.click(screen.getAllByRole('button', { name: 'Add Membership' }).at(-1));

  expect(await screen.findByText('Membership selected: Gold Membership')).toBeInTheDocument();
  expect(screen.getByText('₹224.00')).toBeInTheDocument();
  expect(readMembershipSelection(userId)).toBe('gold');
  fireEvent.click(screen.getByRole('button', { name: 'Change Membership' }));
  fireEvent.click(screen.getByLabelText('Platinum Membership — ₹299/month'));
  fireEvent.click(screen.getAllByRole('button', { name: 'Add Membership' }).at(-1));
  expect(await screen.findByText('Membership selected: Platinum Membership')).toBeInTheDocument();
  expect(screen.getByText('₹324.00')).toBeInTheDocument();
  expect(readMembershipSelection(userId)).toBe('platinum');
  fireEvent.click(screen.getByRole('button', { name: 'Remove Membership' }));
  expect(readMembershipSelection(userId)).toBe('');
  expect(screen.getAllByText('₹25.00')).toHaveLength(2);
  expect(readCart(userId)).toHaveLength(1);
});

test('membership checkout sends a tier identifier but leaves its price calculation to the server', async () => {
  axios.post.mockResolvedValue({ data: { status: 'success', data: { _id: 'membership-order-id' } } });
  render(
    <MemoryRouter initialEntries={['/cartdetails']}>
      <Routes>
        <Route path="/cartdetails" element={<CartDetails />} />
        <Route path="/orders/:id" element={<p>Membership order opened</p>} />
      </Routes>
    </MemoryRouter>
  );

  await screen.findByRole('button', { name: 'Place demo order' });
  fireEvent.click(screen.getByRole('button', { name: 'Add Membership' }));
  fireEvent.click(screen.getByLabelText('Silver Membership — ₹99/month'));
  fireEvent.click(screen.getAllByRole('button', { name: 'Add Membership' }).at(-1));
  const placeOrder = screen.getByRole('button', { name: 'Place demo order' });
  await waitFor(() => expect(placeOrder).toBeEnabled());
  fireEvent.click(placeOrder);

  expect(await screen.findByText('Membership order opened')).toBeInTheDocument();
  expect(axios.post).toHaveBeenCalledWith(
    expect.stringMatching(/\/orders$/),
    { items: [
      { productId: medicineId, type: 'medicine', quantity: 2 },
      { productId: 'membership-silver', type: 'membership', quantity: 1 },
    ] },
    expect.objectContaining({ headers: expect.objectContaining({ Authorization: 'Bearer test-token' }) })
  );
  expect(readMembershipSelection(userId)).toBe('');
});

test('lab-test cart item uses the lab catalogue price and is included in order payload', async () => {
  const labId = getLabProductId('Comprehensive Gold Full Body');
  writeCart([
    { _id: labId, name: 'Comprehensive Gold Full Body', type: 'labTest', price: '₹1', quantity: 1 },
  ], userId);
  axios.post.mockResolvedValue({ data: { status: 'success', data: { _id: 'lab-order-id' } } });
  render(
    <MemoryRouter initialEntries={['/cartdetails']}>
      <Routes>
        <Route path="/cartdetails" element={<CartDetails />} />
        <Route path="/orders/:id" element={<p>Lab demo order opened</p>} />
      </Routes>
    </MemoryRouter>
  );

  const placeOrder = await screen.findByRole('button', { name: 'Place demo order' });
  await waitFor(() => expect(placeOrder).toBeEnabled());
  expect(screen.getAllByText('₹1999.00')).toHaveLength(2);
  fireEvent.click(placeOrder);
  expect(await screen.findByText('Lab demo order opened')).toBeInTheDocument();
  expect(axios.post).toHaveBeenCalledWith(
    expect.stringMatching(/\/orders$/),
    { items: [{ productId: labId, type: 'labTest', quantity: 1 }] },
    expect.objectContaining({ headers: expect.objectContaining({ Authorization: 'Bearer test-token' }) })
  );
});
