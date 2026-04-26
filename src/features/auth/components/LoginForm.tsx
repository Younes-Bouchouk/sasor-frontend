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
import { authService } from "../services/authService";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await authService.loginUser(email, password);
      await login(data.access_token);
    } catch (e: any) {
      setError(e.message || "Identifiants incorrects.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 gap-sm pt-md">
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
        placeholder="Mot de passe"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error && <Text className="text-red-500 text-sm">{error}</Text>}
      <TouchableOpacity
        className="bg-primary rounded-lg py-sm items-center"
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-primary-foreground font-semibold">
            Se connecter
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        className="items-center mt-xs"
        onPress={() => router.replace("/(auth)/register")}
      >
        <Text className="text-foreground opacity-60">
          Pas de compte ? <Text className="text-primary">{"S'inscrire"}</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
