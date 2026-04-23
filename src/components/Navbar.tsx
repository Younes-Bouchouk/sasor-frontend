import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { RelativePathString, useRouter } from "expo-router";
import React from "react";
import { Pressable, useColorScheme, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ViewType = {
  id: string;
  screen: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  isModal?: boolean;
};

const views: ViewType[] = [
  { id: "1", screen: "/", icon: "home" },
  { id: "2", screen: "/map", icon: "map" },
  { id: "3", screen: "/create", icon: "add" },
  { id: "4", screen: "/events", icon: "calendar-clear" },
  { id: "5", screen: "/search", icon: "search" },
];

// Convertit un chemin expo-router vers le nom de l'onglet dans le Tab navigator
const screenToTabName = (screen: string) =>
  screen === "/" ? "index" : screen.slice(1);

export default function Navbar({ state, navigation }: BottomTabBarProps) {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();

  const colorScheme = useColorScheme();
  const blurTint = colorScheme === "dark" ? "light" : "dark";
  const iconColor = colorScheme === "dark" ? "#fff" : "#000";

  const NavButton = ({ view }: { view: ViewType }) => {
    const handlePress = () => {
      const tabName = screenToTabName(view.screen);
      const tabRoute = state.routes.find((r) => r.name === tabName);

      if (!tabRoute) {
        router.push(view.screen as RelativePathString);
        return;
      }

      const event = navigation.emit({
        type: "tabPress",
        target: tabRoute.key,
        canPreventDefault: true,
      });

      if (!event.defaultPrevented) {
        navigation.navigate(tabName as never);
      }
    };

    return (
      <Pressable onPress={handlePress}>
        <Ionicons name={view.icon} size={32} color={iconColor} />
      </Pressable>
    );
  };

  return (
    <View className="absolute bottom-0 left-0 right-0 px-xl h-[60px]" style={{ bottom: bottom - 8 }}>
      <View className="h-full flex flex-row justify-between items-center gap-xl">
        <BlurView
          intensity={10}
          tint={blurTint}
          className="overflow-hidden h-full flex-1 flex flex-row justify-around items-center border border-border rounded-full "
        >
          {views.map((view) => (
            <NavButton key={view.id} view={view} />
          ))}
        </BlurView>
      </View>
    </View>
  );
}
