import { Stack } from "expo-router";
import "../../global.css";

export default function ModalsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="create"
        options={{
          title: "Modal Create",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
