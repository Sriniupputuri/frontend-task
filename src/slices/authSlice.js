import { createSlice } from '@reduxjs/toolkit';

// Dummy users data
const dummyUsers = [
  { email: 'customer@example.com', role: 'Customer' },
  { email: 'provider@example.com', role: 'Service-Provider' },
  { email: 'admin@example.com', role: 'Admin' },
];

// Load user state from localStorage if it exists
const savedUser = localStorage.getItem('user');
const savedRole = localStorage.getItem('role');
const savedAuthState = savedUser && savedRole ? { isAuthenticated: true, user: savedUser, role: savedRole } : { isAuthenticated: false, user: null, role: null };

const initialState = {
  isAuthenticated: savedAuthState.isAuthenticated,
  role: savedAuthState.role,
  user: savedAuthState.user,
  dummyUsers: dummyUsers,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload;

      // Simulate login by matching email and role
      const user = state.dummyUsers.find(
        (user) => user.email === email
      );

      if (user) {
        state.isAuthenticated = true;
        state.user = email;
        state.role = user.role;

        // Save the login details to localStorage
        localStorage.setItem('user', email);
        localStorage.setItem('role', user.role);
      } else {
        alert('Invalid credentials');
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;

      // Clear the authentication data from localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('role');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
