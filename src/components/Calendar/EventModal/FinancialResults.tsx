import React from 'react'
import { Table } from 'antd'
import { calculateFinancialResults, calculatePromotionalResults } from '../../../utils/financialCalculations'
import { FinancialData } from '../../../types'

interface FinancialResultsProps {
    financialData: FinancialData
}

const FinancialResults: React.FC<FinancialResultsProps> = ({ financialData }) => {
    const promotionalResults = calculatePromotionalResults({
        basePrice: Number(financialData.basePrice),
        promoPrice: Number(financialData.promoPrice),
        tprDist: Number(financialData.tprDist),
        foDist: Number(financialData.foDist),
        doDist: Number(financialData.doDist),
        fdDist: Number(financialData.fdDist),
        totalUnits: Number(financialData.units),
        promoPriceElasticity: Number(financialData.promoPriceElasticity),
    })

    // Get second last element from promotionalResults
    const increamentalUnits = promotionalResults[promotionalResults.length - 2].units

    // Get last element from promotionalResults
    const units = promotionalResults[promotionalResults.length - 1].units

    const financialResults = calculateFinancialResults({
        units,
        promoPrice: Number(financialData.promoPrice),
        basePrice: Number(financialData.basePrice),
        edlpPerUnitRate: Number(financialData.edlpPerUnitRate),
        promoPerUnitRate: Number(financialData.promoPerUnitRate),
        fixedFee: Number(financialData.fixedFee),
        listPrice: Number(financialData.listPrice),
        vcm: Number(financialData.vcm),
        increamentalUnits,
        promoPriceElasticity: financialData.promoPriceElasticity,
    })

    const promotionColumns = [
        {
            title: 'Promotion',
            dataIndex: 'promotion',
            key: 'promotion',
        },
        {
            title: '% ACV',
            dataIndex: 'acv',
            key: 'acv',
            align: 'right' as const,
            render: (value: number) => value ? value.toFixed(2) + '%' : '-',
        },
        {
            title: '% Lift',
            dataIndex: 'lift',
            key: 'lift',
            align: 'right' as const,
            render: (value: number) => value ? value.toFixed(2) + '%' : '-',
        },
        {
            title: 'Units',
            dataIndex: 'units',
            key: 'units',
            align: 'right' as const,
            render: (value: number) => value ? value.toFixed(2) : '-',
        },
        {
            title: 'Dollars',
            dataIndex: 'dollars',
            key: 'dollars',
            align: 'right' as const,
            render: (value: number) => value ? '$' + value.toFixed(2) : '-',
        },
    ]

    const financialColumns = [
        {
            title: 'Metric',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            align: 'right' as const,
        },
    ]

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4">Promotion Results</h3>
                <Table
                    columns={promotionColumns}
                    dataSource={promotionalResults.map((item, index) => ({ ...item, key: index }))}
                    pagination={false}
                    size="small"
                    bordered
                />
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-4">Financial Results</h3>
                <Table
                    columns={financialColumns}
                    dataSource={financialResults.map((item, index) => ({ ...item, key: index }))}
                    pagination={false}
                    size="small"
                    bordered
                />
            </div>
        </div>
    )
}

export default FinancialResults