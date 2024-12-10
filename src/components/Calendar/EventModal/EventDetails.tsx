import React from 'react'
import { Input, Select, DatePicker, ColorPicker, Form } from 'antd'
import { Channel, Retailer, Brand, Product } from '../../../types'
import dayjs from 'dayjs'

const { TextArea } = Input
const { RangePicker } = DatePicker

interface EventDetailsProps {
    formData: any
    setFormData: (data: any) => void
    channels: Channel[]
    retailers: Retailer[]
    brands: Brand[]
    products: Product[]
}

const EventDetails: React.FC<EventDetailsProps> = ({
    formData,
    setFormData,
    channels,
    retailers,
    brands,
    products,
}) => {
    const filteredBrands = brands.filter(brand => brand.retailerId === formData.retailerId)
    const filteredProducts = products.filter(product =>
        filteredBrands.some(brand => brand.id === product.brandId)
    )

    const statusOptions = [
        { value: 'draft', label: 'Draft' },
        { value: 'active', label: 'Active' },
        { value: 'completed', label: 'Completed' },
    ]

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Event Details</h3>

            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                    <Form.Item label="Event Name">
                        <Input
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Enter event name"
                        />
                    </Form.Item>
                </div>

                <div>
                    <Form.Item label="Status">
                        <Select
                            value={formData.status}
                            onChange={(value) => setFormData({ ...formData, status: value })}
                            options={statusOptions}
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
                    <Form.Item label="Date Range">
                        <RangePicker
                            className="w-full"
                            value={[
                                formData.startDate ? dayjs(formData.startDate) : null,
                                formData.endDate ? dayjs(formData.endDate) : null
                            ]}
                            onChange={(dates) => {
                                if (dates) {
                                    setFormData({
                                        ...formData,
                                        startDate: dates[0]?.format('YYYY-MM-DD'),
                                        endDate: dates[1]?.format('YYYY-MM-DD')
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

                <div>
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
                    <Form.Item label="Retailer">
                        <Select
                            value={formData.retailerId}
                            onChange={(value) => setFormData({
                                ...formData,
                                retailerId: value,
                                brandId: '',
                                products: []
                            })}
                            options={retailers.map(retailer => ({ value: retailer.id, label: retailer.name }))}
                            className="w-full"
                            placeholder="Select retailer"
                        />
                    </Form.Item>
                </div>

                <div>
                    <Form.Item label="Brand">
                        <Select
                            value={formData.brandId}
                            onChange={(value) => setFormData({
                                ...formData,
                                brandId: value,
                                products: []
                            })}
                            options={filteredBrands.map(brand => ({ value: brand.id, label: brand.name }))}
                            className="w-full"
                            placeholder="Select brand"
                            disabled={!formData.retailerId}
                        />
                    </Form.Item>
                </div>

                <div>
                    <Form.Item label="Products">
                        <Select
                            mode="multiple"
                            value={formData.products}
                            onChange={(values) => setFormData({ ...formData, products: values })}
                            options={filteredProducts.map(product => ({ value: product.id, label: product.name }))}
                            className="w-full"
                            placeholder="Select products"
                            disabled={!formData.brandId}
                        />
                    </Form.Item>
                </div>
            </div>
        </div>
    )
}

export default EventDetails