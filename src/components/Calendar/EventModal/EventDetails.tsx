import React, { useEffect, useState } from 'react'
import { Input, Select, DatePicker, ColorPicker, Form } from 'antd'
import { Channel, Product } from '../../../types/product'
import { Event, EventProduct } from '../../../types/event'
import dayjs from 'dayjs'
import axios from "axios"
import { eventService } from "../../../services/eventService"

const { TextArea } = Input
const { RangePicker } = DatePicker

interface EventDetailsProps {
    formData: Omit<Event, 'id'>
    setFormData: (data: Omit<Event, 'id'>) => void
    channels: Channel[]
    planned: EventProduct[]
    actual: EventProduct[]
    projects: Array<any>
    // maxBudget: number
}

const EventDetails: React.FC<EventDetailsProps> = ({
    formData,
    setFormData,
    channels,
    planned,
    actual,
    projects
}) => {
    // const filteredBrands = brands.filter(brand => brand.retailer_id === formData.retailer_id)
    // const filteredProducts = products.filter(product =>
    //     filteredBrands.some(brand => brand.id === product.brand_id)
    // )

    // Initialize product financial data when products are selected
    // useEffect(() => {
    // const selectedProducts = products.filter((p: any) => formData.planned.some((ep: any) => ep.productId === p.id))
    // const updatedProducts: EventProduct[] = selectedProducts.map((product: any) => ({
    //     productId: product.id,
    //     financialData: {
    //         basePrice: product.basePrice,
    //         promoPrice: product.basePrice,
    //         discount: 0,
    //         units: product.totalUnits,
    //         tprDist: 0,
    //         doDist: 0,
    //         foDist: 0,
    //         fdDist: 0,
    //         listPrice: 0,
    //         edlpPerUnitRate: 0,
    //         promoPerUnitRate: 0,
    //         vcm: 0,
    //         fixedFee: 0,
    //         increamentalUnits: 0,
    //     }
    // }))

    // setFormData({
    //     ...formData,
    //     planned: updatedProducts,
    // })
    // }, [formData.planned.map(p => p.productId).join(',')])

    const [retailerBrandProducts, setRetailerBrandProducts] = useState([])

    const retailers = Object.keys(retailerBrandProducts || {})
    // @ts-ignore
    let brands = formData.retailer_id && retailerBrandProducts[formData.retailer_id] ? Object.keys(retailerBrandProducts[formData.retailer_id]) : []
    // @ts-ignore
    let products = formData.retailer_id && formData.brand_id && retailerBrandProducts[formData.retailer_id]?.[formData.brand_id] ? retailerBrandProducts[formData.retailer_id][formData.brand_id] : []
    console.log({ products })
    useEffect(() => {
        const fetchRetailerBrandProductApiHandler = async () => {
            try {
                const api = `${process.env.REACT_APP_NGROK}/insights/retailer_brands_products?project_id=${formData.project_id}&model_id=${formData.model_id}`
                const response = await axios.get(api)
                if (response.status === 200) {
                    setRetailerBrandProducts(response?.data?.data)
                }
            } catch (error) {
                console.log("Error in fetching retailers", error)
            }
        }
        if (formData.project_id && formData.model_id) {
            fetchRetailerBrandProductApiHandler()
        } else {
            setRetailerBrandProducts([])
        }
    }, [formData.project_id, formData.model_id])

    const statusOptions = [
        { value: 'DRAFT', label: 'Draft' },
        { value: 'ACTIVE', label: 'Active' },
        { value: 'COMPLETED', label: 'Completed' },
        { value: 'CANCELLED', label: 'Cancelled' },
    ]
    const [selectedProducts, setSelectedProducts] = useState<string[]>([])

    // Initialize selectedProducts when initialEvent has planned products
    useEffect(() => {
        if (formData?.planned?.length > 0) {
            const productName = formData.planned.map((p: any) => p.productName);
            setSelectedProducts(productName);
        }
    }, [formData.planned]);

    const handleProductChange = async (values: string[]) => {
        setSelectedProducts(values)

        await eventService.fetchProductData(values, formData.project_id, formData.model_id, formData.retailer_id).then((productData: any) => {
            const existingPlannedProductIds = new Set(formData.planned.map((p: any) => p.productId))
            const existingActualProductIds = new Set(formData.actual.map((p: any) => p.productId))

            const updatedPlanned = productData.map((product: any) => {
                if (!existingPlannedProductIds.has(product.id)) {
                    return {
                        productId: product.id,
                        productName: product.name,
                        ...product,
                        financialData: {
                            basePrice: product.basePrice,
                            promoPrice: 0,
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
                            promoPriceElasticity: product.promoPriceElasticity,
                        }
                    }
                }
                return formData.planned.find((p: any) => p.productId === product.id)
            }).filter(Boolean)

            const updatedActual = productData.map((product: any) => {
                if (!existingActualProductIds.has(product.id)) {
                    return {
                        productId: product.id,
                        productName: product.name,
                        ...product,
                        financialData: {
                            basePrice: product.basePrice,
                            promoPrice: 0,
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
                    }
                }
                return formData.actual.find((p: any) => p.productId === product.id)
            }).filter(Boolean)

            console.log({ updatedPlanned, updatedActual })
            // Update formData with the new planned and actual arrays
            setFormData({
                ...formData,
                planned: updatedPlanned,
                actual: updatedActual,
            })
        }).catch((error: any) => {
            console.log(error)
        })
    }

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

                {/* <div>
                    <Form.Item
                        label="Budget"
                        required
                        validateStatus={formData.budget > maxBudget ? "error" : "success"}
                        help={formData.budget > maxBudget ? `Budget cannot exceed ${maxBudget.toLocaleString()}` : null}
                    >
                        <Input
                            type="number"
                            value={formData.budget}
                            onChange={(e) => {
                                const value = Number(e.target.value);
                                setFormData({
                                    ...formData,
                                    budget: value
                                });
                            }}
                            className={`w-full ${formData.budget > maxBudget ? 'border-red-500' : ''}`}
                            min={0}
                            max={maxBudget}
                        />
                    </Form.Item>
                </div> */}

                <div>
                    <Form.Item label="Ppg Name" required>
                        <Input
                            value={formData.ppg_name}
                            onChange={(e) => setFormData({ ...formData, ppg_name: e.target.value })}
                            placeholder="Enter ppg name"
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

                {/* <div>
                    <Form.Item label="Project" required>
                        <Select
                            value={formData.project_id}
                            onChange={(value) => setFormData({
                                ...formData,
                                project_id: value,
                                model_id: '',
                                retailer_id: '',
                                brand_id: '',
                                planned: [],
                                actual: []
                            })}
                            options={projects.map(project => ({ value: project.id, label: project.project_name }))}
                            className="w-full"
                            placeholder="Select project"
                        />
                    </Form.Item>
                </div>

                <div>
                    <Form.Item label="Model" required>
                        <Select
                            value={formData.model_id}
                            onChange={(value) => setFormData({
                                ...formData,
                                model_id: value,
                                retailer_id: '',
                                brand_id: '',
                                planned: [],
                                actual: []
                            })}
                            options={projects.find(project => project.id === formData.project_id)?.Models.map((model: any) => ({ value: model.id, label: `Version ${model.model_version}` }))}
                            className="w-full"
                            placeholder="Select model"
                            disabled={!formData.project_id}
                        />
                    </Form.Item>
                </div> */}

                <div>
                    <Form.Item label="Retailer" required>
                        <Select
                            value={formData.retailer_id}
                            onChange={(value) => setFormData({
                                ...formData,
                                retailer_id: value,
                                brand_id: '',
                                planned: [],
                                actual: []
                            })}
                            options={retailers.map(retailer => ({ value: retailer, label: retailer }))}
                            className="w-full"
                            placeholder="Select retailer"
                            disabled={!formData.project_id || !formData.model_id}
                        />
                    </Form.Item>
                </div>

                <div>
                    <Form.Item label="Brand" required>
                        <Select
                            value={formData.brand_id}
                            onChange={(value) => setFormData({
                                ...formData,
                                brand_id: value,
                                planned: [],
                                actual: []
                            })}
                            options={brands.map(brand => ({ value: brand, label: brand }))}
                            className="w-full"
                            placeholder="Select brand"
                            disabled={!formData.retailer_id}
                        />
                    </Form.Item>
                </div>

                <div className="col-span-2">
                    <Form.Item label="Products" required>
                        <Select
                            mode="multiple"
                            value={selectedProducts}
                            onChange={handleProductChange}
                            placeholder="Select products"
                            className="w-full"
                            options={products.map((product: any) => ({
                                value: product,
                                label: product
                            }))}
                        />
                    </Form.Item>
                </div>
            </div>
        </div>
    )
}

export default EventDetails