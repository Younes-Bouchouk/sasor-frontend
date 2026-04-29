import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/features/auth";
import { followUserService } from "../services/followService";

export function useFollowUser() {
  const { token } = useAuth();

  return useMutation({
    mutationFn: (followingId: number) =>
      followUserService(followingId, token),
    onSuccess: () => {
      // Logique après la création, par exemple, rafraîchir la liste des abonnements
      console.log("Utilisateur plus suivi avec succès");
    },
    onError: (error) => {
      console.error("Erreur lors de la tentative :", error);
    },
  });
}
