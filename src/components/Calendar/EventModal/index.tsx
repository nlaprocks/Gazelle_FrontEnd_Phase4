import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Form, Collapse, type CollapseProps } from 'antd'
import { Event, EventProduct } from '../../../types/event'
import EventDetails from './EventDetails'
import FinancialFields from './FinancialFields'
import FinancialResults from './FinancialResults'
import { MOCK_CHANNELS, MOCK_RETAILERS, MOCK_BRANDS, MOCK_PRODUCTS } from '../../../utils/mockData'
import { createPortal } from 'react-dom'
import { ProductAccordionItem } from './types'

interface EventModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (event: Omit<Event, 'id'>) => void
    initialEvent?: Event
    startDate?: Date
}

export const EventModal: React.FC<EventModalProps> = ({
    isOpen,
    onClose,
    onSave,
    initialEvent,
    startDate,
}) => {
    const [form] = Form.useForm()
    const [formData, setFormData] = useState<Omit<Event, 'id'>>({
        title: '',
        description: '',
        startDate: startDate ? new Date(startDate.toISOString().split('T')[0]) : undefined,
        endDate: startDate ? new Date(startDate.toISOString().split('T')[0]) : undefined,
        color: '#4F46E5',
        status: 'draft',
        channels: [],
        retailerId: '',
        brandId: '',
        products: [],
    })

    useEffect(() => {
        if (initialEvent) {
            setFormData({
                ...initialEvent,
                startDate: initialEvent?.startDate ? new Date(initialEvent.startDate) : undefined,
                endDate: initialEvent?.endDate ? new Date(initialEvent.endDate) : undefined,
            })
        }
    }, [initialEvent])

    const handleProductDataChange = (productId: string, financialData: EventProduct['financialData']) => {
        setFormData(prev => ({
            ...prev,
            products: prev.products.map(p =>
                p.productId === productId ? { ...p, financialData } : p
            ),
        }))
    }

    const handleSubmit = () => {
        onSave(formData)
        onClose()
    }

    if (!isOpen) return null

    const productItems: CollapseProps['items'] = formData.products
        .map(eventProduct => {
            const product = MOCK_PRODUCTS.find(p => p.id === eventProduct.productId)
            if (!product) return null

            const item: ProductAccordionItem = {
                key: product.id,
                label: product.name,
                children: (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Financial Details</h4>
                            <FinancialFields
                                productId={product.id}
                                financialData={eventProduct.financialData}
                                onChange={(data) => handleProductDataChange(product.id, data)}
                                basePrice={product.basePrice}
                                totalUnits={product.totalUnits}
                            />
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Results</h4>
                            <FinancialResults financialData={eventProduct.financialData} />
                        </div>
                    </div>
                )
            }
            return item
        })
        .filter((item): item is NonNullable<typeof item> => item !== null)

    const modalContent = (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
            <div className="bg-white rounded-lg w-full max-w-[95vw] max-h-[90vh] overflow-hidden m-4">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-2xl font-semibold text-gray-900">
                        {initialEvent ? 'Edit Event' : 'Add New Event'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <Form
                    form={form}
                    onFinish={handleSubmit}
                    className="flex flex-col h-[calc(90vh-80px)]"
                    layout="vertical"
                >
                    <div className="flex-1 overflow-auto">
                        <div className="flex h-full">
                            {/* Left side - Event Details (30%) */}
                            <div className="w-[30%] border-r border-gray-200 p-6 overflow-auto">
                                <EventDetails
                                    formData={formData}
                                    setFormData={setFormData}
                                    channels={MOCK_CHANNELS}
                                    retailers={MOCK_RETAILERS}
                                    brands={MOCK_BRANDS}
                                    products={MOCK_PRODUCTS}
                                />
                            </div>

                            {/* Right side - Product Details (70%) */}
                            <div className="w-[70%] p-6 overflow-auto">
                                <h3 className="text-lg font-semibold mb-4">Product Details</h3>
                                {formData.products.length > 0 ? (
                                    <Collapse items={productItems} className="mb-4" />
                                ) : (
                                    <div className="text-center text-gray-500 py-8">
                                        Select products to view details
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-200">
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                            >
                                {initialEvent ? 'Update Event' : 'Create Event'}
                            </button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )

    return createPortal(modalContent, document.body)
}