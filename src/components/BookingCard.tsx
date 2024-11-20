import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Booking } from '../types';
import { services } from '../data/mockData';

interface BookingCardProps {
  booking: Booking;
  onStatusChange?: (bookingId: string, status: Booking['status']) => void;
  showActions?: boolean;
}

const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onStatusChange,
  showActions = false,
}) => {
  const service = services.find((s) => s.id === booking.serviceId);

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{service?.name}</h3>
          <span className={`inline-block px-2 py-1 rounded-full text-sm ${getStatusColor(booking.status)} capitalize`}>
            {booking.status}
          </span>
        </div>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{booking.date}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          <span>{booking.time}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{booking.location}</span>
        </div>
      </div>

      {showActions && onStatusChange && booking.status === 'pending' && (
        <div className="mt-4 flex space-x-2">
          <button
            onClick={() => onStatusChange(booking.id, 'accepted')}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Accept
          </button>
          <button
            onClick={() => onStatusChange(booking.id, 'rejected')}
            className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingCard;