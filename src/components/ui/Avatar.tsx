import { Image } from "expo-image";
import { TouchableOpacity, View } from "react-native";

type AvatarSize = "sm" | "lg";

const sizeClass: Record<AvatarSize, string> = {
  sm: "w-avatar_sm",
  lg: "w-avatar_lg",
};

type Props = {
  uri?: string | null;
  size?: AvatarSize;
  onPress?: () => void;
};

export function Avatar({ uri, size = "sm", onPress }: Props) {
  const containerClass = `${sizeClass[size]} aspect-square rounded-full overflow-hidden border border-border bg-secondary`;

  const image = (
    <Image
      style={{ width: "100%", height: "100%" }}
      contentFit="cover"
      source={uri ? { uri } : require("@/../assets/images/icon.png")}
    />
  );

  if (onPress) {
    return (
      <TouchableOpacity className={containerClass} onPress={onPress}>
        {image}
      </TouchableOpacity>
    );
  }

  return <View className={containerClass}>{image}</View>;
}
