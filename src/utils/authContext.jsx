import { createContext, useState } from "react";
import { router } from "expo-router";

export const AuthContext = createContext({
  isLoggedIn: false,
  isReady: true,
  user: null,
  hasSeenOnboarding: false,
  markOnboardingSeen: () => {},
  logIn: () => {},
  logOut: () => {},
});

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  const markOnboardingSeen = () => {
    setHasSeenOnboarding(true);
  };

  const logIn = (userData = { role: "importer" }) => {
    setIsLoggedIn(true);
    setUser(userData);
    router.replace("/(protected)/(tabs)");
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setUser(null);
    router.replace("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isReady: true,
        isLoggedIn,
        user,
        hasSeenOnboarding,
        markOnboardingSeen,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}