import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function hasSignedInSession() {
  try {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return Boolean(user?.id && localStorage.getItem('token'));
  } catch {
    return false;
  }
}

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  return hasSignedInSession()
    ? children
    : <Navigate to="/login" replace state={{ from: location }} />;
}
