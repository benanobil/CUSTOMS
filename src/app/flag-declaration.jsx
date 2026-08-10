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
  FlatList,
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
import * as DocumentPicker from "expo-document-picker";

// ══════════════════════════════════════════════════
// 🎨 SVG ICONS
// ══════════════════════════════════════════════════

// 🗑 Trash Icon (red) — for Cancel button
const TrashIcon = () => (
  <Svg width="18" height="18" viewBox="0 0 22 22" fill="none">
    <G clipPath="url(#clip_trash_fd)">
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
      <ClipPath id="clip_trash_fd">
        <Rect width="22" height="22" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

// 📎 Paperclip Icon (yellow) — for Choose File button
const PaperclipIcon = () => (
  <Svg width="15" height="17" viewBox="0 0 15 17" fill="none">
    <Path
      d="M14.0276 8.32547L8.06652 14.2863C7.68248 14.6704 7.24165 14.9564 6.77019 15.1477C6.06336 15.4342 5.28735 15.5064 4.54568 15.3627C3.80379 15.219 3.09932 14.862 2.52335 14.2864C2.13955 13.9025 1.85372 13.4617 1.66228 12.99C1.37569 12.2832 1.30346 11.5072 1.44723 10.7657C1.59123 10.0239 1.94791 9.31935 2.52338 8.74345L9.19248 2.07436C9.42693 1.84014 9.69477 1.66626 9.98158 1.55007C10.4117 1.37547 10.885 1.33154 11.3363 1.41894C11.7884 1.50683 12.2161 1.72329 12.5674 2.07436C12.8016 2.30858 12.9753 2.57642 13.0917 2.86347C13.2663 3.2933 13.3103 3.7664 13.2226 4.21823C13.1349 4.67006 12.9185 5.09756 12.5674 5.44935L6.09678 11.9199C6.01359 12.0029 5.92031 12.0632 5.81981 12.1041C5.66974 12.1649 5.50263 12.1808 5.34392 12.15C5.18475 12.1186 5.03678 12.0441 4.91218 11.9199C4.82899 11.8367 4.7689 11.7437 4.72823 11.6432C4.667 11.4931 4.65134 11.3258 4.6822 11.1673C4.71329 11.0084 4.78808 10.8602 4.91218 10.7356L10.6748 4.97273L9.70248 4.00036L3.93961 9.76297C3.72502 9.97756 3.56188 10.2286 3.45367 10.4955C3.29145 10.8959 3.25123 11.3319 3.33213 11.7498C3.41253 12.1677 3.6173 12.5702 3.93961 12.8923C4.15443 13.1073 4.40523 13.2705 4.67192 13.3785C5.07253 13.5409 5.50824 13.5809 5.92642 13.5C6.3441 13.4196 6.74685 13.2151 7.06916 12.8923L13.54 6.42189C13.9058 6.05585 14.1826 5.63022 14.3663 5.17701C14.6419 4.49684 14.7104 3.75494 14.5729 3.04391C14.4357 2.33333 14.0893 1.6508 13.54 1.10175C13.174 0.735942 12.7483 0.459204 12.2951 0.275511C11.615 -0.000307659 10.8731 -0.0685646 10.162 0.0686388C9.45145 0.206072 8.76895 0.552479 8.21987 1.10179L1.55098 7.77104C1.03509 8.2862 0.646399 8.88505 0.387883 9.52268C-8.87971e-05 10.4798 -0.0968764 11.5244 0.0968959 12.5255C0.290209 13.5262 0.777069 14.4854 1.55101 15.2589C2.0664 15.7748 2.66502 16.1635 3.30291 16.422C4.25982 16.8098 5.30465 16.9065 6.30552 16.713C7.30617 16.5194 8.26544 16.0328 9.03889 15.2589L15 9.29781L14.0276 8.32547Z"
      fill="#F5B81B"
    />
  </Svg>
);

// ══════════════════════════════════════════════════
// 📊 DROPDOWN OPTIONS
// ══════════════════════════════════════════════════

const FLAG_REASONS = [
  "Under-declaration suspected",
  "Incorrect HS Code classification",
  "Incomplete documentation",
  "Invalid import license",
  "Restricted/prohibited goods",
  "Suspicious transaction flagged",
  "Other",
];

// ══════════════════════════════════════════════════
// 🧩 SUB-COMPONENTS
// ══════════════════════════════════════════════════

// Info row (label + value) — matches other screens
const InfoRow = ({ label, value, isLast }) => (
  <View style={[styles.infoRow, !isLast && styles.infoRowBorder]}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue} numberOfLines={2}>
      {value}
    </Text>
  </View>
);

