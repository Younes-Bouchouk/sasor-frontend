import { Text, View } from "react-native";
import type { Event } from "../types";
import { formatSportLabel } from "../utils/formatSportLabel";

type Props = { sport: Event["sport"] };

export function SportBadge({ sport }: Props) {
  const label = formatSportLabel(sport);
  if (!label) return null;
  return (
    <View className="bg-foreground py-badge-y px-badge-x rounded-full">
      <Text className="text-xs text-primary-foreground">{label}</Text>
    </View>
  );
}
