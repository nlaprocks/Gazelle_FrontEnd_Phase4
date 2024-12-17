import React from 'react'
import { format, isSameMonth } from 'date-fns'

interface WeekHeaderProps {
    weeks: { weekNumber: number; startDate: Date }[]
}

const WeekHeader: React.FC<WeekHeaderProps> = ({ weeks }) => {
    const months = weeks.reduce((acc: { month: string; colSpan: number }[], week, index) => {
        const monthName = format(week.startDate, 'MMM yyyy')

        if (index === 0 || !isSameMonth(weeks[index - 1].startDate, week.startDate)) {
            acc.push({ month: monthName, colSpan: 1 })
        } else {
            acc[acc.length - 1].colSpan++
        }

        return acc
    }, [])

    return (
        <thead>
            <tr>
                <th className="border-b border-r border-gray-200 p-2 bg-gray-50 sticky left-0 z-20">
                    Products
                </th>
                {months.map((month, index) => (
                    <th
                        key={`${month.month}-${index}`}
                        colSpan={month.colSpan}
                        className="border-b border-r border-gray-200 p-2 bg-gray-100 text-center"
                    >
                        {month.month}
                    </th>
                ))}
            </tr>
            <tr>
                <th className="border-b border-r border-gray-200 p-2 bg-gray-50 sticky left-0 z-20">
                    &nbsp;
                </th>
                {weeks.map((week) => (
                    <th
                        key={week.weekNumber}
                        className="border-b border-r border-gray-200 p-1 min-w-[40px] max-w-[40px] text-sm bg-gray-50"
                    >
                        W{week.weekNumber}
                    </th>
                ))}
            </tr>
        </thead>
    )
}

export default WeekHeader