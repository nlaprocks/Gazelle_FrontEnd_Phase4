import React, { useEffect } from 'react'
import { InputNumber, Form } from 'antd'
import { FinancialData } from '../../../types'

interface FinancialFieldsProps {
    formData: { financialData: FinancialData }
    setFormData: (data: any) => void
}

const PROMOTIONAL_FIELDS = [
    { name: 'basePrice', label: 'Base Price' },
    { name: 'promoPrice', label: 'Promo Price' },
    { name: 'discount', label: 'Discount %', readonly: true },
    { name: 'units', label: 'Units' },
    { name: 'tprDist', label: '% TPR ACV' },
    { name: 'doDist', label: '% Display Only ACV' },
    { name: 'foDist', label: '% Feature Only ACV' },
    { name: 'fdDist', label: '% Feature and Display ACV' },
]

const FINANCIAL_FIELDS = [
    { name: 'listPrice', label: 'List Price' },
    { name: 'edlpPerUnitRate', label: 'EDLP Per Unit Rate' },
    { name: 'promoPerUnitRate', label: 'Promo Per Unit Rate' },
    { name: 'vcm', label: 'VCM' },
    { name: 'fixedFee', label: 'Fixed Fees' },
]

const FinancialFields: React.FC<FinancialFieldsProps> = ({ formData, setFormData }) => {
    useEffect(() => {
        const basePrice = parseFloat(formData.financialData.basePrice.toString()) || 0
        const promoPrice = parseFloat(formData.financialData.promoPrice.toString()) || 0

        if (basePrice > 0 && promoPrice > 0) {
            const discount = ((basePrice - promoPrice) / basePrice) * 100
            setFormData({
                ...formData,
                financialData: {
                    ...formData.financialData,
                    discount: discount.toFixed(2)
                }
            })
        }
    }, [formData.financialData.basePrice, formData.financialData.promoPrice])

    const handleFieldChange = (fieldName: string, value: number | null) => {
        setFormData({
            ...formData,
            financialData: {
                ...formData.financialData,
                [fieldName]: value || 0
            }
        })
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Promotional</h3>

            <div className="grid grid-cols-2 gap-4">
                {PROMOTIONAL_FIELDS.map(field => (
                    <Form.Item
                        key={field.name}
                        label={field.label}
                        className="mb-2"
                    >
                        <InputNumber
                            value={formData.financialData[field.name as keyof FinancialData]}
                            onChange={(value) => handleFieldChange(field.name, value)}
                            className="w-full"
                            disabled={field.readonly}
                            precision={2}
                            step={0.01}
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value: string | undefined) => parseFloat(value?.replace(/\$\s?|(,*)/g, '') || '0')}
                        />
                    </Form.Item>
                ))}
            </div>

            <h3 className="text-lg font-semibold mb-4 mt-4 border-t border-gray-200 pt-4">Financial</h3>
            <div className="grid grid-cols-2 gap-4">
                {FINANCIAL_FIELDS.map(field => (
                    <Form.Item
                        key={field.name}
                        label={field.label}
                        className="mb-2"
                    >
                        <InputNumber
                            value={formData.financialData[field.name as keyof FinancialData]}
                            onChange={(value) => handleFieldChange(field.name, value)}
                            className="w-full"
                            precision={2}
                            step={0.01}
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value: string | undefined) => parseFloat(value?.replace(/\$\s?|(,*)/g, '') || '0')}
                        />
                    </Form.Item>
                ))}
            </div>
        </div>
    )
}

export default FinancialFields