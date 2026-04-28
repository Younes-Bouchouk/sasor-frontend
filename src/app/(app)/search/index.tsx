// src/app/(app)/search/index.tsx (version améliorée)
import { SearchSkeleton } from "@/features/search/components/LoadingSkeleton";
import { SearchBar } from "@/features/search/components/SearchBar";
import { UserCard } from "@/features/search/components/UserCard";
import { useUserSearch } from "@/hooks/useUserSearch";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function SearchPage() {
  const {
    users,
    isLoading,
    hasSearched,
    isPending,
    handleSearch,
    handleFollow,
    handleUnfollow,
  } = useUserSearch();

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

    if (hasSearched && users?.length === 0) {
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
    <GestureHandlerRootView className="flex-1">
      <View className="flex-1">
        {/* Header */}
        <View className="pt-12 pb-4 px-4 border-b border-gray-800">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </View>
        {/* Results */}
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
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
              onFollow={handleFollow}
              onUnfollow={handleUnfollow}
              isPending={isPending}
            />
          )}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </View>
    </GestureHandlerRootView>
  );
}
