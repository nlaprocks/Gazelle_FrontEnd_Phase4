import React from 'react'
import { Event, Product } from '../../types'
import { differenceInWeeks, startOfWeek, isBefore, isAfter } from 'date-fns'
import EventItem from './EventItem'

interface EventRowProps {
    product: Product
    weeks: { weekNumber: number; startDate: Date }[]
    events: Event[]
    onAddEvent: (date: Date, productId: string) => void
    onEditEvent: (event: Event) => void
    yearStart: Date
}

const EventRow: React.FC<EventRowProps> = ({
    product,
    weeks,
    events,
    onAddEvent,
    onEditEvent,
    yearStart,
}) => {
    const handleCellDoubleClick = (date: Date) => {
        onAddEvent(date, product.id)
    }

    const calculateEventPosition = (event: Event) => {
        const startWeek = event.startDate ? Math.max(0, differenceInWeeks(startOfWeek(event.startDate), yearStart)) : 0
        const endWeek = event.endDate ? Math.min(51, differenceInWeeks(startOfWeek(event.endDate), yearStart)) : 51
        const duration = endWeek - startWeek + 1

        return {
            left: `${(startWeek / 52) * 100}%`,
            width: `${(duration / 52) * 100}%`,
        }
    }

    const isEventVisible = (event: Event) => {
        const yearEnd = new Date(yearStart.getFullYear(), 11, 31)
        return event.endDate && event.startDate && !isBefore(event.endDate, yearStart) && !isAfter(event.startDate, yearEnd)
    }

    return (
        <tr className="relative">
            <td className="border-b border-r border-gray-200 p-2 font-medium bg-gray-50 sticky left-0 z-10 min-w-[160px]">
                {product.name}
            </td>
            {weeks.map((week) => (
                <td
                    key={week.weekNumber}
                    className="border-b border-r border-gray-200 p-1 h-16 relative"
                    onDoubleClick={() => handleCellDoubleClick(week.startDate)}
                />
            ))}
            <td className="absolute inset-y-0 left-0 right-0 pointer-events-none">
                <div className="relative h-full ml-[180px]">
                    {events.filter(isEventVisible).map((event) => {
                        const style = calculateEventPosition(event)
                        return (
                            <div
                                key={event.id}
                                className="relative top-1/2 -translate-y-1/2 z-10"
                                style={style}
                            >
                                <EventItem
                                    event={event}
                                    onEdit={() => onEditEvent(event)}
                                />
                            </div>
                        )
                    })}
                </div>
            </td>
        </tr>
    )
}

export default EventRow