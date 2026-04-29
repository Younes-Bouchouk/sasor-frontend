import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View } from "react-native";

type Props = {
  count: number;
  max: number;
};

function getColorConfig(count: number, max: number) {
  const ratio = count / max;
  if (ratio >= 0.8) return { bg: "bg-red-500", iconColor: "#fff" };
  if (ratio >= 0.5) return { bg: "bg-orange-500", iconColor: "#fff" };
  return { bg: "bg-green-500", iconColor: "#fff" };
}

export function ParticipantsBadge({ count, max }: Props) {
  const { bg, iconColor } = getColorConfig(count, max);

  return (
    <View className={`flex flex-row gap-1 ${bg} py-badge-y px-badge-x rounded-full`}>
      <Ionicons name="people-outline" size={14} color={iconColor} />
      <Text className="text-xs text-white">
        {count}/{max}
      </Text>
    </View>
  );
}
