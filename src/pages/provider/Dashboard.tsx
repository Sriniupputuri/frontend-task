import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { updateBookingStatus } from '../../store/slices/bookingSlice';
import Layout from '../../components/Layout';
import BookingCard from '../../components/BookingCard';
import { Calendar, CheckCircle, XCircle } from 'lucide-react';

const ProviderDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const bookings = useSelector((state: RootState) => 
    state.booking.bookings.filter(b => b.providerId === user?.id)
  );

  const handleStatusChange = (bookingId: string, status: 'accepted' | 'rejected' | 'completed') => {
    dispatch(updateBookingStatus({ bookingId, status }));
  };

  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const activeBookings = bookings.filter(b => b.status === 'accepted');
  const completedBookings = bookings.filter(b => b.status === 'completed');

  return (
    <Layout>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold">{pendingBookings.length}</span>
            </div>
            <h3 className="text-gray-600">Pending Bookings</h3>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <span className="text-2xl font-bold">{activeBookings.length}</span>
            </div>
            <h3 className="text-gray-600">Active Bookings</h3>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <XCircle className="h-8 w-8 text-gray-500" />
              <span className="text-2xl font-bold">{completedBookings.length}</span>
            </div>
            <h3 className="text-gray-600">Completed</h3>
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pending Bookings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                showActions
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Active Bookings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeBookings.map((booking) => (
              <div key={booking.id} className="relative">
                <BookingCard booking={booking} />
                <button
                  onClick={() => handleStatusChange(booking.id, 'completed')}
                  className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm hover:bg-green-600"
                >
                  Mark Complete
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ProviderDashboard;