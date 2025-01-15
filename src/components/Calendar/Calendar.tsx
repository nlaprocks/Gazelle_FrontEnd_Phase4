import React, { useState } from 'react'
import { startOfYear } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { EventModal } from './EventModal'
import { Event } from '../../types/event'
import EventRow from './EventRow'
import WeekHeader from './WeekHeader'
import { getYearCalendarData, addWeeksToDate } from '../../utils/dateUtils'
import { useEvents } from '../../hooks/useEvents'

interface CalendarProps {
    projects: Array<any>
    selectedRetailer: string
    selectedBrand: string
    productData: Array<any>
}

const Calendar: React.FC<CalendarProps> = ({ projects, selectedRetailer, selectedBrand, productData }) => {
    const [currentYear, setCurrentYear] = useState(2024)
    const { events, createEvent, updateEvent, deleteEvent } = useEvents()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | undefined>()
    const [selectedEvent, setSelectedEvent] = useState<Event | undefined>()
    const maxBudget = 32000
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
        const newStartDate = event.start_date ? addWeeksToDate(event.start_date, weeksDelta) : undefined
        const newEndDate = event.end_date ? addWeeksToDate(event.end_date, weeksDelta) : undefined

        await updateEvent({
            ...event,
            start_date: newStartDate,
            end_date: newEndDate,
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
                            {productData?.length > 0 && productData.map((product: any) => (
                                <EventRow
                                    key={product.id}
                                    productName={product.name}
                                    product={product}
                                    weeks={weeks}
                                    events={events.filter(event => {
                                        return event.planned.some(p => p.productId === product.id)
                                    })}
                                    onAddEvent={handleAddEvent}
                                    onEditEvent={handleEditEvent}
                                    onCopyEvent={handleCopyEvent}
                                    onDeleteEvent={deleteEvent}
                                    onDragEnd={handleDragEnd}
                                    yearStart={startOfYear(new Date(currentYear, 0, 1))}
                                />
                            ))}

                            {productData?.length === 0 && (
                                <tr>
                                    <td colSpan={weeks.length + 1} className="text-center py-4">No products selected</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {productData.length > 0 && (
                <EventModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveEvent}
                    initialEvent={selectedEvent}
                    startDate={selectedDate}
                    selectedRetailer={selectedRetailer}
                    selectedBrand={selectedBrand}
                    projects={projects}
                    productData={productData}
                    maxBudget={maxBudget}
                />
            )}
        </>
    )
}

export default Calendar