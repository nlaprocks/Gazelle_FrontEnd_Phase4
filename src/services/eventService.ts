import { Event } from '../types/event';
import { SAMPLE_EVENTS } from '../utils/sampleData'

export const eventService = {
  async getEvents(): Promise<Event[]> {
    // TODO: Replace with actual API call
    return SAMPLE_EVENTS;
  },

  async createEvent(event: Omit<Event, 'id'>): Promise<Event> {
    // TODO: Replace with actual API call
    return {
      ...event,
      id: crypto.randomUUID()
    };
  },

  async updateEvent(event: Event): Promise<Event> {
    // TODO: Replace with actual API call
    return event;
  },

  async deleteEvent(id: string): Promise<void> {
    // TODO: Replace with actual API call
  }
};