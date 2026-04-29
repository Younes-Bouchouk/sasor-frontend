import React from "react";
import { View, Text } from "react-native";

export const SearchSkeleton = () => {
  return (
    <View className="flex-1 items-center justify-center py-20">
      <View className="w-12 h-12 rounded-full bg-gray-700 mb-4" />
      <Text className="text-gray-500 text-center mt-4">
        Chargement...
      </Text>
    </View>
  );
}; 