import { ScreenView } from "@/components/ui/ScreenView";
import { TitleScreen } from "@/components/ui/TitleScreen";
import { RegisterForm } from "@/features/auth";

export default function RegisterScreen() {
  return (
    <ScreenView className="h-screen max-h-[100vh] bg-foreground p-8">
      <TitleScreen className="text-secondary">Pas encore inscrit ?</TitleScreen>
      <RegisterForm />
    </ScreenView>
  );
}
