import { ScreenView } from "@/components/ui/ScreenView";
import { TitleScreen } from "@/components/ui/TitleScreen";
import { LoginForm } from "@/features/auth";
import { fetchAPI } from "@/services/api";
import { useEffect, useState } from "react";

export default function LoginScreen() {
  const [test, setTest] = useState("chargement...");

  useEffect(() => {
    fetchAPI("")
      .then((data) => setTest(data))
      .catch((err) => setTest(`Erreur: ${err.message}`));
  }, []);

  return (
    <ScreenView className="h-screen max-h-[100vh] bg-foreground p-8">
      <TitleScreen className="text-secondary">Connecte toi !</TitleScreen>
      {/* <Text className="text-white text-center">test API: {test}</Text> */}
      <LoginForm />
    </ScreenView>
  );
}
