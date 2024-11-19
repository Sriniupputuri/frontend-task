import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Grid, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { addBooking } from '../slices/bookingsSlice';
import { selectServiceProviders } from '../slices/servicesSlice';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

const services = [
  { id: 1, name: 'Plumbing' },
  { id: 2, name: 'Electrical' },
  { id: 3, name: 'AC Repair' },
  { id: 4, name: 'Cleaning' }
];

const BookingFormDialog = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  
  // Get service providers based on selected service
  const [selectedService, setSelectedService] = useState('');
  const [serviceProvider, setServiceProvider] = useState('');
  const [date, setDate] = useState(null);
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  
  const serviceProviders = useSelector((state) => selectServiceProviders(state, selectedService));

  const handleSubmit = () => {
    if (!selectedService || !date || !address || !serviceProvider) {
      setError('All fields are required');
      return;
    }

    const newBooking = {
      service: selectedService,
      serviceProvider,
      date: date.format('YYYY-MM-DD'),
      address,
      status: 'Pending',
      user: user.email,
    };

    dispatch(addBooking(newBooking));
    setSelectedService('');
    setServiceProvider('');
    setDate(null);
    setAddress('');
    setError('');
    handleClose(); // Close dialog after submission
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Book a Service</DialogTitle>
      <DialogContent>
        <Box className="p-4">
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <Grid container spacing={2}>
            {/* Service selection */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Service</InputLabel>
                <Select
                  value={selectedService}
                  onChange={(e) => {
                    setSelectedService(e.target.value);
                    setServiceProvider('');  // Reset service provider selection
                  }}
                  label="Service"
                >
                  {services.map((service) => (
                    <MenuItem key={service.id} value={service.name}>
                      {service.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Service provider selection */}
            {selectedService && (
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Service Provider</InputLabel>
                  <Select
                    value={serviceProvider}
                    onChange={(e) => setServiceProvider(e.target.value)}
                    label="Service Provider"
                  >
                    {serviceProviders.map((provider) => (
                      <MenuItem key={provider.id} value={provider.name}>
                        {provider.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}

            {/* Date selection */}
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Booking Date"
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>

            {/* Address input */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      {/* Dialog actions (buttons) */}
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Book Now
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingFormDialog;
