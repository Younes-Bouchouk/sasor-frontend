import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthProvider";
import { joinEventService } from "../services/eventService";
export function useJoinEvent() {
  const { token } = useAuth();
  return useMutation({
    mutationFn: (eventId: number) => joinEventService(eventId, token),
    onSuccess: (data) => {
      console.log("Succès !", data);
    },
    onError: (error) => {
      console.error("Erreur lors de la requête :", error);
    },