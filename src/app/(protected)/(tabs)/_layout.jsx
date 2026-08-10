import React, { useContext } from "react";
import { Tabs } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Path, Rect, Circle } from "react-native-svg";
import { AuthContext } from "../../../utils/authContext";

// 🏠 Home Icon
const HomeIcon = ({ color }) => (
  <Svg width="20.917" height="22.412" viewBox="0 0 21 23" fill="none">
    <Path
      d="M0 8.96461V22.4115H7.47051V16.4351C7.47051 14.7848 8.80838 13.4469 10.4587 13.4469C12.1091 13.4469 13.4469 14.7848 13.4469 16.4351V22.4115H20.9174V8.96461L10.4587 0L0 8.96461Z"
      fill={color}
    />
  </Svg>
);

// 📋 Declarations Icon
const DeclarationsIcon = ({ color }) => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <Rect
      x="3" y="5" width="18" height="16"
      rx="2" stroke={color} strokeWidth="2"
    />
    <Path d="M3 9H21" stroke={color} strokeWidth="2" />
    <Path d="M8 3V7" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M16 3V7" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Rect x="7" y="12" width="3" height="3" rx="0.5" fill={color} />
    <Rect x="14" y="12" width="3" height="3" rx="0.5" fill={color} />
    <Rect x="7" y="17" width="3" height="2" rx="0.5" fill={color} />
  </Svg>
);

// 🚩 Flagged Icon
const FlaggedIcon = ({ color }) => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 3V21"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <Path
      d="M5 4H17L14 8L17 12H5"
      fill={color}
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </Svg>
);

// 👤 Profile Icon
const ProfileIcon = ({ color }) => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="8" r="4" fill={color} />
    <Path
      d="M4 21C4 16.5817 7.58172 13 12 13C16.4183 13 20 16.5817 20 21"
      fill={color}
    />
  </Svg>
);

// 🏠 Home — white pill (active) or dark box (inactive)
const HomeTab = ({ focused }) => {
  if (focused) {
    return (
      <View style={styles.homeActive}>
        <HomeIcon color="#000" />
        <Text style={styles.homeLabel}></Text>
      </View>
    );
  }
  return (
    <View style={styles.homeInactive}>
      <HomeIcon color="#fff" />
    </View>
  );
};

// Generic tabs
const DeclarationsTab = ({ focused }) => (
  <View style={[
    styles.genericTab,
    focused && styles.genericTabFocused,
  ]}>
    <DeclarationsIcon color={focused ? "#000" : "#fff"} />
  </View>
);

const FlaggedTab = ({ focused }) => (
  <View style={[
    styles.genericTab,
    focused && styles.genericTabFocused,
  ]}>
    <FlaggedIcon color={focused ? "#000" : "#fff"} />
  </View>
);

const ProfileTab = ({ focused }) => (
  <View style={[
    styles.genericTab,
    focused && styles.genericTabFocused,
  ]}>
    <ProfileIcon color={focused ? "#000" : "#fff"} />
  </View>
);

export default function TabsLayout() {
  const { user } = useContext(AuthContext);
  const role = user?.role || "importer";
  const isAuditor = role === "auditor";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [styles.tabBar,{marginLeft:65,marginRight:65}],
        tabBarItemStyle:[ styles.tabItem,{marginTop:5,marginBottom:1}],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => <HomeTab focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="declarations"
        options={{
          tabBarIcon: ({ focused }) => (
            <DeclarationsTab focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="flagged"
        options={{
        
          tabBarIcon: ({ focused }) => (
            <FlaggedTab focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <ProfileTab focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  // ─── Tab Bar Container ───────────────────────────────────────
  // Spec: 285 × 64.495, padding 5.229 (L/T/B) 6.101 (R),
  //       gap 13.945, radius 13.073, bg #000
  tabBar: {
    position: "absolute",
    bottom: 22,
    alignSelf: "center",
    //width: 285,
    height: 65,
    backgroundColor: "#000000",
    borderRadius: 13,
    borderTopWidth: 0,
    // padding inside the bar
    paddingTop: 8,
    paddingBottom: 2,
    paddingLeft: 5,
    paddingRight: 6,
    // gap between items handled by tabItem margins
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    overflow: "hidden",
  },

  // ─── Each Tab Item Cell ──────────────────────────────────────
  tabItem: {
    justifyContent: "center",
    alignItems: "center",
   // paddingVertical: 0,
   // paddingHorizontal: 0,
    marginHorizontal: 3.5, // half of gap: 13.945 / 2 ≈ 7 total between items
  },

  // ─── Home Tab (Active) ───────────────────────────────────────
  // Spec: 114.174 × 54.037, padding 6.972px 18.303px,
  //       radius 13.073, bg #FFF
  homeActive: {
    width: 60,
    height: 54,
    paddingVertical: 7,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
  },
  homeLabel: {
    color: "#000000",
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 16,
  },

  // ─── Home Tab (Inactive) ─────────────────────────────────────
  homeInactive: {
    width: 54,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 13,
    backgroundColor: "#444444",
  },

  // ─── Declarations / Flagged / Profile (Inactive) ─────────────
  // Spec: 65.367 × 54.037, padding 13.945px 16.56px,
  //       radius 13.073, bg #444
  genericTab: {
    width: 58,
    height: 54,
    paddingVertical: 14,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 13,
    backgroundColor: "#444444",
  },

  // ─── Declarations / Flagged / Profile (Focused) ──────────────
  genericTabFocused: {
    backgroundColor: "#FFFFFF",
  },
});