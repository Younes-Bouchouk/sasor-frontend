import { Text } from "react-native";
import { ScreenView } from "@/components/ui/ScreenView";
import { TitlePage } from "@/components/ui/TitlePage";

export default function CreateEventScreen() {
  return (
    <ScreenView modal>
      <TitlePage>CRÉER UN EVENT</TitlePage>
    </ScreenView>
  );
}
