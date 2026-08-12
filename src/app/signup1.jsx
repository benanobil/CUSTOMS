import React, { useState } from "react";
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
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import {
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";

// ══════════════════════════════════════════════════
// ICONS
// ══════════════════════════════════════════════════
const CheckIcon = () => (
  <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
);

const ErrorIcon = () => (
  <Ionicons name="close-circle" size={20} color="#EF4444" />
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

// ══════════════════════════════════════════════════
// MAIN SCREEN
// ══════════════════════════════════════════════════
export default function Signup1() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fontsLoaded] = useFonts({
    PlusJakartaSans_800ExtraBold,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Roboto_400Regular,
    Roboto_500Medium,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // ─── Navigate to Signup2 with user data ─────────
  const handleContinue = () => {
    router.push({
      pathname: "/signup2",
      params: {
        firstName,
        lastName,
        email,
        phoneNumber: `+233 ${phone}`,
        password,
      },
    });
  };

  const handleBack = () => {
    router.back();
  };

  // ─── Validation ─────────────────────────────────
  const isPhoneValid = phone.length >= 9;
  const isPasswordValid = password.length >= 6;
  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const passwordsMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  const getLineColor = (isValid, hasError) => {
    if (hasError) return "#EF4444";
    if (isValid) return "#4CAF50";
    return "#000113";
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* Top yellow gradient */}
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
            {/* ─── Logo + Brand ─── */}
            <View style={styles.brandContainer}>
              <Image
                source={require("../../assets/TRUST-icon.png")}
                style={styles.brandIcon}
                resizeMode="contain"
              />
              <Text style={styles.brandText}>TRUST</Text>
            </View>

            {/* ─── Title with back arrow ─── */}
            <View style={styles.titleRow}>
              <TouchableOpacity onPress={handleBack}>
                <Ionicons name="arrow-back" size={26} color="#1A1C1E" />
              </TouchableOpacity>
              <Text style={styles.title}>Personal Info</Text>
            </View>

            {/* ─── Form ─── */}
            <View style={styles.form}>
              {/* First Name */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>FirstName</Text>
                <View
                  style={[
                    styles.inputRow,
                    { borderBottomColor: getLineColor(firstName.length > 0, false) },
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                  {firstName.length > 0 && <CheckIcon />}
                </View>
              </View>

              {/* Last Name */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>LastName</Text>
                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.input}
                    value={lastName}
                    onChangeText={setLastName}
                  />
                </View>
              </View>

              {/* Email */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Email</Text>
                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Phone Number */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <View
                  style={[
                    styles.phoneRow,
                    { borderBottomColor: getLineColor(isPhoneValid, false) },
                  ]}
                >
                  <TouchableOpacity style={styles.countryPicker}>
                    <Text style={styles.flag}>🇬🇭</Text>
                    <Ionicons name="chevron-down" size={14} color="#6C7278" />
                  </TouchableOpacity>

                  <View style={styles.verticalDivider} />

                  <TextInput
                    style={styles.phoneInput}
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    placeholder="(233) 507758901"
                    placeholderTextColor="#000113"
                  />
                  {isPhoneValid && <CheckIcon />}
                </View>
              </View>

              {/* Set Password */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Set Password</Text>
                <View
                  style={[
                    styles.inputRow,
                    { borderBottomColor: getLineColor(isPasswordValid, false) },
                  ]}
                >
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={[
                        styles.input,
                        !showPassword && { color: "transparent" },
                      ]}
                      value={password}
                      onChangeText={setPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    {!showPassword && password.length > 0 && (
                      <Text style={styles.passwordOverlay} pointerEvents="none">
                        {"*".repeat(password.length)}
                      </Text>
                    )}
                  </View>
                  <View style={styles.iconGroup}>
                    <EyeIcon
                      visible={showPassword}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                    {isPasswordValid && <CheckIcon />}
                  </View>
                </View>
              </View>

              {/* Confirm Password */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <View
                  style={[
                    styles.inputRow,
                    {
                      borderBottomColor: getLineColor(
                        passwordsMatch,
                        passwordsMismatch
                      ),
                    },
                  ]}
                >
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={[
                        styles.input,
                        !showConfirmPassword && { color: "transparent" },
                      ]}
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    {!showConfirmPassword && confirmPassword.length > 0 && (
                      <Text style={styles.passwordOverlay} pointerEvents="none">
                        {"*".repeat(confirmPassword.length)}
                      </Text>
                    )}
                  </View>
                  <View style={styles.iconGroup}>
                    <EyeIcon
                      visible={showConfirmPassword}
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                    {passwordsMatch && <CheckIcon />}
                    {passwordsMismatch && <ErrorIcon />}
                  </View>
                </View>
                {passwordsMismatch && (
                  <Text style={styles.errorText}>Password Mismatch</Text>
                )}
              </View>
            </View>
          </ScrollView>

          {/* ─── Continue Button ─── */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.continueButton,
                (!firstName ||
                  !lastName ||
                  !email ||
                  !isPhoneValid ||
                  !isPasswordValid ||
                  !passwordsMatch) && { opacity: 0.5 },
              ]}
              onPress={handleContinue}
              activeOpacity={0.8}
              disabled={
                !firstName ||
                !lastName ||
                !email ||
                !isPhoneValid ||
                !isPasswordValid ||
                !passwordsMatch
              }
            >
              <LinearGradient
                colors={[
                  "rgba(255, 255, 255, 0.12)",
                  "rgba(255, 255, 255, 0)",
                ]}
                style={StyleSheet.absoluteFill}
              />
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

// ══════════════════════════════════════════════════
// STYLES
// ══════════════════════════════════════════════════
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 25.182,
    paddingBottom: 16.788,
    paddingTop: 40,
    alignItems: "stretch",
  },

  // Brand
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 8,
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

  // Title
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  title: {
    color: "#1A1C1E",
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: -0.5,
  },

  // Form
  form: {
    gap: 14,
  },

  // Floating Input
  inputWrapper: {
    gap: 2,
  },
  inputLabel: {
    color: "#000113",
    fontFamily: "Roboto_400Regular",
    fontSize: 12.843,
    fontWeight: "400",
    lineHeight: 16,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1.089,
    borderBottomColor: "#000113",
    paddingVertical: 4,
    gap: 8,
  },
  input: {
    flex: 1,
    color: "#000113",
    fontFamily: "Roboto_400Regular",
    fontSize: 15.387,
    fontWeight: "400",
    lineHeight: 21.981,
    paddingVertical: 2,
  },
  iconGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  // Password
  passwordContainer: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
  },
  passwordOverlay: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    color: "#000113",
    fontFamily: "Roboto_400Regular",
    fontSize: 18,
    fontWeight: "400",
    textAlignVertical: "center",
    letterSpacing: 3,
    paddingTop: 4,
  },

  // Phone
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1.089,
    borderBottomColor: "#000113",
    paddingVertical: 4,
    gap: 8,
  },
  countryPicker: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingRight: 8,
  },
  verticalDivider: {
    width: 1,
    height: 24,
    backgroundColor: "#000113",
    marginHorizontal: 4,
  },
  flag: {
    fontSize: 20,
  },
  phoneInput: {
    flex: 1,
    color: "#000113",
    fontFamily: "Inter_500Medium",
    fontSize: 17.134,
    fontWeight: "500",
    paddingVertical: 4,
    paddingLeft: 8,
    letterSpacing: -0.171,
  },

  // Error
  errorText: {
    color: "#EF4444",
    fontFamily: "Roboto_400Regular",
    fontSize: 9.963,
    fontWeight: "400",
    lineHeight: 16.605,
    marginTop: 4,
  },

  // Continue Button
  buttonContainer: {
    paddingHorizontal: 25.182,
    paddingBottom: 16.788,
    paddingTop: 10,
    backgroundColor: "#FFFFFF",
  },
  continueButton: {
    height: 54,
    borderRadius: 15.634,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    backgroundColor: "#F5B81B",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "#253EA7",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
  },
  continueButtonText: {
    color: "#000000",
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    fontWeight: "600",
  },
});
