import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Path, G, ClipPath, Defs, Rect } from "react-native-svg";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from "@expo-google-fonts/plus-jakarta-sans";

// ══════════════════════════════════════════════════
// 🎨 SVG ICONS
// ══════════════════════════════════════════════════

// 🗑 Trash Icon (red) — for Cancel button
const TrashIcon = () => (
  <Svg width="18" height="18" viewBox="0 0 22 22" fill="none">
    <G clipPath="url(#clip_trash)">
      <Path
        d="M1.375 3.4375C0.995308 3.4375 0.6875 3.74531 0.6875 4.125C0.6875 4.50469 0.995308 4.8125 1.375 4.8125V3.4375ZM20.625 4.8125C21.0047 4.8125 21.3125 4.50469 21.3125 4.125C21.3125 3.74531 21.0047 3.4375 20.625 3.4375V4.8125ZM1.375 4.8125H20.625V3.4375H1.375V4.8125Z"
        fill="#FF3D00"
      />
      <Path
        d="M6.875 4.125C6.875 4.50469 7.18281 4.8125 7.5625 4.8125C7.94219 4.8125 8.25 4.50469 8.25 4.125H6.875ZM13.75 4.125C13.75 4.50469 14.0578 4.8125 14.4375 4.8125C14.8172 4.8125 15.125 4.50469 15.125 4.125H13.75ZM13.0625 0.6875H8.9375V2.0625H13.0625V0.6875ZM8.9375 0.6875C8.39049 0.6875 7.86589 0.904799 7.47909 1.29159L8.45136 2.26386C8.58029 2.13494 8.75517 2.0625 8.9375 2.0625V0.6875ZM7.47909 1.29159C7.0923 1.67839 6.875 2.20299 6.875 2.75H8.25C8.25 2.56767 8.32244 2.39279 8.45136 2.26386L7.47909 1.29159ZM6.875 2.75V4.125H8.25V2.75H6.875ZM15.125 4.125V2.75H13.75V4.125H15.125ZM15.125 2.75C15.125 2.20299 14.9077 1.67839 14.5209 1.29159L13.5486 2.26386C13.6776 2.39279 13.75 2.56767 13.75 2.75H15.125ZM14.5209 1.29159C14.1341 0.904799 13.6095 0.6875 13.0625 0.6875V2.0625C13.2448 2.0625 13.4197 2.13494 13.5486 2.26386L14.5209 1.29159Z"
        fill="#FF3D00"
      />
      <Path
        d="M8.25 15.8125C8.25 16.1922 8.55781 16.5 8.9375 16.5C9.31718 16.5 9.625 16.1922 9.625 15.8125H8.25ZM9.625 8.9375C9.625 8.55781 9.31718 8.25 8.9375 8.25C8.55781 8.25 8.25 8.55781 8.25 8.9375H9.625ZM9.625 15.8125V8.9375H8.25V15.8125H9.625Z"
        fill="#FF3D00"
      />
      <Path
        d="M12.375 15.8125C12.375 16.1922 12.6828 16.5 13.0625 16.5C13.4422 16.5 13.75 16.1922 13.75 15.8125H12.375ZM13.75 8.9375C13.75 8.55781 13.4422 8.25 13.0625 8.25C12.6828 8.25 12.375 8.55781 12.375 8.9375H13.75ZM13.75 15.8125V8.9375H12.375V15.8125H13.75Z"
        fill="#FF3D00"
      />
      <Path
        d="M4.12267 4.06792C4.09111 3.68953 3.7588 3.40837 3.38042 3.43991C3.00203 3.47147 2.72087 3.80378 2.75241 4.18216L4.12267 4.06792ZM19.2477 4.18212C19.2792 3.80374 18.998 3.47144 18.6196 3.43991C18.2412 3.40839 17.909 3.68958 17.8774 4.06796L19.2477 4.18212ZM16.6078 19.3066C16.5935 19.4785 16.5152 19.6391 16.3882 19.7559L17.3194 20.7676C17.7002 20.4171 17.9354 19.9363 17.9781 19.4205L16.6078 19.3066ZM16.3882 19.7559C16.2613 19.8727 16.0951 19.9375 15.9226 19.9375L15.9224 21.3125C16.44 21.3125 16.9387 21.1181 17.3194 20.7676L16.3882 19.7559ZM15.9226 19.9375H6.07846V21.3125H15.9224L15.9226 19.9375ZM6.07846 19.9375C5.90595 19.9375 5.73968 19.8727 5.61274 19.7559L4.68158 20.7676C5.06236 21.1181 5.56093 21.3125 6.07846 21.3125V19.9375ZM5.61274 19.7559C5.48582 19.6391 5.40745 19.4787 5.39318 19.3069L4.0229 19.4205C4.06568 19.9363 4.30078 20.4171 4.68158 20.7676L5.61274 19.7559ZM5.39318 19.3069L4.12267 4.06792L2.75241 4.18216L4.0229 19.4205L5.39318 19.3069ZM17.8774 4.06796L16.6078 19.3066L17.9781 19.4205L19.2477 4.18212L17.8774 4.06796Z"
        fill="#FF3D00"
      />
    </G>
    <Defs>
      <ClipPath id="clip_trash">
        <Rect width="22" height="22" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

// ❗ Exclamation Icon (green) — for Confirm button
const ExclamationIcon = () => (
  <Svg width="18" height="18" viewBox="0 0 25 25" fill="none">
    <G clipPath="url(#clip_excl)">
      <Path
        d="M11.6358 16.9137C11.665 17.106 11.7609 17.2909 11.924 17.4684C12.0858 17.6454 12.2781 17.7343 12.5 17.7343C13.0172 17.7343 13.305 17.4605 13.3638 16.9137L15.0922 3.63345C15.1219 3.39795 15.1367 3.06528 15.1367 2.63662C15.1367 1.97168 14.9083 1.36645 14.45 0.819238C13.9921 0.272949 13.342 0 12.5 0C11.6275 0 10.9708 0.280371 10.5278 0.841113C10.0848 1.38828 9.86328 1.98657 9.86328 2.63667C9.86328 3.03569 9.8772 3.36792 9.90684 3.6335L11.6358 16.9137Z"
        fill="#4CAF50"
      />
      <Path
        d="M14.4054 20.4131C13.9031 19.9108 13.2674 19.6592 12.4995 19.6592C11.7464 19.6592 11.1107 19.9187 10.5936 20.4354C10.0765 20.9525 9.81836 21.5799 9.81836 22.3186C9.81836 23.0276 10.0765 23.6555 10.5936 24.2022C11.1107 24.7342 11.7465 24.9998 12.4995 24.9998C13.2525 24.9998 13.8874 24.7417 14.4054 24.2241C14.9217 23.7078 15.1807 23.0721 15.1807 22.3186C15.1807 21.5651 14.9217 20.9302 14.4054 20.4131Z"
        fill="#4CAF50"
      />
    </G>
    <Defs>
      <ClipPath id="clip_excl">
        <Rect width="25" height="25" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

// ✓ Green checkmark badge (small, filled)
const GreenCheckBadge = () => (
  <View style={styles.greenCheckBadge}>
    <Ionicons name="checkmark" size={11} color="#FFFFFF" />
  </View>
);

// ══════════════════════════════════════════════════
// 🧩 SUB-COMPONENTS
// ══════════════════════════════════════════════════

// Section Card wrapper (matches declaration-details.jsx style)
const SectionCard = ({ children, style }) => (
  <View style={[styles.sectionCard, style]}>{children}</View>
);

// Info row with optional right-side badge
const InfoRow = ({ label, value, showBadge, isLast }) => (
  <View style={[styles.infoRow, !isLast && styles.infoRowBorder]}>
    <Text style={styles.infoLabel}>{label}</Text>
    <View style={styles.infoValueWrap}>
      <Text style={styles.infoValue} numberOfLines={2}>
        {value}
      </Text>
      {showBadge && <GreenCheckBadge />}
    </View>
  </View>
);

// Checklist item (green check + text)
const ChecklistItem = ({ text }) => (
  <View style={styles.checklistRow}>
    <GreenCheckBadge />
    <Text style={styles.checklistText}>{text}</Text>
  </View>
);

// ══════════════════════════════════════════════════
// 📄 MAIN SCREEN
// ══════════════════════════════════════════════════

export default function ReleaseGoods() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [notes, setNotes] = useState("");
  const [confirmed, setConfirmed] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

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

  // Get data from params or fall back to defaults from screenshot
  const declaration = {
    id: params.id || "TMA-2026-0042",
    importer: params.importer || "Kofi Import Ltd",
    product: params.product || "Toyota Corolla 2022 - 1 unit",
    dutyPaid: params.dutyPaid || "$3,750",
    paymentVerified: params.paymentVerified || "Yes",
    port: params.port || "Tema Port",
  };

  const handleCancel = () => {
    router.back();
  };

  const handleConfirm = () => {
    if (!confirmed) return;
    // TODO: hook up to blockchain call / API
    setShowSuccess(true);
  };

  const handleSuccessContinue = () => {
    setShowSuccess(false);
    setTimeout(() => {
      router.back();
    }, 100);
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#171725" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Release Goods</Text>
          <View style={styles.backButton} />
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentInner}
          showsVerticalScrollIndicator={false}
        >
          {/* ─── Release Goods Authorization Card ─── */}
          <SectionCard>
            <View style={styles.authHeader}>
              <Text style={styles.authHeaderText}>
                📦  Release Goods Authorization
              </Text>
            </View>

            <View style={styles.authInfoWrap}>
              <InfoRow label="Declaration ID" value={declaration.id} />
              <InfoRow label="Importer" value={declaration.importer} />
              <InfoRow label="Product" value={declaration.product} />
              <InfoRow label="Duty Paid" value={declaration.dutyPaid} showBadge />
              <InfoRow
                label="Payment Verified"
                value={declaration.paymentVerified}
                showBadge
              />
              <InfoRow label="Port" value={declaration.port} isLast />
            </View>
          </SectionCard>

          {/* ─── Release Confirmation Card ─── */}
          <View style={styles.confirmCard}>
            <View style={styles.confirmHeaderRow}>
              <Ionicons name="warning" size={16} color="#F5B81B" />
              <Text style={styles.confirmHeaderText}>Release Confirmation</Text>
            </View>

            <Text style={styles.confirmSubtext}>
              By releasing these goods, you confirm that:
            </Text>

            <View style={styles.checklistWrap}>
              <ChecklistItem text="The full duty payment has been received" />
              <ChecklistItem text="The declaration has been verified" />
              <ChecklistItem text="All documents are in order" />
              <ChecklistItem text="No restrictions apply to this shipment" />
            </View>
          </View>

          {/* ─── Release Notes (Optional) ─── */}
          <View style={styles.notesWrap}>
            <Text style={styles.notesLabel}>Release Notes (Optional)</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="Lorem ipsum dolor sit amet, consectetur adiping..."
              placeholderTextColor="#B0B7BE"
              value={notes}
              onChangeText={setNotes}
              multiline
            />
            <View style={styles.notesUnderline} />
          </View>

          {/* ─── Confirmation Checkbox ─── */}
          <TouchableOpacity
            style={styles.confirmCheckboxRow}
            onPress={() => setConfirmed(!confirmed)}
            activeOpacity={0.8}
          >
            <View style={styles.confirmCheckboxCol}>
              <View
                style={[
                  styles.checkboxOuter,
                  confirmed && styles.checkboxOuterChecked,
                ]}
              >
                {confirmed && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
              </View>
              <View style={styles.confirmCheckboxTextWrap}>
                <Text style={styles.confirmCheckboxTitle}>
                  I confirm that all conditions for release are satisfied.
                </Text>
                <Text style={styles.confirmCheckboxSubtitle}>
                  This action will be recorded on the blockchain.
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* ─── Action Buttons ─── */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.actionBtn, styles.cancelBtn]}
              onPress={handleCancel}
              activeOpacity={0.85}
            >
              <TrashIcon />
              <Text style={styles.cancelBtnText}>CANCEL</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.actionBtn,
                styles.confirmBtn,
                !confirmed && styles.confirmBtnDisabled,
              ]}
              onPress={handleConfirm}
              activeOpacity={0.85}
              disabled={!confirmed}
            >
              <ExclamationIcon />
              <Text style={styles.confirmBtnText}>CONFIRM</Text>
            </TouchableOpacity>
          </View>

          {/* ─── Warning footer ─── */}
          <Text style={styles.warningText}>
            <Text style={styles.warningIcon}>⚠ </Text>
            This action is irreversible.
          </Text>
        </ScrollView>
      </SafeAreaView>

      {/* ─── Success Modal ─── */}
      <Modal
        visible={showSuccess}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSuccess(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.successCard}>
            <View style={styles.successBadgeCircle}>
              <Ionicons name="checkmark" size={32} color="#FFFFFF" />
            </View>
            <Text style={styles.successTitle}>Goods Released!</Text>
            <Text style={styles.successSubtitle}>
              Declaration {declaration.id} has been successfully released.
            </Text>
            <TouchableOpacity
              style={styles.successContinueBtn}
              onPress={handleSuccessContinue}
              activeOpacity={0.85}
            >
              <Text style={styles.successContinueBtnText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ══════════════════════════════════════════════════
// 🎨 STYLES
// ══════════════════════════════════════════════════

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f5" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  safeArea: { flex: 1 },

  // 🔝 Header (mirrors declaration-details.jsx)
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F2F4",
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 18,
    fontWeight: "750",
    flex: 1,
    textAlign: "center",
    marginLeft: -40,
  },

  // 📜 Content
  content: { flex: 1 },
  contentInner: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
    gap: 14,
  },

  // 📇 Section Card
  sectionCard: {
    padding: 0,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4E7EB",
    overflow: "hidden",
  },

  // Authorization header (top of first card)
  authHeader: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F2F4",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  authHeaderText: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 13,
    fontWeight: "700",
  },
  authInfoWrap: {
    paddingHorizontal: 14,
  },

  // 🏷 Info Row
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  infoRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F5F6F7",
  },
  infoLabel: {
    color: "#78828A",
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 11,
    flex: 1,
  },
  infoValueWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexShrink: 1,
    marginLeft: 8,
  },
  infoValue: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 11,
    fontWeight: "600",
    textAlign: "right",
  },

  // ✅ Green check badge (small filled circle)
  greenCheckBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },

  // ⚠ Release Confirmation card (yellow-tinted background)
  confirmCard: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#FFFCF2",
    borderWidth: 1,
    borderColor: "#FCE7A2",
    gap: 8,
  },
  confirmHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  confirmHeaderText: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 13,
    fontWeight: "700",
  },
  confirmSubtext: {
    color: "#4B5563",
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 11,
    lineHeight: 16,
  },

  // ✅ Checklist
  checklistWrap: {
    gap: 8,
    marginTop: 4,
  },
  checklistRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checklistText: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 11,
    flex: 1,
    lineHeight: 16,
  },

  // 📝 Notes
  notesWrap: {
    gap: 4,
    marginTop: 4,
  },
  notesLabel: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 2,
  },
  notesInput: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 12,
    paddingVertical: 4,
    minHeight: 30,
  },
  notesUnderline: {
    height: 1,
    backgroundColor: "#171725",
  },

  // ☑ Confirmation checkbox row
  confirmCheckboxRow: {
    marginTop: 8,
  },
  confirmCheckboxCol: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#F0FBF1",
    borderWidth: 1,
    borderColor: "#C7EBCD",
  },
  checkboxOuter: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 1,
  },
  checkboxOuterChecked: {
    backgroundColor: "#4CAF50",
  },
  confirmCheckboxTextWrap: {
    flex: 1,
    gap: 2,
  },
  confirmCheckboxTitle: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
  },
  confirmCheckboxSubtitle: {
    color: "#78828A",
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 11,
    lineHeight: 15,
  },

  // 🔘 Action Buttons Row
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    backgroundColor: "#FFFFFF",
  },
  cancelBtn: {
    borderColor: "#FF3D00",
  },
  cancelBtnText: {
    color: "#FF3D00",
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  confirmBtn: {
    borderColor: "#4CAF50",
  },
  confirmBtnDisabled: {
    opacity: 0.5,
  },
  confirmBtnText: {
    color: "#4CAF50",
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  // ⚠ Warning footer
  warningText: {
    color: "#FF3D00",
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 11,
    textAlign: "center",
    marginTop: 4,
  },
  warningIcon: {
    fontSize: 11,
  },

  // 🎉 Success Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  successCard: {
    width: "100%",
    maxWidth: 340,
    padding: 24,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  successBadgeCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  successTitle: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  successSubtitle: {
    color: "#78828A",
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
  },
  successContinueBtn: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#F5B81B",
    alignItems: "center",
    marginTop: 4,
  },
  successContinueBtnText: {
    color: "#000",
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 14,
    fontWeight: "700",
  },
});