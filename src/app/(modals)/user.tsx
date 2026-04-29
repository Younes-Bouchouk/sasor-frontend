import { Avatar } from "@/components/ui/Avatar";
import { ScreenView } from "@/components/ui/ScreenView";
import { useUser } from "@/features/users";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function UserModal() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: user, isLoading } = useUser(id);
  const iconColor = useColorScheme() === "dark" ? "#fff" : "#000";

  console.log("Id", id);
  console.log("Pseudo", user?.pseudo);

  return (
    <ScreenView modal>
      <TouchableOpacity
        onPress={() => router.back()}
        className="self-start px-sm pt-xs"
      >
        <Ionicons name="arrow-back" size={24} color={iconColor} />
      </TouchableOpacity>
      {/* <TitleScreen>INFOS UTILISATEUR</TitleScreen> */}
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
