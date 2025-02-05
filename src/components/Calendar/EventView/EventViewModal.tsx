import React, { useState, useEffect } from 'react'
import { Event } from '../../../types/event'
import type { PopconfirmProps } from 'antd'
import { message, Popconfirm } from 'antd'
import { X, Edit, Trash2, Copy } from 'lucide-react'
import { EventBasicInfo } from './sections/EventBasicInfo'
import { EventAdditionalInfo } from './sections/EventAdditionalInfo'
import ProductAccordionView from './ProductAccordionView'
import { createPortal } from 'react-dom'
import { useEvents } from '../../../hooks/useEvents'
import { getProductData } from '../../../utils/importUtils'
import { useParams } from "react-router-dom";

interface EventViewModalProps {
    event: Event
    isOpen: boolean
    onClose: () => void
    onEdit: () => void
    onDelete: () => void
}

export const EventViewModal: React.FC<EventViewModalProps> = ({
    event,
    isOpen,
    onClose,
    onEdit,
    onDelete
}) => {
    // const { deleteEvent } = useEvents()
    const { project_id, model_id } = useParams();
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProducts = async () => {
        console.log({ project_id, model_id });
        if (!project_id || !model_id) return;

        try {
            const productPromises = event.planned.map(ep =>
                getProductData(ep.productName, project_id, model_id, event.retailer_id)
            );

            const resolvedProducts = await Promise.all(productPromises);
            setProducts(resolvedProducts);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {


        fetchProducts();
    }, []);

    if (!isOpen) return null
    if (!project_id || !model_id) return null

    const handleEdit = () => {
        onClose()
        onEdit()
    }

    const confirm: PopconfirmProps['onConfirm'] = async (e) => {
        const handleDelete = async () => {
            onClose()
            onDelete()
        }
        handleDelete()
    }

    const cancel: PopconfirmProps['onCancel'] = (e) => {
        console.log(e)
        message.error('Rejected')
    }

    const modalContent = (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
            <div className="bg-white rounded-lg w-full max-w-7xl max-h-[90vh] overflow-hidden m-4">
                <div className="flex justify-between items-center px-6 py-3 border-b bg-secondary sticky top-0 z-10">
                    <h2 className="text-2xl font-medium text-white">Event Details</h2>
                    <div className="flex items-center gap-4">
                        {/* <button
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md transition-colors"
                        >
                            <Copy size={16} />
                            Copy Event
                        </button> */}

                        <Popconfirm
                            title="Delete the event?"
                            description="Are you sure to delete this event?"
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <button
                                className="flex items-center gap-2 px-4 py-2 bg-red-700 text-white rounded-md transition-colors"
                            >
                                <Trash2 size={16} />
                                Delete Event
                            </button>
                        </Popconfirm>
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
                        {isLoading ? (
                            <div>Loading products...</div>
                        ) : (
                            products.length > 0 && (
                                <ProductAccordionView
                                    products={products}
                                    eventProducts={event.planned}
                                />
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )

    return createPortal(modalContent, document.body)
}