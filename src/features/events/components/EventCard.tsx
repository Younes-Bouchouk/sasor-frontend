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
import { EventImage } from "./EventImage";

type Props = {
  event: Event;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export function EventCard({ event, onPress, style }: Props) {
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
          <View className="bg-foreground py-badge-y px-badge-x rounded-full">
            <Text className="text-xs ">{event.sport.name}</Text>
          </View>
          <View className="flex flex-row gap-1 bg-foreground py-badge-y px-badge-x rounded-full">
            <Ionicons name="people-outline" size={14} />
            <Text className="text-xs">
              {event.participants.length}/{event.maxParticipants}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
