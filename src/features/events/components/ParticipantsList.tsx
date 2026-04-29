import { Avatar } from "@/components/ui/Avatar";
import { FlatList, Text, View } from "react-native";
import type { Organizer, Participants } from "../types";

type Props = {
  participants: Participants[];
  organizer: Organizer;
  maxParticipants: number;
};

export function ParticipantsList({ participants, organizer, maxParticipants }: Props) {
  const withoutOrganizer = participants.filter(
    (p) => p.participant.id !== organizer.id,
  );
  const sorted = [{ participant: organizer }, ...withoutOrganizer];

  return (
    <View className="gap-xs">
      <View className="flex-row justify-between items-center">
        <Text className="text-foreground font-semibold">Participants</Text>
        <Text className="text-foreground opacity-50 text-sm">
          {participants.length}/{maxParticipants}
        </Text>
      </View>
      <FlatList
        data={sorted}
        keyExtractor={(item) => item.participant.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12 }}
        renderItem={({ item }) => {
          const isOrg = item.participant.id === organizer.id;
          return (
            <View className="items-center gap-1 w-14">
              <Avatar
                id={item.participant.id}
                uri={item.participant.profilePicture}
                className={isOrg ? "border border-primary" : ""}
              />
              <Text
                className={`${isOrg ? "text-primary" : "text-foreground"} text-xs text-center`}
                numberOfLines={1}
              >
                {item.participant.pseudo}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}
