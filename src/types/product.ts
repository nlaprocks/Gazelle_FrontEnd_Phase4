export interface Product {
    id: string
    name: string
    brandId: string
    basePrice: number
    totalUnits: number
    promoPriceElasticity?: number
}

export interface Brand {
    id: string
    name: string
    retailerId: string
}

export interface Retailer {
    id: string
    name: string
}

export interface Channel {
    id: string
    name: string
}