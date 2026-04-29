import { FlatList, Text } from "react-native";
import { Event } from "../types";
import { EventCard } from "./EventCard";

type Props = {
  events: Event[] | undefined;
  onPress: (event: Event) => void;
};

export function EventsCarousel({ events, onPress }: Props) {
  if (events == undefined) {
    return <Text className={"text-foreground"}>Aucun événement...</Text>;
  }
  return (
    <FlatList
      className="pl-4" // Solution temporaire pour que le carroussel colle les bords
      data={events}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 12 }}
      renderItem={({ item }) => (
        <EventCard event={item} onPress={() => onPress(item)} />
      )}
    />
  );
}
