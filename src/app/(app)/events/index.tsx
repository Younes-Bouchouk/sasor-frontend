import { ScreenView } from "@/components/ui/ScreenView";
import { TitleScreen } from "@/components/ui/TitleScreen";
import {
  EventsCarousel,
  useJoinedEvents,
  useOrganizedEvents,
} from "@/features/events";
import { router } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";

export default function EventsScreen() {
  const { data: organizedEvents, isLoading: loadingOrganized } =
    useOrganizedEvents();
  const { data: joinedEvents, isLoading: loadingJoined } = useJoinedEvents();

  return (
    <ScreenView scrollable>
      <TitleScreen>MES EVENTS</TitleScreen>
      <View className="gap-xl pt-md">
        <Section
          title="Événements créés"
          events={organizedEvents}
          isLoading={loadingOrganized}
        />
        <Section
          title="Événements rejoints"
          events={joinedEvents}
          isLoading={loadingJoined}
        />
      </View>
    </ScreenView>
  );
}

type SectionProps = {
  title: string;
  events: ReturnType<typeof useOrganizedEvents>["data"];
  isLoading: boolean;
};

function Section({ title, events, isLoading }: SectionProps) {
  return (
    <View className="gap-sm">
      <View className="w-full border-b border-foreground opacity-10" />
      <Text className="text-foreground font-semibold text-xl  ">{title}</Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : !events || events.length === 0 ? (
        <Text className="text-foreground opacity-40 text-sm">
          Aucun événement
        </Text>
      ) : (
        <View style={{ marginHorizontal: -16 }}>
          <EventsCarousel
            events={events}
            onPress={(event) => router.push(`/event?id=${event.id}`)}
          />
        </View>
      )}
    </View>
  );
}
