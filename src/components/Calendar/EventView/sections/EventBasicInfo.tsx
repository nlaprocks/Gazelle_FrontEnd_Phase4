import React from 'react'
import { Event } from '../../../../types/event'
import { format } from 'date-fns'
import { Calendar, Tag, FileText, Palette } from 'lucide-react'
import { InfoSection } from '../ui/InfoSection'
import { InfoRow } from '../ui/InfoRow'

interface EventBasicInfoProps {
    event: Event
}

export const EventBasicInfo: React.FC<EventBasicInfoProps> = ({ event }) => {
    return (
        <InfoSection title="Basic Information">
            <InfoRow icon={<FileText size={16} />} label="Title" value={event.title} />
            {event.description && (
                <InfoRow
                    icon={<FileText size={16} />}
                    label="Description"
                    value={event.description}
                />
            )}
            <div className='grid grid-cols-[30%_40%_30%] gap-4 mt-3 pt-3 border-t border-gray-300'>
                <InfoRow
                    icon={<Tag size={16} />}
                    label="Status"
                    value={<span className="capitalize">{event.status}</span>}
                />
                <InfoRow
                    icon={<Calendar size={16} />}
                    label="Date Range"
                    value={`${format(event.start_date || new Date(), 'MMM d, yyyy')} - ${format(event.end_date || new Date(), 'MMM d, yyyy')}`}
                />
                <InfoRow
                    icon={<Palette size={16} />}
                    label="Color"
                    value={
                        <div className="flex items-center gap-2 bg-white p-2 rounded">
                            <div
                                className="w-4 h-4 rounded-full border-gray-300"
                                style={{ backgroundColor: event.color }}
                            />
                            {event.color}
                        </div>
                    }
                />

            </div>
        </InfoSection>
    )
}