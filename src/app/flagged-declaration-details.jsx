import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
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
import Svg, { Path } from "react-native-svg";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from "@expo-google-fonts/plus-jakarta-sans";

// ══════════════════════════════════════════════════
// 🎨 SVG ICONS (Main Screen)
// ══════════════════════════════════════════════════

const ProductInfoIcon = () => (
  <Svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2L4 6V12C4 17 7.5 21 12 22C16.5 21 20 17 20 12V6L12 2Z"
      fill="#F5B81B"
    />
  </Svg>
);

const FlagReasonIcon = () => (
  <Svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 3v18M5 4h13l-3 4 3 4H5"
      stroke="#F5B81B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const InvestigationIcon = () => (
  <Svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <Path
      d="M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14zM21 21l-4.35-4.35"
      stroke="#F5B81B"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

const TimelineIcon = () => (
  <Svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 5v6l4 2"
      stroke="#F5B81B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

const EvidenceIcon = () => (
  <Svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <Path
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
      fill="#F5B81B"
      stroke="#F5B81B"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <Path d="M14 2v6h6" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="1.5" />
  </Svg>
);

const NextStepsIcon = () => (
  <Svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
      stroke="#F5B81B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

const EyeIcon = () => (
  <Svg width="18" height="15" viewBox="0 0 18 15" fill="none">
    <Path
      d="M1.68741 10.0381C0.979133 9.11792 0.625 8.65783 0.625 7.29167C0.625 5.9255 0.979133 5.46544 1.68741 4.54528C3.10163 2.70797 5.47342 0.625 8.95833 0.625C12.4432 0.625 14.815 2.70797 16.2292 4.54528C16.9375 5.46544 17.2917 5.9255 17.2917 7.29167C17.2917 8.65783 16.9375 9.11792 16.2292 10.0381C14.815 11.8753 12.4432 13.9583 8.95833 13.9583C5.47342 13.9583 3.10163 11.8753 1.68741 10.0381Z"
      stroke="black"
      strokeWidth="1.25"
    />
    <Path
      d="M11.5 7.29a2.54 2.54 0 1 1-5.08 0 2.54 2.54 0 0 1 5.08 0z"
      stroke="black"
      strokeWidth="1.25"
    />
  </Svg>
);

const UploadIcon = () => (
  <Svg width="18" height="18" viewBox="0 0 25 25" fill="none">
    <Path
      d="M17.7083 17.7087H17.7187M16.25 14.5837H18.75C19.7207 14.5837 20.206 14.5837 20.589 14.7422C21.0994 14.9537 21.505 15.3593 21.7165 15.8697C21.875 16.2526 21.875 16.7379 21.875 17.7087C21.875 18.6794 21.875 19.1647 21.7165 19.5476C21.505 20.058 21.0994 20.4637 20.589 20.6751C20.206 20.8337 19.7207 20.8337 18.75 20.8337H6.25C5.27929 20.8337 4.79394 20.8337 4.41107 20.6751C3.9006 20.4637 3.49503 20.058 3.28358 19.5476C3.125 19.1647 3.125 18.6794 3.125 17.7087C3.125 16.7379 3.125 16.2526 3.28358 15.8697C3.49503 15.3593 3.9006 14.9537 4.41107 14.7422C4.79394 14.5837 5.27929 14.5837 6.25 14.5837H8.75M12.5 15.6253V4.16699M9.375 7.29199L12.5 4.16699L15.625 7.29199"
      stroke="#FF3D00"
      strokeWidth="2.08333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const MailIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 28 28" fill="none">
    <Path
      d="M4.66602 8.16705L11.8993 13.592C13.1438 14.5253 14.8549 14.5253 16.0993 13.592L23.3327 8.16699"
      stroke="#F5B81B"
      strokeWidth="2.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22.1667 5.83301H5.83333C4.54467 5.83301 3.5 6.87768 3.5 8.16634V19.833C3.5 21.1217 4.54467 22.1663 5.83333 22.1663H22.1667C23.4553 22.1663 24.5 21.1217 24.5 19.833V8.16634C24.5 6.87768 23.4553 5.83301 22.1667 5.83301Z"
      stroke="#F5B81B"
      strokeWidth="2.33333"
      strokeLinecap="round"
    />
  </Svg>
);

// ══════════════════════════════════════════════════
// 🎨 SVG ICONS (Upload Modal)
// ══════════════════════════════════════════════════

const UploadArrowIcon = () => (
  <Svg width="18" height="16" viewBox="0 0 21 19" fill="none">
    <Path
      d="M15.6243 14.5837H15.6348M14.166 11.4587H16.666C17.6367 11.4587 18.1221 11.4587 18.505 11.6172C19.0154 11.8287 19.421 12.2343 19.6325 12.7447C19.791 13.1276 19.791 13.6129 19.791 14.5837C19.791 15.5544 19.791 16.0397 19.6325 16.4226C19.421 16.933 19.0154 17.3387 18.505 17.5501C18.1221 17.7087 17.6367 17.7087 16.666 17.7087H4.16602C3.19531 17.7087 2.70995 17.7087 2.32709 17.5501C1.81662 17.3387 1.41105 16.933 1.1996 16.4226C1.04102 16.0397 1.04102 15.5544 1.04102 14.5837C1.04102 13.6129 1.04102 13.1276 1.1996 12.7447C1.41105 12.2343 1.81662 11.8287 2.32709 11.6172C2.70995 11.4587 3.19531 11.4587 4.16602 11.4587H6.66602M10.416 12.5003V1.04199M7.29102 4.16699L10.416 1.04199L13.541 4.16699"
      stroke="#F5B81B"
      strokeWidth="2.08333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const DocumentSmallIcon = () => (
  <Svg width="14" height="14" viewBox="0 0 15 15" fill="none">
    <Path
      d="M1.875 6.25C1.875 3.89298 1.875 2.71447 2.60723 1.98223C3.33947 1.25 4.51798 1.25 6.875 1.25H8.125C10.482 1.25 11.6606 1.25 12.3927 1.98223C13.125 2.71447 13.125 3.89298 13.125 6.25V8.75C13.125 11.107 13.125 12.2856 12.3927 13.0177C11.6606 13.75 10.482 13.75 8.125 13.75H6.875C4.51798 13.75 3.33947 13.75 2.60723 13.0177C1.875 12.2856 1.875 11.107 1.875 8.75V6.25Z"
      stroke="#F5B81B"
      strokeWidth="0.9375"
    />
    <Path d="M5 7.5H10" stroke="#F5B81B" strokeWidth="0.9375" strokeLinecap="round" />
    <Path d="M5 5H10" stroke="#F5B81B" strokeWidth="0.9375" strokeLinecap="round" />
    <Path d="M5 10H8.125" stroke="#F5B81B" strokeWidth="0.9375" strokeLinecap="round" />
  </Svg>
);

const PaperclipIcon = () => (
  <Svg width="14" height="15" viewBox="0 0 15 17" fill="none">
    <Path
      d="M14.0276 8.32547L8.06652 14.2863C7.68248 14.6704 7.24165 14.9564 6.77019 15.1477C6.06336 15.4342 5.28735 15.5064 4.54568 15.3627C3.80379 15.219 3.09932 14.862 2.52335 14.2864C2.13955 13.9025 1.85372 13.4617 1.66228 12.99C1.37569 12.2832 1.30346 11.5072 1.44723 10.7657C1.59123 10.0239 1.94791 9.31935 2.52338 8.74345L9.19248 2.07436C9.42693 1.84014 9.69477 1.66626 9.98158 1.55007C10.4117 1.37547 10.885 1.33154 11.3363 1.41894C11.7884 1.50683 12.2161 1.72329 12.5674 2.07436C12.8016 2.30858 12.9753 2.57642 13.0917 2.86347C13.2663 3.2933 13.3103 3.7664 13.2226 4.21823C13.1349 4.67006 12.9185 5.09756 12.5674 5.44935L6.09678 11.9199C6.01359 12.0029 5.92031 12.0632 5.81981 12.1041C5.66974 12.1649 5.50263 12.1808 5.34392 12.15C5.18475 12.1186 5.03678 12.0441 4.91218 11.9199C4.82899 11.8367 4.7689 11.7437 4.72823 11.6432C4.667 11.4931 4.65134 11.3258 4.6822 11.1673C4.71329 11.0084 4.78808 10.8602 4.91218 10.7356L10.6748 4.97273L9.70248 4.00036L3.93961 9.76297C3.72502 9.97756 3.56188 10.2286 3.45367 10.4955C3.29145 10.8959 3.25123 11.3319 3.33213 11.7498C3.41253 12.1677 3.6173 12.5702 3.93961 12.8923C4.15443 13.1073 4.40523 13.2705 4.67192 13.3785C5.07253 13.5409 5.50824 13.5809 5.92642 13.5C6.3441 13.4196 6.74685 13.2151 7.06916 12.8923L13.54 6.42189C13.9058 6.05585 14.1826 5.63022 14.3663 5.17701C14.6419 4.49684 14.7104 3.75494 14.5729 3.04391C14.4357 2.33333 14.0893 1.6508 13.54 1.10175C13.174 0.735942 12.7483 0.459204 12.2951 0.275511C11.615 -0.000307659 10.8731 -0.0685646 10.162 0.0686388C9.45145 0.206072 8.76895 0.552479 8.21987 1.10179L1.55098 7.77104C1.03509 8.2862 0.646399 8.88505 0.387883 9.52268C-8.87971e-05 10.4798 -0.0968764 11.5244 0.0968959 12.5255C0.290209 13.5262 0.777069 14.4854 1.55101 15.2589C2.0664 15.7748 2.66502 16.1635 3.30291 16.422C4.25982 16.8098 5.30465 16.9065 6.30552 16.713C7.30617 16.5194 8.26544 16.0328 9.03889 15.2589L15 9.29781L14.0276 8.32547Z"
      fill="#F5B81B"
    />
  </Svg>
);

const CloseIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <Path
      d="M5.83002 5.8388C5.50458 6.16424 5.50458 6.69188 5.83002 7.01732L8.81764 10.0049L5.83002 12.9926C5.50458 13.318 5.50458 13.8457 5.83002 14.1711C6.15545 14.4965 6.68309 14.4965 7.00853 14.1711L9.99614 11.1834L12.9838 14.1711C13.3092 14.4965 13.8369 14.4965 14.1623 14.1711C14.4877 13.8457 14.4877 13.318 14.1623 12.9926L11.1746 10.0049L14.1623 7.01733C14.4877 6.69189 14.4877 6.16425 14.1623 5.83882C13.8368 5.51338 13.3092 5.51338 12.9838 5.83882L9.99614 8.82642L7.00853 5.8388C6.68309 5.51337 6.15545 5.51337 5.83002 5.8388Z"
      fill="black"
      fillOpacity="0.29"
    />
  </Svg>
);

// ☁ White cloud upload icon (for Upload button)
const CloudUploadWhiteIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 20 20" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.66667 8.33301C6.66667 6.49206 8.15905 4.99967 10 4.99967C11.8409 4.99967 13.3333 6.49206 13.3333 8.33301V9.16634H14.1667C15.7775 9.16634 17.0833 10.4722 17.0833 12.083C17.0833 13.6938 15.7775 14.9997 14.1667 14.9997H13.3333C12.8731 14.9997 12.5 15.3728 12.5 15.833C12.5 16.2933 12.8731 16.6663 13.3333 16.6663H14.1667C16.698 16.6663 18.75 14.6143 18.75 12.083C18.75 9.81576 17.1037 7.93298 14.9413 7.56487C14.5718 5.16812 12.5002 3.33301 10 3.33301C7.49978 3.33301 5.42817 5.16812 5.05863 7.56487C2.89626 7.93298 1.25 9.81576 1.25 12.083C1.25 14.6143 3.30202 16.6663 5.83333 16.6663H6.66667C7.1269 16.6663 7.5 16.2933 7.5 15.833C7.5 15.3728 7.1269 14.9997 6.66667 14.9997H5.83333C4.2225 14.9997 2.91667 13.6938 2.91667 12.083C2.91667 10.4722 4.2225 9.16634 5.83333 9.16634H6.66667V8.33301ZM13.0892 11.0771L10.5892 8.57709C10.2638 8.25165 9.73617 8.25165 9.41075 8.57709L6.91074 11.0771C6.58531 11.4025 6.58531 11.9302 6.91074 12.2556C7.23618 12.581 7.76382 12.581 8.08926 12.2556L9.16667 11.1782V15.833C9.16667 16.2933 9.53975 16.6663 10 16.6663C10.4602 16.6663 10.8333 16.2933 10.8333 15.833V11.1782L11.9107 12.2556C12.2362 12.581 12.7638 12.581 13.0892 12.2556C13.4147 11.9302 13.4147 11.4025 13.0892 11.0771Z"
      fill="white"
    />
  </Svg>
);

// ══════════════════════════════════════════════════
// 📤 UPLOAD DOCUMENT MODAL
// ══════════════════════════════════════════════════

const DOCUMENT_TYPES = [
  "Commercial Invoice",
  "Bill of Lading",
  "Packing List",
  "Certificate of Origin",
  "Import License",
  "Market Price Report",
  "Correspondence",
  "Other Supporting Document",
];

const DESCRIPTION_SUGGESTIONS = [
  "e.g. Original commercial invoice",
  "e.g. Corrected bill of lading",
  "e.g. Additional packing details",
  "e.g. Import license copy",
  "e.g. Market price comparison",
];

const UploadDocumentModal = ({
  visible,
  onClose,
  onSubmit,
  caseId,
  documentType,
  setDocumentType,
  description,
  setDescription,
  files,
  onPickFile,
  onRemoveFile,
}) => {
  const [showDocTypeDropdown, setShowDocTypeDropdown] = useState(false);
  const [showDescDropdown, setShowDescDropdown] = useState(false);

  const isSubmitDisabled = !documentType || files.length === 0;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={modalStyles.overlay}>
        <View style={modalStyles.card}>
          {/* ─── Header ─── */}
          <View style={modalStyles.header}>
            <View style={modalStyles.headerLeft}>
              <UploadArrowIcon />
              <Text style={modalStyles.headerTitle}>Upload Document</Text>
            </View>
            <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
              <CloseIcon />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* ─── Subtitle Info Card ─── */}
            <View style={modalStyles.subtitleCard}>
              <View style={modalStyles.subtitleRow}>
                <DocumentSmallIcon />
                <Text style={modalStyles.subtitleTitle}>
                  Upload Document for Case {caseId}
                </Text>
              </View>
              <Text style={modalStyles.subtitleText}>
                Provide supporting evidence for the investigation
              </Text>
            </View>

            {/* ─── Document Type * ─── */}
            <View style={modalStyles.fieldWrap}>
              <Text style={modalStyles.fieldLabel}>
                Document Type <Text style={modalStyles.requiredMark}>*</Text>
              </Text>

              <TouchableOpacity
                style={modalStyles.dropdown}
                onPress={() => {
                  setShowDocTypeDropdown(!showDocTypeDropdown);
                  setShowDescDropdown(false);
                }}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    modalStyles.dropdownValue,
                    !documentType && modalStyles.placeholderBlur,
                  ]}
                >
                  {documentType || "Select document type"}
                </Text>
                <Ionicons
                  name={showDocTypeDropdown ? "chevron-up" : "chevron-down"}
                  size={16}
                  color="#78828A"
                />
              </TouchableOpacity>

              {showDocTypeDropdown && (
                <View style={modalStyles.dropdownOptions}>
                  {DOCUMENT_TYPES.map((type, idx) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        modalStyles.dropdownOptionRow,
                        idx !== DOCUMENT_TYPES.length - 1 &&
                          modalStyles.dropdownOptionRowBorder,
                      ]}
                      onPress={() => {
                        setDocumentType(type);
                        setShowDocTypeDropdown(false);
                      }}
                      activeOpacity={0.7}
                    >
                      <Text style={modalStyles.dropdownOptionText}>{type}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* ─── Description (Optional) ─── */}
            <View style={modalStyles.fieldWrap}>
              <Text style={modalStyles.fieldLabel}>
                Description{" "}
                <Text style={modalStyles.optionalMark}>(Optional)</Text>
              </Text>

              <View style={modalStyles.dropdown}>
                <TextInput
                  style={modalStyles.descInput}
                  placeholder="e.g. Original commercial..."
                  placeholderTextColor="#B0B7BE"
                  value={description}
                  onChangeText={setDescription}
                />
                <TouchableOpacity
                  onPress={() => {
                    setShowDescDropdown(!showDescDropdown);
                    setShowDocTypeDropdown(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={showDescDropdown ? "chevron-up" : "chevron-down"}
                    size={16}
                    color="#78828A"
                  />
                </TouchableOpacity>
              </View>

              {showDescDropdown && (
                <View style={modalStyles.dropdownOptions}>
                  {DESCRIPTION_SUGGESTIONS.map((sugg, idx) => (
                    <TouchableOpacity
                      key={sugg}
                      style={[
                        modalStyles.dropdownOptionRow,
                        idx !== DESCRIPTION_SUGGESTIONS.length - 1 &&
                          modalStyles.dropdownOptionRowBorder,
                      ]}
                      onPress={() => {
                        setDescription(sugg);
                        setShowDescDropdown(false);
                      }}
                      activeOpacity={0.7}
                    >
                      <Text style={modalStyles.dropdownOptionText}>{sugg}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* ─── Select File * ─── */}
            <View style={modalStyles.fieldWrap}>
              <Text style={modalStyles.fieldLabel}>
                Select File <Text style={modalStyles.requiredMark}>*</Text>
              </Text>

              <View style={modalStyles.chooseFileRow}>
                <TouchableOpacity
                  style={modalStyles.chooseFileBtn}
                  onPress={onPickFile}
                  activeOpacity={0.85}
                >
                  <PaperclipIcon />
                  <Text style={modalStyles.chooseFileText}>Choose File</Text>
                </TouchableOpacity>

                <Text style={modalStyles.fileStatusText}>
                  {files.length === 0
                    ? "No file selected"
                    : `${files.length} file${files.length > 1 ? "s" : ""} selected`}
                </Text>
              </View>

              {/* Uploaded files list */}
              {files.length > 0 && (
                <View style={modalStyles.filesList}>
                  {files.map((file, idx) => (
                    <View key={`${file.name}-${idx}`} style={modalStyles.fileRow}>
                      <Ionicons
                        name="document-attach-outline"
                        size={13}
                        color="#171725"
                      />
                      <Text style={modalStyles.fileName} numberOfLines={1}>
                        {file.name}{" "}
                        <Text style={modalStyles.fileSize}>({file.size})</Text>
                      </Text>
                      <TouchableOpacity
                        onPress={() => onRemoveFile(idx)}
                        style={modalStyles.fileRemoveBtn}
                      >
                        <Ionicons name="close" size={14} color="#78828A" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </ScrollView>

          {/* ─── Buttons ─── */}
          <View style={modalStyles.buttonRow}>
            <TouchableOpacity
              style={modalStyles.cancelBtn}
              onPress={onClose}
              activeOpacity={0.85}
            >
              <Ionicons name="close" size={16} color="#4B5563" />
              <Text style={modalStyles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                modalStyles.submitBtn,
                isSubmitDisabled && modalStyles.submitBtnDisabled,
              ]}
              onPress={onSubmit}
              activeOpacity={0.85}
              disabled={isSubmitDisabled}
            >
              <CloudUploadWhiteIcon />
              <Text style={modalStyles.submitBtnText}>Upload</Text>
            </TouchableOpacity>
          </View>

          {/* ─── Footer Note ─── */}
          <Text style={modalStyles.footerNote}>
            Uploaded documents will be shared with the auditor
          </Text>
        </View>
      </View>
    </Modal>
  );
};

// ══════════════════════════════════════════════════
// 🧩 SUB-COMPONENTS (Main Screen)
// ══════════════════════════════════════════════════

const SectionCard = ({ Icon, title, children }) => (
  <View style={styles.sectionCard}>
    <View style={styles.sectionHeader}>
      <Icon />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    {children}
  </View>
);

const InfoRow = ({ label, value, isLast, valueColor = "#171725" }) => (
  <View style={[styles.infoRow, !isLast && styles.infoRowBorder]}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={[styles.infoValue, { color: valueColor }]} numberOfLines={2}>
      {value}
    </Text>
  </View>
);

const TimelineEvent = ({ dotColor, text }) => (
  <View style={styles.timelineRow}>
    <View style={[styles.timelineDot, { backgroundColor: dotColor }]} />
    <View style={styles.timelineTextWrap}>
      <Text style={styles.timelineText}>{text}</Text>
    </View>
  </View>
);

const EvidenceRow = ({ name, onView, isLast }) => (
  <View style={[styles.evidenceRow, !isLast && styles.evidenceRowBorder]}>
    <Text style={styles.evidenceName}>{name}</Text>
    <TouchableOpacity onPress={onView} style={styles.viewBtn} activeOpacity={0.7}>
      <EyeIcon />
    </TouchableOpacity>
  </View>
);

const NextStepItem = ({ number, text }) => (
  <View style={styles.stepRow}>
    <View style={styles.stepNumberWrap}>
      <Text style={styles.stepNumber}>{number}.</Text>
    </View>
    <Text style={styles.stepText}>{text}</Text>
  </View>
);

// ══════════════════════════════════════════════════
// 📄 MAIN SCREEN
// ══════════════════════════════════════════════════

export default function FlaggedDeclarationDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // ─── Upload Modal state ─────────────────────────
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [documentType, setDocumentType] = useState("");
  const [description, setDescription] = useState("");

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

  const declaration = {
    id: params.id || "TMA-2026-0042",
    hsCode: params.hsCode || "870323",
    description: params.description || "Toyota Corolla 2022-1 unit",
    declaredValue: params.declaredValue || "$15,000",
    dutyCalculated: params.dutyCalculated || "$3,750",
    dutyPaid: params.dutyPaid || "$0",
    status: params.status || "Flagged",
    port: params.port || "Tema Port",
    flagReason:
      params.flagReason ||
      "Under-declaration suspected. Market value significantly higher than declared value. Previous shipments from this importer show similar patterns of under-declaration. Recommend full audit.",
    investigationStatus: params.investigationStatus || "Under Investigation",
    assignedAuditor: params.assignedAuditor || "Ama Serwaa Darko",
    expectedResolution: params.expectedResolution || "2026-07-15",
  };

  const timelineEvents = [
    { dotColor: "#FF3D00", text: "2026-06-10 14:30 Flagged by Customs Officer" },
    { dotColor: "#171725", text: "2026-06-10 14:30 Assigned by Customs Officer" },
    { dotColor: "#171725", text: "2026-06-10 14:30 Assigned by Customs Officer" },
    { dotColor: "#D1D5DB", text: "○  2026-07-10   Expected resolution date" },
  ];

  const evidenceFiles = [
    "Commercial Invoice (invoice_456.pdf)",
    "Bill of Lading (BL_789.pdf)",
    "Packing List (PL_123.pdf)",
  ];

  const nextSteps = [
    "Provide any requested documents to the auditor",
    "Respond to auditor inquiries promptly",
    "Check your email for updates from the investigation",
    "You can track the case progress here",
  ];

  // ─── Handlers ────────────────────────────────────
  const handleViewEvidence = (fileName) => {
    console.log("View evidence:", fileName);
  };

  const handleContactAuditor = () => {
    console.log("Contact auditor:", declaration.assignedAuditor);
  };

  const handleUploadDocument = () => {
    setUploadModalVisible(true);
  };

  const handleSubmitUpload = () => {
    console.log("Submit upload:", { documentType, description, uploadedFiles });
    setUploadModalVisible(false);
    setDocumentType("");
    setDescription("");
    setUploadedFiles([]);
  };

 const handlePickFile = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
      multiple: false,
      copyToCacheDirectory: true,
    });

    // User cancelled the picker
    if (result.canceled) {
      return;
    }

    const file = result.assets[0];

    // Optional: enforce 10 MB max size
    const maxBytes = 10 * 1024 * 1024;
    if (file.size && file.size > maxBytes) {
      alert("File is too large. Maximum size is 10 MB.");
      return;
    }

    // Format size for display
    const formatSize = (bytes) => {
      if (!bytes) return "Unknown size";
      const mb = bytes / (1024 * 1024);
      if (mb >= 1) return `${mb.toFixed(1)} MB`;
      const kb = bytes / 1024;
      return `${kb.toFixed(0)} KB`;
    };

    setUploadedFiles((prev) => [
      ...prev,
      {
        name: file.name,
        size: formatSize(file.size),
        uri: file.uri,           // for later upload to your API
        mimeType: file.mimeType, // for later upload to your API
      },
    ]);
  } catch (err) {
    console.error("Error picking file:", err);
    alert("Something went wrong. Please try again.");
  }
};
  const handleRemoveUploadedFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
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
          <Text style={styles.headerTitle}>Flagged Declaration</Text>
          <View style={styles.backButton} />
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentInner}
          showsVerticalScrollIndicator={false}
        >
          {/* ID + Status Pill */}
          <View style={styles.idRow}>
            <Text style={styles.idText}>{declaration.id}</Text>
            <View style={styles.statusPill}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>{declaration.status}</Text>
            </View>
          </View>

          {/* Flagged banner */}
          <View style={styles.flaggedBanner}>
            <Ionicons name="warning" size={12} color="#FF3D00" />
            <Text style={styles.flaggedBannerText}>
              This declaration has been flagged for investigation
            </Text>
          </View>

          {/* Product Information */}
          <SectionCard Icon={ProductInfoIcon} title="Product Information">
            <InfoRow label="HS Code" value={declaration.hsCode} />
            <InfoRow label="Description" value={declaration.description} />
            <InfoRow label="Declared Value" value={declaration.declaredValue} />
            <InfoRow label="Duty Calculated" value={declaration.dutyCalculated} />
            <InfoRow label="Duty Paid" value={declaration.dutyPaid} />
            <InfoRow
              label="Status"
              value={declaration.status}
              valueColor="#FF3D00"
            />
            <InfoRow label="Port" value={declaration.port} isLast />
          </SectionCard>

          {/* Flag Reason */}
          <SectionCard Icon={FlagReasonIcon} title="Flag Reason">
            <Text style={styles.flagReasonText}>{declaration.flagReason}</Text>
          </SectionCard>

          {/* Investigation Status */}
          <SectionCard Icon={InvestigationIcon} title="Investigation Status">
            <InfoRow label="Status:" value={declaration.investigationStatus} />
            <InfoRow label="Assigned Auditor:" value={declaration.assignedAuditor} />
            <InfoRow
              label="Expected Resolution:"
              value={declaration.expectedResolution}
              isLast
            />
          </SectionCard>

          {/* Case Timeline */}
          <SectionCard Icon={TimelineIcon} title="Case Timeline">
            {timelineEvents.map((evt, idx) => (
              <TimelineEvent key={idx} dotColor={evt.dotColor} text={evt.text} />
            ))}
          </SectionCard>

          {/* Evidence & Documents */}
          <SectionCard Icon={EvidenceIcon} title="Evidence & Documents">
            {evidenceFiles.map((file, idx) => (
              <EvidenceRow
                key={idx}
                name={file}
                onView={() => handleViewEvidence(file)}
                isLast={idx === evidenceFiles.length - 1}
              />
            ))}
          </SectionCard>

          {/* What You Need To Do */}
          <SectionCard Icon={NextStepsIcon} title="What You Need To Do">
            {nextSteps.map((step, idx) => (
              <NextStepItem key={idx} number={idx + 1} text={step} />
            ))}
          </SectionCard>

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.actionBtn, styles.contactBtn]}
              onPress={handleContactAuditor}
              activeOpacity={0.85}
            >
              <MailIcon />
              <Text style={styles.contactBtnText}>Contact Auditor</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, styles.uploadBtn]}
              onPress={handleUploadDocument}
              activeOpacity={0.85}
            >
              <UploadIcon />
              <Text style={styles.uploadBtnText}>Upload Document</Text>
            </TouchableOpacity>
          </View>

          {/* Footer Note */}
          <Text style={styles.footerNote}>
            <Text style={styles.footerNoteIcon}>⚠ </Text>
            While under investigation, your goods will remain at the port. You will be notified once the investigation is complete.
          </Text>
        </ScrollView>
      </SafeAreaView>

      {/* Upload Document Modal */}
      <UploadDocumentModal
        visible={uploadModalVisible}
        onClose={() => setUploadModalVisible(false)}
        onSubmit={handleSubmitUpload}
        caseId={declaration.id}
        documentType={documentType}
        setDocumentType={setDocumentType}
        description={description}
        setDescription={setDescription}
        files={uploadedFiles}
        onPickFile={handlePickFile}
        onRemoveFile={handleRemoveUploadedFile}
      />
    </View>
  );
}

