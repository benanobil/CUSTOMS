import React, { useEffect, useContext } from "react";
import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { AuthContext } from "../utils/authContext";

const { width } = Dimensions.get("window");

// 🌟 Glassy overlay effect on top of the gradient
const GlassyOverlay = () => (
  <View style={styles.overlayContainer}>
    <LinearGradient
      colors={["rgba(255, 255, 255, 0.3)", "rgba(238, 237, 237, 0.15)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.borderGradient}
    >
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0)"]}
        start={{ x: 0.75, y: 0.5 }}
        end={{ x: 0.25, y: 0.5 }}
        style={styles.innerGradient}
      />
    </LinearGradient>
  </View>
);

// 🖼 TRUST brand icon
const TrustImage = () => (
  <Image
    style={styles.trustIcon}
    source={require("../../assets/TRUST-icon.png")}
    resizeMode="contain"
    accessibilityLabel="Trust icon"
  />
);

export default function Splashscreen() {
  const router = useRouter();
  const { isReady, isLoggedIn, hasSeenOnboarding } = useContext(AuthContext);

  useEffect(() => {
    // Wait until auth state is loaded
    if (!isReady) return;

    const timer = setTimeout(() => {
      if (isLoggedIn) {
        // Logged-in user → go to home tabs
        router.replace("/(protected)/(tabs)");
      } else if (hasSeenOnboarding) {
        // Returning user but not logged in → go to login
        router.replace("/login");
      } else {
        // First-time user → go to onboarding
        router.replace("/onboarding");
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [isReady, isLoggedIn, hasSeenOnboarding]);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* Background gradient */}
      <LinearGradient
        colors={["#FFFFFF", "#F5B81B"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Glass overlay for depth */}
      <GlassyOverlay />

      {/* Centered TRUST icon */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.iconWrapper}>
          <TrustImage />
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
    backgroundColor: "#FFFFFF",
  },
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  borderGradient: {
    flex: 1,
    padding: 4,
  },
  innerGradient: {
    flex: 1,
  },
  iconWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  trustIcon: {
    width: width * 0.4,
    height: width * 0.4,
    maxWidth: 200,
    maxHeight: 200,
  },
});