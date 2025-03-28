import React from 'react'
import { format, getMonth, isSameMonth, startOfWeek, endOfWeek, eachWeekOfInterval, startOfYear, endOfYear } from 'date-fns'

interface WeekHeaderProps {
    weeks: { weekNumber: number; startDate: Date }[]
}

const WeekHeader: React.FC<WeekHeaderProps> = ({ weeks }) => {
    // Generate months data
    const months = weeks.reduce((acc: { month: string; colSpan: number; startDate: Date }[], week, index) => {
        const monthName = format(week.startDate, 'MMM yyyy')

        if (index === 0 || !isSameMonth(weeks[index - 1].startDate, week.startDate)) {
            acc.push({ month: monthName, colSpan: 1, startDate: week.startDate })
        } else {
            acc[acc.length - 1].colSpan++
        }

        return acc
    }, [])

    return (
        <thead>
            <tr>
                <th className="border-b border-r border-sky-700 p-2 bg-secondary text-white left-0 z-20 font-semibold">
                    Products
                </th>
                {months.map((month) => (
                    <th
                        key={`month-${month.month}-${format(month.startDate, 'yyyy-MM')}`}
                        colSpan={month.colSpan}
                        className="border-b border-r border-sky-700 p-2 bg-secondary text-white text-center font-normal"
                    >
                        {month.month}
                    </th>
                ))}
            </tr>
            <tr>
                <th className="border-b border-r border-gray-200 p-2 bg-gray-50 left-0 z-20">
                    &nbsp;
                </th>
                {weeks.map((week) => (
                    <th
                        key={`week-${week.weekNumber}-${format(week.startDate, 'yyyy-MM-dd')}`}
                        className="border-b border-r border-gray-200 p-1 min-w-[40px] max-w-[40px] text-sm bg-gray-50 font-normal text-center"
                    >
                        {format(week.startDate, 'dd')}
                    </th>
                ))}
            </tr>
        </thead>
    )
}

export default WeekHeader
