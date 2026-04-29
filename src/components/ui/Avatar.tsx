import { Image } from "expo-image";
import { router, usePathname } from "expo-router";
import { TouchableOpacity } from "react-native";

type AvatarSize = "sm" | "lg";

const sizeClass: Record<AvatarSize, string> = {
  sm: "w-avatar_sm",
  lg: "w-avatar_lg",
};

type Props = {
  id: string;
  uri?: string | null;
  size?: AvatarSize;
  onPress?: () => void;
};

export function Avatar({ id, uri, size = "sm", onPress }: Props) {
  const pathname = usePathname();
  const containerClass = `${sizeClass[size]} aspect-square rounded-full overflow-hidden border border-border bg-secondary`;

  const redirectToUserScreen = (id: string) => {
    console.log("");
    console.log(pathname);
    if (!["/user"].includes(pathname)) {
      router.push(`/(modals)/user?id=${id}`);
    }
    return null;
  };

  return (
    <TouchableOpacity
      className={containerClass}
      onPress={() => onPress ? onPress() : redirectToUserScreen(id)}
    >
      <Image
        style={{ width: "100%", height: "100%" }}
        contentFit="cover"
        source={uri ? { uri } : require("@/../assets/images/icon.png")}
      />
    </TouchableOpacity>
  );
}
