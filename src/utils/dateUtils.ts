import {
    startOfYear,
    endOfYear,
    eachWeekOfInterval,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    getMonth,
    getWeek,
} from 'date-fns'

export const getYearCalendarData = (year: number) => {
    // Get the first Monday of the year or the last Monday of previous year
    const yearStart = startOfYear(new Date(year, 0, 1))
    const firstMonday = startOfWeek(yearStart, { weekStartsOn: 1 })

    // If the first Monday is in the previous year, use it as the start
    const calendarStart = firstMonday

    // Get the last day of the year and extend to the last Sunday if needed
    const yearEnd = endOfYear(yearStart)
    const lastSunday = endOfWeek(yearEnd, { weekStartsOn: 1 })

    const weeks = eachWeekOfInterval(
        { start: calendarStart, end: lastSunday },
        { weekStartsOn: 1 }
    )

    return weeks.map((week, index) => ({
        weekNumber: getWeek(week, { weekStartsOn: 1, firstWeekContainsDate: 4 }),
        startDate: startOfWeek(week, { weekStartsOn: 1 }),
        endDate: endOfWeek(week, { weekStartsOn: 1 }),
        month: getMonth(week),
        days: eachDayOfInterval({
            start: startOfWeek(week, { weekStartsOn: 1 }),
            end: endOfWeek(week, { weekStartsOn: 1 }),
        }),
    }))
}

export const formatWeekDisplay = (date: Date) => {
    return `W${getWeek(date, { weekStartsOn: 1, firstWeekContainsDate: 4 })}`
}
