import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path, Rect, G, ClipPath, Defs } from "react-native-svg";
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from "@expo-google-fonts/plus-jakarta-sans";
import { AuthContext } from "../../../utils/authContext";
import { useRouter } from "expo-router";

// ══════════════════════════════════════════════════
// 🎨 SVG ICONS
// ══════════════════════════════════════════════════

// 🔔 Notification (bell)
const NotificationIcon = () => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <G clipPath="url(#clip_notif)">
      <Path
        d="M20 17H22V19H2V17H4V10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10V17ZM18 17V10C18 8.4087 17.3679 6.88258 16.2426 5.75736C15.1174 4.63214 13.5913 4 12 4C10.4087 4 8.88258 4.63214 7.75736 5.75736C6.63214 6.88258 6 8.4087 6 10V17H18ZM9 21H15V23H9V21Z"
        fill="black"
      />
    </G>
    <Defs>
      <ClipPath id="clip_notif">
        <Rect width="24" height="24" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

// 🕐 History (clock with arrow)
const HistoryIcon = () => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <G clipPath="url(#clip_hist)">
      <Path
        d="M12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12H4C4 16.418 7.582 20 12 20C16.418 20 20 16.418 20 12C20 7.582 16.418 4 12 4C9.536 4 7.332 5.114 5.865 6.865L8 9H2V3L4.447 5.446C6.28 3.336 8.984 2 12 2ZM13 7V11.585L16.243 14.828L14.828 16.243L11 12.413V7H13Z"
        fill="black"
      />
    </G>
    <Defs>
      <ClipPath id="clip_hist">
        <Rect width="24" height="24" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

// ⋮ More Options (3 dots vertical)
const MoreOptionsIcon = () => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <G clipPath="url(#clip_more)">
      <Path
        d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
        fill="black"
      />
    </G>
    <Defs>
      <ClipPath id="clip_more">
        <Rect width="24" height="24" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

// 📷 Camera Icon (yellow badge)
const CameraIcon = () => (
  <Svg width="26" height="26" viewBox="0 0 26 26" fill="none">
    <Rect width="25.9508" height="25.8429" rx="12.9214" fill="#F5B81B" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.6377 17.712H14.3101C16.1869 17.712 17.1252 17.712 17.7992 17.2716C18.091 17.0809 18.3416 16.836 18.5366 16.5507C18.9869 15.8917 18.9869 14.9742 18.9869 13.1393C18.9869 11.3045 18.9869 10.387 18.5366 9.72794C18.3416 9.44264 18.091 9.19767 17.7992 9.00704C17.3661 8.72408 16.8239 8.62294 15.9937 8.58679C15.5975 8.58679 15.2564 8.29327 15.1787 7.91344C15.0621 7.3437 14.5505 6.93359 13.9563 6.93359H11.9916C11.3974 6.93359 10.8857 7.3437 10.7692 7.91344C10.6915 8.29327 10.3504 8.58679 9.95421 8.58679C9.12401 8.62294 8.58177 8.72408 8.14865 9.00704C7.85684 9.19767 7.6063 9.44264 7.41132 9.72794C6.96094 10.387 6.96094 11.3045 6.96094 13.1393C6.96094 14.9742 6.96094 15.8917 7.41132 16.5507C7.6063 16.836 7.85684 17.0809 8.14865 17.2716C8.8227 17.712 9.76104 17.712 11.6377 17.712ZM12.9739 10.6897C11.5902 10.6897 10.4685 11.7864 10.4685 13.1393C10.4685 14.4922 11.5902 15.5889 12.9739 15.5889C14.3576 15.5889 15.4794 14.4922 15.4794 13.1393C15.4794 11.7864 14.3576 10.6897 12.9739 10.6897ZM12.9739 11.6695C12.1437 11.6695 11.4707 12.3276 11.4707 13.1393C11.4707 13.951 12.1437 14.6091 12.9739 14.6091C13.8041 14.6091 14.4772 13.951 14.4772 13.1393C14.4772 12.3276 13.8041 11.6695 12.9739 11.6695ZM15.8134 11.1796C15.8134 10.909 16.0377 10.6897 16.3145 10.6897H16.9826C17.2593 10.6897 17.4837 10.909 17.4837 11.1796C17.4837 11.4502 17.2593 11.6695 16.9826 11.6695H16.3145C16.0377 11.6695 15.8134 11.4502 15.8134 11.1796Z"
      fill="white"
    />
  </Svg>
);

