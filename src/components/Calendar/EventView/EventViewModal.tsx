import React from 'react'
import { Event } from '../../../types/event'
import { X, Edit, Trash2, Copy  } from 'lucide-react'
import { EventBasicInfo } from './sections/EventBasicInfo'
import { MOCK_PRODUCTS } from '../../../utils/mockData'
import { EventAdditionalInfo } from './sections/EventAdditionalInfo'
import ProductAccordionView from './ProductAccordionView'
import { createPortal } from 'react-dom'

interface EventViewModalProps {
    event: Event
    isOpen: boolean
    onClose: () => void
    onEdit: () => void
}

export const EventViewModal: React.FC<EventViewModalProps> = ({
    event,
    isOpen,
    onClose,
    onEdit,
}) => {
    if (!isOpen) return null

    const products = event.products
        .map(ep => MOCK_PRODUCTS.find(p => p.id === ep.productId))
        .filter((p): p is NonNullable<typeof p> => p !== undefined)

    const handleEdit = () => {
        onClose()
        onEdit()
    }

    const modalContent = (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
            <div className="bg-white rounded-lg w-full max-w-7xl max-h-[90vh] overflow-hidden m-4">
                <div className="flex justify-between items-center px-6 py-3 border-b bg-secondary sticky top-0 z-10">
                    <h2 className="text-2xl font-medium text-white">Event Details</h2>
                    <div className="flex items-center gap-4">
                        <button
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md transition-colors"
                        >
                            <Copy size={16} />
                            Copy Event
                        </button>
                        <button
                            className="flex items-center gap-2 px-4 py-2 bg-red-700 text-white rounded-md transition-colors"
                        >
                            <Trash2 size={16} />
                            Delete Event
                        </button>
                        <button
                            onClick={handleEdit}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md transition-colors"
                        >
                            <Edit size={16} />
                            Edit Event
                        </button>
                        <button
                            onClick={onClose}
                            className="text-white transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                <div className="p-6 overflow-auto max-h-[calc(90vh-80px)]">
                    <div className="space-y-6">
                        <div className='grid grid-cols-2 gap-4'>
                            <EventBasicInfo event={event} />
                            <EventAdditionalInfo event={event} />
                        </div>
                        <ProductAccordionView products={products} eventProducts={event.products} />
                    </div>
                </div>
            </div>
        </div>
    )

    return createPortal(modalContent, document.body)
}