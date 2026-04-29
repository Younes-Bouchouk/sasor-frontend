import { ScreenView } from "@/components/ui/ScreenView";
import { TitleScreen } from "@/components/ui/TitleScreen";
import { EventsCarousel, useEvents } from "@/features/events";
import { router } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";

export default function EventsScreen() {
  const { data: events, isLoading } = useEvents();

  return (
    <ScreenView>
      <TitleScreen>MES EVENTS</TitleScreen>
      <View className="flex-1 gap-md pt-md">
        <View
          className="gap-sm"
          style={{ marginHorizontal: -16 }} // Solution temporaire pour que le carroussel colle les bords
        >
          <Text className="pl-4 text-foreground font-semibold text-base">
            Événements à venir
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

// export default function EventsScreen() {
//   return (
//     <ScreenView scrollable={false}>
//       <TitleScreen>MES EVENTS</TitleScreen>
//       <View className="flex-1">
//         <FlatList
//           data={EVENTS_TEST}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <EventCard
//               event={item}
//               onPress={() => router.push(`/(app)/events/${item.id}`)}
//             />
//           )}
//         />
//       </View>
//     </ScreenView>
//   );
// }
