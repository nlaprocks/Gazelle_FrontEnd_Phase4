import { Event } from '../types/event'

export const SAMPLE_EVENTS: Event[] = [
    {
        id: '1',
        event_tpo_id: '1',
        title: 'Spring Promotion - Jack Daniels Honey',
        description: 'Major promotional campaign for Jack Daniels Honey during spring season',
        start_date: new Date(2024, 0, 8), // Week 2
        end_date: new Date(2024, 0, 29), // Week 5
        color: '#4F46E5',
        status: 'active',
        channels: ['c1', 'c2'], // Online and Retail
        retailer_id: 'r1', // Walmart
        brand_id: 'b1', // Brand A
        project_id: 'p1',
        model_id: 'm1',
        budget: 10000,
        planned: [{
            productId: 'p1',
            financialData: {
                basePrice: 8.99,
                promoPrice: 7.49,
                discount: 16.67,
                units: 490,
                tprDist: 85,
                doDist: 45,
                foDist: 35,
                fdDist: 25,
                listPrice: 6.99,
                edlpPerUnitRate: 0.25,
                promoPerUnitRate: 0.50,
                vcm: 2.50,
                fixedFee: 1000,
                increamentalUnits: 150,
                promoPriceElasticity: 0.5
            }
        }],
        actual: [
            {
                productId: 'p1',
                financialData: {
                    basePrice: 8.99,
                    promoPrice: 7.49,
                    discount: 16.67,
                    units: 490,
                    tprDist: 85,
                    doDist: 45,
                    foDist: 35,
                    fdDist: 25,
                    listPrice: 6.99,
                    edlpPerUnitRate: 0.25,
                    promoPerUnitRate: 0.50,
                    vcm: 2.50,
                    fixedFee: 1000,
                    increamentalUnits: 150,
                    promoPriceElasticity: 0.5
                }
            }
        ]
    },
    {
        id: '2',
        event_tpo_id: '2',
        title: 'Summer Clearance Event',
        description: 'Multi-product clearance event with significant discounts',
        start_date: new Date(2024, 5, 1), // June 1
        end_date: new Date(2024, 5, 30), // June 30
        color: '#10B981',
        status: 'draft',
        channels: ['c2', 'c3'], // Retail and Wholesale
        retailer_id: 'r1', // Walmart
        brand_id: 'b1', // Brand A
        project_id: 'p1',
        model_id: 'm1',
        budget: 10000,
        planned: [
            {
                productId: 'p1',
                financialData: {
                    basePrice: 8.99,
                    promoPrice: 6.99,
                    discount: 22.25,
                    units: 750,
                    tprDist: 90,
                    doDist: 60,
                    foDist: 45,
                    fdDist: 35,
                    listPrice: 5.99,
                    edlpPerUnitRate: 0.30,
                    promoPerUnitRate: 0.75,
                    vcm: 2.25,
                    fixedFee: 1500,
                    increamentalUnits: 250,
                    promoPriceElasticity: 0.5
                }
            },
            {
                productId: 'p2',
                financialData: {
                    basePrice: 19.99,
                    promoPrice: 14.99,
                    discount: 25.01,
                    units: 2000,
                    tprDist: 80,
                    doDist: 50,
                    foDist: 40,
                    fdDist: 30,
                    listPrice: 12.99,
                    edlpPerUnitRate: 0.50,
                    promoPerUnitRate: 1.00,
                    vcm: 4.50,
                    fixedFee: 2000,
                    increamentalUnits: 500,
                    promoPriceElasticity: 0.5
                }
            }
        ],
        actual: [
            {
                productId: 'p1',
                financialData: {
                    basePrice: 8.99,
                    promoPrice: 6.99,
                    discount: 22.25,
                    units: 750,
                    tprDist: 90,
                    doDist: 60,
                    foDist: 45,
                    fdDist: 35,
                    listPrice: 5.99,
                    edlpPerUnitRate: 0.30,
                    promoPerUnitRate: 0.75,
                    vcm: 2.25,
                    fixedFee: 1500,
                    increamentalUnits: 250,
                    promoPriceElasticity: 0.5
                }
            },
            {
                productId: 'p2',
                financialData: {
                    basePrice: 19.99,
                    promoPrice: 14.99,
                    discount: 25.01,
                    units: 2000,
                    tprDist: 80,
                    doDist: 50,
                    foDist: 40,
                    fdDist: 30,
                    listPrice: 12.99,
                    edlpPerUnitRate: 0.50,
                    promoPerUnitRate: 1.00,
                    vcm: 4.50,
                    fixedFee: 2000,
                    increamentalUnits: 500,
                    promoPriceElasticity: 0.5
                }
            }
        ]
    },
    {
        id: '3',
        event_tpo_id: '3',
        title: 'Holiday Special',
        description: 'End of year holiday promotion across all channels',
        start_date: new Date(2024, 11, 1), // December 1
        end_date: new Date(2024, 11, 31), // December 31
        color: '#EF4444',
        status: 'draft',
        channels: ['c1', 'c2', 'c3'], // All channels
        retailer_id: 'r2', // Target
        brand_id: 'b3', // Brand C
        project_id: 'p1',
        model_id: 'm1',
        budget: 10000,
        planned: [
            {
                productId: 'p4',
                financialData: {
                    basePrice: 49.99,
                    promoPrice: 39.99,
                    discount: 20,
                    units: 800,
                    tprDist: 95,
                    doDist: 70,
                    foDist: 60,
                    fdDist: 45,
                    listPrice: 35.99,
                    edlpPerUnitRate: 1.00,
                    promoPerUnitRate: 2.00,
                    vcm: 8.50,
                    fixedFee: 3000,
                    increamentalUnits: 300,
                    promoPriceElasticity: 0.5
                }
            }
        ],
        actual: [
            {
                productId: 'p4',
                financialData: {
                    basePrice: 49.99,
                    promoPrice: 39.99,
                    discount: 20,
                    units: 800,
                    tprDist: 95,
                    doDist: 70,
                    foDist: 60,
                    fdDist: 45,
                    listPrice: 35.99,
                    edlpPerUnitRate: 1.00,
                    promoPerUnitRate: 2.00,
                    vcm: 8.50,
                    fixedFee: 3000,
                    increamentalUnits: 300,
                    promoPriceElasticity: 0.5
                }
            }
        ],
    }
]