import { Channel, Retailer, Brand, Product } from '../types';

export const MOCK_CHANNELS: Channel[] = [
  { id: 'c1', name: 'Online' },
  { id: 'c2', name: 'Retail' },
  { id: 'c3', name: 'Wholesale' },
];

export const MOCK_RETAILERS: Retailer[] = [
  { id: 'r1', name: 'Walmart' },
  { id: 'r2', name: 'Target' },
  { id: 'r3', name: 'Costco' },
];

export const MOCK_BRANDS: Brand[] = [
  { id: 'b1', name: 'Brand A', retailerId: 'r1' },
  { id: 'b2', name: 'Brand B', retailerId: 'r1' },
  { id: 'b3', name: 'Brand C', retailerId: 'r2' },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Product 1', brandId: 'b1' },
  { id: 'p2', name: 'Product 2', brandId: 'b1' },
  { id: 'p3', name: 'Product 3', brandId: 'b2' },
  { id: 'p4', name: 'Product 4', brandId: 'b3' },
];