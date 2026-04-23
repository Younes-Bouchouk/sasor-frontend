import { router } from "expo-router";
import { Button, FlatList, Text, TouchableOpacity, View } from "react-native";
import { ScreenView } from "@/components/ui/ScreenView"
import { TitlePage } from "@/components/ui/TitlePage";

const EVENTS = [
  { id: "1", title: "Foot", date: "15 Mars 2024" },
  { id: "2", title: "Basket", date: "20 Mars 2024" },
  { id: "3", title: "Golf", date: "25 Mars 2024" },
    { id: "1", title: "Foot", date: "15 Mars 2024" },
  { id: "2", title: "Basket", date: "20 Mars 2024" },
  { id: "3", title: "Golf", date: "25 Mars 2024" },
    { id: "1", title: "Foot", date: "15 Mars 2024" },
  { id: "2", title: "Basket", date: "20 Mars 2024" },
  { id: "3", title: "Golf", date: "25 Mars 2024" },
];

export default function EventsScreen() {
  const handleEventPress = (eventId: string) => {
    // Navigation vers la page de détail
    router.push(`/(app)/events/details?id=${eventId}`);
  };

  const handleSeeAllDetails = () => {
    // Navigation simple
    router.push("/(app)/events/details");
  };

  return (
    <ScreenView>
      <TitlePage>MES EVENTS</TitlePage>
      <View className="flex-1 flex flex-col justify-between">
        <FlatList
          className="max-h-60 border"
          data={EVENTS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              className="flex flex-row gap-4 pb-4"
              onPress={() => handleEventPress(item.id)}
            > 
              <Text className="text-foreground">{item.title}</Text>
              <Text className="text-foreground">{item.date}</Text>
              <Text className="text-foreground">Voir détails →</Text>
            </TouchableOpacity>
          )}
        />

        <View className="">
          <Button
            
            title="Voir tous les détails"
            onPress={handleSeeAllDetails}
            color="#007AFF"
          />

          <Button
            title="Accéder au détail (avec paramètre)"
            onPress={() => router.push("/(app)/events/details?id=1")}
            color="#34C759"
          />
        </View>
      </View>
    </ScreenView>
  );
}
