import { Event } from '../types/event'
import { getResult } from './financialCalculations'

export const calculateWidgetValues = (events: Event[], targetBudget: number, year: number) => {
    // Initialize accumulators
    let totalRevenue = 0
    let totalSpend = 0
    let totalIncrementalRevenue = 0
    // let totalBudgetUsed = 0
    let totalROI = 0
    let validROICount = 0
    let totalVolume = 0
    let totalIncrementalVolume = 0
    let totalCogs = 0;

    const currentYearEvents = events.filter(event => new Date(event.start_date ?? new Date()).getFullYear() === year || new Date(event.end_date ?? new Date()).getFullYear() === year);

    // Process each event
    currentYearEvents.forEach(event => {
        // Add to budget used
        // totalBudgetUsed += Number(event.budget) || 0

        // Process each planned product in the event
        event.planned.forEach(product => {
            const { financialResults, promotionalResults } = getResult(product.financialData)

            // Find relevant results
            const grossRevenue = financialResults.find(r => r.name === "Gross Revenue")?.value
            const totalSpendResult = financialResults.find(r => r.name === "Total Spend")?.value
            const incrementalRevenue = financialResults.find(r => r.name === "Incremental Revenue")?.value
            const salesROI = financialResults.find(r => r.name === "Sales ROI")?.value

            // Find incremental lift from promotional results
            const eventTotalVolume = promotionalResults.find(r => r.promotion === "Event Total")?.units || 0
            const eventIncrementalVolume = promotionalResults.find(r => r.promotion === "Event Incremental")?.units || 0


            // Add to totals
            totalCogs += Number((product.financialData.basePrice / 2) * eventTotalVolume)
            totalRevenue += Number(grossRevenue?.replace(/[^0-9.-]+/g, "")) || 0
            totalSpend += Number(totalSpendResult?.replace(/[^0-9.-]+/g, "")) || 0
            totalIncrementalRevenue += Number(incrementalRevenue?.replace(/[^0-9.-]+/g, "")) || 0

            // Handle ROI average
            const roiValue = Number(salesROI?.replace(/[^0-9.-]+/g, ""))
            if (!isNaN(roiValue)) {
                totalROI += roiValue
                validROICount++
            }

            // Handle Incremental Volume average
            if (!isNaN(eventIncrementalVolume)) {
                totalIncrementalVolume += eventIncrementalVolume
            }

            // Handle Total Volume average
            if (!isNaN(eventTotalVolume)) {
                totalVolume += eventTotalVolume
            }
        })
    })

    // Calculate final values
    const averageROI = validROICount > 0 ? totalROI / validROICount : 0
    const budgetRemaining = targetBudget - totalSpend
    const totalContribution = Number((totalSpend + totalCogs) - totalRevenue);
    return {
        totalVolume: totalVolume.toFixed(2),
        totalRevenue: Number(totalRevenue.toFixed(2)).toLocaleString(),
        totalContribution: Number(totalContribution.toFixed(2)).toLocaleString(), // As per requirement
        totalSpend,
        incrementalVolume: totalIncrementalVolume.toFixed(2),
        incrementalRevenue: totalIncrementalRevenue.toFixed(2),
        planROI: averageROI,
        budgetRemaining
    }
} 