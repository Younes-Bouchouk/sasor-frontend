import { ScreenView } from "@/components/ui/ScreenView";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function EventsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <ScreenView>
      <Text className="text-center text-xl">Page - Mes événements - {id}</Text>
    </ScreenView>
  );
}
