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
    name: string
    value: string
}