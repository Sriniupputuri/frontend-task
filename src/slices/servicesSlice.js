// src/slices/servicesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  serviceProviders: [
    { id: 1, name: 'John Doe', service: 'Plumbing' },
    { id: 2, name: 'Jane Smith', service: 'Electrical' },
    { id: 3, name: 'Sam Green', service: 'AC Repair' },
    { id: 4, name: 'Olivia Brown', service: 'Cleaning' },
  ],
};

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    addServiceProvider(state, action) {
      state.serviceProviders.push(action.payload);
    },
    updateServiceProvider(state, action) {
      const index = state.serviceProviders.findIndex(provider => provider.id === action.payload.id);
      if (index !== -1) {
        state.serviceProviders[index] = { ...state.serviceProviders[index], ...action.payload };
      }
    },
    removeServiceProvider(state, action) {
      state.serviceProviders = state.serviceProviders.filter(provider => provider.id !== action.payload);
    },
  },
});

export const { addServiceProvider, updateServiceProvider, removeServiceProvider } = servicesSlice.actions;
export const selectServiceProviders = (state, service) =>
  state.services.serviceProviders.filter(provider => provider.service === service);
export default servicesSlice.reducer;
