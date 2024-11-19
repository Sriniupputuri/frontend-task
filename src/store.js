import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import bookingsReducer from './slices/bookingsSlice';
import usersReducer from './slices/usersSlice';
import servicesReducer from './slices/servicesSlice'; // Import services reducer
import selectedServiceReducer from './slices/selectedServiceSlice'; // Import selectedService reducer

const store = configureStore({
  reducer: {
    auth: authReducer,
    bookings: bookingsReducer,
    users: usersReducer,
    services: servicesReducer, // Add services slice
    selectedService: selectedServiceReducer, // Add selectedService slice
  },
});

export default store;
