import React, { ReactNode } from 'react'

interface InfoSectionProps {
    title: string
    children: ReactNode
}

export const InfoSection: React.FC<InfoSectionProps> = ({ title, children }) => {
    return (
        <div className="bg-gray-100 p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-3">{title}</h3>
            <div className="space-y-3">
                {children}
            </div>
        </div>
    )
}