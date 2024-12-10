import React, { useState } from 'react'
import { addWeeks, startOfWeek, startOfYear } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import EventModal from './EventModal'
import { Event, Product } from '../../types'
import { SAMPLE_EVENTS } from '../../utils/sampleData'
import EventRow from './EventRow'

const SAMPLE_PRODUCTS: Product[] = [
    { id: 'p1', name: 'Product 1', brandId: 'b1' },
    { id: 'p2', name: 'Product 2', brandId: 'b2' },
    { id: 'p3', name: 'Product 3', brandId: 'b3' },
]

const Calendar: React.FC = () => {
    const [currentYear, setCurrentYear] = useState(2024)
    const [events, setEvents] = useState<Event[]>(SAMPLE_EVENTS)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | undefined>()
    const [selectedEvent, setSelectedEvent] = useState<Event | undefined>()
    const [selectedProductId, setSelectedProductId] = useState<string>('')

    const getWeeksInYear = (year: number) => {
        const startDate = new Date(year, 0, 1)
        const weeks = []
        for (let i = 1; i <= 52; i++) {
            weeks.push({
                weekNumber: i,
                startDate: startOfWeek(addWeeks(startDate, i - 1)),
            })
        }
        return weeks
    }

    const weeks = getWeeksInYear(currentYear)

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
        <div className="container mx-auto p-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b">
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

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="border-b border-r border-gray-200 p-2 bg-gray-50 sticky left-0 z-10">
                                    Products
                                </th>
                                {weeks.slice(0, 52).map((week) => (
                                    <th key={week.weekNumber} className="border-b border-r border-gray-200 p-2 min-w-[100px]">
                                        Week {week.weekNumber}
                                    </th>
                                ))}
                            </tr>
                        </thead>
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
        </div>
    )
}

export default Calendar