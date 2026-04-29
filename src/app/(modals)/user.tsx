import { Avatar } from "@/components/ui/Avatar";
import { ScreenView } from "@/components/ui/ScreenView";
import { TitleScreen } from "@/components/ui/TitleScreen";
import { useUser } from "@/features/users";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";

export default function UserModal() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: user, isLoading } = useUser(id);

  console.log("Id", id);
  console.log("Pseudo", user?.pseudo);

  return (
    <ScreenView modal>
      <TitleScreen>INFOS UTILISATEUR</TitleScreen>
      {isLoading ? (
        <ActivityIndicator className="flex-1" />
      ) : (
        <View className="flex-1 gap-md pt-md">
          <View className="items-center gap-sm">
            <Avatar id={id} uri={user?.profilePicture} size="lg" />
            <Text className="text-foreground text-xl font-bold">
              {user?.pseudo}
            </Text>
            <Text className="text-foreground opacity-60">{user?.email}</Text>
          </View>

          <View className="border border-border rounded-lg overflow-hidden">
            <Row label="Sexe" value={user?.sexe} />
            <Row
              label="Date de naissance"
              value={
                user?.birthday
                  ? new Date(user.birthday).toLocaleDateString("fr-FR")
                  : undefined
              }
            />
          </View>
        </View>
      )}
    </ScreenView>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <View className="flex-row justify-between px-md py-sm border-b border-border">
      <Text className="text-foreground opacity-60">{label}</Text>
      <Text className="text-foreground font-medium">{value ?? "—"}</Text>
    </View>
  );
}
