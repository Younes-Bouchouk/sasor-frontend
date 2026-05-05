// hooks/useFetchQuery.ts
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchAPI } from "../services/api";
import { socketService } from "../services/socket";
import { useEffect } from "react";

export function useFetchQuery(key: string, path: string, options?: {
  enableSocket?: boolean;
  refetchOnMount?: boolean;
}) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const token = await AsyncStorage.getItem("authToken");
      return fetchAPI(path, "GET", token, undefined);
    },
    refetchOnMount: options?.refetchOnMount ?? true,
    refetchOnWindowFocus: false,
    staleTime: 30000, // 30 secondes
  });

  // Configuration Socket.IO pour les mises à jour en temps réel
  useEffect(() => {
    if (!options?.enableSocket) return;

    const handleEventUpdate = (data: any) => {
      // Invalider et revalider la requête
      queryClient.invalidateQueries({ queryKey: [key] });
    };

    // S'abonner aux événements pertinents
    socketService.on('eventCreated', handleEventUpdate);
    socketService.on('eventUpdated', handleEventUpdate);
    socketService.on('eventDeleted', handleEventUpdate);
    socketService.on('userJoined', handleEventUpdate);
    socketService.on('userLeft', handleEventUpdate);

    return () => {
      socketService.off('eventCreated', handleEventUpdate);
      socketService.off('eventUpdated', handleEventUpdate);
      socketService.off('eventDeleted', handleEventUpdate);
      socketService.off('userJoined', handleEventUpdate);
      socketService.off('userLeft', handleEventUpdate);
    };
  }, [key, options?.enableSocket]);

  return query;
}