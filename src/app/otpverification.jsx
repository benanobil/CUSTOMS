import React, { useState, useRef, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { Inter_700Bold } from "@expo-google-fonts/inter";
import { useRouter, useLocalSearchParams } from "expo-router";
import { AuthContext } from "../utils/authContext";

// ══════════════════════════════════════════════════
// 🎖 SVG Scalloped Badge with Checkmark
// ══════════════════════════════════════════════════
const SuccessBadge = () => (
  <Svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <Path
      d="M28 2.5
         L31.5 6.2
         L36.6 5.1
         L38.7 9.9
         L43.9 9.9
         L43.9 15.1
         L48.7 17.2
         L47.6 22.3
         L51.3 25.8
         L51.3 30.2
         L47.6 33.7
         L48.7 38.8
         L43.9 40.9
         L43.9 46.1
         L38.7 46.1
         L36.6 50.9
         L31.5 49.8
         L28 53.5
         L24.5 49.8
         L19.4 50.9
         L17.3 46.1
         L12.1 46.1
         L12.1 40.9
         L7.3 38.8
         L8.4 33.7
         L4.7 30.2
         L4.7 25.8
         L8.4 22.3
         L7.3 17.2
         L12.1 15.1
         L12.1 9.9
         L17.3 9.9
         L19.4 5.1
         L24.5 6.2
         Z"
      fill="#F5B81B"
    />
    <Path
      d="M18.75 28 L25 34.25 L37.5 21.75"
      stroke="#000113"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ══════════════════════════════════════════════════
// MAIN SCREEN
// ══════════════════════════════════════════════════
export default function OtpVerification() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { logIn } = useContext(AuthContext);

  // ─── Data forwarded from signup1 → signup2 ─────
  const phoneNumber = params.phoneNumber || "+233 507 758 901";
  const role = params.role || "customs";
  const name = params.name || "Joel";
  const orgInfo = params.orgInfo || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(24);
  const [showSuccess, setShowSuccess] = useState(false);
  const inputRefs = useRef([]);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Inter_700Bold,
  });

  // ─── Countdown timer for resend ─────────────────
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // ─── OTP input handlers ─────────────────────────
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index, e) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(24);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  const handleNext = () => {
    const otpCode = otp.join("");
    if (otpCode.length === 6) {
      setShowSuccess(true);
    }
  };

  // ─── Complete signup → log user in → go to home ─
  const handleContinue = () => {
    setShowSuccess(false);
    setTimeout(() => {
      logIn({ role, name, orgInfo, phoneNumber });
    }, 100);
  };

  const isComplete = otp.join("").length === 6;

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.flex}
        >
          <View style={styles.content}>
            {/* ─── Header ─── */}
            <View style={styles.header}>
              <Text style={styles.title}>OTP Verification</Text>
              <Text style={styles.subtitle}>
                A verification code has been sent to
              </Text>
              <Text style={styles.subtitle}>{phoneNumber}</Text>
            </View>

            {/* ─── OTP Inputs ─── */}
            <View style={styles.otpRow}>
              {otp.map((digit, index) => (
                <View key={index} style={styles.otpInputWrapper}>
                  <TextInput
                    ref={(el) => (inputRefs.current[index] = el)}
                    style={styles.otpInput}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={digit}
                    onChangeText={(value) => handleChange(index, value)}
                    onKeyPress={(e) => handleKeyPress(index, e)}
                    placeholder={index.toString()}
                    placeholderTextColor="#5A5E60"
                    selectionColor="#F5B81B"
                  />
                </View>
              ))}
            </View>

            {/* ─── Resend ─── */}
            <TouchableOpacity
              onPress={handleResend}
              disabled={timer > 0}
              activeOpacity={0.7}
            >
              <Text style={styles.resendText}>
                {timer > 0
                  ? `You can resend the code in ${timer} seconds`
                  : "Resend code"}
              </Text>
            </TouchableOpacity>

            {/* ─── Next Button ─── */}
            <TouchableOpacity
              style={[styles.nextButton, !isComplete && styles.nextButtonDisabled]}
              onPress={handleNext}
              activeOpacity={0.8}
              disabled={!isComplete}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/* 🎉 Success Modal */}
      <Modal
        visible={showSuccess}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSuccess(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.successCard}>
            <SuccessBadge />
            <Text style={styles.successText}>
              Your account has been created!
            </Text>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}
              activeOpacity={0.8}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ══════════════════════════════════════════════════
// STYLES
// ══════════════════════════════════════════════════
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  safeArea: { flex: 1 },
  flex: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },

  header: { alignItems: "flex-start", marginBottom: 32 },
  title: {
    color: "#12110D",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16.971,
    fontWeight: "600",
    marginBottom: 8,
  },
  subtitle: {
    color: "#5A5E60",
    fontFamily: "Poppins_500Medium",
    fontSize: 12.343,
    fontWeight: "500",
    lineHeight: 18,
  },

  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    marginBottom: 24.686,
  },
  otpInputWrapper: {
    width: 40.886,
    paddingTop: 9.258,
    paddingBottom: 8.628,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 38.571,
    borderWidth: 0.771,
    borderColor: "rgba(18, 17, 13, 0.40)",
  },
  otpInput: {
    width: "100%",
    textAlign: "center",
    color: "#5A5E60",
    fontFamily: "Poppins_400Regular",
    fontSize: 15.429,
    fontWeight: "400",
    padding: 0,
  },

  resendText: {
    alignSelf: "stretch",
    color: "rgba(18, 17, 13, 0.50)",
    fontFamily: "Poppins_400Regular",
    fontSize: 13.886,
    fontWeight: "400",
    marginBottom: 24.686,
  },

  nextButton: {
    alignSelf: "stretch",
    paddingTop: 11.571,
    paddingBottom: 9.858,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 38.571,
    backgroundColor: "#F5B81B",
  },
  nextButtonDisabled: { opacity: 0.6 },
  nextButtonText: {
    color: "#FFFFFF",
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    fontWeight: "500",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  successCard: {
    width: 358,
    maxWidth: "100%",
    paddingVertical: 19,
    paddingHorizontal: 29,
    alignItems: "center",
    gap: 15,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  successText: {
    alignSelf: "stretch",
    color: "#1A1C1E",
    textAlign: "center",
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 26,
    letterSpacing: -0.4,
  },
  continueButton: {
    alignSelf: "stretch",
    paddingTop: 11.571,
    paddingBottom: 9.858,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 38.571,
    backgroundColor: "#F5B81B",
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    fontWeight: "500",
  },
});