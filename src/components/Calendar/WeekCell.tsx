import React from 'react';
import { WeekCellProps } from '../../types';
import EventItem from './EventItem';

const WeekCell: React.FC<WeekCellProps> = ({ date, events, onAddEvent, onEditEvent, productId }) => {
  const handleDoubleClick = () => {
    onAddEvent(date, productId);
  };

  return (
    <td 
      className="border-b border-r border-gray-200 p-1 h-16 relative group"
      onDoubleClick={handleDoubleClick}
    >
      <div className="space-y-0.5">
        {events.map((event) => (
          <EventItem
            key={event.id}
            event={event}
            onEdit={() => onEditEvent(event)}
          />
        ))}
      </div>
    </td>
  );
};

export default WeekCell;