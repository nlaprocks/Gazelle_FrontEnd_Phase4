export interface Event {
    id: string
    title: string
    description: string
    startDate: Date | undefined
    endDate: Date | undefined
    color: string
    productId: string
    status: string
    channels: string[]
    retailerId: string
    brandId: string
    products: string[]
    financialData: FinancialData,
}

export interface Product {
    id: string
    name: string
    brandId: string
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

export interface FinancialData {
    basePrice: number
    promoPrice: number
    discount: number
    units: number
    tprDist: number
    doDist: number
    foDist: number
    fdDist: number
    listPrice: number
    edlpPerUnitRate: number
    promoPerUnitRate: number
    vcm: number
    fixedFee: number
    increamentalUnits: number
}

export interface FinancialResults {
    grossRevenue: number
    totalSpend: number
    increamentalRevenue: number
    increamentalProfit: number
    percentageROI: number
    retailerPromoMargin: number
    retailerEverydayMargin: number
    retailerProfit: number
}

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
    productId: string
}