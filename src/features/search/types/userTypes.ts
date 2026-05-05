// src/features/search/types/index.ts
export interface User {
  id: number;
  username: string;
  email?: string;
  avatar?: string;
  isFollowing?: boolean;
  createdAt?: string;
}

export interface Follow {
  id: number;
  followerId: number;
  followingId: number;
  createdAt: string;
}

export interface SearchFilters {
  search?: string;
  limit?: number;
  offset?: number;
}