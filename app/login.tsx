import { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const e = email.trim();

    if (!e || !password) {
      Alert.alert("Falta información", "Ingresa correo y contraseña.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, e, password);
      router.replace("/(tabs)");
    } catch (err: any) {
      Alert.alert("No se pudo iniciar sesión", err?.message ?? "Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center", gap: 12 }}>
      <Text style={{ fontSize: 28, fontWeight: "700" }}>Iniciar sesión</Text>

      <TextInput
        placeholder="Correo"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 10,
        }}
      />

      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 10,
        }}
      />

      <Pressable
        onPress={handleLogin}
        disabled={loading}
        style={{
          padding: 12,
          borderRadius: 10,
          alignItems: "center",
          backgroundColor: loading ? "#999" : "#111",
        }}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>
          {loading ? "Ingresando..." : "Ingresar"}
        </Text>
      </Pressable>

      <Text style={{ marginTop: 10 }}>
        ¿No tienes cuenta?{" "}
        <Link href="/register" style={{ fontWeight: "700" }}>
          Regístrate
        </Link>
      </Text>
    </View>
  );
}

