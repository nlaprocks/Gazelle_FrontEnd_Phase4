import React, { useState } from 'react'
import { startOfYear } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import EventModal from './EventModal'
import { Event, Product } from '../../types'
import { SAMPLE_EVENTS } from '../../utils/sampleData'
import { MOCK_PRODUCTS } from '../../utils/mockData'
import EventRow from './EventRow'
import WeekHeader from './WeekHeader'
import { getYearCalendarData } from '../../utils/dateUtils'

const SAMPLE_PRODUCTS: Product[] = MOCK_PRODUCTS

const Calendar: React.FC = () => {
    const [currentYear, setCurrentYear] = useState(2024)
    const [events, setEvents] = useState<Event[]>(SAMPLE_EVENTS)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | undefined>()
    const [selectedEvent, setSelectedEvent] = useState<Event | undefined>()
    const [selectedProductId, setSelectedProductId] = useState<string>('')

    const weeks = getYearCalendarData(currentYear)

    const handlePrevYear = () => setCurrentYear(prev => prev - 1)
    const handleNextYear = () => setCurrentYear(prev => prev + 1)

    const handleAddEvent = (date: Date, productId: string) => {
        setSelectedDate(date)
        setSelectedProductId(productId)
        setSelectedEvent(undefined)
        setIsModalOpen(true)
    }

    const handleEditEvent = (event: Event) => {
        setSelectedEvent(event)
        setSelectedProductId(event.productId)
        setSelectedDate(undefined)
        setIsModalOpen(true)
    }

    const handleSaveEvent = (eventData: Omit<Event, 'id'>) => {
        if (selectedEvent) {
            setEvents(events.map(event =>
                event.id === selectedEvent.id
                    ? { ...eventData, id: event.id }
                    : event
            ))
        } else {
            setEvents([...events, { ...eventData, id: crypto.randomUUID() }])
        }
    }

    const getEventsForProduct = (productId: string) => {
        return events.filter(event => event.productId === productId)
    }

    return (
        <>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
                <div className="flex items-center justify-between px-4 py-1 border-b">
                    <h2 className="text-xl font-semibold">{currentYear}</h2>
                    {/* TODO: Add retailer dropdown and brand dropdown here */}
                    {/* TODO: Also if import button should be here */}
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

                <div className="overflow-auto max-h-[500px]">
                    <table className="w-full">
                        <WeekHeader weeks={weeks} />
                        <tbody>
                            {SAMPLE_PRODUCTS.map((product) => (
                                <EventRow
                                    key={product.id}
                                    product={product}
                                    weeks={weeks}
                                    events={getEventsForProduct(product.id)}
                                    onAddEvent={handleAddEvent}
                                    onEditEvent={handleEditEvent}
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
                productId={selectedProductId}
            />
        </>
    )
}

export default Calendar