import { Text } from "react-native";
import { ScreenView } from "@/components/ui/ScreenView";
import { TitleScreen } from "@/components/ui/TitleScreen";

export default function CreateEventScreen() {
  return (
    <ScreenView modal>
      <TitleScreen>CRÉER UN EVENT</TitleScreen>
    </ScreenView>
  );
}
