
import Ionicons from "@expo/vector-icons/Ionicons";
import { useCurrentUser } from "@/features/users";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { RelativePathString, usePathname, useRouter } from "expo-router";
import React from "react";
import { Pressable, useColorScheme, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar } from "../ui/Avatar";

type ViewType = {
  id: string;
  screen: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  isModal?: boolean;
};

const views: ViewType[] = [
  { id: "2", screen: "/map", icon: "map" },
  { id: "1", screen: "/", icon: "home" },
  { id: "3", screen: "/create", icon: "add" },
  { id: "4", screen: "/events", icon: "calendar-clear" },
  { id: "5", screen: "/search", icon: "search" },
];

const screenToTabName = (screen: string) => {
  if (screen === "/") return "index";
  if (screen === "/map") return "map/index";
  return screen.slice(1);
};

export default function Navbar({ state, navigation }: BottomTabBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { top, bottom } = useSafeAreaInsets();

  const { data: user } = useCurrentUser();
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
    <>
      <View
        className="absolute bottom-0 left-screen_edge right-screen_edge h-navbar"
        style={{ bottom: bottom - 8 }}
      >
        <View className="h-full flex flex-row justify-between items-center gap-xl">
          <BlurView
            intensity={pathname === "/map" ? 100 : 10}
            tint={pathname === "/map" ? "light" : blurTint}
            className="overflow-hidden h-full flex-1 flex flex-row justify-around items-center border border-border rounded-full"
          >
            {views.map((view) => (
              <NavButton key={view.id} view={view} />
            ))}
          </BlurView>
        </View>
      </View>
      {["/", "/map"].includes(pathname) && user && (
        <View className="absolute top-screen_edge right-screen_edge">
          <Avatar
            id={String(user.id)}
            uri={user.profilePicture}
            size="sm"
            onPress={() => router.push("/profile" as RelativePathString)}
          />
        </View>
      )}
    </>
  );
}
