import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import Header from './Header';
import { readCart, writeCart } from './cartStorage';

function CurrentLocation() {
  const location = useLocation();
  return <output data-testid="location">{location.pathname}{location.search}</output>;
}

test('shared header keeps primary navigation, live search routing, and cart available', async () => {
  render(<MemoryRouter><Header /><CurrentLocation /></MemoryRouter>);

  expect(screen.getByRole('button', { name: 'Medicines' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Consult Doctors' })).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: /search medicines and health products/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /open cart, 0 items/i })).toBeInTheDocument();

  const searchInput = screen.getByRole('textbox', { name: /search medicines and health products/i });
  fireEvent.change(searchInput, { target: { value: 'P' } });
  await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent('/medicines?search=P'));
  fireEvent.change(searchInput, { target: { value: 'Pa' } });
  await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent('/medicines?search=Pa'));
});

test('logout clears the local user and session token', async () => {
  localStorage.setItem('user', JSON.stringify({ id: 'user-123', firstName: 'Test' }));
  localStorage.setItem('token', 'test-token');
  writeCart([{ _id: 'account-medicine', name: 'Ravi medicine', quantity: 2 }], 'user-123');
  writeCart([{ _id: 'guest-medicine', name: 'Guest medicine', quantity: 1 }], null);
  render(<MemoryRouter><Header /></MemoryRouter>);

  fireEvent.click(await screen.findByRole('button', { name: 'Logout' }));
  expect(localStorage.getItem('user')).toBeNull();
  expect(localStorage.getItem('token')).toBeNull();
  expect(await screen.findByRole('button', { name: 'Login' })).toBeInTheDocument();
  expect(readCart()).toEqual([]);
  expect(readCart('user-123')).toEqual([{ _id: 'account-medicine', name: 'Ravi medicine', quantity: 2 }]);
  expect(screen.getByRole('button', { name: 'Open cart, 0 items' })).toBeInTheDocument();
});
