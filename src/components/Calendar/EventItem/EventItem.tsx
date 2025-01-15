import React, { useState, useRef } from 'react'
import { Event } from '../../../types/event'
import { EventHoverCard } from './EventHoverCard'
import { EventViewModal } from '../EventView/EventViewModal'
// import { ContextMenu } from './ContextMenu'
import { useDrag } from '../../../hooks/useDrag'

interface EventItemProps {
    event: Event
    onEdit: () => void
    // onDelete: (id: string) => void
    onCopy: (event: Event) => void
    onDragEnd: (event: Event, weeksDelta: number) => void
}

export const EventItem: React.FC<EventItemProps> = ({
    event,
    onEdit,
    // onDelete,
    onCopy,
    onDragEnd,
}) => {
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)
    // const [contextMenuPosition, setContextMenuPosition] = useState<{ x: number; y: number } | null>(null)
    const elementRef = useRef<HTMLDivElement>(null)

    const handleDragEnd = (weeksDelta: number) => {
        onDragEnd(event, weeksDelta)
    }

    const { isDragging, weeksDelta, dragProps } = useDrag({
        onDragEnd: handleDragEnd,
        elementRef,
        backgroundColor: event.color || '#4F46E5'
    })

    const handleDoubleClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsViewModalOpen(true)
    }

    // const handleContextMenu = (e: React.MouseEvent) => {
    //     e.preventDefault()
    //     e.stopPropagation()
    //     setContextMenuPosition({ x: e.clientX, y: e.clientY })
    // }

    // const handleCloseContextMenu = () => {
    //     setContextMenuPosition(null)
    // }

    return (
        <>
            <div
                ref={elementRef}
                className={`h-8 rounded-md relative group z-20 pointer-events-auto w-full`}
                onDoubleClick={handleDoubleClick}
                {...dragProps}
            >
                <div className="absolute inset-0 flex items-center justify-center px-2">
                    <span className="text-white text-xs truncate whitespace-nowrap font-medium">
                        {event.title}
                        {isDragging && weeksDelta !== 0 && ` (${weeksDelta > 0 ? '+' : ''}${weeksDelta} weeks)`}
                    </span>
                </div>

                {!isDragging && <EventHoverCard event={event} />}
            </div>

            <EventViewModal
                event={event}
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                onEdit={onEdit}
            // onDelete={() => onDelete(event.id)}
            />

            {/* {contextMenuPosition && (
                <ContextMenu
                    position={contextMenuPosition}
                    onClose={handleCloseContextMenu}
                    onEdit={onEdit}
                    // onDelete={() => onDelete(event.id)}
                    onCopy={() => onCopy(event)}
                />
            )} */}
        </>
    )
}

export default EventItem