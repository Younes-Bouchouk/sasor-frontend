import { router } from "expo-router";
import { Button, Text } from "react-native";

export default function EventsScreen() {
  return (
    <>
    <Text className="text-center text-xl">Page - Mes événements</Text>
    <Button 
      title="Test"
      onPress={()=>router.push({
        pathname: "/events/[id]",
        params: {id: "Test"}
      })}
      />
    </>
  );
}
