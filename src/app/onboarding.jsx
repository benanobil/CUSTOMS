import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useFonts,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_700Bold,
} from "@expo-google-fonts/plus-jakarta-sans";
import { Inter_400Regular } from "@expo-google-fonts/inter";
import { Roboto_500Medium } from "@expo-google-fonts/roboto";
import { AuthContext } from "../utils/authContext";

// 🏷 Text components
const LabelMedium = ({ children }) => (
  <Text style={styles.labelMedium}>{children}</Text>
);

const LabelBold = ({ children }) => (
  <Text style={styles.labelBold}>{children}</Text>
);

const Description = ({ children }) => (
  <Text style={styles.description}>{children}</Text>
);

// 🔘 Get Started Button
const GetStartedButton = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
    <Text style={styles.buttonText}>Get Started</Text>
  </TouchableOpacity>
);

export default function Onboarding() {
  const authState = useContext(AuthContext);
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    PlusJakartaSans_500Medium,
    PlusJakartaSans_700Bold,
    Inter_400Regular,
    Roboto_500Medium,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleGetStarted = async () => {
    // Mark that onboarding has been completed
    try {
      await AsyncStorage.setItem("hasLaunched", "true");
    } catch (error) {
      console.log("Error saving first launch flag:", error);
    }
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Background image */}
      <ImageBackground
        source={require("../../assets/onboarding.png")}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />

      {/* Yellow gradient overlay from bottom */}
      <LinearGradient
        colors={[
          "transparent",
          "transparent",
          "rgba(245, 184, 27, 0.4)",
          "rgba(245, 184, 27, 0.9)",
        ]}
        locations={[0, 0.3, 0.6, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Content */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.textSection}>
            <LabelMedium>Temper-proof Revenue</LabelMedium>
            <LabelBold>Unified System Trade</LabelBold>

            <View style={styles.descriptionContainer}>
              <Description>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Description>
            </View>
          </View>

          <View style={styles.buttonSection}>
            <GetStartedButton onPress={handleGetStarted} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
    justifyContent: "flex-end",
  },
  textSection: {
    alignItems: "center",
    gap: 8,
    marginBottom: 40,
  },
  labelMedium: {
    color: "rgba(0, 0, 0, 0.85)",
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
  },
  labelBold: {
    color: "#000000",
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  descriptionContainer: {
    width: "100%",
    maxWidth: 376,
    marginTop: 16,
  },
  description: {
    color: "#000000",
    fontFamily: "Inter_400Regular",
    fontSize: 15.5,
    fontWeight: "400",
    textAlign: "center",
    lineHeight: 22,
  },
  buttonSection: {
    alignItems: "center",
    paddingBottom: 20,
  },
  button: {
    width: 343,
    maxWidth: "100%",
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: "#000000",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#F5B81B",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
    fontWeight: "500",
  },
});