import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../slices/authSlice';  // Import the login action
import { useNavigate } from 'react-router-dom';

// Dummy users for role simulation
const dummyUsers = [
  { email: 'customer@example.com', password: 'password123', role: 'Customer' },
  { email: 'provider@example.com', password: 'password123', role: 'Service-Provider' },
  { email: 'admin@example.com', password: 'admin123', role: 'Admin' },
];

const LoginForm = () => {
  const { role } = useSelector((state) => state.auth);
  const navigation = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  console.log("role", role);
  // const navigationroute = role === 'Customer' ? 'customer/dashboard' : role === 'Admin' ? 'admin/dashboard' : role === 'Provider' ? "provider/dashboard" : '/'

  const handleLogin = () => {
    // Reset error state
    setError('');

    // Validate email and password format
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    // Check if the user exists in the dummy data
    const user = dummyUsers.find((user) => user.email === email && user.password === password);

    if (user) {
      // If the user is found, dispatch the login action to Redux
      dispatch(login({ email: user.email, role: user.role }));
      // navigation(navigationroute)
    } else {
      // If no matching user, show an error
      setError('Invalid credentials');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <button
        onClick={handleLogin}
        className="w-full bg-blue-500 text-white py-2 rounded-md"
      >
        Login
      </button>
    </div>
  );
};

export default LoginForm;
