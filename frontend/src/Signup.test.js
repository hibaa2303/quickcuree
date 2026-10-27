import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Signup from './Signup';

jest.mock('axios', () => ({ post: jest.fn() }));

beforeEach(() => {
  axios.post.mockReset();
  window.alert = jest.fn();
});

test('signup keeps the illustration panel and submits validated account data to the existing API', async () => {
  axios.post.mockResolvedValue({ data: { status: 'success' } });
  render(
    <MemoryRouter initialEntries={['/signup']}>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<p>Login form destination</p>} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText('Know your Medicines')).toBeInTheDocument();
  expect(document.querySelector('.signup-page .auth-intro img')).toBeInTheDocument();
  expect(document.querySelector('.signup-page .auth-form')).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'QuickCure Demo' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'demo@example.test' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'safe-password' } });
  fireEvent.click(screen.getByRole('button', { name: 'CREATE ACCOUNT' }));

  expect(await screen.findByText('Login form destination')).toBeInTheDocument();
  expect(axios.post).toHaveBeenCalledWith(expect.stringMatching(/\/signup$/), {
    fname: 'QuickCure Demo',
    email: 'demo@example.test',
    password: 'safe-password',
  });
});
