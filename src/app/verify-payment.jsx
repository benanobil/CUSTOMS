import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
  Alert,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";
import { useRouter, useLocalSearchParams } from "expo-router";
import { blockchainService } from "../services/blockchainService";
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from "@expo-google-fonts/plus-jakarta-sans";

// ══════════════════════════════════════════════════
// 🧩 SUB-COMPONENTS
// ══════════════════════════════════════════════════

// Info row (label + value)
const InfoRow = ({ label, value, isLast, boldValue = false }) => (
  <View style={[styles.infoRow, !isLast && styles.infoRowBorder]}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text
      style={[styles.infoValue, boldValue && styles.infoValueBold]}
      numberOfLines={2}
    >
      {value}
    </Text>
  </View>
);

// Blockchain checklist item
const ChecklistItem = ({ text }) => (
  <View style={styles.checklistRow}>
    <Ionicons name="checkmark" size={14} color="#4CAF50" />
    <Text style={styles.checklistText}>{text}</Text>
  </View>
);

// ══════════════════════════════════════════════════
// 📄 MAIN SCREEN
// ══════════════════════════════════════════════════

export default function VerifyPayment() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [showSuccess, setShowSuccess] = useState(false);
  const [verification, setVerification] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);

  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
  });

  // Data from params or defaults
  const payment = {
    declarationId: params.id || "TMA-2026-0041",
    importer: params.importer || "Kofi Import Ltd",
    amountDue: params.amountDue || "080510",
    amountPaid: params.amountPaid || "$10,000",
    method: params.method || "Blockchain Transaction (ETH)",
    transHash: params.transHash || "0xdef456...789",
    nftTokenId: params.nftTokenId || "1002",
  };

  const loadVerification = useCallback(async () => {
    setIsLoading(true);
    try {
      const [transaction, receipt, nft, onChain] = await Promise.all([
        blockchainService.getTransaction(payment.transHash),
        blockchainService.getTransactionReceipt(payment.transHash),
        blockchainService.getNftByDeclaration(payment.declarationId).catch(() =>
          payment.nftTokenId
            ? blockchainService.getNftByTokenId(payment.nftTokenId).catch(() => null)
            : null
        ),
        blockchainService.getDeclaration(payment.declarationId).catch(() => null),
      ]);
      const gas = await blockchainService.estimateGas({
        functionName: "payDuty",
        params: { declarationId: payment.declarationId },
      }).catch(() => null);
      setVerification({ transaction, receipt, nft, onChain, gas });
    } catch (error) {
      Alert.alert("Verification unavailable", error.message || "Unable to verify this transaction.");
    } finally { setIsLoading(false); }
  }, [payment.declarationId, payment.transHash]);

  useEffect(() => { loadVerification(); }, [loadVerification]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // ─── Handlers ────────────────────────────────
  const handleViewEtherscan = () => {
    Linking.openURL(`https://sepolia.etherscan.io/tx/${payment.transHash}`);
  };

  const handleConfirmVerification = () => {
    if (isLoading || isConfirming || verification?.transaction?.status !== "success") return;
    setIsConfirming(true);
    try { setShowSuccess(true); }
    finally { setIsConfirming(false); }
  };

  const handleSuccessDone = () => {
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
          <Text style={styles.headerTitle}>Payment Confirmation</Text>
          <View style={styles.backButton} />
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentInner}
          showsVerticalScrollIndicator={false}
        >
          {/* ─── Payment Summary Card ─── */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Payment Summary</Text>

            <View style={styles.infoWrap}>
              <InfoRow label="Declaration ID" value={payment.declarationId} />
              <InfoRow label="Importer" value={payment.importer} />
              <InfoRow label="Amount Due" value={payment.amountDue} />
              <InfoRow
                label="Amount Paid"
                value={payment.amountPaid}
                boldValue
                isLast
              />
            </View>

            {/* Payment Method */}
            <View style={styles.sectionDivider} />
            <Text style={styles.cardSubtitle}>Payment Method</Text>

            <View style={styles.methodRow}>
              <View style={styles.methodDot} />
              <Text style={styles.methodText}>{payment.method}</Text>
            </View>

            <View style={styles.infoWrap}>
              <InfoRow label="Trans Hash" value={payment.transHash} />
              <InfoRow label="NFT Token ID" value={payment.nftTokenId} isLast />
            </View>
          </View>

          {/* ─── Blockchain Verification Status Card (blue-tinted) ─── */}
          <View style={styles.verificationCard}>
            <Text style={styles.verificationTitle}>
              Blockchain Verification Status
            </Text>

            <View style={styles.checklistWrap}>
              {isLoading ? <ActivityIndicator color="#2563EB" /> : <>
                <ChecklistItem text={`Transaction ${verification?.transaction?.status === "success" ? "confirmed" : "not confirmed"} on blockchain`} />
                <ChecklistItem text={`Confirmations: ${verification?.transaction?.confirmations ?? 0}`} />
                <ChecklistItem text={`NFT receipt ${verification?.nft ? "minted and verified" : "not found"}`} />
                <ChecklistItem text={`Gas estimate: ${verification?.gas?.estimatedCostUSD ? `$${verification.gas.estimatedCostUSD}` : "Unavailable"}`} />
              </>}
            </View>
          </View>

          {/* ─── View on Etherscan Button ─── */}
          <TouchableOpacity
            style={styles.etherscanBtn}
            onPress={handleViewEtherscan}
            activeOpacity={0.85}
          >
            <Text style={styles.etherscanBtnText}>View on Etherscan</Text>
          </TouchableOpacity>

          {/* ─── Confirm Verification Button ─── */}
          <TouchableOpacity
            style={styles.confirmBtn}
            onPress={handleConfirmVerification}
            disabled={isLoading || isConfirming || verification?.transaction?.status !== "success"}
            activeOpacity={0.85}
          >
            <Text style={styles.confirmBtnText}>Confirm Verification</Text>
          </TouchableOpacity>

          {/* Footer note */}
          <Text style={styles.footerNote}>
            Verification will be recorded on the blockchain
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
        <View style={modalStyles.overlay}>
          <View style={modalStyles.card}>
            <View style={modalStyles.badgeCircle}>
              <Ionicons name="checkmark" size={32} color="#FFFFFF" />
            </View>
            <Text style={modalStyles.title}>Payment Verified!</Text>
            <Text style={modalStyles.subtitle}>
              Payment for {payment.declarationId} has been successfully verified on the blockchain.
            </Text>
            <TouchableOpacity
              style={modalStyles.doneBtn}
              onPress={handleSuccessDone}
              activeOpacity={0.85}
            >
              <Text style={modalStyles.doneBtnText}>Done</Text>
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
    gap: 14,
  },

  // 📇 Main Card
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4E7EB",
  },
  cardTitle: {
    color: "#78828A",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 4,
  },
  cardSubtitle: {
    color: "#78828A",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 8,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: "#F1F2F4",
    marginTop: 4,
  },

  infoWrap: {
    // No extra padding — rows handle spacing
  },

  // 🏷 Info Row
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  infoRowBorder: {
    // No visible borders inside cards (like screenshot)
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
    fontWeight: "600",
    textAlign: "right",
    flexShrink: 1,
    marginLeft: 8,
  },
  infoValueBold: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontWeight: "700",
    fontSize: 13,
  },

  // 💳 Payment Method Row
  methodRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 4,
    marginBottom: 4,
  },
  methodDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#F5B81B",
  },
  methodText: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 12,
    fontWeight: "600",
  },

  // ✅ Blockchain Verification Card (blue-tinted)
  verificationCard: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#DBEAFE",
    gap: 10,
  },
  verificationTitle: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 13,
    fontWeight: "700",
  },
  checklistWrap: {
    gap: 8,
  },
  checklistRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checklistText: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 12,
    flex: 1,
    lineHeight: 16,
  },

  // 🔘 Etherscan Button (outlined)
  etherscanBtn: {
    paddingVertical: 13,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#F5B81B",
    alignItems: "center",
    justifyContent: "center",
  },
  etherscanBtnText: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 14,
    fontWeight: "600",
  },

  // 🟡 Confirm Verification Button (filled yellow)
  confirmBtn: {
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#F5B81B",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#F5B81B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmBtnText: {
    color: "#000",
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 15,
    fontWeight: "700",
  },

  // Footer note
  footerNote: {
    color: "#78828A",
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 10,
    textAlign: "center",
    lineHeight: 14,
    fontStyle: "italic",
    marginTop: 2,
  },
});

// ══════════════════════════════════════════════════
// 🎨 SUCCESS MODAL STYLES
// ══════════════════════════════════════════════════

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  card: {
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
  badgeCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    color: "#78828A",
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
  },
  doneBtn: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#F5B81B",
    alignItems: "center",
    marginTop: 4,
  },
  doneBtnText: {
    color: "#000",
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 14,
    fontWeight: "700",
  },
});
