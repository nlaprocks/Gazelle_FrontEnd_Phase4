export type { Event, EventProduct, EventStatus } from './event'
export type { FinancialData, FinancialResults } from './financial'
export type { Product, Brand, Retailer, Channel } from './product'

export interface WeekCellProps {
    date: Date
    events: Event[]
    onAddEvent: (date: Date, productId: string) => void
    onEditEvent: (event: Event) => void
    productId: string
}

export interface EventModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (event: Omit<Event, 'id'>) => void
    initialEvent?: Event
    startDate?: Date
    productId?: string
}