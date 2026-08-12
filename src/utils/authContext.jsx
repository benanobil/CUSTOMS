import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useCallback, useEffect, useState } from "react";
import { router } from "expo-router";
import { authService } from "../services/authService";
import { tokenStorage } from "../services/api";

const ONBOARDING_KEY = "hasLaunched";

export const AuthContext = createContext({
  isLoggedIn: false,
  isReady: false,
  user: null,
  hasSeenOnboarding: false,
  markOnboardingSeen: async () => {},
  logIn: async () => {},
  completeAuthentication: async () => {},
  updateUser: () => {},
  logOut: async () => {},
});

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const setCustomsSession = useCallback(async (response) => {
    const authenticatedUser = response?.user || response?.data?.user;
    if (!authenticatedUser) {
      throw new Error("Authentication response did not include a user");
    }
    if (authenticatedUser.role !== "CUSTOMS") {
      await tokenStorage.clear();
      throw new Error("This app is restricted to customs officers");
    }
    setUser(authenticatedUser);
    setIsLoggedIn(true);
    return authenticatedUser;
  }, []);

  useEffect(() => {
    let active = true;
    const restoreSession = async () => {
      try {
        const [token, onboardingValue] = await Promise.all([
          tokenStorage.get(),
          AsyncStorage.getItem(ONBOARDING_KEY),
        ]);
        if (!active) return;
        setHasSeenOnboarding(onboardingValue === "true");
        if (token) {
          const response = await authService.getCurrentUser();
          if (active) await setCustomsSession(response);
        }
      } catch {
        await tokenStorage.clear();
        if (active) {
          setUser(null);
          setIsLoggedIn(false);
        }
      } finally {
        if (active) setIsReady(true);
      }
    };
    restoreSession();
    return () => {
      active = false;
    };
  }, [setCustomsSession]);

  const markOnboardingSeen = async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, "true");
    setHasSeenOnboarding(true);
  };

  const logIn = async (credentials) => {
    const response = await authService.login(credentials);
    await setCustomsSession(response);
    router.replace("/(protected)/(tabs)");
    return response;
  };

  const completeAuthentication = async (response) => {
    await setCustomsSession(response);
    router.replace("/(protected)/(tabs)");
  };

  const updateUser = useCallback((updates) => {
    setUser((currentUser) => ({ ...currentUser, ...updates }));
  }, []);

  const logOut = async () => {
    try {
      await authService.logout();
    } finally {
      setIsLoggedIn(false);
      setUser(null);
      router.replace("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isReady,
        isLoggedIn,
        user,
        hasSeenOnboarding,
        markOnboardingSeen,
        logIn,
        completeAuthentication,
        updateUser,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