// ══════════════════════════════════════════════════
// 🎨 MAIN SCREEN STYLES
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

  content: { flex: 1 },
  contentInner: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 40,
    gap: 12,
  },

  idRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  idText: {
    color: "#78828A",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 13,
    fontWeight: "600",
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF3D00",
  },
  statusText: {
    color: "#FF3D00",
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 11,
    fontWeight: "500",
  },

  flaggedBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 4,
    marginTop: -2,
  },
  flaggedBannerText: {
    color: "#FF3D00",
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 10,
  },

  sectionCard: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4E7EB",
    gap: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F2F4",
  },
  sectionTitle: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 13,
    fontWeight: "700",
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
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

  flagReasonText: {
    color: "#4B5563",
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 11,
    lineHeight: 16,
    paddingVertical: 4,
  },

  timelineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 6,
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  timelineTextWrap: { flex: 1 },
  timelineText: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 11,
    lineHeight: 15,
  },

  evidenceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  evidenceRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F5F6F7",
  },
  evidenceName: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 12,
    flex: 1,
  },
  viewBtn: { padding: 4 },

  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
    paddingVertical: 4,
  },
  stepNumberWrap: { marginTop: 1 },
  stepNumber: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 11,
  },
  stepText: {
    flex: 1,
    color: "#4B5563",
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 11,
    lineHeight: 15,
  },

  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 4,
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
  contactBtn: { borderColor: "#F5B81B" },
  contactBtnText: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 12,
    fontWeight: "600",
  },
  uploadBtn: { borderColor: "#FF3D00" },
  uploadBtnText: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 12,
    fontWeight: "600",
  },

  footerNote: {
    color: "#78828A",
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 10,
    textAlign: "center",
    lineHeight: 14,
    fontStyle: "italic",
    marginTop: 6,
    paddingHorizontal: 8,
  },
  footerNoteIcon: { color: "#FF3D00" },
});

