import { Event } from '../types'

const defaultFinancialData = {
    basePrice: 0,
    promoPrice: 0,
    discount: 0,
    units: 0,
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

export const SAMPLE_EVENTS: Event[] = [
    {
        id: '1',
        title: 'Product 1 Spring Campaign',
        description: 'Spring promotional campaign for Product 1',
        startDate: new Date(2024, 0, 8), // Week 2
        endDate: new Date(2024, 0, 29), // Week 5
        color: '#4F46E5',
        productId: 'p1',
        status: 'active',
        channels: [],
        retailerId: 'r1',
        brandId: 'b1',
        products: ['p1'],
        financialData: defaultFinancialData
    },
    {
        id: '2',
        title: 'Product 2 Launch Event',
        description: 'New product launch campaign',
        startDate: new Date(2024, 0, 15), // Week 3
        endDate: new Date(2024, 0, 22), // Week 4
        color: '#10B981',
        productId: 'p2',
        status: 'draft',
        channels: [],
        retailerId: 'r1',
        brandId: 'b1',
        products: ['p2'],
        financialData: defaultFinancialData
    }
]