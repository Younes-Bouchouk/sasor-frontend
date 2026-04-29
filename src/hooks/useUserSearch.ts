import { useFetchQuery } from "@/hooks/useFetchQuery";
import { useFollowUser } from "@/hooks/useFollowUser";
import { useUnfollowUser } from "@/hooks/useUnfollowUser";
import { useState, useEffect } from "react";
import { Alert } from "react-native";

export const useUserSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [followingStatus, setFollowingStatus] = useState<Record<string, boolean>>({});

  //  Initialiser les hooks 
  const { mutate: followUser, isPending: isFollowPending } = useFollowUser();
  const { mutate: unfollowUser, isPending: isUnfollowPending } = useUnfollowUser();

  // Récupérer la liste des utilisateurs que JE suis (mes abonnements)
  const {
    data: myFollowing,
    isLoading: isLoadingFollowing,
    refetch: refetchFollowing,
  } = useFetchQuery("my-following", "/follows/me/following", 500);

  // Charge TOUS les utilisateurs
  const {
    data: allUsersData,
    isLoading: isLoadingAll,
    error: errorAll,
    refetch: refetchAll,
  } = useFetchQuery("all-users", "/users", 500);

  // Charge les utilisateurs filtrés
  const {
    data: searchUsersData,
    isLoading: isLoadingSearch,
    error: errorSearch,
    refetch: refetchSearch,
  } = useFetchQuery(
    searchQuery ? `users-search-${searchQuery}` : "empty",
    searchQuery ? `/users?search=${searchQuery}` : "",
    500
  );

  // Synchroniser l'état des follows avec la liste récupérée
  useEffect(() => {
    if (Array.isArray(myFollowing) && myFollowing.length > 0) {
      const newStatus: Record<string, boolean> = {};
      myFollowing.forEach((follow: any) => {
        if (follow.followingId) {
          newStatus[follow.followingId] = true;
        }
      });
      setFollowingStatus(prev => ({ ...prev, ...newStatus }));
    }
  }, [myFollowing]);

  const isSearching = searchQuery.trim().length > 0;
  const users = isSearching 
    ? (Array.isArray(searchUsersData) ? searchUsersData : [])
    : (Array.isArray(allUsersData) ? allUsersData : []);
  
  const isLoading = isLoadingFollowing || (isSearching ? isLoadingSearch : isLoadingAll);
  const error = isSearching ? errorSearch : errorAll;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      refetchSearch();
    }
  };

  const handleFollow = (userId: string) => {
    // Vérifier si on suit déjà
    if (followingStatus[userId]) {
      return;
    }

    setFollowingStatus(prev => ({ ...prev, [userId]: true }));
    
    followUser(userId, {
      onSuccess: () => {
        console.log("Follow réussi");
        refetchFollowing();
        isSearching ? refetchSearch() : refetchAll();
      },
      onError: (error: any) => {
        console.error("Erreur follow:", error);
        setFollowingStatus(prev => ({ ...prev, [userId]: false }));
        
        if (error?.message?.includes("déjà")) {
          setFollowingStatus(prev => ({ ...prev, [userId]: true }));
        } else {
        }
      },
    });
  };

  const handleUnfollow = (userId: string) => {
    setFollowingStatus(prev => ({ ...prev, [userId]: false }));
    
    unfollowUser(userId, {
      onSuccess: () => {
        console.log("Unfollow réussi");
        refetchFollowing();
        isSearching ? refetchSearch() : refetchAll();
      },
      onError: (error: any) => {
        console.error("Erreur unfollow:", error);
        setFollowingStatus(prev => ({ ...prev, [userId]: true }));
        Alert.alert("Erreur", "Impossible de ne plus suivre");
      },
    });
  };

  const isFollowing = (userId: string) => {
    return followingStatus[userId] === true;
  };

  return {
    users,
    isLoading,
    error,
    hasSearched: true,
    searchQuery,
    isPending: isFollowPending || isUnfollowPending,
    handleSearch,
    handleFollow,
    handleUnfollow,
    isFollowing,
    refetch: () => {
      refetchFollowing();
      isSearching ? refetchSearch() : refetchAll();
    },
  };
};