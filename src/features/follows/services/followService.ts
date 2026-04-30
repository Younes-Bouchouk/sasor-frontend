import { fetchAPI } from "@/services/api";

export const followService = {
  getMyFollowers: (token: string) =>
    fetchAPI("/follows/me/followers", "GET", token),

  getMyFollowing: (token: string) =>
    fetchAPI("/follows/me/following", "GET", token),

  getUserFollowers: (userId: string) =>
    fetchAPI(`/follows/${userId}/followers`, "GET"),

  getUserFollowing: (userId: string) =>
    fetchAPI(`/follows/${userId}/following`, "GET"),
};
