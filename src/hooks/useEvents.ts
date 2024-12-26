import { useState, useEffect } from 'react'
import { Event } from '../types/event'
import { eventService } from '../services/eventService'

export const useEvents = () => {
    const [events, setEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchEvents = async () => {
        try {
            setLoading(true)
            const data = await eventService.getEvents()
            setEvents(data)
        } catch (err) {
            setError('Failed to fetch events')
        } finally {
            setLoading(false)
        }
    }

    const createEvent = async (event: Omit<Event, 'id'>) => {
        try {
            const newEvent = await eventService.createEvent(event)
            setEvents(prev => [...prev, newEvent])
            return newEvent
        } catch (err) {
            setError('Failed to create event')
            throw err
        }
    }

    const createImportedEvent = async (event: Omit<Event, 'id'>) => {
        try {
            const newEvent = await eventService.createImportedEvent(event)
            setEvents(prev => [...prev, newEvent])
            return newEvent
        } catch (err) {
            setError('Failed to create event')
            throw err
        }
    }

    const updateEvent = async (event: Event) => {
        try {
            const updatedEvent = await eventService.updateEvent(event)
            setEvents(prev => prev.map(e => e.id === event.id ? updatedEvent : e))
            return updatedEvent
        } catch (err) {
            setError('Failed to update event')
            throw err
        }
    }

    const deleteEvent = async (id: string) => {
        try {
            await eventService.deleteEvent(id)
            setEvents(prev => prev.filter(e => e.id !== id))
            return true
        } catch (err) {
            setError('Failed to delete event')
            throw err
        }
    }

    useEffect(() => {
        fetchEvents()
    }, [])

    return {
        events,
        loading,
        error,
        createEvent,
        updateEvent,
        deleteEvent,
        createImportedEvent,
        refreshEvents: fetchEvents,
    }
}