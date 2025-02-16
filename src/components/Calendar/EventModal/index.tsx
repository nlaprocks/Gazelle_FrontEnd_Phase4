import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Form, Collapse, type CollapseProps, Tabs } from 'antd'
import { Event, EventProduct } from '../../../types/event'
import EventDetails from './EventDetails'
import FinancialFields from './FinancialFields'
import FinancialResults from './FinancialResults'
import { MOCK_CHANNELS } from '../../../utils/mockData'
import { createPortal } from 'react-dom'
import { CaretRightOutlined } from '@ant-design/icons'
import { ProductAccordionItem } from './types'
import { useParams } from 'react-router-dom'

interface EventModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (event: Omit<Event, 'id'>) => void
    initialEvent?: Event
    startDate?: Date
    selectedRetailer?: string
    selectedBrand?: string
    productData?: Array<any>
    projects?: Array<any>
    retailers?: string[]
    brands?: string[]
    maxBudget: number
}

export const EventModal: React.FC<EventModalProps> = ({
    isOpen,
    onClose,
    onSave,
    initialEvent,
    startDate,
    selectedRetailer,
    selectedBrand,
    productData,
    retailers,
    brands,
    projects,
    maxBudget
}) => {
    const [form] = Form.useForm()
    const { project_id, model_id, id } = useParams();
    const [formData, setFormData] = useState<Omit<Event, 'id'>>({
        title: '',
        description: '',
        start_date: startDate ? new Date(startDate.toISOString().split('T')[0]) : undefined,
        end_date: startDate ? new Date(startDate.toISOString().split('T')[0]) : undefined,
        color: '#4F46E5',
        status: 'draft',
        channels: [],
        retailer_id: '',
        brand_id: '',
        project_id: project_id || '',
        model_id: model_id || '',
        event_tpo_id: id || '',
        planned: [],
        actual: [],
        budget: 0,
    })

    useEffect(() => {
        if (initialEvent) {
            setFormData({
                ...initialEvent,
                start_date: initialEvent?.start_date ? new Date(initialEvent.start_date) : undefined,
                end_date: initialEvent?.end_date ? new Date(initialEvent.end_date) : undefined,
            })
        }
    }, [initialEvent])

    const handleProductDataChange = (productId: string, productName: string, financialData: EventProduct['financialData']) => {
        console.log({ productId, productName, financialData });
        setFormData(prev => ({
            ...prev,
            planned: prev.planned.map(p =>
                p.productId === productId ? { ...p, financialData, productName } : p
            ),
        }))

        console.log({ formData: formData.planned });

    }

    const handleSubmit = () => {
        onSave(formData)
        onClose()
    }

    if (!isOpen) return null

    const productItems: CollapseProps['items'] = formData.planned
        .map((eventProduct: any) => {
            // const product = productData?.find(p => p.id === eventProduct.productId)
            // if (!product) return null
            // console.log({ product });
            console.log({ id: eventProduct.id, eventProduct });
            const item: ProductAccordionItem = {
                key: eventProduct.productId,
                label: eventProduct.productName,
                children: (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Financial Details</h4>
                            <FinancialFields
                                productId={eventProduct.productId}
                                financialData={eventProduct.financialData}
                                onChange={(data) => handleProductDataChange(eventProduct.id, eventProduct.name, data)}
                                basePrice={eventProduct.basePrice}
                                totalUnits={eventProduct.totalUnits}
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
                <div className="flex justify-between items-center px-6 py-3 bg-secondary border-b">
                    <h2 className="text-2xl font-medium text-white">
                        {initialEvent ? 'Edit Event' : 'Add New Event'}
                    </h2>
                    <div className='mx-auto flex items-center gap-2'>
                        <label className='text-lg'>Remaining Budget:</label> <h3 className='text-xl'>${maxBudget?.toLocaleString()}</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-700 transition-colors"
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
                                    projects={projects || []}
                                    planned={formData.planned}
                                    actual={formData.actual}
                                    maxBudget={maxBudget}
                                />
                            </div>

                            {/* Right side - Product Details (70%) */}
                            <Tabs defaultActiveKey="1" className="p-4 w-[70%]">
                                <Tabs.TabPane tab="Plan" key="1">
                                    <div className="p-2 overflow-auto">
                                        <h3 className="text-lg font-semibold mb-4">Product Details</h3>
                                        {formData.planned.length > 0 ? (
                                            <Collapse items={productItems} expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />} />
                                        ) : (
                                            <div className="text-center text-gray-500 py-8">
                                                Select products to view details
                                            </div>
                                        )}
                                    </div>
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Actual" key="2">
                                    <div className="p-2 overflow-auto">
                                        <h3 className="text-lg font-semibold mb-4">Product Details</h3>
                                        {formData.actual.length > 0 ? (
                                            <Collapse items={productItems} expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />} />
                                        ) : (
                                            <div className="text-center text-gray-500 py-8">
                                                Select products to view details
                                            </div>
                                        )}
                                    </div>
                                </Tabs.TabPane>
                            </Tabs>
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
                                className="btn btn-primary font-medium"
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