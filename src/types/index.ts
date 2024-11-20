export type UserRole = 'customer' | 'provider' | 'admin';

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

export interface Service {
  id: string;
  name: string;
  description: string;
  providers: string[];
  ratings: number;
  imageUrl: string;
}

export interface Booking {
  id: string;
  customerId: string;
  providerId: string;
  serviceId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
  date: string;
  time: string;
  location: string;
}