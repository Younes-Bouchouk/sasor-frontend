import { Stack } from "expo-router";
import "../../global.css";

export default function ModalsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          title: "Connexion",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: "Inscription",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
