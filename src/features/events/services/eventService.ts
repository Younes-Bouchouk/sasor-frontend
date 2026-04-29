import { fetchAPI } from "@/services/api";
import type { CreateEventFormData, Event } from "../types";

export const eventService = {
  async getAll(token: string): Promise<Event[]> {
    return fetchAPI("/events", "GET", token);
  },

  async getById(id: string, token: string): Promise<Event> {
    return fetchAPI(`/events/${id}`, "GET", token);
  },

  join: (eventId: string, token: string): Promise<void> =>
    fetchAPI(`/events/${eventId}/join`, "POST", token),

  leave: (eventId: string, token: string): Promise<void> =>
    fetchAPI(`/events/${eventId}/exit`, "DELETE", token),

  getJoined: (token: string): Promise<Event[]> =>
    fetchAPI("/events/me", "GET", token),

  getOrganized: (token: string): Promise<Event[]> =>
    fetchAPI("/events/organized", "GET", token),

  getFollowers: (token: string): Promise<Event[]> =>
    fetchAPI("/events/followers", "GET", token),

  create: (data: CreateEventFormData, token: string): Promise<Event> =>
    fetchAPI("/events", "POST", token, {
      name: data.name,
      description: data.description,
      sportId: data.sportId,
      maxParticipants: Number(data.maxParticipants),
      location: data.location,
      isPrivate: data.isPrivate,
      startAt: data.startAt?.toISOString(),
      image: data.image || undefined,
    }),
};
