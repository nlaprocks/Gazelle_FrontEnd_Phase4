import Papa from 'papaparse'

export const downloadSampleTemplate = () => {
    // Create sample data with two products for the same event
    const template = [
        {
            eventId: 'event1', // Same eventId to group products under one event
            title: 'Summer Sale 2024',
            description: 'Summer promotional campaign',
            start_date: '2024-06-01',
            end_date: '2024-06-30',
            status: 'draft',
            color: '#4F46E5',
            channels: 'Online,Retail',
            retailer_id: 'r1',
            brand_id: 'b1',
            budget: '10000',
            // Product 1 data
            productId: 'p1',
            basePrice: '8.99',
            promoPrice: '7.49',
            units: '490',
            tprDist: '85',
            doDist: '45',
            foDist: '35',
            fdDist: '25',
            listPrice: '6.99',
            edlpPerUnitRate: '0.25',
            promoPerUnitRate: '0.50',
            vcm: '2.50',
            fixedFee: '1000',
            increamentalUnits: '150'
        },
        {
            eventId: 'event1', // Same event, different product
            title: 'Summer Sale 2024',
            description: 'Summer promotional campaign',
            start_date: '2024-06-01',
            end_date: '2024-06-30',
            status: 'draft',
            color: '#4F46E5',
            channels: 'Online,Retail',
            retailer_id: 'r1',
            brand_id: 'b1',
            budget: '10000',
            // Product 2 data
            productId: 'p2',
            basePrice: '19.99',
            promoPrice: '14.99',
            units: '2000',
            tprDist: '80',
            doDist: '50',
            foDist: '40',
            fdDist: '30',
            listPrice: '12.99',
            edlpPerUnitRate: '0.50',
            promoPerUnitRate: '1.00',
            vcm: '4.50',
            fixedFee: '2000',
            increamentalUnits: '500'
        }
    ]

    const csv = Papa.unparse(template)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)

    link.setAttribute('href', url)
    link.setAttribute('download', 'event_import_template.csv')
    link.style.visibility = 'hidden'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}