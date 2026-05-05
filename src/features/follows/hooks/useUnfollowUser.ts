// src/features/search/hooks/useUnfollowUser.ts
import { useAuth } from "@/features/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { searchService } from "../../search/services/searchService";
import { socketService } from "@/services/socket";

export function useUnfollowUser() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (followingId: number) => searchService.unfollowUser(token!, followingId),
    onSuccess: (_, followingId) => {
      console.log("✅ Désabonnement réussi");
      
      // Notifier via Socket.IO
      if (socketService.isConnected) {
        socketService.emit('unfollowUser', { followingId });
      }
      
      // Invalider les queries
      queryClient.invalidateQueries({ queryKey: ["search", "following"] });
      queryClient.invalidateQueries({ queryKey: ["search", "all-users"] });
      queryClient.invalidateQueries({ queryKey: ["search", "results"] });
    },
    onError: (error) => {
      console.error("❌ Erreur unfollow:", error);
    },
  });
}