// 🛡 Security Icon (yellow shield with lock)
const SecurityIcon = () => (
  <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <Path
      d="M34.8484 18.5351V11.2185C34.8484 9.85182 33.815 8.30182 32.5317 7.78516L23.2484 3.98516C21.165 3.13516 18.815 3.13516 16.7317 3.98516L7.44844 7.78516C6.18177 8.30182 5.14844 9.85182 5.14844 11.2185V18.5351C5.14844 26.6851 11.0651 34.3185 19.1484 36.5518C19.6984 36.7018 20.2984 36.7018 20.8484 36.5518C28.9317 34.3185 34.8484 26.6851 34.8484 18.5351ZM21.2484 21.4518V25.8351C21.2484 26.5185 20.6817 27.0851 19.9984 27.0851C19.315 27.0851 18.7484 26.5185 18.7484 25.8351V21.4518C17.065 20.9185 15.8318 19.3518 15.8318 17.5018C15.8318 15.2018 17.6984 13.3352 19.9984 13.3352C22.2984 13.3352 24.165 15.2018 24.165 17.5018C24.165 19.3685 22.9317 20.9185 21.2484 21.4518Z"
      fill="#F5B81B"
    />
  </Svg>
);

// 🚪 Logout Icon (red arrow)
const LogoutIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 42 42" fill="none">
    <G clipPath="url(#clip_logout)">
      <Path
        d="M20.6727 4.30469C22.0998 4.30469 23.2568 5.46163 23.2568 6.88881C23.2568 8.31599 22.0998 9.47294 20.6727 9.47294H12.0589C11.5832 9.47294 11.1975 9.85859 11.1975 10.3343V31.0073C11.1975 31.483 11.5832 31.8687 12.0589 31.8687H19.8113C21.2384 31.8687 22.3954 33.0257 22.3954 34.4528C22.3954 35.8799 21.2384 37.0369 19.8113 37.0369H12.0589C8.72885 37.0369 6.0293 34.3374 6.0293 31.0073V10.3343C6.0293 7.00424 8.72885 4.30469 12.0589 4.30469H20.6727ZM31.1136 13.9709L35.9862 18.8435C36.9954 19.8527 36.9954 21.4889 35.9862 22.4981L31.1136 27.3708C30.1044 28.3799 28.4683 28.3799 27.4591 27.3708C26.4499 26.3616 26.4499 24.7255 27.4591 23.7163L27.9203 23.2549H20.6727C19.2455 23.2549 18.0885 22.0979 18.0885 20.6708C18.0885 19.2437 19.2455 18.0867 20.6727 18.0867H27.9203L27.4591 17.6253C26.4499 16.6162 26.4499 14.9801 27.4591 13.9709C28.4683 12.9617 30.1044 12.9617 31.1136 13.9709Z"
        fill="#FF3D00"
        fillOpacity="0.8"
      />
    </G>
    <Defs>
      <ClipPath id="clip_logout">
        <Rect width="41.346" height="41.346" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

// ↩ Back arrow icon (small black)
const BackArrowIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <G clipPath="url(#clip_back)">
      <Path
        d="M7.71431 2.96274L7.71434 1.00879L11.9355 4.88964L7.71434 8.77048V7.03927C2.65521 7.03937 0.152719 10.9265 0.152719 10.9265C0.0529451 10.4223 0.000621796 9.90101 0.000621796 9.36749C0.000621796 4.95721 3.30409 2.96274 7.71431 2.96274Z"
        fill="#000113"
        fillOpacity="0.8"
      />
    </G>
    <Defs>
      <ClipPath id="clip_back">
        <Rect
          width="11.9349"
          height="11.9349"
          fill="white"
          transform="matrix(-1 0 0 1 11.9355 0)"
        />
      </ClipPath>
    </Defs>
  </Svg>
);

// ══════════════════════════════════════════════════
// 🧩 SUB-COMPONENTS
// ══════════════════════════════════════════════════

// Section header (yellow dot + title)
const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeader}>
    <View style={styles.sectionDot} />
    <Text style={styles.sectionTitle}>{title}</Text>
  </View>
);

