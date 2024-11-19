// src/components/AdminDashboard.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, removeUser, updateUser, toggleUserStatus } from '../slices/usersSlice';
import { addServiceProvider, updateServiceProvider, removeServiceProvider } from '../slices/servicesSlice';
import { addBooking, updateBookingStatus, cancelBooking } from '../slices/bookingsSlice';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const services = useSelector(state => state.services.serviceProviders);
  const bookings = useSelector(state => state.bookings.bookings);

  const serviceTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Plumbing',
        data: [20, 40, 30, 50, 60, 70],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Electrical',
        data: [15, 25, 35, 45, 55, 65],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const userDistributionData = {
    labels: ['Active Customers', 'Active Providers'],
    datasets: [
      {
        data: [70, 30],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
        hoverOffset: 4,
      },
    ],
  };

  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Signups',
        data: [10, 20, 30, 40, 50, 60],
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

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

  // Service management
  const handleAddServiceProvider = () => {
    const newServiceProvider = {
      id: services.length + 1,
      name: 'New Service Provider',
      service: 'Plumbing',
    };
    dispatch(addServiceProvider(newServiceProvider));
  };

  const handleRemoveServiceProvider = (serviceId) => {
    dispatch(removeServiceProvider(serviceId));
  };

  // Booking management
  const handleUpdateBookingStatus = (bookingId, status) => {
    dispatch(updateBookingStatus({ id: bookingId, status }));
  };

  return (
    <Container style={{marginTop: "12px", marginBottom: "12px"}}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Box className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {/* Bar Chart for Service Trends */}
        <Box className="w-full">
          <Bar data={serviceTrendData} options={{ responsive: true, maintainAspectRatio: false }} />
        </Box>

        {/* Pie Chart for User Distribution */}
        <Box className="w-full">
          <Pie data={userDistributionData} options={{ responsive: true, maintainAspectRatio: false }} />
        </Box>

        {/* Line Chart for User Growth */}
        <Box className="w-full">
          <Line data={userGrowthData} options={{ responsive: true, maintainAspectRatio: false }} />
        </Box>
      </Box>

      {/* User Management Section */}
      <Typography variant="h6">User Management</Typography>
      <Button style={{ marginBottom: '8px' }} variant="contained" color="primary" onClick={handleAddUser}>
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
      <Button variant="contained" color="primary" onClick={handleAddServiceProvider}>
        Add Service Provider
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Provider Name</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.id}</TableCell>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.service}</TableCell>
                <TableCell>
                  <Button color="secondary" onClick={() => handleRemoveServiceProvider(service.id)}>
                    Remove
                  </Button>
                </TableCell>
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
                  <Button color="secondary" onClick={() => handleUpdateBookingStatus(booking.id, 'Cancelled')}>
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </TableContainer>
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
