import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserCircle2, Lock } from 'lucide-react';
import { login } from '../store/slices/authSlice';
import { UserRole } from '../types';

const mockUsers = {
  customer: { id: '1', role: 'customer', name: 'John Doe', email: 'customer@example.com', status: 'active' },
  provider: { id: '2', role: 'provider', name: 'Jane Smith', email: 'provider@example.com', status: 'active' },
  admin: { id: '3', role: 'admin', name: 'Admin User', email: 'admin@example.com', status: 'active' },
} as const;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = mockUsers[selectedRole];
    dispatch(login(user));
    navigate(`/${selectedRole}/dashboard`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ServicePro</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserCircle2 className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="customer">Customer</option>
                <option value="provider">Service Provider</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                placeholder="Password (any value)"
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Demo Credentials:</p>
          <p>Email: {mockUsers[selectedRole].email}</p>
          <p>Password: any value</p>
        </div>
      </div>
    </div>
  );
};

export default Login;