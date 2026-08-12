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
  Modal,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { authService } from "../services/authService";
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

const ChevronDown = () => (
  <Ionicons name="chevron-down" size={18} color="#6C7278" />
);

// ══════════════════════════════════════════════════
// DROPDOWN DATA
// ══════════════════════════════════════════════════
const PORTS = [
  "Tema Port",
  "Takoradi Port",
  "Kotoka International Airport",
  "Aflao Border",
  "Elubo Border",
];

const DEPARTMENTS = [
  "Customs Enforcement",
  "Trade Facilitation",
  "Valuation",
  "Post-Clearance Audit",
  "Preventive Services",
];

const RANKS = [
  "Officer",
  "Senior Officer",
  "Assistant Superintendent",
  "Superintendent",
  "Chief Superintendent",
  "Assistant Commissioner",
];

// ══════════════════════════════════════════════════
// REUSABLE DROPDOWN COMPONENT
// ══════════════════════════════════════════════════
const DropdownField = ({ label, value, placeholder, options, onSelect }) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TouchableOpacity
        style={styles.inputRow}
        onPress={() => setVisible(true)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.input,
            !value && { color: "#000113" },
          ]}
        >
          {value || placeholder}
        </Text>
        <ChevronDown />
      </TouchableOpacity>

      {/* Modal Dropdown */}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{label}</Text>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    onSelect(item);
                    setVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                  {value === item && (
                    <Ionicons name="checkmark" size={20} color="#F5B81B" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

// ══════════════════════════════════════════════════
// MAIN SCREEN
// ══════════════════════════════════════════════════
export default function Signup2() {
  const router = useRouter();

  // ─── Data forwarded from signup1 ────────────────
  const {
    firstName = "",
    lastName = "",
    email = "",
    phoneNumber = "",
    password = "",
  } = useLocalSearchParams();

  const [employeeId, setEmployeeId] = useState("GRA-2024-5678");
  const [badgeNumber, setBadgeNumber] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [supervisorEmail, setSupervisorEmail] = useState("supervisor@gra.gov.gh");
  const [port, setPort] = useState("Tema Port");
  const [department, setDepartment] = useState("");
  const [rank, setRank] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // ─── Forward all data to OTP screen ─────────────
  const handleRegister = async () => {
    if (!agreedToTerms || isSubmitting) return;
    if (!employeeId || !badgeNumber || !walletAddress || !port || !department || !rank) {
      Alert.alert("Missing details", "Complete all required customs officer fields.");
      return;
    }
    setIsSubmitting(true);
    let response;
    try {
      response = await authService.registerCustoms({
        firstName,
        lastName,
        email: String(email).trim().toLowerCase(),
        phoneNumber,
        password,
        walletAddress: walletAddress.trim(),
        role: "CUSTOMS",
        employeeId: employeeId.trim(),
        badgeNumber: badgeNumber.trim(),
        supervisorEmail: supervisorEmail.trim() || undefined,
        portOfAssignment: port,
        department,
        rankDesignation: rank,
      });
    } catch (error) {
      Alert.alert("Registration failed", error.message || "Unable to register.");
      return;
    } finally {
      setIsSubmitting(false);
    }
    router.push({
      pathname: "/otpverification",
      params: {
        email: response.email || email,
        phoneNumber,
      },
    });
  };

  const handleBack = () => {
    router.back();
  };

  // ─── Validation ─────────────────────────────────
  const isEmployeeIdValid = employeeId.length > 0;
  const isWalletValid = walletAddress.length > 0;
  const isSupervisorValid = supervisorEmail.includes("@");

  const getLineColor = (isValid) => (isValid ? "#4CAF50" : "#000113");

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
              <Text style={styles.title}>Personal ID</Text>
            </View>

            {/* ─── Form ─── */}
            <View style={styles.form}>
              {/* Employee ID */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Employee ID</Text>
                <View
                  style={[
                    styles.inputRow,
                    { borderBottomColor: getLineColor(isEmployeeIdValid) },
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    value={employeeId}
                    onChangeText={setEmployeeId}
                  />
                  {isEmployeeIdValid && <CheckIcon />}
                </View>
              </View>

              {/* Badge Number */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Badge Number</Text>
                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.input}
                    value={badgeNumber}
                    onChangeText={setBadgeNumber}
                  />
                </View>
              </View>

              {/* Wallet Address */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Wallet Address</Text>
                <View
                  style={[
                    styles.inputRow,
                    { borderBottomColor: getLineColor(isWalletValid) },
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    value={walletAddress}
                    onChangeText={setWalletAddress}
                    autoCapitalize="none"
                  />
                  {isWalletValid && <CheckIcon />}
                </View>
              </View>

              {/* Supervisor Email */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>
                  Supervisor Email (Optional)
                </Text>
                <View
                  style={[
                    styles.inputRow,
                    { borderBottomColor: getLineColor(isSupervisorValid) },
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    value={supervisorEmail}
                    onChangeText={setSupervisorEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  {isSupervisorValid && <CheckIcon />}
                </View>
              </View>

              {/* Port of Assignment */}
              <DropdownField
                label="Port of Assignment"
                value={port}
                placeholder="Select Port"
                options={PORTS}
                onSelect={setPort}
              />

              {/* Department */}
              <DropdownField
                label="Department"
                value={department}
                placeholder="Department"
                options={DEPARTMENTS}
                onSelect={setDepartment}
              />

              {/* Rank/Designation */}
              <DropdownField
                label="Rank/Designation"
                value={rank}
                placeholder="Rank/Designation"
                options={RANKS}
                onSelect={setRank}
              />

              {/* ─── Terms & Conditions ─── */}
              <View style={styles.termsContainer}>
                <Text style={styles.termsHeading}>Terms & Conditions</Text>
                <View style={styles.termsRow}>
                  <TouchableOpacity
                    onPress={() => setAgreedToTerms(!agreedToTerms)}
                    style={styles.checkbox}
                  >
                    {agreedToTerms ? (
                      <View style={styles.checkboxChecked}>
                        <Ionicons name="checkmark" size={12} color="#000" />
                      </View>
                    ) : (
                      <View style={styles.checkboxUnchecked} />
                    )}
                  </TouchableOpacity>
                  <Text style={styles.termsText}>
                    I agree to{" "}
                    <Text style={styles.termsLink}>Terms of Service</Text>
                    {" "}and{" "}
                    <Text style={styles.termsLink}>Privacy Policy</Text>
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* ─── Register Button ─── */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.continueButton,
                (!agreedToTerms || isSubmitting) && styles.continueButtonDisabled,
              ]}
              onPress={handleRegister}
              activeOpacity={0.8}
              disabled={!agreedToTerms || isSubmitting}
            >
              <LinearGradient
                colors={[
                  "rgba(255, 255, 255, 0.12)",
                  "rgba(255, 255, 255, 0)",
                ]}
                style={StyleSheet.absoluteFill}
              />
              {isSubmitting ? (
                <ActivityIndicator color="#000000" />
              ) : (
                <Text style={styles.continueButtonText}>
                  Register As Customs Officer
                </Text>
              )}
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
    marginBottom: 12,
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

  // Modal Dropdown
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    width: "100%",
    maxHeight: 400,
    padding: 16,
  },
  modalTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: "#1A1C1E",
    marginBottom: 12,
  },
  modalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  modalItemText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 15,
    color: "#1A1C1E",
  },

  // Terms & Conditions
  termsContainer: {
    marginTop: 8,
    gap: 6,
  },
  termsHeading: {
    color: "#000113",
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    fontWeight: "600",
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  checkbox: {
    marginTop: 2,
  },
  checkboxChecked: {
    width: 16,
    height: 16,
    borderRadius: 3,
    backgroundColor: "#F5B81B",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxUnchecked: {
    width: 16,
    height: 16,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: "#000113",
  },
  termsText: {
    flex: 1,
    color: "#000113",
    fontFamily: "Roboto_400Regular",
    fontSize: 11,
    fontWeight: "400",
    lineHeight: 16,
  },
  termsLink: {
    color: "#2E7CF6",
    textDecorationLine: "underline",
  },

  // Register Button
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
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
    color: "#000000",
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    fontWeight: "600",
  },
});
