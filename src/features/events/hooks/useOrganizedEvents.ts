// src/features/events/hooks/useOrganizedEvents.ts
import { useAuth } from "@/features/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { eventService } from "../services/eventService";
import { socketService } from "@/services/socket";
import { useEffect } from "react";

export function useOrganizedEvents() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["events", "organized"],
    queryFn: () => eventService.getOrganized(token!),
    enabled: !!token,
    staleTime: 30000,
  });

  // Mises à jour temps réel pour les événements organisés
  useEffect(() => {
    const handleUpdate = () => {
      console.log("🔄 Mise à jour des événements organisés");
      queryClient.invalidateQueries({ queryKey: ["events", "organized"] });
    };

    socketService.on('eventCreated', handleUpdate);
    socketService.on('eventDeleted', handleUpdate);
    socketService.on('eventUpdated', handleUpdate);

    return () => {
      socketService.off('eventCreated', handleUpdate);
      socketService.off('eventDeleted', handleUpdate);
      socketService.off('eventUpdated', handleUpdate);
    };
  }, [queryClient]);

  return query;
}