import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const ServiceCard = ({ service }) => (
  <Card>
    <CardContent>
      <Typography variant="h5">{service.name}</Typography>
      <Typography>{service.description}</Typography>
      <Button variant="contained">Book Service</Button>
    </CardContent>
  </Card>
);

export default ServiceCard;
