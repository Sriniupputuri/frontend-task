import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './slices/authSlice';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ServiceProviderDashboard from './pages/ServiceProviderDashboard';

import Login from './components/LoginForm';
import PrivateRoute from './PrivateRoute';

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);

  console.log("role", role)

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedRole = localStorage.getItem('role');
    if (savedUser && savedRole) {
      dispatch(login({ email: savedUser, password: '' }));
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };
  

  return (
    <Router>
      <div>
        {!isAuthenticated ? (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/login" element={<Navigate to={`/${role.toLowerCase()}-dashboard`} />} />
            <Route
              path="/customer-dashboard"
              element={
                <PrivateRoute requiredRole="Customer">
                  <CustomerDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/service-provider-dashboard"
              element={
                <PrivateRoute requiredRole="Service-Provider">
                  <ServiceProviderDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <PrivateRoute requiredRole="Admin">
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to={`/${role.toLowerCase()}-dashboard`} />} />
          </Routes>
        )}

        {/* <button onClick={handleLogout}>Logout</button> */}
      </div>
    </Router>
  );
};

export default App;
