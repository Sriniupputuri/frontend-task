// src/slices/usersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [
    { id: 1, role: 'Customer', name: 'John Doe', email: 'john.doe@example.com', status: 'active' },
    { id: 2, role: 'Service-Provider', name: 'Jane Smith', email: 'jane.smith@example.com', status: 'active' },
    { id: 3, role: 'Admin', name: 'Admin User', email: 'admin@example.com', status: 'active' },
  ],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser(state, action) {
      state.users.push(action.payload);
    },
    removeUser(state, action) {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    updateUser(state, action) {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload };
      }
    },
    toggleUserStatus(state, action) {
      const user = state.users.find(user => user.id === action.payload);
      if (user) {
        user.status = user.status === 'active' ? 'blocked' : 'active';
      }
    },
  },
});

export const { addUser, removeUser, updateUser, toggleUserStatus } = usersSlice.actions;
export default usersSlice.reducer;
