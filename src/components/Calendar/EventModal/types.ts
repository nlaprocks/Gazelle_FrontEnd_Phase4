import { ReactNode } from 'react'

export interface ProductAccordionItem {
    key: string
    label: string
    children: ReactNode
}