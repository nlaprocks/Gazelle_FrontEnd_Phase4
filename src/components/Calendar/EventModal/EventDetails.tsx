import React, { useEffect } from 'react'
import { Input, Select, DatePicker, ColorPicker, Form } from 'antd'
import { Channel, Product } from '../../../types/product'
import { Event, EventProduct } from '../../../types/event'
import dayjs from 'dayjs'

const { TextArea } = Input
const { RangePicker } = DatePicker

interface EventDetailsProps {
    formData: Omit<Event, 'id'>
    setFormData: (data: Omit<Event, 'id'>) => void
    channels: Channel[]
    retailers: string[]
    brands: string[]
    products: Product[]
    planned: EventProduct[]
    actual: EventProduct[]
}

const EventDetails: React.FC<EventDetailsProps> = ({
    formData,
    setFormData,
    channels,
    retailers,
    brands,
    products,
    planned,
    actual
}) => {
    // const filteredBrands = brands.filter(brand => brand.retailerId === formData.retailerId)
    // const filteredProducts = products.filter(product =>
    //     filteredBrands.some(brand => brand.id === product.brandId)
    // )

    // Initialize product financial data when products are selected
    useEffect(() => {
        const selectedProducts = products.filter(p => formData.planned.some(ep => ep.productId === p.id))
        const updatedProducts: EventProduct[] = selectedProducts.map(product => ({
            productId: product.id,
            financialData: {
                basePrice: product.basePrice,
                promoPrice: product.basePrice,
                discount: 0,
                units: product.totalUnits,
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
            }
        }))

        setFormData({
            ...formData,
            planned: updatedProducts,
        })
    }, [formData.planned.map(p => p.productId).join(',')])

    const statusOptions = [
        { value: 'DRAFT', label: 'Draft' },
        { value: 'ACTIVE', label: 'Active' },
        { value: 'COMPLETED', label: 'Completed' },
        { value: 'CANCELLED', label: 'Cancelled' },
    ]

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Event Details</h3>

            <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2">
                    <Form.Item label="Event Name" required>
                        <Input
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Enter event name"
                        />
                    </Form.Item>
                </div>

                <div>
                    <Form.Item label="Status" required>
                        <Select
                            value={formData.status}
                            onChange={(value) => setFormData({ ...formData, status: value })}
                            options={statusOptions}
                            className="w-full"
                        />
                    </Form.Item>
                </div>

                <div>
                    <Form.Item label="Budget" required>
                        <Input
                            type="number"
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                            className="w-full"
                        />
                    </Form.Item>
                </div>

                <div>
                    <Form.Item label="Color">
                        <ColorPicker
                            value={formData.color}
                            onChange={(color) => setFormData({ ...formData, color: color.toHexString() })}
                            className="w-full"
                        />
                    </Form.Item>
                </div>

                <div className="col-span-2">
                    <Form.Item label="Date Range" required>
                        <RangePicker
                            className="w-full"
                            value={[
                                formData.start_date ? dayjs(formData.start_date) : null,
                                formData.end_date ? dayjs(formData.end_date) : null
                            ]}
                            onChange={(dates) => {
                                if (dates) {
                                    setFormData({
                                        ...formData,
                                        start_date: dates[0]?.toDate(),
                                        end_date: dates[1]?.toDate()
                                    })
                                }
                            }}
                        />
                    </Form.Item>
                </div>

                <div className="col-span-2">
                    <Form.Item label="Description">
                        <TextArea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                            placeholder="Enter event description"
                        />
                    </Form.Item>
                </div>

                <div className="col-span-2">
                    <Form.Item label="Channels">
                        <Select
                            mode="multiple"
                            value={formData.channels}
                            onChange={(values) => setFormData({ ...formData, channels: values })}
                            options={channels.map(channel => ({ value: channel.id, label: channel.name }))}
                            className="w-full"
                            placeholder="Select channels"
                        />
                    </Form.Item>
                </div>

                <div>
                    <Form.Item label="Retailer" required>
                        <Select
                            value={formData.retailerId}
                            onChange={(value) => setFormData({
                                ...formData,
                                retailerId: value,
                                brandId: '',
                                planned: [],
                                actual: []
                            })}
                            options={retailers.map(retailer => ({ value: retailer, label: retailer }))}
                            className="w-full"
                            placeholder="Select retailer"
                        />
                    </Form.Item>
                </div>

                <div>
                    <Form.Item label="Brand" required>
                        <Select
                            value={formData.brandId}
                            onChange={(value) => setFormData({
                                ...formData,
                                brandId: value,
                                planned: [],
                                actual: []
                            })}
                            options={brands.map(brand => ({ value: brand, label: brand }))}
                            className="w-full"
                            placeholder="Select brand"
                            disabled={!formData.retailerId}
                        />
                    </Form.Item>
                </div>

                <div className="col-span-2">
                    <Form.Item label="Products" required>
                        <Select
                            mode="multiple"
                            value={formData.planned.map(p => p.productId)}
                            onChange={(values) => setFormData({
                                ...formData,
                                planned: values.map(productId => ({
                                    productId,
                                    financialData: formData.planned.find(p => p.productId === productId)?.financialData || {
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
                                    }
                                })),
                                actual: values.map(productId => ({
                                    productId,
                                    financialData: formData.planned.find(p => p.productId === productId)?.financialData || {
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
                                    }
                                }))
                            })}
                            options={products.map(product => ({ value: product.id, label: product.name }))}
                            className="w-full"
                            placeholder="Select products"
                            disabled={!formData.brandId}
                            maxTagCount={2}
                        />
                    </Form.Item>
                </div>
            </div>
        </div>
    )
}

export default EventDetails