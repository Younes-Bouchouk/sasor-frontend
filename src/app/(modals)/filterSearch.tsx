// src/app/(modals)/filterSearch.tsx
import { Text, View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { ScreenView } from "@/components/ui/ScreenView";
import { TitleScreen } from "@/components/ui/TitleScreen";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";

const sports = ["Football", "Basketball", "Tennis", "Running", "Natation", "Cyclisme", "Autre"];

export default function FilterScreen() {
  const router = useRouter();
  const [selectedSport, setSelectedSport] = useState("");
  const [minParticipants, setMinParticipants] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");

  const handleApplyFilters = () => {
    // Retourner les filtres à la page précédente
    router.setParams({
      sport: selectedSport,
      minParticipants,
      maxParticipants,
    });
    router.back();
  };

  const handleResetFilters = () => {
    setSelectedSport("");
    setMinParticipants("");
    setMaxParticipants("");
  };

  return (
    <ScreenView modal>
      <View className="flex-1 ">
        {/* Header */}
        <View className="flex-row items-center justify-between p-4 border-b border-gray-800">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="close" size={24}  />
          </TouchableOpacity>
          <TitleScreen>Filtres</TitleScreen>
          
        </View>

        <ScrollView className="flex-1 p-4">
          {/* Filtre par sport */}
          <Text className="text-lg font-semibold mb-3">Sport</Text>
          <View className="flex-row flex-wrap gap-2 mb-6">
            {sports.map((sport) => (
              <TouchableOpacity
                key={sport}
                onPress={() => setSelectedSport(sport === selectedSport ? "" : sport)}
                className={`px-4 py-2 rounded-full ${
                  selectedSport === sport ? "bg-[#18FD9C]" : "bg-gray-400"
                }`}
              >
                <Text className={selectedSport === sport ? "text-black" : "text-white"}>
                  {sport}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Filtre par nombre de participants */}
          <Text className="text-lg font-semibold mb-3">Participants</Text>
          <View className="flex-row gap-4 mb-6">
            <View className="flex-1">
              <Text className=" text-sm mb-1">Min</Text>
              <TextInput
                className="bg-gray-400 text-white rounded-xl px-4 py-3"
                placeholder="0"
                placeholderTextColor="white"
                keyboardType="numeric"
                value={minParticipants}
                onChangeText={setMinParticipants}
              />
            </View>
            <View className="flex-1">
              <Text className=" text-sm mb-1">Max</Text>
              <TextInput
                className="bg-gray-400 text-white rounded-xl px-4 py-3"
                placeholder="30"
                placeholderTextColor="white"
                keyboardType="numeric"
                value={maxParticipants}
                onChangeText={setMaxParticipants}
              />
            </View>
          </View>
        </ScrollView>

        {/* Bouton Appliquer */}
        <View className="p-4 border-t border-gray-800">
          <TouchableOpacity
            onPress={handleApplyFilters}
            className="bg-[#18FD9C] py-4 rounded-xl items-center"
          >
            <Text className="text-black font-semibold text-lg">Appliquer les filtres</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenView>
  );
}