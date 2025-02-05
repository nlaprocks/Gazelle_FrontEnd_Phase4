import { Product } from '@/types/product'
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
            retailer_id: 'ALBSCO Jewel Div TA',
            brand_id: 'JACK DANIELS',
            budget: '10000',
            // Product 1 data
            productId: 'Completely Fresh Foods Jack Daniels Honey Liqueur Bbq Pulled Pork Entree 16OZ 081166302903-JACK DANIELS',
            promoPrice: '7.49',
            tprDist: '85',
            doDist: '45',
            foDist: '35',
            fdDist: '25',
            listPrice: '6.99',
            edlpPerUnitRate: '0.25',
            promoPerUnitRate: '0.50',
            vcm: '2.50',
            fixedFee: '1000',
        },
        {
            eventId: 'event2', // Same eventId to group products under one event
            title: 'Summer Sale 2024',
            description: 'Summer promotional campaign 2',
            start_date: '2024-07-05',
            end_date: '2024-07-30',
            status: 'draft',
            color: '#4F46E5',
            channels: 'Online,Retail',
            retailer_id: 'ALBSCO Jewel Div TA',
            brand_id: 'JACK DANIELS',
            budget: '10000',
            // Product 1 data
            productId: 'Completely Fresh Foods Jack Daniels Honey Liqueur Bbq Pulled Pork Entree 16OZ 081166302903-JACK DANIELS',
            promoPrice: '7.49',
            tprDist: '85',
            doDist: '45',
            foDist: '35',
            fdDist: '25',
            listPrice: '6.99',
            edlpPerUnitRate: '0.25',
            promoPerUnitRate: '0.50',
            vcm: '2.50',
            fixedFee: '1000',
        },
        {
            eventId: 'event3', // Same eventId to group products under one event
            title: 'Summer Sale 2024',
            description: 'Summer promotional campaign 3',
            start_date: '2024-08-05',
            end_date: '2024-08-30',
            status: 'draft',
            color: '#4F46E5',
            channels: 'Online,Retail',
            retailer_id: 'ALBSCO Jewel Div TA',
            brand_id: 'JACK DANIELS',
            budget: '10000',
            // Product 1 data
            productId: 'Completely Fresh Foods Jack Daniels Honey Liqueur Bbq Pulled Pork Entree 16OZ 081166302903-JACK DANIELS',
            promoPrice: '7.49',
            tprDist: '85',
            doDist: '45',
            foDist: '35',
            fdDist: '25',
            listPrice: '6.99',
            edlpPerUnitRate: '0.25',
            promoPerUnitRate: '0.50',
            vcm: '2.50',
            fixedFee: '1000',
        },
        {
            eventId: 'event4', // Same eventId to group products under one event
            title: 'Summer Sale 2024',
            description: 'Summer promotional campaign 4',
            start_date: '2024-09-05',
            end_date: '2024-09-30',
            status: 'draft',
            color: '#4F46E5',
            channels: 'Online,Retail',
            retailer_id: 'ALBSCO Jewel Div TA',
            brand_id: 'JACK DANIELS',
            budget: '10000',
            productId: 'Completely Fresh Foods Jack Daniels Honey Liqueur Bbq Pulled Pork Entree 16OZ 081166302903-JACK DANIELS',
            promoPrice: '7.49',
            tprDist: '85',
            doDist: '45',
            foDist: '35',
            fdDist: '25',
            listPrice: '6.99',
            edlpPerUnitRate: '0.25',
            promoPerUnitRate: '0.50',
            vcm: '2.50',
            fixedFee: '1000',
        },
        {
            eventId: 'event4', // Same eventId to group products under one event
            title: 'Summer Sale 2024',
            description: 'Summer promotional campaign 4',
            start_date: '2024-09-05',
            end_date: '2024-09-30',
            status: 'draft',
            color: '#4F46E5',
            channels: 'Online,Retail',
            retailer_id: 'ALBSCO Jewel Div TA',
            brand_id: 'JACK DANIELS',
            budget: '10000',
            productId: 'Completely Fresh Foods Jack Daniels Old No 7 Brand Bbqck Pulled Chicken Entree 16OZ 089533400108-JACK DANIELS',
            promoPrice: '7.49',
            tprDist: '85',
            doDist: '45',
            foDist: '35',
            fdDist: '25',
            listPrice: '6.99',
            edlpPerUnitRate: '0.25',
            promoPerUnitRate: '0.50',
            vcm: '2.50',
            fixedFee: '1000',
        },
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

export const generateSampleData = (products: string[], retailerId: string, brandId: string) => {
    const eventId = `event${Math.floor(Math.random() * 1000)}`;

    return products.map((product: string) => ({
        eventId, // Same eventId to group products under one event
        title: 'New Promotion Campaign',
        description: 'Sample promotional campaign',
        start_date: '', // Leave empty for template
        end_date: '', // Leave empty for template
        status: 'draft',
        color: '#4F46E5',
        channels: 'Online,Retail',
        retailer_id: retailerId,
        brand_id: brandId,
        budget: '', // Leave empty for template
        productId: product,
        promoPrice: '', // Leave empty for template
        tprDist: '', // Leave empty for template
        doDist: '', // Leave empty for template
        foDist: '', // Leave empty for template
        fdDist: '', // Leave empty for template
        listPrice: '', // Leave empty for template
        edlpPerUnitRate: '', // Leave empty for template
        promoPerUnitRate: '', // Leave empty for template
        vcm: '', // Leave empty for template
        fixedFee: '', // Leave empty for template
    }));
};

export const downloadAdvancedTemplate = async (products: any[], retailerId: string, brandId: string) => {
    const data = generateSampleData(products, retailerId, brandId);

    // Convert to CSV
    const headers = [
        'eventId',
        'title',
        'description',
        'start_date',
        'end_date',
        'status',
        'color',
        'channels',
        'retailer_id',
        'brand_id',
        'budget',
        'productId',
        'promoPrice',
        'tprDist',
        'doDist',
        'foDist',
        'fdDist',
        'listPrice',
        'basePrice',
        'edlpPerUnitRate',
        'promoPerUnitRate',
        'vcm',
        'fixedFee'
    ];

    const csvContent = [
        headers.join(','),
        ...data.map((row: any) =>
            headers.map(header =>
                // Wrap values in quotes if they contain commas
                typeof row[header] === 'string' && row[header].includes(',')
                    ? `"${row[header]}"`
                    : row[header] || ''
            ).join(',')
        )
    ].join('\n');

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `event_template_${retailerId}_${brandId}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
