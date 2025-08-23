import { Ionicons } from "@expo/vector-icons"; // Expo built-in icons
import { useRouter } from "expo-router";
import React from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";



export default function LoginScreen() {
const navigation = useRouter() 
  return (
    <View style={styles.container}>
      {/* Header with logo */}
      <View style={styles.header}>
        {/* <Image
          source={require("../../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        /> */}
        <TouchableOpacity
          style={styles.guestButton}
          onPress={() => navigation.replace("/home")}
        >
          <Text style={styles.guestText}>Continue as a Guest</Text>
        </TouchableOpacity>
      </View>

      {/* Free delivery banner */}
      <View style={styles.banner}>
        <Ionicons name="bicycle-outline" size={28} color="white" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.bannerTitle}>first order with free delivery!</Text>
          <Text style={styles.bannerSub}>for new customers only</Text>
        </View>
      </View>

      {/* Welcome text */}
      <Text style={styles.welcome}>Welcome</Text>
      <Text style={styles.subText}>Let’s Start with your phone Number</Text>

      {/* Phone input */}
      <View style={styles.phoneInput}>
        <Text style={styles.countryCode}>+234</Text>
        <TextInput
          placeholder="Phone number"
          keyboardType="phone-pad"
          style={styles.input}
        />
      </View>

      {/* Get SMS */}
      <TouchableOpacity style={styles.smsButton}>
        <Text style={styles.smsText}>Get SMS</Text>
      </TouchableOpacity>

      {/* Divider */}
      <Text style={styles.orText}>or with</Text>

      {/* Google login */}
      <TouchableOpacity style={styles.googleButton}>
        <Ionicons name="logo-google" size={20} color="black" />
        <Text style={styles.googleText}>Google</Text>
      </TouchableOpacity>

      {/* Terms */}
      <Text style={styles.terms}>
        By continuing you automatically accept our Terms & conditions, privacy
        policy and cookie policy
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20, paddingTop: 40 },
  header: { alignItems: "center" },
  logo: { width: 140, height: 140 },
  guestButton: {
    marginTop: 10,
    backgroundColor: "#f7f7f7",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  guestText: { fontSize: 14, fontWeight: "600" },
  banner: {
    flexDirection: "row",
    backgroundColor: "#E4572E",
    padding: 12,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
  },
  bannerTitle: { color: "white", fontWeight: "700" },
  bannerSub: { color: "white", fontSize: 12 },
  welcome: { fontSize: 24, fontWeight: "700", textAlign: "center", marginTop: 30 },
  subText: { fontSize: 14, color: "#666", textAlign: "center", marginBottom: 20 },
  phoneInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  countryCode: { marginRight: 10, fontWeight: "600" },
  input: { flex: 1, height: 40 },
  smsButton: {
    backgroundColor: "black",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 10,
  },
  smsText: { color: "white", fontWeight: "600" },
  orText: { textAlign: "center", marginVertical: 10, color: "#888" },
  googleButton: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  googleText: { marginLeft: 8, fontWeight: "600" },
  terms: {
    fontSize: 11,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
    lineHeight: 16,
  },
});
