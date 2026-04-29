import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Event } from "../types";
import { formatEventDateTime } from "../utils/formatEventDateTime";
import { formatSportLabel } from "../utils/formatSportLabel";
import { EventImage } from "./EventImage";

type Props = {
  event: Event;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export function EventCard({ event, onPress, style }: Props) {
  const sportLabel = formatSportLabel(event.sport);
  const participantCount = event.participants?.length ?? 0;

  return (
    <TouchableOpacity
      className="w-event-card borde border-border mr-sm"
      onPress={onPress}
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
          {sportLabel ? (
            <View className="bg-foreground py-badge-y px-badge-x rounded-full">
              <Text className="text-xs ">{sportLabel}</Text>
            </View>
          ) : null}
          <View className="flex flex-row gap-1 bg-foreground py-badge-y px-badge-x rounded-full">
            <Ionicons name="people-outline" size={14} />
            <Text className="text-xs">
              {participantCount}/{event.maxParticipants}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
