import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, requiredRole }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);

  if (!isAuthenticated) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" />;
  }

  if (requiredRole && role !== requiredRole) {
    // If user does not have the required role, redirect to the appropriate dashboard
    return <Navigate to={`/${role.toLowerCase()}-dashboard`} />;
  }

  return children;
};

export default PrivateRoute;
