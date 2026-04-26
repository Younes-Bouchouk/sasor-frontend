import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";

export default function AuthLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-background" edges={["top"]}>
      <Tabs
        // tabBar={(props) => <Navbar {...props} />}
        tabBar={undefined}
        screenOptions={{ headerShown: false }}
      >
        <Tabs.Screen
          name="login"
          options={{ tabBarStyle: { display: "none" } }}
        />
        <Tabs.Screen
          name="register"
          options={{ tabBarStyle: { display: "none" } }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
