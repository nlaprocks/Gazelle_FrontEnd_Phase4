export interface Product {
    id: string
    name: string
    brand_id: string
    retailer_id?: string
    basePrice: number
    totalUnits: number
    promoPriceElasticity?: number
}

export interface Brand {
    id: string
    name: string
    retailer_id: string
}

export interface Retailer {
    id: string
    name: string
}

export interface Channel {
    id: string
    name: string
}