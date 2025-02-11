import React from 'react'
import { Table } from 'antd'
import { getResult } from '../../../utils/financialCalculations'
import { FinancialData } from '../../../types/financial'

interface FinancialResultsProps {
    financialData: FinancialData
}

const FinancialResults: React.FC<FinancialResultsProps> = ({ financialData }) => {
    const { promotionalResults, financialResults } = getResult(financialData);

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-2">Promotion Results</h3>
                <Table
                    columns={[
                        { title: 'Promotion', dataIndex: 'promotion' },
                        {
                            title: '% ACV',
                            dataIndex: 'acv',
                            align: 'right',
                            render: (value: number) => value ? value.toFixed(2) + '%' : '-',
                        },
                        {
                            title: '% Lift',
                            dataIndex: 'lift',
                            align: 'right',
                            render: (value: number) => value ? value.toFixed(2) + '%' : '-',
                        },
                        {
                            title: 'Units',
                            dataIndex: 'units',
                            align: 'right',
                            render: (value: number) => value ? value.toLocaleString() : '-',
                        },
                        {
                            title: 'Dollars',
                            dataIndex: 'dollars',
                            align: 'right',
                            render: (value: number) => value ? `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '-',
                        },
                    ]}
                    dataSource={promotionalResults.map((item, index) => ({ ...item, key: index }))}
                    pagination={false}
                    size="small"
                    bordered
                />
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">Financial Results</h3>
                <Table
                    columns={[
                        { title: 'Metric', dataIndex: 'name' },
                        { title: 'Value', dataIndex: 'value', align: 'right' },
                    ]}
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