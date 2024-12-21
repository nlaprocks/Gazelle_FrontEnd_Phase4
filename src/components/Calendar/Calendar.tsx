import React, { useState } from 'react'
import { addWeeks, startOfWeek, startOfYear } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { EventModal } from './EventModal'
import { Event } from '../../types/event'
import { MOCK_PRODUCTS } from '../../utils/mockData'
import EventRow from './EventRow'
import WeekHeader from './WeekHeader'
import { getYearCalendarData, addWeeksToDate, ensureDate } from '../../utils/dateUtils'
import { useEvents } from '../../hooks/useEvents'

const Calendar: React.FC = () => {
    const [currentYear, setCurrentYear] = useState(2024)
    const { events, createEvent, updateEvent, deleteEvent } = useEvents()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | undefined>()
    const [selectedEvent, setSelectedEvent] = useState<Event | undefined>()

    const weeks = getYearCalendarData(currentYear)

    const handlePrevYear = () => setCurrentYear(prev => prev - 1)
    const handleNextYear = () => setCurrentYear(prev => prev + 1)

    const handleAddEvent = (date: Date) => {
        setSelectedDate(date)
        setSelectedEvent(undefined)
        setIsModalOpen(true)
    }

    const handleEditEvent = (event: Event) => {
        setSelectedEvent(event)
        setSelectedDate(undefined)
        setIsModalOpen(true)
    }

    const handleCopyEvent = (event: Event) => {
        setSelectedEvent({
            ...event,
            id: '', // Clear ID for new event
            title: `Copy of ${event.title}`,
        })
        setIsModalOpen(true)
    }

    const handleDragEnd = async (event: Event, weeksDelta: number) => {
        const newStartDate = event.startDate ? addWeeksToDate(event.startDate, weeksDelta) : undefined
        const newEndDate = event.endDate ? addWeeksToDate(event.endDate, weeksDelta) : undefined

        await updateEvent({
            ...event,
            startDate: newStartDate,
            endDate: newEndDate,
        })
    }

    const handleSaveEvent = async (eventData: Omit<Event, 'id'>) => {
        if (selectedEvent?.id) {
            await updateEvent({ ...eventData, id: selectedEvent.id })
        } else {
            await createEvent(eventData)
        }
    }

    return (
        <>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
                <div className="flex items-center justify-between px-4 py-1 border-b">
                    <h2 className="text-xl font-semibold">{currentYear}</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={handlePrevYear}
                            className="p-2 hover:bg-gray-100 rounded-full"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={handleNextYear}
                            className="p-2 hover:bg-gray-100 rounded-full"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                <div className="overflow-auto">
                    <table className="w-full border-collapse tpo-calendar">
                        <WeekHeader weeks={weeks} />
                        <tbody>
                            {MOCK_PRODUCTS.map((product) => (
                                <EventRow
                                    key={product.id}
                                    product={product}
                                    weeks={weeks}
                                    events={events.filter(event =>
                                        event.products.some(p => p.productId === product.id)
                                    )}
                                    onAddEvent={handleAddEvent}
                                    onEditEvent={handleEditEvent}
                                    onCopyEvent={handleCopyEvent}
                                    onDeleteEvent={deleteEvent}
                                    onDragEnd={handleDragEnd}
                                    yearStart={startOfYear(new Date(currentYear, 0, 1))}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <EventModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveEvent}
                initialEvent={selectedEvent}
                startDate={selectedDate}
            />
        </>
    )
}

export default Calendar