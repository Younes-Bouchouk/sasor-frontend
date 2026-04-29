import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAPI } from "../services/api";
import { useAuth } from "@/features/auth";
import { followUserService } from "../services/followService";

export function useFollowUser() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (followingId: string) => {
      console.log(" Following user:", followingId);
      return fetchAPI("/follows/me", "POST", token, { followingId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-following"] });
      queryClient.invalidateQueries({ queryKey: ["all-users"] });
    },
    onError: (error) => {
      console.error("Erreur follow:", error);
    },
  });
}