import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import { readCart, readMembershipSelection, writeCart, writeMembershipSelection } from './cartStorage';

jest.mock('axios', () => ({ post: jest.fn() }));
jest.mock('react-toastify', () => ({
  ToastContainer: () => null,
  toast: { success: jest.fn(), error: jest.fn() },
}));

function CartDestination() {
  const location = useLocation();
  return <p>Returned to {location.pathname}</p>;
}

beforeEach(() => {
  localStorage.clear();
  axios.post.mockReset();
});

test('successful login restores the intended cart route and transfers the guest cart', async () => {
  writeCart([{ _id: 'guest-med', name: 'Guest medicine', quantity: 2 }], null);
  writeMembershipSelection('gold', null);
  axios.post.mockResolvedValue({
    data: {
      status: 'success',
      data: { id: 'user-456', username: 'Demo User', token: 'fresh-token' },
    },
  });

  render(
    <MemoryRouter initialEntries={[{
      pathname: '/login',
      state: {
        from: { pathname: '/cartdetails' },
        cartOwnerId: null,
        resumeCheckout: true,
      },
    }]}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cartdetails" element={<CartDestination />} />
      </Routes>
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'demo@example.test' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'safe-password' } });
  fireEvent.click(screen.getByRole('button', { name: 'LOGIN' }));

  expect(await screen.findByText('Returned to /cartdetails')).toBeInTheDocument();
  expect(localStorage.getItem('token')).toBe('fresh-token');
  expect(readCart('user-456')).toEqual([{ _id: 'guest-med', name: 'Guest medicine', quantity: 2 }]);
  expect(readCart(null)).toEqual([]);
  expect(readMembershipSelection('user-456')).toBe('gold');
  expect(readMembershipSelection(null)).toBe('');
});

test('failed login leaves the original guest cart untouched', async () => {
  writeCart([{ _id: 'guest-med', name: 'Guest medicine', quantity: 1 }], null);
  axios.post.mockRejectedValue({ response: { status: 401 } });
  const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
  render(
    <MemoryRouter initialEntries={[{
      pathname: '/login',
      state: { from: { pathname: '/cartdetails' }, cartOwnerId: null, resumeCheckout: true },
    }]}>
      <Routes><Route path="/login" element={<Login />} /></Routes>
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'demo@example.test' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'wrong-password' } });
  fireEvent.click(screen.getByRole('button', { name: 'LOGIN' }));

  await waitFor(() => expect(screen.getByText('Invalid email or password.')).toBeInTheDocument());
  expect(readCart(null)).toHaveLength(1);
  expect(localStorage.getItem('token')).toBeNull();
  consoleError.mockRestore();
});
