import React from 'react'
import { FinancialData } from '../../../../types'
import { calculatePromotionalResults } from '../../../../utils/financialCalculations'
import { Table } from 'antd'

interface EventPromotionalResultsProps {
    financialData: FinancialData
}

export const EventPromotionalResults: React.FC<EventPromotionalResultsProps> = ({ financialData }) => {
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

    const columns = [
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
            render: (value: number) => value ? value.toLocaleString() : '-',
        },
        {
            title: 'Dollars',
            dataIndex: 'dollars',
            key: 'dollars',
            align: 'right' as const,
            render: (value: number) => value ? `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '-',
        },
    ]

    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Promotional Results</h3>
            <Table
                columns={columns}
                dataSource={promotionalResults.map((item, index) => ({ ...item, key: index }))}
                pagination={false}
                size="small"
                bordered
            />
        </div>
    )
}