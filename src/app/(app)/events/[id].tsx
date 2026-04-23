import { ScreenView } from "@/components/ui/ScreenView";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { Text, useWindowDimensions, View } from "react-native";
import { EVENTS_TEST } from ".";

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { width } = useWindowDimensions();
  const event = EVENTS_TEST.find((e) => e.id === id);

  if (!event) {
    return (
      <ScreenView>
        <Text className="text-foreground text-center mt-8">Événement introuvable.</Text>
      </ScreenView>
    );
  }

  return (
    <ScreenView className="">
      <Image
        source={{ uri: event.image }}
        contentFit="cover"
        style={{ width, height: 220, marginHorizontal: -8 }}
      />

      <View className="mt-md gap-sm">
        <Text className="text-foreground text-2xl font-bold">{event.title}</Text>

        <View className="flex flex-row gap-xs flex-wrap">
          <View className="bg-primary/20 px-sm py-1 rounded-full">
            <Text className="text-primary text-sm font-medium">{event.sport}</Text>
          </View>
        </View>

        <View className="gap-xs mt-xs">
          <Row label="Date" value={event.date} />
          <Row label="Lieu" value={event.location} />
        </View>

        <View className="mt-xs">
          <Text className="text-foreground opacity-50 text-xs uppercase mb-xs">Description</Text>
          <Text className="text-foreground leading-6">{event.description}</Text>
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
