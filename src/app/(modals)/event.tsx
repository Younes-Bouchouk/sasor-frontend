import { Avatar } from "@/components/ui/Avatar";
import { ScreenView } from "@/components/ui/ScreenView";
import { useEvents } from "@/features/events";
import { EventImage } from "@/features/events/components/EventImage";
import {
  formatEventDate,
  formatEventTime,
} from "@/features/events/utils/formatEventDateTime";
import { formatSportLabel } from "@/features/events/utils/formatSportLabel";
import { useLocalSearchParams } from "expo-router";
import { FlatList, Text, useWindowDimensions, View } from "react-native";

export default function EventDetailModal() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { width } = useWindowDimensions();
  const { data: events } = useEvents();
  const event = events?.find((e) => e.id == id);

  if (!event) {
    return (
      <ScreenView modal>
        <Text className="text-foreground text-center mt-8">
          Événement introuvable.
        </Text>
      </ScreenView>
    );
  }

  const sportLabel = formatSportLabel(event.sport);

  // On créer une copie de la liste des participants sans l'organisateur
  const withoutOrganizer = event.participants.filter(
    (p) => p.participant.id !== event.organizer.id,
  );
  const sortedParticipants = [
    { participant: event.organizer },
    ...withoutOrganizer,
  ];

  return (
    <ScreenView modal padding={false}>
      <EventImage image={event.image} style={{ borderRadius: 32 }} />

      <View className="mt-md gap-sm px-xs">
        <Text className="text-foreground text-2xl font-bold">{event.name}</Text>

        {sportLabel ? (
          <View className="flex flex-row gap-xs flex-wrap">
            <View className="bg-primary/20 px-sm py-1 rounded-full">
              <Text className="text-primary text-sm font-medium">
                {sportLabel}
              </Text>
            </View>
          </View>
        ) : null}

        <View className="gap-xs mt-xs">
          <Row label="Date" value={formatEventDate(event.startAt)} />
          <Row label="Heure" value={formatEventTime(event.startAt)} />
          <Row label="Lieu" value={event.location} />
        </View>

        <View className="mt-xs">
          <Text className="text-foreground opacity-50 text-xs uppercase mb-xs">
            Description
          </Text>
          <Text className="text-foreground leading-6">{event.description}</Text>
        </View>
        <View className="gap-xs">
          <View className="flex-row justify-between items-center">
            <Text className="text-foreground font-semibold">Participants</Text>
            <Text className="text-foreground opacity-50 text-sm">
              {event.participants.length}/{event.maxParticipants}
            </Text>
          </View>
          <FlatList
            data={sortedParticipants}
            keyExtractor={(item) => item.participant.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12 }}
            renderItem={({ item }) => {
              const isOrganizer = item.participant.id === event.organizer?.id;

              return (
                <View className="items-center gap-1 w-14">
                  <Avatar
                    id={item.participant.id}
                    uri={item.participant.profilePicture}
                    className={`${isOrganizer && "border border-primary"}`}
                  />
                  <Text
                    className={`${isOrganizer ? "text-primary" : "text-foreground"} text-xs text-center`}
                    numberOfLines={1}
                  >
                    {item.participant.pseudo}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    </ScreenView>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex flex-row gap-xs">
      <Text className="text-foreground opacity-50 w-12">{label}</Text>
      <Text className="text-foreground flex-1">{value}</Text>
    </View>
  );
}
