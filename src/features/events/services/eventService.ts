// src/features/events/services/eventService.ts
import { fetchAPI } from "@/services/api";
import { socketService } from "@/services/socket";
import type { CreateEventFormData, Event } from "../types";

export const eventService = {
  async getAll(token: string): Promise<Event[]> {
    return fetchAPI("/events", "GET", token);
  },

  async getById(id: string, token: string): Promise<Event> {
    return fetchAPI(`/events/${id}`, "GET", token);
  },

  join: async (eventId: string, token: string): Promise<void> => {
    const response = await fetchAPI(`/events/${eventId}/join`, "POST", token);
    
    // Émettre l'événement via Socket.IO pour notifier les autres utilisateurs
    if (socketService.isConnected) {
      socketService.emit('joinEvent', { eventId });
    }
    
    return response;
  },

  leave: async (eventId: string, token: string): Promise<void> => {
    const response = await fetchAPI(`/events/${eventId}/exit`, "DELETE", token);
    
    // Émettre l'événement via Socket.IO
    if (socketService.isConnected) {
      socketService.emit('exitEvent', { eventId });
    }
    
    return response;
  },

  getJoined: (token: string): Promise<Event[]> =>
    fetchAPI("/events/me", "GET", token),

  getOrganized: (token: string): Promise<Event[]> =>
    fetchAPI("/events/organized", "GET", token),

  getFollowers: (token: string): Promise<Event[]> =>
    fetchAPI("/events/followers", "GET", token),

  create: async (data: CreateEventFormData, token: string): Promise<Event> => {
    const eventData = {
      name: data.name,
      description: data.description,
      sportId: data.sportId,
      maxParticipants: Number(data.maxParticipants),
      location: data.location,
      isPrivate: data.isPrivate,
      startAt: data.startAt?.toISOString(),
      image: data.image || undefined,
    };
    
    const newEvent = await fetchAPI("/events", "POST", token, eventData);
    
    // Émettre l'événement via Socket.IO pour notifier tous les utilisateurs
    if (socketService.isConnected) {
      socketService.emit('eventCreated', newEvent);
    }
    
    return newEvent;
  },
};