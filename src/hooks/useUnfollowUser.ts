
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAPI } from "../services/api";

import { useAuth } from "@/features/auth";
import { unfollowUserService } from "../services/followService";

export function useUnfollowUser() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (followingId: string) => {
      console.log("Unfollowing user:", followingId);
      return fetchAPI("/follows/me", "DELETE", token, { followingId });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-following"] });
      queryClient.invalidateQueries({ queryKey: ["all-users"] });
    },
    onError: (error) => {
      console.error("Erreur unfollow:", error);
    },
  });
}