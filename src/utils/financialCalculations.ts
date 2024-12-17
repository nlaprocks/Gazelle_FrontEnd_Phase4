export const calculateFinancialResults = (values: {
    units: number
    promoPrice: number
    basePrice: number
    edlpPerUnitRate: number
    promoPerUnitRate: number
    fixedFee: number
    listPrice: number
    vcm: number
    increamentalUnits: number
    promoPriceElasticity?: number
}): { name: string; value: string }[] => {
    const {
        units,
        promoPrice,
        basePrice,
        edlpPerUnitRate,
        promoPerUnitRate,
        fixedFee,
        listPrice,
        vcm,
        increamentalUnits,
    } = values

    const grossRevenue = units * promoPrice
    const variableSpend = (edlpPerUnitRate + promoPerUnitRate) * units
    const totalSpend = fixedFee ? fixedFee + variableSpend : variableSpend
    const increamentalRevenue = increamentalUnits * promoPrice
    const increamentalProfit = increamentalUnits * vcm - totalSpend
    const percentageROI = (increamentalProfit / totalSpend) * 100
    const retailerEverydayMargin = ((basePrice - listPrice) / basePrice) * 100
    const netCost = listPrice - edlpPerUnitRate - promoPerUnitRate - fixedFee / units
    const retailerPromoMargin = ((promoPrice - netCost) / promoPrice) * 100
    const retailerProfit = units * promoPrice - netCost * units

    return [
        {
            name: "Gross Revenue",
            value: formatMoney(grossRevenue, '$'),
        },
        {
            name: "Total Spend",
            value: formatMoney(totalSpend, '$'),
        },
        {
            name: "Incremental Revenue",
            value: formatMoney(increamentalRevenue, '$'),
        },
        {
            name: "Incremental Profit",
            value: formatMoney(increamentalProfit, '$'),
        },
        {
            name: "Sales ROI",
            value: formatValue(percentageROI, '%'),
        },
        {
            name: "Retail Promo Margin %",
            value: formatValue(retailerPromoMargin, '%'),
        },
        {
            name: "Retail Everyday Margin %",
            value: formatValue(retailerEverydayMargin, '%'),
        },
        {
            name: "Retail Profit",
            value: formatMoney(retailerProfit, '$'),
        },
    ]
}

interface PromotionalResult {
    promotion: string
    acv: number
    lift: number
    units: number
    dollars: number
}

export const calculatePromotionalResults = (values: {
    basePrice: number
    promoPrice: number
    tprDist: number
    foDist: number
    doDist: number
    fdDist: number
    totalUnits: number
    promoPriceElasticity?: number
    featureEffect?: number
    displayEffect?: number
    featureAndDisplayEffect?: number
}): PromotionalResult[] => {
    const {
        basePrice,
        promoPrice,
        tprDist,
        foDist,
        doDist,
        fdDist,
        totalUnits,
        promoPriceElasticity = -2.3351810184210127, // Default elasticity if not provided
        featureEffect = 0,
        displayEffect = 0,
        featureAndDisplayEffect = 0
    } = values

    // Calculate discount percentage
    const discount = ((basePrice - promoPrice) / basePrice) * 100

    // Calculate lifts
    const tprLift = tprDist === 0 ? 0 :
        ((1 + -discount / 100) ** promoPriceElasticity - 1) * tprDist

    const foLift = foDist === 0 || featureEffect === 0 ? 0 :
        ((1 + -discount / 100) ** (promoPriceElasticity * Math.exp((featureEffect * foDist) / 100)) - 1) * 100 -
        ((1 + -discount / 100) ** promoPriceElasticity - 1) * tprDist

    const doLift = doDist === 0 || displayEffect === 0 ? 0 :
        ((1 + -discount / 100) ** (promoPriceElasticity * Math.exp((displayEffect * doDist) / 100)) - 1) * 100 -
        ((1 + -discount / 100) ** promoPriceElasticity - 1) * tprDist

    const fdLift = fdDist === 0 || featureAndDisplayEffect === 0 ? 0 :
        ((1 + -discount / 100) ** (promoPriceElasticity * Math.exp((featureAndDisplayEffect * fdDist) / 100)) - 1) * 100 -
        ((1 + -discount / 100) ** promoPriceElasticity - 1) * tprDist

    // Calculate units
    const tprUnits = (tprLift / 100) * totalUnits
    const foUnits = (foLift / 100) * totalUnits
    const doUnits = (doLift / 100) * totalUnits
    const fdUnits = (fdLift / 100) * totalUnits

    // Calculate dollars
    const tprDollars = tprUnits * promoPrice
    const foDollars = foUnits * promoPrice
    const doDollars = doUnits * promoPrice
    const fdDollars = fdUnits * promoPrice

    // Calculate totals
    const totalLift = tprLift + foLift + doLift + fdLift
    const totalUnitsIncremental = tprUnits + foUnits + doUnits + fdUnits
    const totalDollarsIncremental = tprDollars + foDollars + doDollars + fdDollars
    const totalUnitsEvent = totalUnitsIncremental + totalUnits
    const totalDollarsEvent = totalDollarsIncremental + (totalUnits * promoPrice)

    return [
        {
            promotion: 'TPR',
            acv: tprDist,
            lift: tprLift,
            units: tprUnits,
            dollars: tprDollars
        },
        {
            promotion: 'Feature Only',
            acv: foDist,
            lift: foLift,
            units: foUnits,
            dollars: foDollars
        },
        {
            promotion: 'Display Only',
            acv: doDist,
            lift: doLift,
            units: doUnits,
            dollars: doDollars
        },
        {
            promotion: 'Feature and Display',
            acv: fdDist,
            lift: fdLift,
            units: fdUnits,
            dollars: fdDollars
        },
        {
            promotion: 'Event Incremental',
            acv: 0,
            lift: totalLift,
            units: totalUnitsIncremental,
            dollars: totalDollarsIncremental
        },
        {
            promotion: 'Event Total',
            acv: 0,
            // lift: totalLift + 100,
            lift: 0,
            units: totalUnitsEvent,
            dollars: totalDollarsEvent
        }
    ]
}

export const formatValue = (value: number, suffix: string): string => {
    return !isNaN(value) && value !== 0 ? `${value.toFixed(2)}${suffix}` : "-"
}

export const formatMoney = (value: number, prefix: string): string => {
    return !isNaN(value) && value !== 0 ? `${prefix}${value.toFixed(2)}` : "-"
}
