import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function EventsScreen() {

  const { id } = useLocalSearchParams<{ id: string }>();


  return (
    <Text className="text-center text-xl">Page - Mes événements - {id}</Text>
  );
}
