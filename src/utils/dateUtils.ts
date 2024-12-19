import {
    startOfYear,
    endOfYear,
    eachWeekOfInterval,
    startOfWeek,
    endOfWeek,
    format,
    eachDayOfInterval,
    getMonth,
    getWeek,
    addWeeks,
    subWeeks,
} from 'date-fns'

export const getYearCalendarData = (year: number) => {
    const yearStart = startOfYear(new Date(year, 0, 1))
    const firstMonday = startOfWeek(yearStart, { weekStartsOn: 1 })
    const calendarStart = firstMonday
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

export const ensureDate = (date: Date | undefined): Date => {
    return date ? new Date(date) : new Date()
}

export const addWeeksToDate = (date: Date | undefined, weeks: number): Date => {
    const baseDate = ensureDate(date)
    return addWeeks(baseDate, weeks)
}