import React from 'react'
import { Table } from 'antd'
import { calculateFinancialResults } from '../../../utils/financialCalculations'
import { FinancialData } from '../../../types'

interface FinancialResultsProps {
    financialData: FinancialData
}

const FinancialResults: React.FC<FinancialResultsProps> = ({ financialData }) => {
    const results = calculateFinancialResults({
        units: Number(financialData.units),
        promoPrice: Number(financialData.promoPrice),
        basePrice: Number(financialData.basePrice),
        edlpPerUnitRate: Number(financialData.edlpPerUnitRate),
        promoPerUnitRate: Number(financialData.promoPerUnitRate),
        fixedFee: Number(financialData.fixedFee),
        listPrice: Number(financialData.listPrice),
        vcm: Number(financialData.vcm),
        increamentalUnits: Number(financialData.increamentalUnits),
    })

    const columns = [
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
        <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Financial Results</h3>

            <Table
                columns={columns}
                dataSource={results.map((item, index) => ({ ...item, key: index }))}
                pagination={false}
                size="small"
                bordered
            />
        </div>
    )
}

export default FinancialResults