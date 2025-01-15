import { FinancialData } from './financial'

export type EventStatus = 'draft' | 'active' | 'completed'

export interface EventProduct {
    productId: string
    productName: string
    financialData: FinancialData
}

export interface BaseEvent {
    id: string // Added id to BaseEvent
    title: string
    description: string
    start_date?: Date
    end_date?: Date
    color: string
    status: EventStatus
    channels: string[]
    project_id: string
    model_id: string
    event_tpo_id: string
    retailer_id: string
    brand_id: string
    budget: number
    // products: EventProduct[]
    planned: EventProduct[]
    actual: EventProduct[]
}

export interface Event extends BaseEvent {

}

export type NewEvent = Omit<Event, 'id'>