import {
    startOfYear,
    endOfYear,
    eachWeekOfInterval,
    startOfWeek,
    endOfWeek,
    format,
    eachDayOfInterval,
    getMonth,
} from 'date-fns'

export const getYearCalendarData = (year: number) => {
    const yearStart = startOfYear(new Date(year, 0, 1))
    const yearEnd = endOfYear(yearStart)

    const weeks = eachWeekOfInterval(
        { start: yearStart, end: yearEnd },
        { weekStartsOn: 0 }
    )

    return weeks.map(week => ({
        weekStart: startOfWeek(week),
        weekEnd: endOfWeek(week),
        month: getMonth(week),
        days: eachDayOfInterval({
            start: startOfWeek(week),
            end: endOfWeek(week),
        }),
    }))
}

export const formatWeekDisplay = (date: Date) => {
    return `W${format(date, 'w')}`
}