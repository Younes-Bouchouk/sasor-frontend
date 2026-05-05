// src/features/events/hooks/useJoinedEvents.ts
import { useAuth } from "@/features/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { eventService } from "../services/eventService";
import { socketService } from "@/services/socket";
import { useEffect } from "react";

export function useJoinedEvents() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["events", "joined"],
    queryFn: () => eventService.getJoined(token!),
    enabled: !!token,
    staleTime: 30000,
  });

  // Mises à jour temps réel pour les événements rejoints
  useEffect(() => {
    const handleUpdate = () => {
      console.log("🔄 Mise à jour des événements rejoints");
      queryClient.invalidateQueries({ queryKey: ["events", "joined"] });
    };

    socketService.on('joinEvent', handleUpdate);
    socketService.on('exitEvent', handleUpdate);

    return () => {
      socketService.off('joinEvent', handleUpdate);
      socketService.off('exitEvent', handleUpdate);
    };
  }, [queryClient]);

  return query;
}