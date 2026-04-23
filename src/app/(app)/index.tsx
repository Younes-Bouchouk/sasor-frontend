import { ScreenView } from "@/components/ui/ScreenView";
import { TitleScreen } from "@/components/ui/TitleScreen";
import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function IndexScreen() {
  const router = useRouter();
  return (
    <ScreenView>
      <TitleScreen>ACCUEIL</TitleScreen>
      <View className="bg-background py-8 flex flex-col gap-4">
        <Text className="text-center text-foreground">couleur normale</Text>
        <Text className="text-center text-primary">couleur primaire</Text>
        <Text className="text-center text-secondary">couleur secondaire</Text>
        <Button title="Bouton pour aller à la page Map" onPress={() => router.push("/(app)/map")} />
        <Button
          title="Bouton pour créer un event"
          onPress={() => router.push("/(modals)/create")}
        />
      </View>
    </ScreenView>
  );
}
