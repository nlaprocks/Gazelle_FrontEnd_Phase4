import React from 'react'
import { FinancialData } from '../../../../types/financial'
import { getResult } from '../../../../utils/financialCalculations'
import { Table } from 'antd'

interface EventFinancialResultsProps {
    financialData: FinancialData
}

export const EventFinancialResults: React.FC<EventFinancialResultsProps> = ({ financialData }) => {
    const { promotionalResults, financialResults } = getResult(financialData);

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4">Promotion Results</h3>
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
                <h3 className="text-lg font-semibold mb-4">Financial Results</h3>
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