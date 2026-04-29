// src/features/search/components/SearchBar.tsx
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterPress?: () => void;
  placeholder?: string;
  isLoading?: boolean;
  showBackButton?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onFilterPress,
  placeholder = "Rechercher un event,utilisateur...",
  isLoading = false,
  showBackButton = true,
}) => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  const handleChangeText = (text: string) => {
    setQuery(text);
    if (text === "") {
      onSearch("");
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleFilter = () => {
    if (onFilterPress) {
      onFilterPress();
    }
  };

  return (
    <View className="flex-row items-center gap-3">
      {/* Flèche de retour */}
      {showBackButton && (
        <TouchableOpacity onPress={handleBack} className="p-2">
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
      )}

      {/* Barre de recherche */}
      <View className="flex-row items-center flex-1 gap-2 bg-gray-300 rounded-3xl px-2 py-2 border border-gray-700">
        <Ionicons name="search-outline" size={20} color= "grey" />
        <TextInput
          className="flex-1  text-base"
          placeholder={placeholder}
          placeholderTextColor="#6B7280"
          value={query}
          onChangeText={handleChangeText}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {query.length > 0 && !isLoading && (
          <TouchableOpacity onPress={handleClear}>
            <Ionicons name="close-circle" size={20}  />
          </TouchableOpacity>
        )}
        {isLoading && <ActivityIndicator size="small" color="#18FD9C" />}
        {!isLoading && query.length > 0 && (
          <TouchableOpacity
            onPress={handleSearch}
            className="bg-[#18FD9C] px-3 py-1 rounded-2xl"
          >
            <Ionicons name="arrow-forward" size={16}  />
          </TouchableOpacity>
        )}
      </View>

      {/* Bouton filtre */}
      <TouchableOpacity onPress={handleFilter} className="p-2 bg-gray-300 rounded-2xl px-4 py-2 border border-gray-700">
        <Ionicons name="options-outline" size={20}/>
      </TouchableOpacity>
    </View>
  );
};