// Dropdown field with modal picker
const DropdownField = ({ value, placeholder, options, onSelect }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.dropdownField}
        onPress={() => setVisible(true)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.dropdownValue,
            !value && styles.placeholderTextBlur,
          ]}
        >
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={16} color="#78828A" />
      </TouchableOpacity>

      {/* Inline options list (below dropdown) */}
      {visible && (
        <View style={styles.dropdownOptionsCard}>
          {options.map((opt, idx) => (
            <TouchableOpacity
              key={opt}
              style={[
                styles.dropdownOptionRow,
                idx !== options.length - 1 && styles.dropdownOptionRowBorder,
              ]}
              onPress={() => {
                onSelect(opt);
                setVisible(false);
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.dropdownOptionText}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
};

// File chip (uploaded evidence)
const FileChip = ({ fileName, fileSize, onRemove }) => (
  <View style={styles.fileChip}>
    <Ionicons name="document-attach-outline" size={14} color="#171725" />
    <Text style={styles.fileChipText} numberOfLines={1}>
      {fileName}{" "}
      <Text style={styles.fileChipSize}>({fileSize})</Text>
    </Text>
    {onRemove && (
      <TouchableOpacity onPress={onRemove} style={styles.fileChipRemove}>
        <Ionicons name="close" size={14} color="#78828A" />
      </TouchableOpacity>
    )}
  </View>
);

// ══════════════════════════════════════════════════
// 📄 MAIN SCREEN
// ══════════════════════════════════════════════════

export default function FlagDeclaration() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [flagReason, setFlagReason] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [assignAuditor, setAssignAuditor] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock uploaded files (for demo)
  const [files, setFiles] = useState([
    { name: "suspicious_invoice.jpg", size: "1.8 MB" },
    { name: "Market_Price_Report_2026.pdf", size: "2.3 MB" },
  ]);

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

  // Data from params or fallback defaults
  const declaration = {
    id: params.id || "TMA-2026-0042",
    importer: params.importer || "Kofi Import Ltd",
    product: params.product || "Toyota Corolla 2022 - 1 unit",
    declaredValue: params.declaredValue || "$10000",
    duty: params.duty || "$3,750",
  };

  const handleChooseFile = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*", // or specific: "image/*", "application/pdf", etc.
      multiple: false,
    });

    if (!result.canceled && result.assets?.[0]) {
      const file = result.assets[0];
      setFiles((prev) => [
        ...prev,
        {
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          uri: file.uri,
        },
      ]);
    }
  } catch (err) {
    console.error("File picker error:", err);
  }
};

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = () => {
    if (!flagReason) return;
    // TODO: hook up to blockchain / API call
    setShowSuccess(true);
  };

  const handleSuccessContinue = () => {
    setShowSuccess(false);
    setTimeout(() => {
      router.back();
    }, 100);
  };

  const isSubmitDisabled = !flagReason;

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#171725" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Flag Declaration</Text>
          <View style={styles.backButton} />
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentInner}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ─── Flag Declaration for Investigation Card ─── */}
          <View style={styles.sectionCard}>
            <View style={styles.authHeader}>
              <Text style={styles.authHeaderText}>
                🚩  Flag Declaration for Investigation
              </Text>
            </View>

            <View style={styles.authInfoWrap}>
              <InfoRow label="Declaration ID" value={declaration.id} />
              <InfoRow label="Importer" value={declaration.importer} />
              <InfoRow label="Product" value={declaration.product} />
              <InfoRow label="Declared Value" value={declaration.declaredValue} />
              <InfoRow label="Duty" value={declaration.duty} isLast />
            </View>
          </View>

          {/* ─── Flag Reason ─── */}
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Flag Reason</Text>
            <DropdownField
              value={flagReason}
              placeholder="Select reason"
              options={FLAG_REASONS}
              onSelect={setFlagReason}
            />
          </View>

          {/* ─── Additional Details ─── */}
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Additional Details</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Lorem ipsum dolor sit amet, consectetur adiping..."
              placeholderTextColor="#B0B7BE"
              value={additionalDetails}
              onChangeText={setAdditionalDetails}
              multiline
            />
            <View style={styles.textAreaUnderline} />
          </View>

          {/* ─── Supporting Evidence ─── */}
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Supporting Evidence</Text>

            {/* Choose File button */}
            <TouchableOpacity
              style={styles.chooseFileBtn}
              onPress={handleChooseFile}
              activeOpacity={0.85}
            >
              <PaperclipIcon />
              <Text style={styles.chooseFileText}>Choose File</Text>
            </TouchableOpacity>

            {/* Uploaded files */}
            <View style={styles.filesWrap}>
              {files.map((file, idx) => (
                <FileChip
                  key={`${file.name}-${idx}`}
                  fileName={file.name}
                  fileSize={file.size}
                  onRemove={() => handleRemoveFile(idx)}
                />
              ))}
            </View>
          </View>

          {/* ─── Assign Auditor Checkbox ─── */}
          <TouchableOpacity
            style={styles.auditorRow}
            onPress={() => setAssignAuditor(!assignAuditor)}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.smallCheckbox,
                assignAuditor && styles.smallCheckboxChecked,
              ]}
            >
              {assignAuditor && (
                <Ionicons name="checkmark" size={10} color="#FFFFFF" />
              )}
            </View>
            <Text style={styles.auditorText}>
              This will assign an auditor to investigate the case
            </Text>
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
                styles.submitBtn,
                isSubmitDisabled && styles.submitBtnDisabled,
              ]}
              onPress={handleSubmit}
              activeOpacity={0.85}
              disabled={isSubmitDisabled}
            >
              <Text style={styles.submitBtnText}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
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
              <Ionicons name="flag" size={28} color="#FFFFFF" />
            </View>
            <Text style={styles.successTitle}>Declaration Flagged</Text>
            <Text style={styles.successSubtitle}>
              {declaration.id} has been flagged for investigation.
              {assignAuditor && " An auditor will be assigned shortly."}
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

  // 🔝 Header
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
    gap: 16,
  },

  // 📇 Section Card (top authorization card)
  sectionCard: {
    padding: 0,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4E7EB",
    overflow: "hidden",
  },
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
  infoValue: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 11,
    fontWeight: "600",
    textAlign: "right",
    flexShrink: 1,
    marginLeft: 8,
  },

  // 🏷 Field label (Flag Reason, Additional Details, etc.)
  fieldWrap: {
    gap: 6,
  },
  fieldLabel: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 2,
  },

  // 📇 Dropdown Field
  dropdownField: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4E7EB",
  },
  dropdownValue: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 12,
    flex: 1,
  },
  placeholderTextBlur: {
    color: "#B0B7BE",
    opacity: 0.75,
  },

  // Dropdown options list (appears below field)
  dropdownOptionsCard: {
    marginTop: 6,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4E7EB",
    overflow: "hidden",
  },
  dropdownOptionRow: {
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  dropdownOptionRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F5F6F7",
  },
  dropdownOptionText: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 12,
  },

  // 📝 Text Area (Additional Details)
  textArea: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 12,
    paddingVertical: 4,
    minHeight: 32,
  },
  textAreaUnderline: {
    height: 1,
    backgroundColor: "#171725",
    marginTop: 2,
  },

  // 📎 Choose File Button
  chooseFileBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4E7EB",
    borderStyle: "dashed",
  },
  chooseFileText: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 12,
    fontWeight: "600",
  },

  // 📄 File Chips
  filesWrap: {
    marginTop: 8,
    gap: 6,
  },
  fileChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4E7EB",
    gap: 8,
  },
  fileChipText: {
    flex: 1,
    color: "#171725",
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 11,
  },
  fileChipSize: {
    color: "#78828A",
    fontFamily: "PlusJakartaSans_400Regular",
  },
  fileChipRemove: {
    padding: 2,
  },

  // ☑ Auditor Checkbox Row
  auditorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },
  smallCheckbox: {
    width: 14,
    height: 14,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: "#FF3D00",
    justifyContent: "center",
    alignItems: "center",
  },
  smallCheckboxChecked: {
    backgroundColor: "#FF3D00",
  },
  auditorText: {
    flex: 1,
    color: "#171725",
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 11,
    lineHeight: 15,
  },

  // 🔘 Action Buttons Row
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
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
  submitBtn: {
    borderColor: "#4CAF50",
  },
  submitBtnDisabled: {
    opacity: 0.5,
  },
  submitBtnText: {
    color: "#4CAF50",
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.5,
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
    backgroundColor: "#F5B81B",
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