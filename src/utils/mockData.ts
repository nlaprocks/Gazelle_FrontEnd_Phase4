import { Channel, Retailer, Brand, Product } from '../types/product'

export const MOCK_CHANNELS: Channel[] = [
    { id: 'c1', name: 'Online' },
    { id: 'c2', name: 'Retail' },
    { id: 'c3', name: 'Wholesale' },
]

export const MOCK_RETAILERS: Retailer[] = [
    { id: 'r1', name: 'Walmart' },
    { id: 'r2', name: 'Target' },
    { id: 'r3', name: 'Costco' },
]

export const MOCK_BRANDS: Brand[] = [
    { id: 'b1', name: 'Brand A', retailerId: 'r1' },
    { id: 'b2', name: 'Brand B', retailerId: 'r1' },
    { id: 'b3', name: 'Brand C', retailerId: 'r2' },
]

export const MOCK_PRODUCTS: Product[] = [
    {
        id: 'p1', name: 'Completely Fresh Foods Jack Daniels Honey', brandId: 'b1', basePrice: 8.99416482300885, totalUnits: 490.13, promoPriceElasticity:
            -2.417659476956699
    },
    { id: 'p2', name: 'Product 2', brandId: 'b1', basePrice: 19.99, totalUnits: 2000 },
    { id: 'p3', name: 'Product 3', brandId: 'b2', basePrice: 39.99, totalUnits: 1500 },
    { id: 'p4', name: 'Product 4', brandId: 'b3', basePrice: 49.99, totalUnits: 800 },
    { id: 'p5', name: 'Product 5', brandId: 'b3', basePrice: 49.99, totalUnits: 800 },
    { id: 'p6', name: 'Product 6', brandId: 'b3', basePrice: 49.99, totalUnits: 800 },
    { id: 'p7', name: 'Product 7', brandId: 'b3', basePrice: 49.99, totalUnits: 800 },
    { id: 'p8', name: 'Product 8', brandId: 'b3', basePrice: 49.99, totalUnits: 800 },
    { id: 'p9', name: 'Product 9', brandId: 'b3', basePrice: 49.99, totalUnits: 800 },
    { id: 'p10', name: 'Product 10', brandId: 'b3', basePrice: 49.99, totalUnits: 800 },
]