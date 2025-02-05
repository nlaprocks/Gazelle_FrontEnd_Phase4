import React from 'react'
import { Table, Tabs } from 'antd'
import { Event } from '../../../types/event'
import { format } from 'date-fns'
import { calculateFinancialResults, calculatePromotionalResults } from '../../../utils/financialCalculations'

const { TabPane } = Tabs

interface PreviewTableProps {
    data: Event[]
}

export const PreviewTable: React.FC<PreviewTableProps> = ({ data }) => {
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Start Date',
            dataIndex: 'start_date',
            key: 'start_date',
            render: (date: Date) => format(new Date(date), 'MMM d, yyyy'),
        },
        {
            title: 'End Date',
            dataIndex: 'end_date',
            key: 'end_date',
            render: (date: Date) => format(new Date(date), 'MMM d, yyyy'),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => <span className="capitalize">{status}</span>,
        },
        {
            title: 'Budget',
            dataIndex: 'budget',
            key: 'budget',
            render: (budget: number) => new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(budget),
        },
        {
            title: 'Products',
            dataIndex: 'planned',
            key: 'products',
            render: (planned: any[]) => planned.length,
        },
    ]

    const renderProductDetails = (products: any[], title: string) => {
        const productColumns = [
            { title: 'Product', dataIndex: 'productName', key: 'productName' },
            {
                title: 'Base Price',
                dataIndex: ['financialData', 'basePrice'],
                key: 'basePrice',
                render: (value: number) => `$${value.toFixed(2)}`,
            },
            {
                title: 'Promo Price',
                dataIndex: ['financialData', 'promoPrice'],
                key: 'promoPrice',
                render: (value: number) => `$${value.toFixed(2)}`,
            },
            {
                title: 'Discount',
                dataIndex: ['financialData', 'discount'],
                key: 'discount',
                render: (value: number) => `${value.toFixed(2)}%`,
            },
            {
                title: 'Units',
                dataIndex: ['financialData', 'units'],
                key: 'units',
                render: (value: number) => value.toLocaleString(),
            },
        ]

        return (
            <div>
                <h4 className="text-lg font-semibold mb-4">{title}</h4>
                <Table
                    columns={productColumns}
                    dataSource={products}
                    pagination={false}
                    size="small"
                />
            </div>
        )
    }

    const renderFinancialResults = (products: any[]) => {
        const financialColumns = [
            { title: 'Metric', dataIndex: 'name', key: 'name' },
            { title: 'Value', dataIndex: 'value', key: 'value' },
        ]

        return products.map((product) => {
            console.log({ product });
            const financialResults = calculateFinancialResults({
                units: product.financialData.units,
                promoPrice: product.financialData.promoPrice,
                basePrice: product.financialData.basePrice,
                edlpPerUnitRate: product.financialData.edlpPerUnitRate,
                promoPerUnitRate: product.financialData.promoPerUnitRate,
                fixedFee: product.financialData.fixedFee,
                listPrice: product.financialData.listPrice,
                vcm: product.financialData.vcm,
                increamentalUnits: product.financialData.increamentalUnits,
            })

            const promotionalResults = calculatePromotionalResults({
                basePrice: product.financialData.basePrice,
                promoPrice: product.financialData.promoPrice,
                tprDist: product.financialData.tprDist,
                foDist: product.financialData.foDist,
                doDist: product.financialData.doDist,
                fdDist: product.financialData.fdDist,
                totalUnits: product.financialData.units,
                promoPriceElasticity: product.financialData.promoPriceElasticity,
            })

            return (
                <div key={product.productId} className="mt-6">
                    <Tabs defaultActiveKey="financial">
                        <TabPane tab="Financial Results" key="financial">
                            <Table
                                columns={financialColumns}
                                dataSource={financialResults}
                                pagination={false}
                                size="small"
                            />
                        </TabPane>
                        <TabPane tab="Promotional Results" key="promotional">
                            <Table
                                columns={[
                                    { title: 'Promotion', dataIndex: 'promotion' },
                                    {
                                        title: '% ACV',
                                        dataIndex: 'acv',
                                        align: 'right',
                                        render: (value: number) => value ? `${value.toFixed(2)}%` : '-',
                                    },
                                    {
                                        title: '% Lift',
                                        dataIndex: 'lift',
                                        align: 'right',
                                        render: (value: number) => value ? `${value.toFixed(2)}%` : '-',
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
                                dataSource={promotionalResults}
                                pagination={false}
                                size="small"
                            />
                        </TabPane>
                    </Tabs>
                </div>
            )
        })
    }

    const expandedRowRender = (record: Event) => (
        <div className="p-4 space-y-4">
            <Tabs defaultActiveKey="planned">
                <TabPane tab="Planned" key="planned">
                    {renderProductDetails(record.planned, 'Planned Products')}
                    {renderFinancialResults(record.planned)}
                </TabPane>
                <TabPane tab="Actual" key="actual">
                    {record.actual.length > 0 ? (
                        <>
                            {renderProductDetails(record.actual, 'Actual Products')}
                            {renderFinancialResults(record.actual)}
                        </>
                    ) : (
                        <div className="text-gray-500 text-center py-4">
                            No actual data available
                        </div>
                    )}
                </TabPane>
            </Tabs>
        </div>
    )

    return (
        <Table
            dataSource={data}
            columns={columns}
            rowKey="id"
            expandable={{
                expandedRowRender,
                expandRowByClick: true,
            }}
            pagination={false}
            scroll={{ y: 400 }}
        />
    )
}