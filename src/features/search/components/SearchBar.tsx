import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    ActivityIndicator,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Rechercher un event, utilisateur...",
  isLoading = false,
}) => {
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

  return (
    <View className="flex-row items-center gap-3 bg-gray-900 rounded-xl px-4 py-2 border border-gray-700">
      <Ionicons name="search-outline" size={20} color="#9CA3AF" />
      <TextInput
        className="flex-1 text-white text-base"
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
          <Ionicons name="close-circle" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      )}
      {isLoading && <ActivityIndicator size="small" color="#18FD9C" />}
      {!isLoading && query.length > 0 && (
        <TouchableOpacity
          onPress={handleSearch}
          className="bg-primary px-3 py-1 rounded-lg"
        >
          <Ionicons name="arrow-forward" size={16} color="#000" />
        </TouchableOpacity>
      )}
    </View>
  );
};
