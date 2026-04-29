import Navbar from "@/components/layout/Navbar";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-background" edges={["top"]}>
      <Tabs
        tabBar={(props) => <Navbar {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Tabs.Screen name="index" options={{ title: "Accueil" }} />
        <Tabs.Screen name="map/index" options={{ title: "Map" }} />
        <Tabs.Screen name="events" options={{ title: "Mes events" }} />
        <Tabs.Screen name="search" options={{ title: "Recherche" }} />
        <Tabs.Screen name="profile" options={{ title: "Profil" }} />
      </Tabs>
    </SafeAreaView>
  );
}
