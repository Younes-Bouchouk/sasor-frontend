import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../providers/AuthProvider";
import {
  REGISTER_PASSWORD_CRITERIA,
  validateRegisterForm,
} from "../registerRules";
import { authService } from "../services/authService";
import { SEXE_OPTIONS, Sexe } from "../types";

export function RegisterForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [sexe, setSexe] = useState<Sexe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError(null);
    const validationError = validateRegisterForm({
      pseudo,
      email,
      password,
      birthday,
      sexe,
    });
    if (validationError) {
      setError(validationError);
      return;
    }
    const trimmedPseudo = pseudo.trim();
    const trimmedEmail = email.trim();
    const birth = new Date(birthday.trim());
    setLoading(true);
    try {
      const data = await authService.registerUser({
        pseudo: trimmedPseudo,
        email: trimmedEmail,
        password,
        birthday: birth.toISOString(),
        sexe: sexe!,
      });
      await login(data.access_token);
    } catch (e: any) {
      setError(e.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="h-full max-h-[100vh] flex-1 gap-sm pt-md">
      <TextInput
        className="border border-gray-800 rounded-lg px-md py-sm text-white bg-transparent"
        placeholder="Pseudo"
        placeholderTextColor="#fff"
        autoCapitalize="none"
        value={pseudo}
        onChangeText={setPseudo}
      />
      <TextInput
        className="border border-gray-800 rounded-lg px-md py-sm text-white bg-transparent"
        placeholder="Email"
        placeholderTextColor="#fff"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="border border-gray-800 rounded-lg px-md py-sm text-white bg-transparent"
        placeholder="Mot de passe"
        placeholderTextColor="#fff"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View className="gap-xs">
        {REGISTER_PASSWORD_CRITERIA.map((criterion) => (
          <Text key={criterion} className="text-xs text-white/60">
            • {criterion}
          </Text>
        ))}
      </View>
      <TextInput
        className="border border-gray-800 rounded-lg px-md py-sm text-white bg-transparent"
        placeholder="Date de naissance (YYYY-MM-DD)"
        placeholderTextColor="#fff"
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
                ? "bg-secondary border-secondary"
                : "border-gray-800"
            }`}
          >
            <Text
              className={`capitalize ${
                sexe === option ? "text-secondary-foreground" : "text-secondary"
              }`}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {error && <Text className="text-red-500 text-sm">{error}</Text>}
      <TouchableOpacity
        className="bg-secondary rounded-lg py-sm items-center"
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-secondary-foreground font-semibold">
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
          <Text className="text-secondary">Se connecter</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