// Info row (label + value)
const InfoRow = ({ label, value, isLast }) => (
  <View style={[styles.infoRow, !isLast && styles.infoRowBorder]}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

// ══════════════════════════════════════════════════
// 👤 MAIN PROFILE SCREEN
// ══════════════════════════════════════════════════

export default function Profile() {
  const { user, logOut } = useContext(AuthContext);
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const userName = user?.name || "Adu Anokye Joel";
  const userRole = user?.orgInfo || "Customs Officer";

  // Account info (customs officer)
  const accountInfo = [
    { label: "Email", value: user?.email || "john.mensah@gra.gov.gh" },
    { label: "Wallet Address", value: user?.wallet || "0xCustomsWallet456" },
    { label: "Employee ID", value: user?.employeeId || "GRA-2024-5678" },
    { label: "Badge Number", value: user?.badge || "CUS-2024-001" },
    { label: "Phone", value: user?.phoneNumber || "+233 20 987 6543" },
    { label: "Port", value: user?.port || "Tema Port" },
    { label: "Department", value: user?.department || "Customs Division" },
    { label: "Rank", value: user?.rank || "Senior Officer" },
  ];

  // Today's activity stats
  const todaysActivity = [
    { label: "Declaration Processed", value: "45" },
    { label: "Goods Released", value: "12" },
    { label: "Payments Verified", value: "8" },
    { label: "Cases Flagged", value: "2" },
  ];

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* 🎨 Yellow gradient background at top */}
      <LinearGradient
        colors={[
          "rgba(245, 184, 27, 0.4)",
          "rgba(245, 184, 27, 0.15)",
          "rgba(255, 255, 255, 0)",
        ]}
        locations={[0, 0.5, 1]}
        style={styles.topGradient}
        pointerEvents="none"
      />

      <SafeAreaView style={styles.safeArea}>
        {/* Top Header with icons */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
            <NotificationIcon />
          </TouchableOpacity>

          <View style={styles.topBarRight}>
            <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
              <HistoryIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
              <MoreOptionsIcon />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentInner}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile picture + name section */}
          <View style={styles.profileSection}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatar}>
                <Svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                    fill="#FFFFFF"
                  />
                  <Path
                    d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22"
                    fill="#FFFFFF"
                  />
                </Svg>
              </View>
              <View style={styles.cameraBadge}>
                <CameraIcon />
              </View>
            </View>

            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.userRole}>{userRole}</Text>

            <TouchableOpacity style={styles.editProfileButton} activeOpacity={0.8}>
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* Account Section */}
          <SectionHeader title="Account" />
          <View style={styles.infoCard}>
            {accountInfo.map((item, idx) => (
              <InfoRow
                key={item.label}
                label={item.label}
                value={item.value}
                isLast={idx === accountInfo.length - 1}
              />
            ))}
          </View>

          {/* Today's Activity Section */}
          <SectionHeader title="Today's Activity" />
          <View style={styles.infoCard}>
            {todaysActivity.map((item, idx) => (
              <InfoRow
                key={item.label}
                label={item.label}
                value={item.value}
                isLast={idx === todaysActivity.length - 1}
              />
            ))}
          </View>

          {/* Access & Security Section */}
          <SectionHeader title="Access & Security" />
          <TouchableOpacity
            style={styles.securityCard}
            activeOpacity={0.85}
            onPress={() => router.push("/security")}
          >
            <SecurityIcon />
            <View style={styles.securityTextWrapper}>
              <Text style={styles.securityTitle}>Ensure Your Security</Text>
              <Text style={styles.securitySubtitle}>
                Help us protect your account
              </Text>
            </View>
            <View style={styles.securityArrow}>
              <BackArrowIcon />
            </View>
          </TouchableOpacity>

          {/* Version + Trust info */}
          <View style={styles.versionSection}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
            <Text style={styles.versionSubText}>Ethereum Sepolia Network</Text>
            <Text style={styles.versionSubText}>
              ©2026 TRUST. All rights reserved.
            </Text>
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={logOut}
            activeOpacity={0.85}
          >
            <LogoutIcon />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// ══════════════════════════════════════════════════
// 🎨 STYLES
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

  // 🎨 Yellow gradient at top
  topGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 350,
    zIndex: 0,
  },

  // 🔝 Top bar (notification + history + more)
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  topBarRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  // 📜 Scroll content
  content: { flex: 1 },
  contentInner: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 140,
    gap: 20,
  },

  // 👤 Profile Section
  profileSection: {
    alignItems: "center",
    marginBottom: 16,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#8B7355",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  cameraBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderRadius: 13,
  },
  userName: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 4,
  },
  userRole: {
    color: "#78828A",
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 12,
    marginTop: 2,
    marginBottom: 12,
  },
  editProfileButton: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F5B81B",
    backgroundColor: "#FFFFFF",
  },
  editProfileText: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 11,
    fontWeight: "500",
  },

  // 🏷 Section Header
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
    marginTop: 4,
  },
  sectionDot: {
    width: 4,
    height: 16,
    borderRadius: 2,
    backgroundColor: "#F5B81B",
  },
  sectionTitle: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 15,
    fontWeight: "700",
  },

  // 📋 Info Card
  infoCard: {
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4E7EB",
    paddingHorizontal: 14,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  infoRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F1F2F4",
  },
  infoLabel: {
    color: "#78828A",
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 12,
    flex: 1,
  },
  infoValue: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 12,
    textAlign: "right",
    flexShrink: 1,
    marginLeft: 8,
  },

  // 🛡 Security Card
  securityCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4E7EB",
    gap: 12,
  },
  securityTextWrapper: {
    flex: 1,
    gap: 2,
  },
  securityTitle: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 13,
    fontWeight: "600",
  },
  securitySubtitle: {
    color: "#78828A",
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 11,
  },
  securityArrow: {
    padding: 4,
  },

  // 📌 Version section
  versionSection: {
    alignItems: "center",
    marginTop: 16,
    gap: 2,
  },
  versionText: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 12,
    fontWeight: "600",
  },
  versionSubText: {
    color: "#78828A",
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 10,
  },

  // 🚪 Logout Button
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "rgba(255, 61, 0, 0.15)",
    gap: 10,
    marginTop: 8,
  },
  logoutText: {
    color: "#FF3D00",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 14,
    fontWeight: "600",
  },
});