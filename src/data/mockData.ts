import { Service, Booking, User } from '../types';

export const services: Service[] = [
  {
    id: '1',
    name: 'Plumbing Services',
    description: 'Professional plumbing services for residential and commercial properties',
    providers: ['2', '4', '5'],
    ratings: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&q=80&w=1024'
  },
  {
    id: '2',
    name: 'Electrical Repairs',
    description: 'Licensed electricians for all your electrical needs',
    providers: ['6', '7'],
    ratings: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=1024'
  },
  {
    id: '3',
    name: 'AC Repair & Maintenance',
    description: 'Expert AC repair and maintenance services',
    providers: ['8', '9'],
    ratings: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1581146683176-4d0ca3582b59?auto=format&fit=crop&q=80&w=1024'
  }
];

export const bookings: Booking[] = [
  {
    id: '1',
    customerId: '1',
    providerId: '2',
    serviceId: '1',
    status: 'pending',
    date: '2024-03-25',
    time: '10:00',
    location: '123 Main St, City'
  },
  {
    id: '2',
    customerId: '1',
    providerId: '6',
    serviceId: '2',
    status: 'completed',
    date: '2024-03-20',
    time: '14:00',
    location: '123 Main St, City'
  }
];

export const providers: User[] = [
  {
    id: '2',
    role: 'provider',
    name: 'Jane Smith',
    email: 'provider@example.com',
    status: 'active'
  },
  {
    id: '4',
    role: 'provider',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    status: 'active'
  }
];