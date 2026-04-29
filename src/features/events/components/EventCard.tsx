import { router } from "expo-router";
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Event } from "../types";
import { formatEventDateTime } from "../utils/formatEventDateTime";
import { EventImage } from "./EventImage";
import { ParticipantsBadge } from "./ParticipantsBadge";
import { SportBadge } from "./SportBadge";

type Props = {
  event: Event;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export function EventCard({ event, onPress, style }: Props) {
  const participantCount = event.participants?.length ?? 0;

  return (
    <TouchableOpacity
      className="w-event-card borde border-border mr-sm"
      onPress={() => router.push(`/event?id=${event.id}`)}
      style={style}
    >
      <EventImage image={event.image} />
      <View className="pt-xs gap-1">
        <Text className="text-foreground font-semibold">{event.name}</Text>
        <View>
          <Text className="text-foreground opacity-60 text-sm">
            {formatEventDateTime(event.startAt)}
          </Text>
          <Text className="text-foreground opacity-60 text-sm">
            {event.location}
          </Text>
        </View>
        <View className="flex flex-row gap-xs">
          <SportBadge sport={event.sport} />
          <ParticipantsBadge
            count={participantCount}
            max={event.maxParticipants}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
