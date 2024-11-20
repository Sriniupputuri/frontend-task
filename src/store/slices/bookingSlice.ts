import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Booking } from '../../types';
import { bookings as initialBookings } from '../../data/mockData';

interface BookingState {
  bookings: Booking[];
}

const initialState: BookingState = {
  bookings: initialBookings,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.push(action.payload);
    },
    updateBookingStatus: (
      state,
      action: PayloadAction<{ bookingId: string; status: Booking['status'] }>
    ) => {
      const booking = state.bookings.find((b) => b.id === action.payload.bookingId);
      if (booking) {
        booking.status = action.payload.status;
      }
    },
  },
});

export const { addBooking, updateBookingStatus } = bookingSlice.actions;
export default bookingSlice.reducer;