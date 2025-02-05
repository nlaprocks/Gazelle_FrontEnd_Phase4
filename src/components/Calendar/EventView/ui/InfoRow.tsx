import React, { ReactNode } from 'react'

interface InfoRowProps {
    icon: ReactNode
    label: string
    value: ReactNode
}

export const InfoRow: React.FC<InfoRowProps> = ({ icon, label, value }) => {
    return (
        <div className="flex items-start gap-2">
            <div className="text-gray-500 mt-1">{icon}</div>
            <div>
                <div className="text-sm font-medium text-black">{label}</div>
                <div className="text-gray-900">{value}</div>
            </div>
        </div>
    )
}