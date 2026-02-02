// app/_layout.tsx
import { useEffect, useState } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setChecking(false);
    });

    return unsub;
  }, []);

  useEffect(() => {
    if (checking) return;

    const inTabs = segments[0] === "(tabs)";
    const inAuth = segments[0] === "login" || segments[0] === "register";

    // Si no hay usuario y quiere entrar a tabs -> mandarlo a login
    if (!user && inTabs) {
      router.replace("/login");
      return;
    }

    // Si hay usuario y está en login/register -> mandarlo a tabs
    if (user && inAuth) {
      router.replace("/(tabs)");
      return;
    }
  }, [checking, user, segments, router]);

  // Evita parpadeos mientras Firebase confirma si hay sesión
  if (checking) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
    </Stack>
  );
}

