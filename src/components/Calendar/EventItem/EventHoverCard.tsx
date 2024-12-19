import React from 'react'
import { Event } from '../../../types/event'
import { format } from 'date-fns'
import { Calendar, DollarSign, BarChart2, Tag } from 'lucide-react'
import { MOCK_PRODUCTS } from '../../../utils/mockData'

interface EventHoverCardProps {
    event: Event
}

export const EventHoverCard: React.FC<EventHoverCardProps> = ({ event }) => {
    const product = MOCK_PRODUCTS.find(p => event.products[0]?.productId === p.id)
    const financialData = event.products[0]?.financialData

    if (!product || !financialData) return null

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

    return (
        <div className="absolute top-1/2 -translate-y-1/2 hidden group-hover:block bg-white border border-gray-200 p-2 rounded-lg shadow-sm w-64 left-[calc(100%+1rem)] mt-2 z-50 after:absolute after:-left-1.5 after:top-1/2 after:-translate-y-1/2 after:w-3 after:h-3 after:bg-white after:border-l after:border-t after:border-gray-200 after:-rotate-45 after:-z-10">
            <h4 className="font-semibold mb-2 text-lg">{event.title}</h4>

            <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={16} />
                    <span>
                        {format(event.startDate ?? new Date(), 'MMM d, yyyy')} - {format(event.endDate ?? new Date(), 'MMM d, yyyy')}
                    </span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                    <Tag size={16} />
                    <span>Status: <span className="capitalize">{event.status}</span></span>
                </div>

                {event.description && (
                    <p className="text-gray-600 mt-2">{event.description}</p>
                )}

                <div className="border-t border-gray-100 mt-2 pt-2">
                    <div className="flex items-center gap-2 text-gray-600">
                        <DollarSign size={16} />
                        <span>Base Price: {formatCurrency(product.basePrice)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <DollarSign size={16} />
                        <span>Promo Price: {formatCurrency(financialData.promoPrice)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <BarChart2 size={16} />
                        <span>Discount: {financialData.discount.toFixed(2)}%</span>
                    </div>
                </div>
            </div>
        </div>
    )
}