import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedService: null,
};

const selectedServiceSlice = createSlice({
  name: 'selectedService',
  initialState,
  reducers: {
    setSelectedService: (state, action) => {
      state.selectedService = action.payload;
    },
    resetSelectedService: (state) => {
      state.selectedService = null;
    },
  },
});

export const { setSelectedService, resetSelectedService } = selectedServiceSlice.actions;
export default selectedServiceSlice.reducer;
