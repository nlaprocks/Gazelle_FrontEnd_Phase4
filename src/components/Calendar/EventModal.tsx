import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Form } from 'antd'
import { Event, EventModalProps } from '../../types'
import EventDetails from './EventModal/EventDetails'
import FinancialFields from './EventModal/FinancialFields'
import FinancialResults from './EventModal/FinancialResults'
import { MOCK_CHANNELS, MOCK_RETAILERS, MOCK_BRANDS, MOCK_PRODUCTS } from '../../utils/mockData'

const EventModal: React.FC<EventModalProps> = ({
    isOpen,
    onClose,
    onSave,
    initialEvent,
    startDate,
    productId,
}) => {
    const [form] = Form.useForm()
    const [formData, setFormData] = useState<Event>({
        id: '',
        title: '',
        description: '',
        startDate: startDate ? new Date(startDate.toISOString().split('T')[0]) : undefined,
        endDate: startDate ? new Date(startDate.toISOString().split('T')[0]) : undefined,
        color: '#4F46E5',
        productId: productId,
        status: 'draft',
        channels: [],
        retailerId: '',
        brandId: '',
        products: [],
        financialData: {
            basePrice: 0,
            promoPrice: 0,
            discount: 0,
            units: 0,
            tprDist: 0,
            doDist: 0,
            foDist: 0,
            fdDist: 0,
            listPrice: 0,
            edlpPerUnitRate: 0,
            promoPerUnitRate: 0,
            vcm: 0,
            fixedFee: 0,
            increamentalUnits: 0,
        },
    })

    useEffect(() => {
        if (initialEvent) {
            console.log('initialEvent', initialEvent)
            setFormData({
                ...initialEvent,
                startDate: initialEvent?.startDate ? new Date(initialEvent.startDate.toISOString().split('T')[0]) : undefined,
                endDate: initialEvent?.endDate ? new Date(initialEvent.endDate.toISOString().split('T')[0]) : undefined,
            })
        }
    }, [initialEvent])

    if (!isOpen) return null

    const handleSubmit = () => {
        onSave({
            ...formData,
            startDate: formData.startDate ? new Date(formData.startDate) : undefined,
            endDate: formData.endDate ? new Date(formData.endDate) : undefined,
        })
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-[95vw] max-h-[90vh] overflow-hidden">
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
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                            {/* Event Details Section */}
                            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm h-full overflow-auto">
                                <EventDetails
                                    formData={formData}
                                    setFormData={setFormData}
                                    channels={MOCK_CHANNELS}
                                    retailers={MOCK_RETAILERS}
                                    brands={MOCK_BRANDS}
                                    products={MOCK_PRODUCTS}
                                />
                            </div>

                            {/* Financial Fields Section */}
                            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm h-full overflow-auto">
                                <FinancialFields
                                    formData={formData}
                                    setFormData={setFormData}
                                />
                            </div>

                            {/* Financial Results Section */}
                            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm h-full overflow-auto">
                                <FinancialResults
                                    financialData={formData.financialData}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-200">
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {initialEvent ? 'Update Event' : 'Create Event'}
                            </button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default EventModal