import { Avatar } from "@/components/ui/Avatar";
import { ScreenView } from "@/components/ui/ScreenView";
import { TitleScreen } from "@/components/ui/TitleScreen";
import { useAuth } from "@/features/auth";
import { Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  return (
    <ScreenView>
      <TitleScreen>PROFIL</TitleScreen>
      <View className="flex-1 gap-md pt-md">
        <View className="items-center gap-sm">
          <Avatar uri={user?.image} size="lg" />
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

        <TouchableOpacity
          className="border border-red-500 rounded-lg py-sm items-center mt-auto mb-md"
          onPress={logout}
        >
          <Text className="text-red-500 font-semibold">Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </ScreenView>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <View className="flex-row justify-between px-md py-sm border-b border-border last:border-b-0">
      <Text className="text-foreground opacity-60">{label}</Text>
      <Text className="text-foreground font-medium">{value ?? "—"}</Text>
    </View>
  );
}
