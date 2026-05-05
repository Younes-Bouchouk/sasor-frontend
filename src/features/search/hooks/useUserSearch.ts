// src/features/search/hooks/useUserSearch.ts
import { useAuth } from "@/features/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { searchService } from "../services/searchService";
import { useState, useEffect } from "react";
import { Alert } from "react-native";
import type { User } from "../types/userTypes";

export function useUserSearch() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [followingStatus, setFollowingStatus] = useState<Record<number, boolean>>({});

  // Récupérer la liste des utilisateurs suivis
  const {
    data: followingList = [],
    isLoading: isLoadingFollowing,
    refetch: refetchFollowing,
  } = useQuery({
    queryKey: ["search", "following"],
    queryFn: () => searchService.getFollowing(token!),
    enabled: !!token,
  });

  // Récupérer tous les utilisateurs (quand pas de recherche)
  const {
    data: allUsers = [],
    isLoading: isLoadingAll,
    error: errorAll,
    refetch: refetchAll,
  } = useQuery({
    queryKey: ["search", "all-users"],
    queryFn: () => searchService.getAllUsers(token!),
    enabled: !!token && !searchQuery,
  });

  // Récupérer les utilisateurs filtrés (quand recherche active)
  const {
    data: searchResults = [],
    isLoading: isLoadingSearch,
    error: errorSearch,
    refetch: refetchSearch,
  } = useQuery({
    queryKey: ["search", "results", searchQuery],
    queryFn: () => searchService.searchUsers(token!, { search: searchQuery }),
    enabled: !!token && searchQuery.length > 0,
  });

  // Synchroniser l'état des follows
  useEffect(() => {
    if (followingList.length > 0) {
      const newStatus: Record<number, boolean> = {};
      followingList.forEach((follow: any) => {
        newStatus[follow.followingId] = true;
      });
      setFollowingStatus(prev => ({ ...prev, ...newStatus }));
    }
  }, [followingList]);

  const isSearching = searchQuery.trim().length > 0;
  const users = isSearching ? searchResults : allUsers;
  const isLoading = isLoadingFollowing || (isSearching ? isLoadingSearch : isLoadingAll);
  const error = isSearching ? errorSearch : errorAll;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFollow = async (userId: number) => {
    if (!token) return;

    // Optimistic update
    setFollowingStatus(prev => ({ ...prev, [userId]: true }));

    try {
      await searchService.followUser(token, userId);
      
      // Invalider les caches
      queryClient.invalidateQueries({ queryKey: ["search", "following"] });
      queryClient.invalidateQueries({ queryKey: ["search", "all-users"] });
      queryClient.invalidateQueries({ queryKey: ["search", "results"] });
      
      console.log("✅ Follow réussi");
    } catch (error: any) {
      console.error("❌ Erreur follow:", error);
      setFollowingStatus(prev => ({ ...prev, [userId]: false }));
      
      if (error?.message?.includes("déjà")) {
        setFollowingStatus(prev => ({ ...prev, [userId]: true }));
      } else {
        Alert.alert("Erreur", "Impossible de suivre cet utilisateur");
      }
    }
  };

  const handleUnfollow = async (userId: number) => {
    if (!token) return;

    // Optimistic update
    setFollowingStatus(prev => ({ ...prev, [userId]: false }));

    try {
      await searchService.unfollowUser(token, userId);
      
      // Invalider les caches
      queryClient.invalidateQueries({ queryKey: ["search", "following"] });
      queryClient.invalidateQueries({ queryKey: ["search", "all-users"] });
      queryClient.invalidateQueries({ queryKey: ["search", "results"] });
      
      console.log("✅ Unfollow réussi");
    } catch (error) {
      console.error("❌ Erreur unfollow:", error);
      setFollowingStatus(prev => ({ ...prev, [userId]: true }));
      Alert.alert("Erreur", "Impossible de ne plus suivre");
    }
  };

  const isFollowing = (userId: number): boolean => {
    return followingStatus[userId] === true;
  };

  return {
    users,
    isLoading,
    error,
    hasSearched: true,
    searchQuery,
    handleSearch,
    handleFollow,
    handleUnfollow,
    isFollowing,
    refetch: () => {
      refetchFollowing();
      if (isSearching) {
        refetchSearch();
      } else {
        refetchAll();
      }
    },
  };
}