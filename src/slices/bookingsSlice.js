// src/slices/bookingsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookings: [
    { id: 1, service: 'Plumbing', date: '2024-12-01', status: 'Pending', user: 'customer@example.com', serviceProviderEmail: 'provider@example.com' },
    { id: 2, service: 'Electrical', date: '2024-12-05', status: 'Completed', user: 'customer@example.com', serviceProviderEmail: 'provider2@example.com' },
  ],
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    addBooking(state, action) {
      state.bookings.push(action.payload);
    },
    updateBookingStatus(state, action) {
      const { id, status } = action.payload;
      const booking = state.bookings.find(b => b.id === id);
      if (booking) {
        booking.status = status;
      }
    },
    cancelBooking(state, action) {
      state.bookings = state.bookings.filter(b => b.id !== action.payload);
    },
    updateBookingProvider(state, action) {
      const { id, serviceProviderEmail } = action.payload;
      const booking = state.bookings.find(b => b.id === id);
      if (booking) {
        booking.serviceProviderEmail = serviceProviderEmail;
      }
    },
    updateProviderDetails(state, action) {
      const { serviceProviderEmail, updatedDetails } = action.payload;
      state.bookings.forEach(booking => {
        if (booking.serviceProviderEmail === serviceProviderEmail) {
          Object.assign(booking, updatedDetails);
        }
      });
    },
  },
});

export const {
  addBooking,
  updateBookingStatus,
  cancelBooking,
  updateBookingProvider,
  updateProviderDetails,
} = bookingsSlice.actions;

export default bookingsSlice.reducer;
