import { ScreenView } from "@/components/ui/ScreenView";
import { useAuth } from "@/features/auth";
import { useEvents } from "@/features/events";
import { EventImage } from "@/features/events/components/EventImage";
import { JoinEventButton } from "@/features/events/components/JoinEventButton";
import { ParticipantsList } from "@/features/events/components/ParticipantsList";
import { SportBadge } from "@/features/events/components/SportBadge";
import {
  formatEventDate,
  formatEventTime,
} from "@/features/events/utils/formatEventDateTime";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function EventDetailModal() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: events } = useEvents();
  const { userId } = useAuth();
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

  const isOrganizer = String(event.organizer?.id) === String(userId);
  const isParticipant = event.participants.some(
    (p) => String(p.participant.id) === String(userId),
  );

  return (
    <ScreenView modal padding={false}>
      <View className="flex-1">
        <EventImage image={event.image} style={{ borderRadius: 32 }} />

        <View className="mt-md gap-sm px-xs">
          <Text className="text-foreground text-2xl font-bold">
            {event.name}
          </Text>

          <View className="flex flex-row gap-xs flex-wrap">
            <SportBadge sport={event.sport} />
          </View>

          <View className="gap-xs mt-xs">
            <Row label="Date" value={formatEventDate(event.startAt)} />
            <Row label="Heure" value={formatEventTime(event.startAt)} />
            <Row label="Lieu" value={event.location} />
          </View>

          <View className="mt-xs">
            <Text className="text-foreground opacity-50 text-xs uppercase mb-xs">
              Description
            </Text>
            <Text className="text-foreground leading-6">
              {event.description}
            </Text>
          </View>

          <ParticipantsList
            participants={event.participants}
            organizer={event.organizer}
            maxParticipants={event.maxParticipants}
          />
        </View>

        <View className="mt-auto">
          <JoinEventButton
            eventId={event.id}
            isParticipant={isParticipant}
            isOrganizer={isOrganizer}
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
