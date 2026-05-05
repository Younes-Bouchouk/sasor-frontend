// src/features/search/hooks/useFollowUser.ts
import { useAuth } from "@/features/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { searchService } from "../../search/services/searchService";
import { socketService } from "@/services/socket";

export function useFollowUser() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (followingId: number) => searchService.followUser(token!, followingId),
    onSuccess: (_, followingId) => {
      console.log("Abonnement réussi");
      
      // Notifier via Socket.IO
      if (socketService.isConnected) {
        socketService.emit('followUser', { followingId });
      }
      
      // Invalider les queries
      queryClient.invalidateQueries({ queryKey: ["search", "following"] });
      queryClient.invalidateQueries({ queryKey: ["search", "all-users"] });
      queryClient.invalidateQueries({ queryKey: ["search", "results"] });
    },
    onError: (error) => {
      console.error("❌ Erreur follow:", error);
    },
  });
}