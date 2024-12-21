import React from 'react';
import { Event } from '../../types/event';
import { Product } from '../../types/product';
import { differenceInWeeks, startOfWeek, isBefore, isAfter, format } from 'date-fns';
import EventItem from './EventItem/EventItem';
import { Tooltip } from 'antd';

interface EventRowProps {
    product: Product;
    weeks: { weekNumber: number; startDate: Date }[];
    events: Event[];
    onAddEvent: (date: Date) => void;
    onEditEvent: (event: Event) => void;
    onCopyEvent: (event: Event) => void;
    onDeleteEvent: (id: string) => void;
    onDragEnd: (event: Event, weeksDelta: number) => void;
    yearStart: Date;
}

const EventRow: React.FC<EventRowProps> = ({
    product,
    weeks,
    events,
    onAddEvent,
    onEditEvent,
    onCopyEvent,
    onDeleteEvent,
    onDragEnd,
    yearStart,
}) => {
    const handleCellDoubleClick = (date: Date) => {
        onAddEvent(date);
    };

    const calculateEventPosition = (event: Event) => {
        const startWeek = event.startDate ? Math.max(0, differenceInWeeks(startOfWeek(event.startDate, { weekStartsOn: 1 }), yearStart)) : 0;
        const endWeek = event.endDate ? Math.min(51, differenceInWeeks(startOfWeek(event.endDate, { weekStartsOn: 1 }), yearStart)) : 51;
        const duration = endWeek - startWeek + 1;

        return {
            left: `${(startWeek / 52) * 100}%`,
            width: `${(duration / 52) * 100}%`,
        };
    };

    const isEventVisible = (event: Event) => {
        const yearEnd = new Date(yearStart.getFullYear(), 11, 31);
        return event.endDate && event.startDate && !isBefore(event.endDate, yearStart) && !isAfter(event.startDate, yearEnd);
    };

    return (
        <tr className="relative">
            <td className="product-title border-b border-r border-gray-200 p-2 font-medium bg-gray-50 sticky left-0 z-10 min-w-[120px] max-w-[120px]">
                <Tooltip placement="topLeft" title={product.name}>
                    <span>{product.name}</span>
                </Tooltip>                
            </td>
            {weeks.map((week) => (
                <td
                    key={`cell-${product.id}-${format(week.startDate, 'yyyy-MM-dd')}`}
                    className="border-b border-r border-gray-200 p-1 h-12 relative"
                    onDoubleClick={() => handleCellDoubleClick(week.startDate)}
                />
            ))}
            <td className="absolute inset-y-0 left-0 right-0 pointer-events-none">
                <div className="relative h-full ml-[120px]">
                    {events.filter(isEventVisible).map((event) => {
                        const style = calculateEventPosition(event);
                        return (
                            <div
                                key={`event-${event.id}-${product.id}`}
                                className="relative top-1/2 -translate-y-1/2 z-10"
                                style={style}
                            >
                                <EventItem
                                    event={event}
                                    onEdit={() => onEditEvent(event)}
                                    onDelete={onDeleteEvent}
                                    onCopy={() => onCopyEvent(event)}
                                    onDragEnd={onDragEnd}
                                />
                            </div>
                        );
                    })}
                </div>
            </td>
        </tr>
    );
};

export default EventRow;