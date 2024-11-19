import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBookingStatus } from '../slices/bookingsSlice';
import { Button, Typography, Grid, Card, CardContent } from '@mui/material';

const ServiceProviderDashboard = () => {
    const { user } = useSelector((state) => state.auth);
    console.log(user)
    const dispatch = useDispatch();
    //   const user = { email: 'provider1@example.com' }; // Replace with the logged-in user's email from auth state
    const bookings = useSelector((state) =>
        state.bookings.bookings.filter((booking) => booking.serviceProviderEmail === user)
    );

    const handleUpdateStatus = (bookingId, status) => {
        dispatch(updateBookingStatus({ id: bookingId, status }));
    };

    return (
        <div className='p-4'>
            <h3 className='my-4 text-xl text-slate-700'>Service Provider Dashboard</h3>
            {bookings.length > 0 ? (
                <Grid container spacing={2}>
                    {bookings.map((booking) => (
                        <Grid item xs={12} sm={6} md={4} key={booking.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">{booking.service}</Typography>
                                    <Typography>Status: {booking.status}</Typography>
                                    <Typography>Date: {booking.date}</Typography>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleUpdateStatus(booking.id, 'In Progress')}
                                        disabled={booking.status !== 'Pending'}
                                    >
                                        Start Work
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleUpdateStatus(booking.id, 'Completed')}
                                        disabled={booking.status !== 'In Progress'}
                                    >
                                        Mark as Completed
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleUpdateStatus(booking.id, 'Rejected')}
                                        disabled={booking.status === 'Completed'}
                                    >
                                        Reject
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography>No bookings assigned yet.</Typography>
            )}
        </div>
    );
};

export default ServiceProviderDashboard;
