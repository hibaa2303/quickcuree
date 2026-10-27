import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Orders from './Orders';

jest.mock('axios', () => ({
  get: jest.fn(),
  isCancel: jest.fn(() => false),
}));

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem('token', 'test-token');
  axios.get.mockResolvedValue({
    data: {
      data: [{
        _id: 'order-123',
        orderId: 'QC-order-123',
        status: 'Placed',
        createdAt: '2026-10-27T10:00:00.000Z',
        totalAmount: 25,
        items: [{ name: 'Test Medicine', quantity: 2 }],
      }],
    },
  });
});

test('order history renders saved order details and current status', async () => {
  render(
    <MemoryRouter initialEntries={['/orders']}>
      <Routes><Route path="/orders" element={<Orders />} /></Routes>
    </MemoryRouter>
  );

  expect(await screen.findByRole('heading', { name: 'Order History' })).toBeInTheDocument();
  expect(screen.getByText(/Order QC-order-123/)).toBeInTheDocument();
  expect(screen.getByText('Placed')).toBeInTheDocument();
  expect(screen.getByText('₹25.00')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'View order' })).toHaveAttribute('href', '/orders/order-123');
  expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/\/orders$/), expect.objectContaining({
    headers: { Authorization: 'Bearer test-token' },
  }));
});

test('order details distinguish demo lab packages and membership purchases', async () => {
  axios.get.mockResolvedValue({
    data: {
      data: {
        _id: 'order-456',
        orderId: 'QC-order-456',
        status: 'Placed',
        createdAt: '2026-10-27T10:00:00.000Z',
        totalAmount: 2098,
        items: [
          { productId: 'lab-basic', type: 'labTest', name: 'Basic Health Checkup', quantity: 1, lineTotal: 999 },
          { productId: 'membership-silver', type: 'membership', billingPeriod: 'month', name: 'Silver Membership', quantity: 1, lineTotal: 99 },
          { productId: 'medicine-1', type: 'medicine', name: 'Test Medicine', quantity: 2, lineTotal: 25 },
        ],
      },
    },
  });
  render(
    <MemoryRouter initialEntries={['/orders/order-456']}>
      <Routes><Route path="/orders/:id" element={<Orders />} /></Routes>
    </MemoryRouter>
  );

  expect(await screen.findByRole('heading', { name: 'Order QC-order-456' })).toBeInTheDocument();
  expect(screen.getByText('Lab-test package')).toBeInTheDocument();
  expect(screen.getByText('Membership · month')).toBeInTheDocument();
  expect(screen.getByText('Medicine')).toBeInTheDocument();
  expect(screen.getByText(/no appointment has been booked/i)).toBeInTheDocument();
});
