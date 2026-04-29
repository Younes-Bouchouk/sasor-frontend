import { fetchAPI } from "./api";
export async function joinEventService(eventId: number, token: string) {
  try {
    const response = await fetchAPI(`/events/${eventId}/join`, "POST", token, {});
    return response;
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    throw new Error("Erreur lors de l'inscription à l'événement");
  }
}