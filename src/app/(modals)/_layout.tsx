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
      <Stack.Screen
        name="event"
        options={{
          title: "Modal Event",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="user"
        options={{
          title: "Modal User",
          headerShown: false,

             }}
      />
            
        <Stack.Screen
           name="filterSearch"
            options={{
          title: "Modal Filter",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
