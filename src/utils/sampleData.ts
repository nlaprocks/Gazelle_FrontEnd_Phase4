import { Event } from '../types';

export const SAMPLE_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Product 1 Spring Campaign',
    description: 'Spring promotional campaign for Product 1',
    startDate: new Date(2024, 0, 8), // Week 2
    endDate: new Date(2024, 0, 29), // Week 5
    color: '#4F46E5',
    productId: 'p1'
  },
  {
    id: '2',
    title: 'Product 2 Launch Event',
    description: 'New product launch campaign',
    startDate: new Date(2024, 0, 15), // Week 3
    endDate: new Date(2024, 0, 22), // Week 4
    color: '#10B981',
    productId: 'p2'
  }
];