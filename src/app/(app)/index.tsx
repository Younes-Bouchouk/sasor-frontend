import { ScreenView } from "@/components/ui/ScreenView";
import { TitleScreen } from "@/components/ui/TitleScreen";
import { useAuth } from "@/features/auth";
import {
  EventsCarousel,
  useEvents,
  useFollowersEvents,
  type Event,
} from "@/features/events";
import { router } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";

export default function IndexScreen() {
  const { userId } = useAuth();
  const { data: allEvents, isLoading: loadingAll } = useEvents();
  const { data: followersEvents, isLoading: loadingFollowers } =
    useFollowersEvents();

  const notJoined = (e: Event) =>
    !e.participants.some((p) => String(p.participant.id) === String(userId));

  const discoverEvents = allEvents?.filter(
    (e) => String(e.organizer?.id) !== String(userId) && notJoined(e),
  );

  const filteredFollowersEvents = followersEvents?.filter(notJoined);

  return (
    <ScreenView scrollable>
      <TitleScreen>ACCUEIL</TitleScreen>
      <View className="gap-xl pt-md">
        <Section
          title="Découvrir"
          events={discoverEvents}
          isLoading={loadingAll}
        />
        <Section
          title="Mes abonnements"
          events={filteredFollowersEvents}
          isLoading={loadingFollowers}
        />
      </View>
    </ScreenView>
  );
}

type SectionProps = {
  title: string;
  events: Event[] | undefined;
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
