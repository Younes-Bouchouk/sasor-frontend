import { ScreenView } from "@/components/ui/ScreenView";
import { TitleScreen } from "@/components/ui/TitleScreen";
import { fetchAPI } from "@/services/api";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

export default function IndexScreen() {
  const router = useRouter();
  const [test, setTest] = useState("chargement...");

  // Petit test API trkl
  useEffect(() => {
    fetchAPI("")
      .then((data) => setTest(data))
      .catch((err) => setTest(`Erreur: ${err.message}`));
  }, []);

  return (
    <ScreenView>
      <TitleScreen>ACCUEIL</TitleScreen>
      <View className="bg-background py-8 flex flex-col gap-4">
        <Text className="text-center text-foreground">test API : {test}</Text>
        <Text className="text-center text-foreground">couleur normale</Text>
        <Text className="text-center text-primary">couleur primaire</Text>
        <Text className="text-center text-secondary">couleur secondaire</Text>
        <Button
          title="Bouton pour aller à la page Map"
          onPress={() => router.push("/(app)/map")}
        />
        <Button
          title="Bouton pour créer un event"
          onPress={() => router.push("/(modals)/create")}
        />
      </View>
    </ScreenView>
  );
}
