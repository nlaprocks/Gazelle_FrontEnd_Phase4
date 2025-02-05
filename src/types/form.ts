import { BaseEvent } from './event'

export interface EventFormData extends Omit<BaseEvent, 'startDate' | 'endDate'> {
    startDate?: Date
    endDate?: Date
}

export interface EventFormProps {
    formData: EventFormData
    setFormData: (data: EventFormData) => void
}