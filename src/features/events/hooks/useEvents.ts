// src/features/events/hooks/useEvents.ts
import { useAuth } from "@/features/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { eventService } from "../services/eventService";
import { socketService } from "@/services/socket";
import { useEffect } from "react";

export function useEvents() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["events"],
    queryFn: () => eventService.getAll(token!),
    enabled: !!token,
    staleTime: 30000, // 30 secondes
  });

  // Configuration Socket.IO pour les mises à jour en temps réel
  useEffect(() => {
    const handleEventUpdate = () => {
      console.log("🔄 Mise à jour temps réel des événements");
      queryClient.invalidateQueries({ queryKey: ["events"] });
    };

    // S'abonner aux événements Socket.IO
    socketService.on('eventCreated', handleEventUpdate);
    socketService.on('eventUpdated', handleEventUpdate);
    socketService.on('eventDeleted', handleEventUpdate);
    socketService.on('joinEvent', handleEventUpdate);
    socketService.on('exitEvent', handleEventUpdate);

    return () => {
      socketService.off('eventCreated', handleEventUpdate);
      socketService.off('eventUpdated', handleEventUpdate);
      socketService.off('eventDeleted', handleEventUpdate);
      socketService.off('joinEvent', handleEventUpdate);
      socketService.off('exitEvent', handleEventUpdate);
    };
  }, [queryClient]);

  return query;
}