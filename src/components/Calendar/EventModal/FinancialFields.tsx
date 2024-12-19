import React from 'react'
import { InputNumber, Form } from 'antd'
import { FinancialData } from '../../../types/financial'

interface FinancialFieldsProps {
    productId: string
    financialData: FinancialData
    onChange: (data: FinancialData) => void
    basePrice: number
    totalUnits: number
}

const PROMOTIONAL_FIELDS = [
    {
        name: 'basePrice', label: 'Base Price', readonly: true, formatter: (value: any) => {
            return Number(value).toFixed(2)
        }
    },
    { name: 'promoPrice', label: 'Promo Price' },
    {
        name: 'discount', label: 'Discount %', readonly: true, formatter: (value: any) => {
            return Number(value).toFixed(2)
        }
    },
    { name: 'units', label: 'Units', readonly: true },
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

const FinancialFields: React.FC<FinancialFieldsProps> = ({
    financialData,
    onChange,
    basePrice,
    totalUnits,
}) => {
    const handleFieldChange = (fieldName: keyof FinancialData, value: number | null) => {
        const newData = {
            ...financialData,
            [fieldName]: value || 0,
        }

        // Calculate discount when promo price changes
        if (fieldName === 'promoPrice' && basePrice > 0) {
            const promoPrice = value || 0
            newData.discount = ((basePrice - promoPrice) / basePrice) * 100
        }

        onChange(newData)
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                {PROMOTIONAL_FIELDS.map(field => (
                    <Form.Item key={field.name} label={field.label} className="mb-2">
                        <InputNumber
                            value={field.name === 'basePrice' ? basePrice :
                                field.name === 'units' ? totalUnits :
                                    financialData[field.name as keyof FinancialData]}
                            onChange={(value) => handleFieldChange(field.name as keyof FinancialData, value)}
                            className="w-full"
                            disabled={field.readonly}
                            precision={2}
                            step={0.01}
                            formatter={(value) => {
                                if (field.formatter) {
                                    return field.formatter(value)
                                }
                                return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            }}
                            parser={(value: string | undefined) => parseFloat(value?.replace(/\$\s?|(,*)/g, '') || '0')}
                        />
                    </Form.Item>
                ))}
            </div>

            <h3 className="text-lg font-semibold mb-4 mt-4 border-t border-gray-200 pt-4">Financial</h3>
            <div className="grid grid-cols-2 gap-4">
                {FINANCIAL_FIELDS.map(field => (
                    <Form.Item key={field.name} label={field.label} className="mb-2">
                        <InputNumber
                            value={financialData[field.name as keyof FinancialData]}
                            onChange={(value) => handleFieldChange(field.name as keyof FinancialData, value)}
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