import React from 'react';
import { Star } from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  onBook?: () => void;
  showBookButton?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBook, showBookButton = true }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={service.imageUrl}
        alt={service.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600">{service.ratings}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4">{service.description}</p>
        {showBookButton && (
          <button
            onClick={onBook}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Book Now
          </button>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;