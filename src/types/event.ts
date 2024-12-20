import { FinancialData } from './financial'

export type EventStatus = 'draft' | 'active' | 'completed'

export interface EventProduct {
    productId: string
    financialData: FinancialData
}

export interface BaseEvent {
    id: string // Added id to BaseEvent
    title: string
    description: string
    startDate?: Date
    endDate?: Date
    color: string
    status: EventStatus
    channels: string[]
    retailerId: string
    brandId: string
    budget: number
    products: EventProduct[]
}

export interface Event extends BaseEvent { }

export type NewEvent = Omit<Event, 'id'>