// src/app/(app)/search/index.tsx
import { SearchSkeleton } from "@/features/search/components/LoadingSkeleton";
import { SearchBar } from "@/features/search/components/SearchBar";
import { UserCard } from "@/features/search/components/UserCard";
import { useUserSearch } from "@/hooks/useUserSearch";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, RefreshControl, Text, View, ActivityIndicator, Modal, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function SearchPage() {
  const router = useRouter();
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    sport: "",
    minParticipants: "",
    maxParticipants: "",
  });

  const {
    users,
    isLoading,
    hasSearched,
    handleSearch,
    handleFollow,
    handleUnfollow,
    isFollowing,
    error,
  } = useUserSearch();

  const handleFilterPress = () => {
    // Navigation vers le modal via expo-router
    router.push("/(modals)/filterSearch");
    // Ou si vous voulez un modal local:
    // setFilterModalVisible(true);
  };

  // Gestion de l'erreur
  if (error) {
    return (
      <GestureHandlerRootView className="flex-1 ">
        <View className="flex-1 items-center justify-center">
          <Ionicons name="alert-circle" size={64} color="#E74C3C" />
          <Text className="text-red-500 text-center mt-4">Une erreur est survenue</Text>
          <Text className="text-gray-400 text-center text-sm mt-2 px-4">
            {JSON.stringify(error)}
          </Text>
        </View>
      </GestureHandlerRootView>
    );
  }

  const renderEmptyState = () => {
    if (!hasSearched) {
      return (
        <View className="flex-1 items-center justify-center py-20">
          <Ionicons name="search" size={64} color="#374151" />
          <Text className="text-gray-500 text-center mt-4 px-4">
            Recherchez des utilisateurs par leur pseudo
          </Text>
        </View>
      );
    }

    if (isLoading) {
      return <SearchSkeleton />;
    }

    if (hasSearched && users.length === 0) {
      return (
        <View className="flex-1 items-center justify-center py-20">
          <Ionicons name="people-outline" size={64} color="#374151" />
          <Text className="text-gray-500 text-center mt-4">
            Aucun utilisateur trouvé
          </Text>
          <Text className="text-gray-600 text-center text-sm mt-2">
            Essayez un autre pseudo
          </Text>
        </View>
      );
    }

    return null;
  };

  return (
    <GestureHandlerRootView className="flex-1 ">
      <View className="flex-1">
        {/* Header */}
        <View className="pt-12 pb-4 px-4 border-b border-gray-800">
          <SearchBar 
            onSearch={handleSearch} 
            isLoading={isLoading}
            onFilterPress={handleFilterPress}
            showBackButton={true}
          />
        </View>

        {/* Affichage des filtres actifs */}
        {(filters.sport || filters.minParticipants || filters.maxParticipants) && (
          <View className="px-4 py-2 flex-row flex-wrap gap-2 border-b border-gray-800">
            {filters.sport && (
              <View className="bg-gray-800 rounded-full px-3 py-1 flex-row items-center">
                <Text className="text-[#18FD9C] text-xs">Sport: {filters.sport}</Text>
                <TouchableOpacity onPress={() => setFilters({ ...filters, sport: "" })}>
                  <Ionicons name="close-circle" size={14} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        <FlatList
          data={users}
          keyExtractor={(item) => item?.id?.toString() || Math.random().toString()}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoading && hasSearched}
              onRefresh={() => handleSearch("")}
              tintColor="#18FD9C"
              colors={["#18FD9C"]}
            />
          }
          ListEmptyComponent={renderEmptyState}
          renderItem={({ item }) => (
            <UserCard
              user={item}
              isFollowing={isFollowing(item.id)}
              onFollow={handleFollow}
              onUnfollow={handleUnfollow}
            />
          )}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </View>
    </GestureHandlerRootView>
  );
}