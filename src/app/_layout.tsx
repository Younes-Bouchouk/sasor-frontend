import { AuthProvider, useAuth } from "@/contexts/AuthProvider";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import "../global.css";

function AuthGuard() {
  const { token, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    const inAuth = segments[0] === "(auth)";
    if (!token && !inAuth) {
      router.replace("/(auth)/login");
    } else if (token && inAuth) {
      router.replace("/(app)");
    }
  }, [token, isLoading, segments, router]);

  return null;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthGuard />
      <Stack>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(modals)"
          options={{
            headerShown: false,
            presentation: "modal",
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