// ══════════════════════════════════════════════════
// 🎨 MODAL STYLES
// ══════════════════════════════════════════════════

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    maxHeight: "85%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },

  // ─── Header ──────────────────────────────────
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 12,
    marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F2F4",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 15,
    fontWeight: "700",
  },

  // ─── Subtitle info card ─────────────────────
  subtitleCard: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#FFFCF2",
    borderWidth: 1,
    borderColor: "#FCE7A2",
    marginBottom: 14,
    gap: 4,
  },
  subtitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  subtitleTitle: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 12,
    fontWeight: "600",
  },
  subtitleText: {
    color: "#78828A",
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 10.5,
    lineHeight: 14,
    marginLeft: 20,
  },

  // ─── Field wrap ────────────────────────────
  fieldWrap: {
    gap: 6,
    marginBottom: 12,
  },
  fieldLabel: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 12,
    fontWeight: "600",
  },
  requiredMark: {
    color: "#FF3D00",
  },
  optionalMark: {
    color: "#78828A",
    fontFamily: "PlusJakartaSans_400Regular",
    fontWeight: "400",
  },

  // ─── Dropdown ──────────────────────────────
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4E7EB",
  },
  dropdownValue: {
    flex: 1,
    color: "#171725",
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 12,
  },
  placeholderBlur: {
    color: "#B0B7BE",
    opacity: 0.75,
  },
  dropdownOptions: {
    marginTop: 4,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4E7EB",
    overflow: "hidden",
    maxHeight: 180,
  },
  dropdownOptionRow: {
    paddingVertical: 9,
    paddingHorizontal: 12,
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

  // ─── Description input (inline in dropdown-style box) ──
  descInput: {
    flex: 1,
    color: "#171725",
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 12,
    padding: 0,
  },

  // ─── Choose File row ─────────────────────
  chooseFileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  chooseFileBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4E7EB",
  },
  chooseFileText: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 12,
    fontWeight: "600",
  },
  fileStatusText: {
    color: "#78828A",
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 11,
  },

  // ─── Files list ────────────────────────
  filesList: {
    marginTop: 8,
    gap: 6,
  },
  fileRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#E4E7EB",
    gap: 6,
  },
  fileName: {
    flex: 1,
    color: "#171725",
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 11,
  },
  fileSize: {
    color: "#78828A",
    fontFamily: "PlusJakartaSans_400Regular",
  },
  fileRemoveBtn: { padding: 2 },

  // ─── Buttons ──────────────────────────
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F1F2F4",
  },
  cancelBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
  },
  cancelBtnText: {
    color: "#4B5563",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 13,
    fontWeight: "600",
  },
  submitBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#F5B81B",
  },
  submitBtnDisabled: {
    opacity: 0.5,
  },
  submitBtnText: {
    color: "#FFFFFF",
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 13,
    fontWeight: "700",
  },

  // ─── Footer note ────────────────────
  footerNote: {
    color: "#78828A",
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 10.5,
    textAlign: "center",
    marginTop: 10,
  },
});