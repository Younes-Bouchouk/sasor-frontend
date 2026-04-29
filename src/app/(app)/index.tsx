import { ScreenView } from "@/components/ui/ScreenView";
import { TitleScreen } from "@/components/ui/TitleScreen";
import { EventsCarousel, useEvents } from "@/features/events";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";

export default function IndexScreen() {
  const { data: events, isLoading } = useEvents();

  return (
    <ScreenView>
      <TitleScreen>ACCUEIL</TitleScreen>
      <View className="flex-1 gap-md pt-md">
        <View
          className="gap-sm"
          style={{ marginHorizontal: -16 }} // Solution temporaire pour que le carroussel colle les bords
        >
          <Text className="pl-4 text-foreground font-semibold text-base">
            Événements à venir <Ionicons name="arrow-forward" size={16} />
          </Text>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <EventsCarousel
              events={events ?? []}
              onPress={(event) => router.push(`/event?id=${event.id}`)}
            />
          )}
        </View>
      </View>
    </ScreenView>
  );
}
