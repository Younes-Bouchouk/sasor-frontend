// src/hooks/useUserSearch.ts
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { useFollowUser } from "@/hooks/useFollowUser";
import { useUnfollowUser } from "@/hooks/useUnfollowUser";
import { useState } from "react";
import { Alert } from "react-native";

export const useUserSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const {
    data: users,
    isLoading,
    error,
    refetch,
  } = useFetchQuery("users", `/users?search=${searchQuery}`, 500);

  const { mutate: unfollow, isPending: isUnfollowPending } = useUnfollowUser();
  const { mutate: follow, isPending: isFollowPending } = useFollowUser();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setHasSearched(true);
    if (query.trim()) {
      refetch();
    }
  };

  const handleFollow = (userId: number) => {
    follow(userId, {
      onSuccess: () => {
        refetch();
      },
      onError: (error: any) => {
        const message = error?.message || "";
        if (message.includes("already") || message.includes("déjà")) {
          Alert.alert("Information", "Vous suivez déjà cet utilisateur");
        } else {
          Alert.alert("Erreur", "Impossible de suivre cet utilisateur");
        }
      },
    });
  };

  const handleUnfollow = (userId: number) => {
    unfollow(userId, {
      onSuccess: () => {
        refetch();
      },
      onError: (error: any) => {
        Alert.alert("Erreur", "Impossible de ne plus suivre cet utilisateur");
      },
    });
  };

  return {
    users,
    isLoading,
    error,
    hasSearched,
    searchQuery,
    isPending: isFollowPending || isUnfollowPending,
    handleSearch,
    handleFollow,
    handleUnfollow,
    refetch,
  };
};
