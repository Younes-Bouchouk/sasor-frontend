import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { RelativePathString, usePathname, useRouter } from "expo-router";
import React from "react";
import { Pressable, TouchableOpacity, useColorScheme, View } from "react-native";
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
  const pathname = usePathname();
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
    <>
      <View className="absolute bottom-0 left-md right-md h-[60px]" style={{ bottom: bottom - 8 }}>
        <View className="h-full flex flex-row justify-between items-center gap-xl">
          <BlurView
            intensity={10}
            tint={blurTint}
            className="overflow-hidden h-full flex-1 flex flex-row justify-around items-center border border-border rounded-full"
          >
            {views.map((view) => (
              <NavButton key={view.id} view={view} />
            ))}
          </BlurView>
        </View>
      </View>
      {
        ["/", "/map"].includes(pathname) && (
          <View className="absolute top-xs right-md">
            <TouchableOpacity 
              onPress={()=>{
                const tabName = screenToTabName("/profile");
                const tabRoute = state.routes.find((r) => r.name === tabName);

                if (!tabRoute) {
                  router.push('/profile' as RelativePathString);
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
              }}
              className="w-avatar aspect-square rounded-full overflow-hidden border border-border bg-secondary"
            >
              <Image
                style={{width:"100%", height:"100%"}}
                contentFit="cover"
                source={{ uri: "https://static.wikia.nocookie.net/captaintsubasa/images/0/0f/Genz%C3%B4_Wakabayashi_1983_2.jpg/revision/latest?cb=20190927155619&path-prefix=fr" }}
              />
            </TouchableOpacity>
          </View>
        )
      }
    </>
  );
}
