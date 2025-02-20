import React, { useEffect, useState } from 'react'
import { startOfYear } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { EventModal } from './EventModal'
import { Event } from '../../types/event'
import EventRow from './EventRow'
import WeekHeader from './WeekHeader'
import { getYearCalendarData, addWeeksToDate } from '../../utils/dateUtils'
import { useEvents } from '../../hooks/useEvents'
import { message, Spin } from 'antd'
import { Pencil } from 'lucide-react';
import { calculateWidgetValues } from '../../utils/widgetCalculations'

interface CalendarProps {
    projects: Array<any>
    selectedRetailer: string
    selectedBrand: string
    productData: Array<any>
    fetchImportedEvents: boolean
    setFetchImportedEvents: (fetchImportedEvents: boolean) => void
    targetValues: {
        volume: number
        spend: number
        revenue: number
    }
    setIsEditingTargets: (isEditingTargets: boolean) => void
    setTempTargets: (tempTargets: any) => void
    isLoading: boolean
}

const Calendar: React.FC<CalendarProps> = ({ projects, selectedRetailer, selectedBrand, productData, fetchImportedEvents, setFetchImportedEvents, targetValues, setIsEditingTargets, setTempTargets, isLoading }) => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const { events, createEvent, updateEvent, deleteEvent, refreshEvents } = useEvents()
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

    useEffect(() => {
        if (fetchImportedEvents) {
            refreshEvents()
        }
    }, [fetchImportedEvents])

    const handleCopyEvent = (event: Event) => {
        setSelectedEvent({
            ...event,
            id: '', // Clear ID for new event
            title: `Copy of ${event.title}`,
        })
        setIsModalOpen(true)
    }

    const handleDragEnd = async (event: Event, weeksDelta: number) => {
        try {
            const newStartDate = event.start_date ? addWeeksToDate(event.start_date, weeksDelta) : undefined
            const newEndDate = event.end_date ? addWeeksToDate(event.end_date, weeksDelta) : undefined

            await updateEvent({
                ...event,
                start_date: newStartDate,
                end_date: newEndDate,
            })
            await refreshEvents()
        } catch (error) {
            console.error('Failed to update event position:', error)
        }
    }

    const handleSaveEvent = async (eventData: Omit<Event, 'id'>) => {
        try {
            if (selectedEvent?.id) {
                await updateEvent({ ...eventData, id: selectedEvent.id })
            } else {
                await createEvent(eventData)
            }
            await refreshEvents()
            setIsModalOpen(false)
        } catch (error) {
            console.error('Failed to save event:', error)
        }
    }

    const handleDeleteEventWrapper = async (eventId: string) => {
        try {
            const res = await deleteEvent(eventId);
            if (res) {
                message.success('Event deleted')
            } else {
                message.error('Failed to delete event')
            }
        } catch (error) {
            console.error('Failed to delete event:', error)
        }
    }

    // Calculate widget values
    const widgetValues = calculateWidgetValues(events, targetValues.spend)


    return (
        <>
            <div className="grid grid-cols-[1fr_300px] gap-4 items-start py-8" >
                <div className="w-full grid grid-cols-4 justify-between items-stretch gap-4 flex-1" >
                    <div className="bg-white rounded-lg py-2 px-4 w-full border-b-4 border-secondary shadow color-shadow" >
                        <p className="text-gray-500 text-sm" > Total Volume </p>
                        <p className="text-black text-2xl font-bold" > {widgetValues.totalVolume} </p>
                    </div>
                    <div className="bg-white rounded-lg py-2 px-4 w-full border-b-4 border-secondary shadow color-shadow" >
                        <p className="text-gray-500 text-sm" > Total Revenue </p>
                        <p className="text-black text-2xl font-bold" > ${widgetValues.totalRevenue} </p>
                    </div>
                    <div className="bg-white rounded-lg py-2 px-4 w-full border-b-4 border-secondary shadow color-shadow" >
                        <p className="text-gray-500 text-sm" > Total Contribution </p>
                        <p className="text-black text-2xl font-bold" > ${widgetValues.totalContribution.toFixed(1)} </p>
                    </div>
                    <div className="bg-white rounded-lg py-2 px-4 w-full border-b-4 border-secondary shadow color-shadow" >
                        <p className="text-gray-500 text-sm" > Total Spend </p>
                        <p className="text-black text-2xl font-bold" > ${widgetValues.totalSpend.toLocaleString()} </p>
                    </div>
                    <div className="bg-white rounded-lg py-2 px-4 w-full border-b-4 border-secondary shadow color-shadow" >
                        <p className="text-gray-500 text-sm" > Incremental volume </p>
                        <p className="text-black text-2xl font-bold" > {widgetValues.incrementalVolume} </p>
                    </div>
                    <div className="bg-white rounded-lg py-2 px-4 w-full border-b-4 border-secondary shadow color-shadow" >
                        <p className="text-gray-500 text-sm" > Incremental Revenue </p>
                        <p className="text-black text-2xl font-bold" > ${widgetValues.incrementalRevenue} </p>
                    </div>

                    <div className="bg-white rounded-lg py-2 px-4 w-full border-b-4 border-secondary shadow color-shadow" >
                        <p className="text-gray-500 text-sm" > Plan ROI </p>
                        <p className="text-black text-2xl font-bold" > {widgetValues.planROI.toFixed(1)}% </p>
                    </div>
                    <div className="bg-white rounded-lg py-2 px-4 w-full border-b-4 border-secondary shadow color-shadow" >
                        <p className="text-gray-500 text-sm" > Budget Remaining </p>
                        <p className="text-black text-2xl font-bold" > ${widgetValues.budgetRemaining.toLocaleString()} </p>
                    </div>
                </div>
                <div className="flex flex-col gap-4 border-l pl-6 relative" >
                    <button
                        onClick={
                            () => {
                                setTempTargets(targetValues);
                                setIsEditingTargets(true);
                            }
                        }
                        className="absolute right-2 top-2 p-2 hover:bg-gray-100 rounded-full"
                    >
                        <Pencil size={16} className="text-gray-500" />
                    </button>

                    <div className="bg-white rounded-lg py-1.5 px-3 w-full shadow flex items-center gap-2 border-b-4 border-green-600" >
                        <p className="text-gray-500 text-sm min-w-24" > Target Volume: </p>
                        <p className="text-black text-lg m-0 font-bold" >
                            {targetValues.volume.toLocaleString()}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg py-1.5 px-3 w-full shadow flex items-center gap-2 border-b-4 border-green-600" >
                        <p className="text-gray-500 text-sm min-w-24" > Target Spend: </p>
                        <p className="text-black text-lg m-0 font-bold" >
                            ${targetValues.spend.toLocaleString()}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg py-1.5 px-3 w-full shadow flex items-center gap-2 border-b-4 border-green-600" >
                        <p className="text-gray-500 text-sm min-w-24" > Target Revenue: </p>
                        < p className="text-black text-lg m-0 font-bold" >
                            ${targetValues.revenue.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-full" >
                    <Spin />
                </div>
            ) : (
                <div className="bg-white rounded-lg w-full shadow-md" >
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
                                            onDeleteEvent={handleDeleteEventWrapper}
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
                        // maxBudget={widgetValues.budgetRemaining}
                        />
                    )}
                </div>
            )}


        </>
    )
}

export default Calendar