// src/components/AdminDashboard.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, removeUser, updateUser, toggleUserStatus } from '../slices/usersSlice';
import { addServiceProvider, updateServiceProvider, removeServiceProvider } from '../slices/servicesSlice';
import { addBooking, updateBookingStatus, cancelBooking } from '../slices/bookingsSlice';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const services = useSelector(state => state.services.serviceProviders);
  const bookings = useSelector(state => state.bookings.bookings);

  // Sample actions for demonstration
  const handleBlockUser = (userId) => {
    dispatch(toggleUserStatus(userId));
  };

  const handleAddUser = () => {
    const newUser = {
      id: users.length + 1,
      role: 'Customer',
      name: 'New User',
      email: 'newuser@example.com',
      status: 'active',
    };
    dispatch(addUser(newUser));
  };

  const handleRemoveUser = (userId) => {
    dispatch(removeUser(userId));
  };

  const handleUpdateUser = (userId) => {
    const updatedUser = {
      id: userId,
      name: 'Updated User Name',
      email: 'updated@example.com',
      status: 'active',
    };
    dispatch(updateUser(updatedUser));
  };

  // Booking management
  const handleUpdateBookingStatus = (bookingId, status) => {
    dispatch(updateBookingStatus({ id: bookingId, status }));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* User Management Section */}
      <Typography variant="h6">User Management</Typography>
      <Button style={{marginBottom: "8px"}} variant="contained" color="primary" onClick={handleAddUser}>
        Add User
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <Button onClick={() => handleBlockUser(user.id)}>
                    {user.status === 'active' ? 'Block' : 'Unblock'}
                  </Button>
                  <Button color="secondary" onClick={() => handleRemoveUser(user.id)}>
                    Remove
                  </Button>
                  <Button color="primary" onClick={() => handleUpdateUser(user.id)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Service Management Section */}
      <Typography variant="h6" style={{ marginTop: '2rem' }}>
        Service Management
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Provider Name</TableCell>
              <TableCell>Service</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.id}</TableCell>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.service}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Booking Management Section */}
      <Typography variant="h6" style={{ marginTop: '2rem' }}>
        Booking Management
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Provider Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.id}</TableCell>
                <TableCell>{booking.service}</TableCell>
                <TableCell>{booking.date}</TableCell>
                <TableCell>{booking.status}</TableCell>
                <TableCell>{booking.user}</TableCell>
                <TableCell>{booking.serviceProviderEmail}</TableCell>
                <TableCell>
                  <Button onClick={() => handleUpdateBookingStatus(booking.id, 'Completed')}>
                    Mark Completed
                  </Button>
                  <Button color="secondary" onClick={() => dispatch(cancelBooking({ id: booking.id }))}>
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Analytics Section */}
      <Typography variant="h6" style={{ marginTop: '2rem' }}>
        Analytics Dashboard
      </Typography>
      <Paper elevation={3} style={{ padding: '1rem' }}>
        <Typography>Total Bookings: {bookings.length}</Typography>
        <Typography>Completed Bookings: {bookings.filter(b => b.status === 'Completed').length}</Typography>
        <Typography>Pending Bookings: {bookings.filter(b => b.status === 'Pending').length}</Typography>
        <Typography>Cancelled Bookings: {bookings.filter(b => b.status === 'Cancelled').length}</Typography>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
