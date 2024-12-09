import React from 'react';
import { Event } from '../../types';
import { format } from 'date-fns';

interface EventItemProps {
  event: Event;
  onEdit: () => void;
}

const EventItem: React.FC<EventItemProps> = ({ event, onEdit }) => {
  return (
    <div
      className="h-8 rounded-md cursor-pointer relative group z-20 pointer-events-auto w-full"
      style={{ backgroundColor: event.color }}
      onClick={(e) => {
        e.stopPropagation();
        onEdit();
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="px-2 text-white text-xs truncate whitespace-nowrap">
          {event.title}
        </span>
      </div>
      <div className="absolute hidden group-hover:block z-30 bg-white border border-gray-200 p-2 rounded-lg shadow-lg w-64 left-0 mt-2">
        <h4 className="font-semibold mb-1 text-sm">{event.title}</h4>
        <p className="text-gray-600 mb-1 text-xs">{event.description}</p>
        <div className="text-gray-500 text-xs">
          {format(event.startDate, 'MMM d, yyyy')} - {format(event.endDate, 'MMM d, yyyy')}
        </div>
      </div>
    </div>
  );
};

export default EventItem;