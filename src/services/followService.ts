import { fetchAPI } from "./api";

export async function followUserService(
  followingId: number,
  token: string | null,
) {
  try {
    const response = await fetchAPI("/follows/me", "POST", token, {
      followingId,
    });
    return response;
  } catch (error) {
    console.error("Erreur lors du suivi :", error);
    throw new Error("Erreur lors du suivi de l'utilisateur");
  }
}

export async function unfollowUserService(
  followingId: number,
  token: string | null,
) {
  try {
    const response = await fetchAPI("/follows/me", "DELETE", token, {
      followingId,
    });
    return response;
  } catch (error) {
    console.error("Erreur lors du désabonnement :", error);
    throw new Error("Erreur lors du désabonnement de l'utilisateur");
  }
}
