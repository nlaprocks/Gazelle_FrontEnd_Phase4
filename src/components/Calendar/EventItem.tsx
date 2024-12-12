import React from 'react'
import { Event } from '../../types'
import { format } from 'date-fns'

interface EventItemProps {
    event: Event
    onEdit: () => void
}

const EventItem: React.FC<EventItemProps> = ({ event, onEdit }) => {
    return (
        <div
            className="h-8 rounded-md cursor-pointer relative group z-20 pointer-events-auto w-full"
            style={{ backgroundColor: event.color }}
            onClick={(e) => {
                e.stopPropagation()
                onEdit()
            }}
        >
            <div className="flex items-center justify-center py-2">
                <span className="px-2 text-white text-xs truncate whitespace-nowrap">
                    {event.title}
                </span>
            </div>
            {/* -top-[calc(100%+3.5rem)] */}
            <div className="absolute top-1/2 -translate-y-1/2 hidden group-hover:block bg-white border border-gray-200 p-2 rounded-lg shadow-sm w-64 left-[calc(100%+1rem)] mt-2 z-50 after:absolute after:-left-1.5 after:top-1/2 after:-translate-y-1/2 after:w-3 after:h-3 after:bg-white after:border-l after:border-t after:border-gray-200 after:-rotate-45 after:-z-10">
                <h4 className="font-semibold mb-1 text-sm">{event.title}</h4>
                <p className="text-gray-600 mb-1 text-xs">{event.description}</p>
                <div className="text-gray-500 text-xs">
                    {event.startDate && format(event.startDate, 'MMM d, yyyy')} - {event.endDate && format(event.endDate, 'MMM d, yyyy')}
                </div>
            </div>

        </div>
    )
}

export default EventItem