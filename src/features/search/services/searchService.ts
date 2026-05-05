// src/features/search/services/searchService.ts
import { fetchAPI } from "@/services/api";
import type { User, SearchFilters } from "../types/userTypes";

export const searchService = {
  /**
   * Rechercher des utilisateurs par nom d'utilisateur
   */
  async searchUsers(token: string, filters: SearchFilters): Promise<User[]> {
    const { search = "", limit = 50, offset = 0 } = filters;
    const queryParams = new URLSearchParams({
      search,
      limit: limit.toString(),
      offset: offset.toString(),
    });
    
    return fetchAPI(`/users?${queryParams}`, "GET", token);
  },

  /**
   * Récupérer tous les utilisateurs (pour la liste par défaut)
   */
  async getAllUsers(token: string, limit: number = 50): Promise<User[]> {
    return fetchAPI(`/users?limit=${limit}`, "GET", token);
  },

  /**
   * Récupérer les utilisateurs que l'utilisateur courant suit
   */
  async getFollowing(token: string): Promise<Follow[]> {
    return fetchAPI("/follows/me/following", "GET", token);
  },

  /**
   * Suivre un utilisateur
   */
  async followUser(token: string, followingId: number): Promise<any> {
    return fetchAPI("/follows/me", "POST", token, { followingId });
  },

  /**
   * Ne plus suivre un utilisateur
   */
  async unfollowUser(token: string, followingId: number): Promise<any> {
    return fetchAPI("/follows/me", "DELETE", token, { followingId });
  },

  /**
   * Vérifier si l'utilisateur suit un autre utilisateur
   */
  async checkFollowingStatus(token: string, userId: number): Promise<boolean> {
    const following = await this.getFollowing(token);
    return following.some(follow => follow.followingId === userId);
  },
};