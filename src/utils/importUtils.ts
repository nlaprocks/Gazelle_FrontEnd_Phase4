import { Event, EventProduct } from '../types/event'
import Papa from 'papaparse'

interface CsvRow {
    eventId?: string // Optional - to group multiple products under same event
    title: string
    description: string
    start_date: string
    end_date: string
    status: string
    color: string
    channels: string
    retailerId: string
    brandId: string
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

export const parseEventData = async (file: File): Promise<ParseResult> => {
    const events = new Map<string, Event>()
    const errors: string[] = []

    return new Promise((resolve) => {
        Papa.parse<CsvRow>(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                results.data.forEach((row: CsvRow, index) => {
                    try {
                        const eventId = row.eventId || crypto.randomUUID()
                        const productData = createProductData(row)

                        if (events.has(eventId)) {
                            // Add product to existing event
                            const event = events.get(eventId)!
                            event.planned.push(productData)
                        } else {
                            // Create new event with product
                            const event = createEvent(row, eventId, productData)
                            events.set(eventId, event)
                        }
                    } catch (error) {
                        errors.push(`Row ${index + 2}: ${(error as Error).message}`)
                    }
                })
                resolve({ events: Array.from(events.values()), errors })
            },
            error: (error) => {
                errors.push(`Failed to parse file: ${error.message}`)
                resolve({ events: [], errors })
            }
        })
    })
}

const createProductData = (row: CsvRow): EventProduct => {
    return {
        productId: row.productId,
        financialData: {
            basePrice: Number(row.basePrice) || 0,
            promoPrice: Number(row.promoPrice) || 0,
            discount: calculateDiscount(Number(row.basePrice), Number(row.promoPrice)),
            units: Number(row.units) || 0,
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
        }
    }
}

const calculateDiscount = (basePrice: number, promoPrice: number): number => {
    if (!basePrice || !promoPrice) return 0
    return ((basePrice - promoPrice) / basePrice) * 100
}

const createEvent = (row: CsvRow, eventId: string, productData: EventProduct): Event => {
    // Validate required fields
    const requiredFields: (keyof CsvRow)[] = ['title', 'start_date', 'end_date', 'status', 'retailerId', 'brandId']
    requiredFields.forEach(field => {
        if (!row[field]) {
            throw new Error(`Missing required field: ${field}`)
        }
    })

    return {
        id: eventId,
        title: row.title,
        description: row.description || '',
        start_date: parseDate(row.start_date),
        end_date: parseDate(row.end_date),
        color: row.color || '#4F46E5',
        status: validateStatus(row.status),
        channels: parseChannels(row.channels),
        retailerId: row.retailerId,
        brandId: row.brandId,
        budget: Number(row.budget) || 0,
        planned: [productData],
        actual: []
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