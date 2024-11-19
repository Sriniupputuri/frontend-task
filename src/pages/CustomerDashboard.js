import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Grid, Card, CardContent, Typography } from '@mui/material';
import BookingForm from '../components/BookingForm';

// Dummy data for services
const services = [
  {
    id: 1,
    name: 'Plumbing',
    description: 'Fixing pipes, leaks, and water systems.',
    price: '$50 per hour',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Electrical',
    description: 'Handling electrical installations, repairs, and maintenance.',
    price: '$75 per hour',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'AC Repair',
    description: 'Repairing and maintaining air conditioning units.',
    price: '$65 per hour',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    name: 'Cleaning',
    description: 'House and office cleaning services.',
    price: '$30 per hour',
    image: 'https://via.placeholder.com/150',
  },
];

const CustomerDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const bookings = useSelector((state) => state.bookings.bookings);
  const [selectedService, setSelectedService] = useState(null);
  const [open, setOpen] = useState(false);

  const handleBookNow = (service) => {
    setSelectedService(service);
    setOpen(true); // Open the dialog when a service is selected
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog
  };

  return (
    <div className="p-4">
      <h2>Welcome, {user.name}!</h2>
      <h3>Available Services</h3>
      <Grid container spacing={2}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Card>
              <img
                src={service.image}
                alt={service.name}
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {service.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {service.description}
                </Typography>
                <Typography variant="body1" color="primary" component="p">
                  {service.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleBookNow(service)} // Set the selected service and open the dialog
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Display Bookings */}
      {bookings.length > 0 && <p className="text-2xl font-semibold my-4 text-slate-700">Your Bookings</p>}
      <Grid container spacing={2}>
        {bookings.map((booking) => (
          <Grid item xs={12} sm={6} md={4} key={booking.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {booking.service}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {`Date: ${booking.date}`}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {`Status: ${booking.status}`}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {`Address: ${booking.address}`}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* BookingForm Modal */}
      {selectedService && (
        <BookingForm
          open={open}
          handleClose={handleClose}
          service={selectedService} // Pass selected service to the BookingForm component
        />
      )}
    </div>
  );
};

export default CustomerDashboard;
