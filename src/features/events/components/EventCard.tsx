import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Event } from "../types";

type Props = {
  event: Event;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

function formatEventDate(isoDate: string): string {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = date.toLocaleDateString("fr-FR", { month: "short" });
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day} ${month} · ${hours}h${minutes}`;
}

export function EventCard({ event, onPress, style }: Props) {
  return (
    <TouchableOpacity
      className="w-event-card borde border-border mr-sm"
      onPress={onPress}
      style={style}
    >
      <View className="borde border-red-400 aspect-event_image rounded-event_image overflow-hidden ">
        <Image
          source={
            event.image
              ? { uri: event.image }
              : require("@/../assets/images/icon.png")
          }
          contentFit="cover"
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View className="pt-xs gap-1">
        <Text className="text-foreground font-semibold">{event.name}</Text>
        <View>
          <Text className="text-foreground opacity-60 text-sm">
            {formatEventDate(event.startAt)}
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
