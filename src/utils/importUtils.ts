import { Event, EventProduct } from '../types/event'
import Papa from 'papaparse'
import axios from "axios";

interface CsvRow {
    eventId?: string // Optional - to group multiple products under same event
    title: string
    description: string
    start_date: string
    end_date: string
    status: string
    color: string
    channels: string
    retailer_id: string
    brand_id: string
    project_id: string
    model_id: string
    budget: string
    // Product data
    productId: string
    basePrice: string
    promoPrice: string
    units: string
    tprDist: string
    doDist: string
    foDist: string
    fdDist: string
    listPrice: string
    edlpPerUnitRate: string
    promoPerUnitRate: string
    vcm: string
    fixedFee: string
    increamentalUnits: string
}

interface ParseResult {
    events: Event[]
    errors: string[]
}

export const parseEventData = async (file: File, event_tpo_id: string, project_id: string, model_id: string): Promise<ParseResult> => {
    const events = new Map<string, Event>()
    const errors: string[] = []
    return new Promise((resolve) => {
        Papa.parse<CsvRow>(file, {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
                try {
                    // Use Promise.all with map instead of forEach
                    await Promise.all(results.data.map(async (row: CsvRow, index) => {
                        try {
                            const eventId = row.eventId || crypto.randomUUID()
                            const productData = await createProductData(row, project_id, model_id)

                            if (events.has(eventId)) {
                                // Add product to existing event
                                const event = events.get(eventId)!
                                event.planned.push(productData)
                            } else {
                                // Create new event with product
                                const event = createEvent(row, eventId, productData, project_id, model_id)
                                events.set(eventId, event)
                            }
                        } catch (error) {
                            errors.push(`Row ${index + 2}: ${(error as Error).message}`)
                        }
                    }))

                    // Only resolve after all async operations are complete
                    resolve({ events: Array.from(events.values()), errors })
                } catch (error) {
                    errors.push(`Processing error: ${(error as Error).message}`)
                    resolve({ events: [], errors })
                }
            },
            error: (error) => {
                errors.push(`Failed to parse file: ${error.message}`)
                resolve({ events: [], errors })
            }
        })
    })
}

export const getProductData = async (product: string, project_id: string, model_id: string, retailer_id: string) => {
    try {
        const api = `${process.env.REACT_APP_NGROK}/insights/simulation/price/product-data?project_id=${project_id}&model_id=${model_id}&Retailer=${retailer_id}&Product=${product}`;
        const response = await axios.get(api);
        if (response.status === 200) {
            // setTimeout(() => {
            let SingleproductData = response?.data?.data[0];
            const basePrice = !isNaN(
                response?.data?.data[0]?.Price_avg_last_4_weeks
            )
                ? response?.data?.data[0]?.Price_avg_last_4_weeks
                : 0;

            SingleproductData = {
                id: SingleproductData._id,
                name: SingleproductData.Product,
                brand_id: SingleproductData.Brand,
                retailer_id: SingleproductData.Retailer,
                totalUnits: SingleproductData.total_units_sum / 52,
                promoPriceElasticity:
                    SingleproductData?.Promo_Price_Elasticity,
                basePrice: basePrice,
                // total_units_sum: SingleproductData?.total_units_sum / 52,
            };

            return SingleproductData;
        }
    } catch (error) {
        console.log("Error in fetching promo event simulation data: ", error);
    }
};

const createProductData = async (row: CsvRow, project_id: string, model_id: string): Promise<EventProduct> => {
    try {
        // Fetch product data from database
        const product = await getProductData(row.productId, project_id, model_id, row.retailer_id)

        return {
            productId: product.id,
            productName: product.name,
            financialData: {
                basePrice: Number(product.basePrice) || 0,
                promoPrice: Number(row.promoPrice) || 0,
                discount: calculateDiscount(Number(product.basePrice), Number(row.promoPrice)),
                units: Number(product.totalUnits) || 0,
                tprDist: Number(row.tprDist) || 0,
                doDist: Number(row.doDist) || 0,
                foDist: Number(row.foDist) || 0,
                fdDist: Number(row.fdDist) || 0,
                listPrice: Number(row.listPrice) || 0,
                edlpPerUnitRate: Number(row.edlpPerUnitRate) || 0,
                promoPerUnitRate: Number(row.promoPerUnitRate) || 0,
                vcm: Number(row.vcm) || 0,
                fixedFee: Number(row.fixedFee) || 0,
                increamentalUnits: Number(row.increamentalUnits) || 0,
                promoPriceElasticity: Number(product.promoPriceElasticity),
            }
        }
    } catch (error) {
        console.log("Error in creating product data: ", error);
        throw error;

    }

}

const calculateDiscount = (basePrice: number, promoPrice: number): number => {
    if (!basePrice || !promoPrice) return 0
    return ((basePrice - promoPrice) / basePrice) * 100
}

const createEvent = (row: CsvRow, eventId: string, productData: EventProduct, project_id: string, model_id: string): Event => {
    try {
        // Validate required fields
        const requiredFields: (keyof CsvRow)[] = ['title', 'start_date', 'end_date', 'status', 'retailer_id', 'brand_id']
        requiredFields.forEach(field => {
            if (!row[field]) {
                throw new Error(`Missing required field: ${field}`)
            }
        })

        return {
            id: eventId,
            event_tpo_id: eventId,
            title: row.title,
            description: row.description || '',
            start_date: parseDate(row.start_date),
            end_date: parseDate(row.end_date),
            color: row.color || '#4F46E5',
            status: validateStatus(row.status),
            channels: parseChannels(row.channels),
            retailer_id: row.retailer_id,
            brand_id: row.brand_id,
            project_id: project_id,
            model_id: model_id,
            budget: Number(row.budget) || 0,
            planned: [productData],
            actual: []
        }
    } catch (error) {
        console.log("Error in creating event: ", error);
        throw error;

    }

}

const parseDate = (value: string): Date => {
    const date = new Date(value)
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date format')
    }
    return date
}

const validateStatus = (status: string): 'draft' | 'active' | 'completed' => {
    const validStatuses = ['draft', 'active', 'completed']
    if (!validStatuses.includes(status)) {
        throw new Error('Invalid status')
    }
    return status as 'draft' | 'active' | 'completed'
}

const parseChannels = (channels: string): string[] => {
    if (!channels) return []
    return channels.split(',').map(c => c.trim())
}