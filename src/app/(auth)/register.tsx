import { ScreenView } from "@/components/ui/ScreenView";
import { TitleScreen } from "@/components/ui/TitleScreen";
import { useAuth } from "@/contexts/AuthProvider";
import { fetchAPI } from "@/services/api";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Sexe = "masculin" | "féminin" | "autre";
const SEXE_OPTIONS: Sexe[] = ["masculin", "féminin", "autre"];

export default function RegisterScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [sexe, setSexe] = useState<Sexe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError(null);
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (!sexe) {
      setError("Veuillez sélectionner votre sexe.");
      return;
    }
    setLoading(true);
    try {
      const data = await fetchAPI("/auth/register", "POST", null, {
        pseudo,
        email,
        password,
        confirmPassword,
        birthday: new Date(birthday).toISOString(),
        sexe,
      });
      await login(data.access_token);
    } catch (e: any) {
      setError(e.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenView>
      <TitleScreen>INSCRIPTION</TitleScreen>
      <View className="flex-1 gap-sm pt-md">
        <TextInput
          className="border border-border rounded-lg px-md py-sm text-foreground bg-background"
          placeholder="Pseudo"
          placeholderTextColor="#888"
          autoCapitalize="none"
          value={pseudo}
          onChangeText={setPseudo}
        />
        <TextInput
          className="border border-border rounded-lg px-md py-sm text-foreground bg-background"
          placeholder="Email"
          placeholderTextColor="#888"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="border border-border rounded-lg px-md py-sm text-foreground bg-background"
          placeholder="Mot de passe (8-20 caractères)"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          className="border border-border rounded-lg px-md py-sm text-foreground bg-background"
          placeholder="Confirmer le mot de passe"
          placeholderTextColor="#888"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TextInput
          className="border border-border rounded-lg px-md py-sm text-foreground bg-background"
          placeholder="Date de naissance (YYYY-MM-DD)"
          placeholderTextColor="#888"
          value={birthday}
          onChangeText={setBirthday}
        />
        <View className="flex-row gap-xs">
          {SEXE_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => setSexe(option)}
              className={`flex-1 border rounded-lg py-sm items-center ${
                sexe === option
                  ? "bg-primary border-primary"
                  : "border-border"
              }`}
            >
              <Text
                className={`capitalize ${
                  sexe === option ? "text-primary-foreground" : "text-foreground"
                }`}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {error && <Text className="text-red-500 text-sm">{error}</Text>}
        <TouchableOpacity
          className="bg-primary rounded-lg py-sm items-center"
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-primary-foreground font-semibold">
              {"S'inscrire"}
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center mt-xs"
          onPress={() => router.replace("/(auth)/login")}
        >
          <Text className="text-foreground opacity-60">
            {"Déjà un compte ? "}
            <Text className="text-primary">Se connecter</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenView>
  );
}
