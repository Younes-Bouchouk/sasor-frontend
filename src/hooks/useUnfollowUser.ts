import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/features/auth";
import { unfollowUserService } from "../services/followService";

export function useUnfollowUser() {
  const { token } = useAuth();

  return useMutation({
    mutationFn: (followingId: number) =>
      unfollowUserService(followingId, token),
    onSuccess: () => {
      // Logique après la suppression, par exemple, rafraîchir la liste des abonnements
      console.log("Utilisateur plus suivi avec succès");
    },
    onError: (error) => {
      console.error("Erreur lors de la tentative :", error);
    },
  });
}
