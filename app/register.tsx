import { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const e = email.trim();

    if (!e || !password || !confirm) {
      Alert.alert("Falta información", "Completa todos los campos.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Contraseña débil", "Usa al menos 6 caracteres.");
      return;
    }
    if (password !== confirm) {
      Alert.alert("No coincide", "Las contraseñas no son iguales.");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, e, password);
      router.replace("/(tabs)");
    } catch (err: any) {
      Alert.alert("No se pudo crear la cuenta", err?.message ?? "Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center", gap: 12 }}>
      <Text style={{ fontSize: 28, fontWeight: "700" }}>Crear cuenta</Text>

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
        placeholder="Contraseña (mín. 6)"
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

      <TextInput
        placeholder="Confirmar contraseña"
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 10,
        }}
      />

      <Pressable
        onPress={handleRegister}
        disabled={loading}
        style={{
          padding: 12,
          borderRadius: 10,
          alignItems: "center",
          backgroundColor: loading ? "#999" : "#111",
        }}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>
          {loading ? "Creando..." : "Crear cuenta"}
        </Text>
      </Pressable>

      <Text style={{ marginTop: 10 }}>
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" style={{ fontWeight: "700" }}>
          Inicia sesión
        </Link>
      </Text>
    </View>
  );
}


