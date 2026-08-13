import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  useFonts,
  PlusJakartaSans_800ExtraBold,
} from "@expo-google-fonts/plus-jakarta-sans";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { AuthContext } from "../utils/authContext";

const CheckIcon = () => (
  <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
);

const EyeIcon = ({ visible, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Ionicons
      name={visible ? "eye-outline" : "eye-off-outline"}
      size={18}
      color="#ACB5BB"
    />
  </TouchableOpacity>
);

const Checkbox = ({ checked, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.checkbox}>
    {checked ? (
      <View style={styles.checkboxChecked}>
        <Ionicons name="checkmark" size={14} color="#FFF" />
      </View>
    ) : (
      <View style={styles.checkboxEmpty} />
    )}
  </TouchableOpacity>
);

export default function Login() {
  const { logIn } = useContext(AuthContext);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [fontsLoaded] = useFonts({
    PlusJakartaSans_800ExtraBold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleLogin = async () => {
    if (!isEmailValid || !password) {
      Alert.alert("Missing details", "Enter a valid email address and password.");
      return;
    }
    setIsSubmitting(true);
    try {
      await logIn({ email: email.trim().toLowerCase(), password });
    } catch (error) {
      Alert.alert("Login failed", error.message || "Unable to log in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateAccount = () => {
    router.push("/signup1");
  };

  const isEmailValid = email.includes("@") && email.includes(".");

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <LinearGradient
        colors={[
          "rgba(245, 184, 27, 0.5)",
          "rgba(245, 184, 27, 0.2)",
          "rgba(255, 255, 255, 0)",
        ]}
        locations={[0, 0.4, 1]}
        style={styles.topGradient}
        pointerEvents="none"
      />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.topSection}>
              {/* Brand */}
              <View style={styles.brandContainer}>
                <Image
                  source={require("../../assets/TRUST-icon.png")}
                  style={styles.brandIcon}
                  resizeMode="contain"
                />
                <Text style={styles.brandText}>TRUST</Text>
              </View>

              {/* Heading */}
              <View style={styles.headingContainer}>
                <Text style={styles.title}>Sign in to your{"\n"}Account</Text>
                <Text style={styles.subtitle}>
                  Enter your email and password to log in
                </Text>
              </View>

              {/* Form */}
              <View style={styles.form}>
                {/* Email */}
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    placeholderTextColor="#6C7278"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  {isEmailValid && <CheckIcon />}
                </View>

                {/* Password */}
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#6C7278"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <EyeIcon
                    visible={showPassword}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                </View>

                {/* Options */}
                <View style={styles.optionsRow}>
                  <View style={styles.rememberMeContainer}>
                    <Checkbox
                      checked={rememberMe}
                      onPress={() => setRememberMe(!rememberMe)}
                    />
                    <Text style={styles.rememberMeText}>Remember me</Text>
                  </View>

                  <TouchableOpacity onPress={() => router.push("/forgot-password")}>
                    <Text style={styles.forgotText}>Forgot Password ?</Text>
                  </TouchableOpacity>
                </View>

                {/* Login button */}
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleLogin}
                  activeOpacity={0.8}
                  disabled={isSubmitting}
                >
                  <LinearGradient
                    colors={["rgba(255, 255, 255, 0.12)", "rgba(255, 255, 255, 0)"]}
                    style={StyleSheet.absoluteFill}
                  />
                  {isSubmitting ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.loginButtonText}>Log In</Text>
                  )}
                </TouchableOpacity>

                {/* Divider */}
                <View style={styles.dividerContainer}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>Or</Text>
                  <View style={styles.dividerLine} />
                </View>

                {/* Create account */}
                <TouchableOpacity
                  style={styles.createAccountButton}
                  onPress={handleCreateAccount}
                  activeOpacity={0.8}
                >
                  <Text style={styles.createAccountText}>Create an account</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Powered by Blockchain Technology,{"\n"}
                Ghana Revenue Authority © 2026.
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  topGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    zIndex: 0,
  },
  safeArea: {
    flex: 1,
    zIndex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: "space-between",
  },
  topSection: {
    flex: 1,
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 30,
  },
  brandIcon: {
    width: 31.36,
    height: 42.15,
  },
  brandText: {
    color: "#000",
    fontFamily: "PlusJakartaSans_800ExtraBold",
    fontSize: 24,
    fontWeight: "800",
  },
  headingContainer: {
    marginBottom: 40,
    gap: 8,
  },
  title: {
    color: "#1A1C1E",
    fontFamily: "Inter_700Bold",
    fontSize: 33.576,
    fontWeight: "700",
    lineHeight: 43.649,
    letterSpacing: -0.672,
  },
  subtitle: {
    color: "#6C7278",
    fontFamily: "Inter_500Medium",
    fontSize: 12.591,
    fontWeight: "500",
    lineHeight: 17.628,
    letterSpacing: -0.126,
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 48.266,
    paddingHorizontal: 14.69,
    borderRadius: 10.493,
    borderWidth: 1.049,
    borderColor: "#EDF1F3",
    backgroundColor: "#FFFFFF",
    shadowColor: "#E4E5E7",
    shadowOffset: { width: 0, height: 1.049 },
    shadowOpacity: 0.24,
    shadowRadius: 2.099,
    elevation: 1,
    gap: 10,
  },
  input: {
    flex: 1,
    color: "#1A1C1E",
    fontFamily: "Inter_500Medium",
    fontSize: 14.69,
    fontWeight: "500",
    letterSpacing: -0.147,
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxEmpty: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: "#6C7278",
    borderRadius: 4,
  },
  checkboxChecked: {
    width: 18,
    height: 18,
    backgroundColor: "#F5B81B",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  rememberMeText: {
    color: "#6C7278",
    fontFamily: "Inter_500Medium",
    fontSize: 12.591,
    fontWeight: "500",
    letterSpacing: -0.126,
  },
  forgotText: {
    color: "#F5B81B",
    fontFamily: "Inter_600SemiBold",
    fontSize: 12.591,
    fontWeight: "600",
    letterSpacing: -0.126,
  },
  loginButton: {
    height: 50.365,
    paddingHorizontal: 25.182,
    paddingVertical: 10.493,
    borderRadius: 10.493,
    borderWidth: 1.049,
    borderColor: "#FFFFFF",
    backgroundColor: "#F5B81B",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "#253EA7",
    shadowOffset: { width: 0, height: 1.049 },
    shadowOpacity: 0.3,
    shadowRadius: 2.099,
    elevation: 4,
    marginTop: 8,
  },
  loginButtonText: {
    color: "#000000",
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    fontWeight: "600",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16.788,
    marginVertical: 4,
  },
  dividerLine: {
    flex: 1,
    height: 1.049,
    backgroundColor: "#EDF1F3",
  },
  dividerText: {
    color: "#6C7278",
    fontFamily: "Inter_400Regular",
    fontSize: 12.591,
    fontWeight: "400",
    textAlign: "center",
    letterSpacing: -0.126,
  },
  createAccountButton: {
    height: 50.365,
    paddingHorizontal: 25.182,
    paddingVertical: 10.493,
    borderRadius: 10.493,
    borderWidth: 1.049,
    borderColor: "#EFF0F6",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#F4F5FA",
    shadowOffset: { width: 0, height: -3.148 },
    shadowOpacity: 0.6,
    shadowRadius: 6.296,
    elevation: 1,
  },
  createAccountText: {
    color: "#1A1C1E",
    fontFamily: "Inter_600SemiBold",
    fontSize: 14.69,
    fontWeight: "600",
    letterSpacing: -0.147,
  },
  footer: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 10,
  },
  footerText: {
    color: "#6C7278",
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 15.4,
    letterSpacing: -0.11,
    width: 343,
    maxWidth: "100%",
  },
});
