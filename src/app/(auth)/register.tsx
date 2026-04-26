import { ScreenView } from "@/components/ui/ScreenView";
import { TitleScreen } from "@/components/ui/TitleScreen";
import { RegisterForm } from "@/features/auth";

export default function RegisterScreen() {
  return (
    <ScreenView>
      <TitleScreen>INSCRIPTION</TitleScreen>
      <RegisterForm />
    </ScreenView>
  );
}
