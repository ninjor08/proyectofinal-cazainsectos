import { View, Text, Pressable, Alert } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export default function ExploreScreen() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      Alert.alert("Error", "No se pudo cerrar sesión.");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center", gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>Mi cuenta</Text>
      <Text style={{ color: "#444" }}>
        Sesión: {auth.currentUser?.email ?? "Sin correo"}
      </Text>

      <Pressable
        onPress={handleLogout}
        style={{
          padding: 12,
          borderRadius: 10,
          alignItems: "center",
          backgroundColor: "#111",
          marginTop: 10,
        }}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>Cerrar sesión</Text>
      </Pressable>
    </View>
  );
}

