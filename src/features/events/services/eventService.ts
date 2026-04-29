import { fetchAPI } from "@/services/api";
import type { Event } from "../types";

export const eventService = {
  async getAll(token: string): Promise<Event[]> {
    return fetchAPI("/events", "GET", token);
  },

  async getById(id: string, token: string): Promise<Event> {
    return fetchAPI(`/events/${id}`, "GET", token);
  },
};
