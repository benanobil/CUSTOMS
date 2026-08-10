import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Path, Circle } from "react-native-svg";
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

// 📦 Product Info Icon (small yellow box)
const ProductInfoIcon = () => (
  <Svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2L4 6V12C4 17 7.5 21 12 22C16.5 21 20 17 20 12V6L12 2Z"
      fill="#F5B81B"
    />
  </Svg>
);

// 📄 Document Icon (folder with document lines)
const DocumentIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path
      d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
      fill="#F5B81B"
      stroke="#F5B81B"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <Path
      d="M14 2V8H20"
      fill="#FFFFFF"
      stroke="#FFFFFF"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <Path
      d="M8 13H16M8 17H13"
      stroke="#FFFFFF"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </Svg>
);

// 🧮 Calculator Icon (small)
const CalcIcon = () => (
  <Svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
      stroke="#F5B81B"
      strokeWidth="2"
    />
    <Path d="M8 6h8v4H8V6z" fill="#F5B81B" />
  </Svg>
);

// ⏱ Timeline Icon
const TimelineIcon = () => (
  <Svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke="#F5B81B" strokeWidth="2" />
    <Path d="M12 6v6l4 2" stroke="#F5B81B" strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// 🔗 Blockchain Icon
const BlockchainIcon = () => (
  <Svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
      stroke="#F5B81B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ⬇ Download arrow icon
const DownloadArrow = () => (
  <Svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.85559 8.81543C2.11184 8.81543 2.31958 9.02317 2.31958 9.27942C2.31958 10.1674 2.32056 10.7868 2.38339 11.2541C2.44442 11.7081 2.55606 11.9484 2.72728 12.1197C2.8985 12.2909 3.13889 12.4025 3.59284 12.4636C4.06014 12.5264 4.67949 12.5273 5.56751 12.5273H9.27942C10.1674 12.5273 10.7868 12.5264 11.2541 12.4636C11.7081 12.4025 11.9484 12.2909 12.1197 12.1197C12.2909 11.9484 12.4025 11.7081 12.4636 11.2541C12.5264 10.7868 12.5273 10.1674 12.5273 9.27942C12.5273 9.02317 12.7351 8.81543 12.9913 8.81543C13.2476 8.81543 13.4553 9.02317 13.4553 9.27942V9.31338C13.4553 10.1595 13.4553 10.8414 13.3832 11.3778C13.3084 11.9346 13.1482 12.4034 12.7759 12.7758C12.4034 13.1482 11.9346 13.3084 11.3778 13.3832C10.8414 13.4553 10.1595 13.4553 9.31338 13.4553H5.53356C4.6875 13.4553 4.00554 13.4553 3.46919 13.3832C2.91234 13.3084 2.44348 13.1482 2.0711 12.7759C1.69872 12.4034 1.53856 11.9346 1.46369 11.3778C1.39158 10.8414 1.39159 10.1595 1.3916 9.31338C1.3916 9.30206 1.3916 9.29074 1.3916 9.27942C1.3916 9.02317 1.59934 8.81543 1.85559 8.81543Z"
      fill="black"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.42395 10.3621C7.55424 10.3621 7.67846 10.3073 7.76638 10.2112L10.241 7.50457C10.4139 7.31544 10.4008 7.02196 10.2117 6.84904C10.0225 6.67613 9.72905 6.68925 9.55614 6.87837L7.88794 8.70296V1.85559C7.88794 1.59934 7.6802 1.3916 7.42395 1.3916C7.16771 1.3916 6.95996 1.59934 6.95996 1.85559V8.70296L5.29178 6.87837C5.11887 6.68925 4.82538 6.67613 4.63626 6.84904C4.44714 7.02196 4.43399 7.31544 4.6069 7.50457L7.08153 10.2112C7.16944 10.3073 7.29366 10.3621 7.42395 10.3621Z"
      fill="black"
    />
  </Svg>
);

// ══════════════════════════════════════════════════
// 🧩 SUB-COMPONENTS
// ══════════════════════════════════════════════════

// Section Card wrapper with icon header
const SectionCard = ({ Icon, title, children }) => (
  <View style={styles.sectionCard}>
    <View style={styles.sectionHeader}>
      <Icon />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    {children}
  </View>
);

// Info row (label + value)
const InfoRow = ({ label, value, isLast, valueColor = "#171725" }) => (
  <View style={[styles.infoRow, !isLast && styles.infoRowBorder]}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={[styles.infoValue, { color: valueColor }]} numberOfLines={2}>
      {value}
    </Text>
  </View>
);

// Document row with download button
const DocumentRow = ({ name, onDownload, isLast }) => (
  <View style={[styles.documentRow, !isLast && styles.documentRowBorder]}>
    <Text style={styles.documentName}>{name}</Text>
    <TouchableOpacity onPress={onDownload} style={styles.downloadBtn} activeOpacity={0.7}>
      <DownloadArrow />
    </TouchableOpacity>
  </View>
);

// Timeline item (dot + content)
const TimelineItem = ({ status, title, subtitle, timestamp, actionLabel, onActionPress, isLast }) => {
  const dotColor =
    status === "completed" ? "#171725" :
    status === "current" ? "#F5B81B" :
    "#D1D5DB";

  return (
    <View style={styles.timelineItem}>
      {/* Dot + connecting line */}
      <View style={styles.timelineLeft}>
        <View style={[styles.timelineDot, { backgroundColor: dotColor }]} />
        {!isLast && <View style={styles.timelineLine} />}
      </View>

      {/* Content */}
      <View style={styles.timelineContent}>
        <Text style={styles.timelineTitle}>{title}</Text>
        {timestamp && <Text style={styles.timelineTimestamp}>{timestamp}</Text>}
        {subtitle && <Text style={styles.timelineSubtitle}>{subtitle}</Text>}
        {actionLabel && (
          <TouchableOpacity
            style={styles.timelineActionBtn}
            onPress={onActionPress}
            activeOpacity={0.85}
          >
            <Text style={styles.timelineActionText}>{actionLabel}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// 🆕 Quick Action button (2x2 grid for Paid status)
const QuickActionButton = ({ label, onPress }) => (
  <TouchableOpacity
    style={styles.quickActionBtn}
    onPress={onPress}
    activeOpacity={0.85}
  >
    <Text style={styles.quickActionText}>{label}</Text>
  </TouchableOpacity>
);

// ══════════════════════════════════════════════════
// 📄 MAIN SCREEN
// ══════════════════════════════════════════════════

export default function DeclarationDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();

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

  // Get declaration data from params
  const declaration = {
    id: params.id || "TMA-2026-0042",
    hsCode: params.hsCode || "870323",
    description: params.description || "Toyota Corolla 2022- 1 unit",
    declaredValue: params.declaredValue || "$15,000",
    dutyCalculated: params.dutyCalculated || "$3,750",
    dutyPaid: params.dutyPaid || "$3,750",
    paymentStatus: params.paymentStatus || "Payment Confirmed",
    port: params.port || "Tema Port",
    customsOfficer: params.customsOfficer || "John Atta Mensah",
    status: params.status || "Pending", // Pending | Paid | Released | Flagged
    dutyRate: params.dutyRate || "15%",
    totalDutyPayable: params.totalDutyPayable || "$1,500",
    transactionHash: params.transactionHash || "0xabc456...789",
    nftTokenId: params.nftTokenId || "1002",
    blockNumber: params.blockNumber || "4,567,890",
  };

  const isPending = declaration.status === "Pending";
  const isPaid = declaration.status === "Paid";
  const statusColor =
    declaration.status === "Paid" ? "#2196F3" :
    declaration.status === "Pending" ? "#F5B81B" :
    declaration.status === "Released" ? "#4CAF50" :
    "#FF3D00";

  // ─── Handlers ────────────────────────────────────
  const handlePayDutyNow = () => {
    router.push({
      pathname: "/payment-confirmation",
      params: {
        id: declaration.id,
        product: declaration.description,
        hsCode: declaration.hsCode,
        declaredValue: declaration.declaredValue,
        totalDuty: declaration.totalDutyPayable,
      },
    });
  };

  const handleViewReceipt = () => {
    router.push({
      pathname: "/payment-success",
      params: {
        id: declaration.id,
        product: declaration.description,
        totalDuty: declaration.dutyPaid,
      },
    });
  };

  const handleDownload = (docName) => {
    console.log("Download:", docName);
  };

  const handleShare = () => {
    console.log("Share receipt");
  };

const handleVerifyPayment = () => {
  router.push({
    pathname: "/verify-payment",
    params: {
      id: declaration.id,
      importer: "Kofi Import Ltd",
      amountDue: declaration.totalDutyPayable,
      amountPaid: declaration.dutyPaid,
      transHash: declaration.transactionHash,
      nftTokenId: declaration.nftTokenId,
    },
  });
};;

  const handleReleaseGoods = () => {
  router.push({
    pathname: "/release-goods",
    params: {
      id: declaration.id,
      importer: "Kofi Import Ltd", // or fetch from real data
      product: declaration.description,
      dutyPaid: declaration.dutyPaid,
      paymentVerified: "Yes",
      port: declaration.port,
    },
  });
};

 const handleFlagDeclaration = () => {
  router.push({
    pathname: "/flag-declaration",
    params: {
      id: declaration.id,
      importer: "Kofi Import Ltd", // or fetch from real data
      product: declaration.description,
      declaredValue: declaration.declaredValue,
      duty: declaration.dutyPaid,
    },
  });
};

  const handleRequestInfo = () => {
    console.log("Request Info for:", declaration.id);
    // router.push({ pathname: "/request-info", params: { id: declaration.id } });
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
          <Text style={styles.headerTitle}>Declaration Details</Text>
          <View style={styles.backButton} />
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentInner}
          showsVerticalScrollIndicator={false}
        >
          {/* ID + Status */}
          <View style={styles.idRow}>
            <Text style={styles.idText}>{declaration.id}</Text>
            <View style={styles.statusPill}>
              <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
              <Text style={[styles.statusText, { color: statusColor }]}>
                {declaration.status}
              </Text>
            </View>
          </View>

          {/* Product Information */}
          <SectionCard Icon={ProductInfoIcon} title="Product Information">
            <InfoRow label="HS Code" value={declaration.hsCode} />
            <InfoRow label="Description" value={declaration.description} />
            <InfoRow label="Declared Value" value={declaration.declaredValue} />
            <InfoRow label="Duty Calculated" value={declaration.dutyCalculated} />
            <InfoRow label="Duty Paid" value={declaration.dutyPaid} />
            <InfoRow label="Status" value={declaration.paymentStatus} />
            <InfoRow label="Port" value={declaration.port} />
            <InfoRow label="Customs Officer" value={declaration.customsOfficer} isLast />
          </SectionCard>

          {/* Timeline (only for Paid+ status) */}
          {isPaid && (
            <SectionCard Icon={TimelineIcon} title="Timeline">
              <TimelineItem
                status="completed"
                title="Declaration Created"
                timestamp="2026-06-09 10:30:00"
                subtitle="By: John Atta Mensah (Customs Officer)"
              />
              <TimelineItem
                status="completed"
                title="Duty Payment"
                timestamp="2026-06-09 11:15:00"
                subtitle={`Amount: ${declaration.dutyPaid}\nNFT Token ID: ${declaration.nftTokenId}`}
                actionLabel="VIEW NFT RECEIPT"
                onActionPress={handleViewReceipt}
              />
              <TimelineItem
                status="current"
                title="Goods Release"
                subtitle="Pending - Awaiting customs officer verification"
                isLast
              />
            </SectionCard>
          )}

          {/* Blockchain Verification (only for Paid+ status) */}
          {isPaid && (
            <SectionCard Icon={BlockchainIcon} title="Blockchain Verification">
              <InfoRow label="Transaction Hash" value={declaration.transactionHash} />
              <InfoRow label="NFT Token ID" value={declaration.nftTokenId} />
              <InfoRow label="Block Number" value={declaration.blockNumber} isLast />

              {/* View on Etherscan */}
              <TouchableOpacity style={styles.etherscanButton} activeOpacity={0.85}>
                <Text style={styles.etherscanButtonText}>VIEW ON ETHERSCAN</Text>
              </TouchableOpacity>

              {/* Verified indicator */}
              <View style={styles.verifiedRow}>
                <View style={styles.verifiedCheckbox}>
                  <Ionicons name="checkmark" size={10} color="#4CAF50" />
                </View>
                <Text style={styles.verifiedText}>Verified on Ethereum Sepolia</Text>
              </View>
            </SectionCard>
          )}

          {/* Documents */}
          <SectionCard Icon={DocumentIcon} title="Documents">
            <DocumentRow name="Commercial Invoice" onDownload={() => handleDownload("Commercial Invoice")} />
            <DocumentRow name="Bill of Lading" onDownload={() => handleDownload("Bill of Lading")} />
            <DocumentRow name="Packing List" onDownload={() => handleDownload("Packing List")} isLast />

            {/* Download + Share buttons for Paid status */}
            {isPaid && (
              <View style={styles.docActionsRow}>
                <TouchableOpacity
                  style={styles.docActionButton}
                  onPress={() => handleDownload("Receipt")}
                  activeOpacity={0.85}
                >
                  <DownloadArrow />
                  <Text style={styles.docActionText}>Download Receipt</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.docActionButton}
                  onPress={handleShare}
                  activeOpacity={0.85}
                >
                  <Text style={styles.docActionText}>Share Receipt</Text>
                </TouchableOpacity>
              </View>
            )}
          </SectionCard>

          {/* Duty Calculation (only for Pending status) */}
          {isPending && (
            <SectionCard Icon={CalcIcon} title="Duty Calculation">
              <InfoRow label="Duty Rate" value={declaration.dutyRate} />
              <InfoRow
                label="Total Duty Payable"
                value={declaration.totalDutyPayable}
                isLast
              />
            </SectionCard>
          )}

          {/* Pay Duty Now button (only for Pending status) */}
          {isPending && (
            <>
              <TouchableOpacity
                style={styles.payDutyBtn}
                onPress={handlePayDutyNow}
                activeOpacity={0.85}
              >
                <Text style={styles.payDutyBtnText}>Pay Duty Now</Text>
              </TouchableOpacity>
              <Text style={styles.footerNote}>
                Your goods will only be released for payment. Paying now really safeguards your declarations and helps in tax settlement recommendation.
              </Text>
            </>
          )}

          {/* 🆕 Quick Actions (2x2 grid) — only for Paid status */}
          {isPaid && (
            <View style={styles.quickActionsGrid}>
              <View style={styles.quickActionsRow}>
                <QuickActionButton
                  label="Verify Payment"
                  onPress={handleVerifyPayment}
                />
                <QuickActionButton
                  label="Release Goods"
                  onPress={handleReleaseGoods}
                />
              </View>
              <View style={styles.quickActionsRow}>
                <QuickActionButton
                  label="Flag Declaration"
                  onPress={handleFlagDeclaration}
                />
                <QuickActionButton
                  label="Request Info"
                  onPress={handleRequestInfo}
                />
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
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

  // 🏷 ID Row (top)
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
  },
  statusText: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 11,
    fontWeight: "500",
  },

  // 📇 Section Card
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

  // 🏷 Info Row
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

  // 📄 Document Row
  documentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  documentRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F5F6F7",
  },
  documentName: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 12,
    flex: 1,
  },
  downloadBtn: {
    padding: 4,
  },

  // ⏱ Timeline
  timelineItem: {
    flexDirection: "row",
    paddingVertical: 6,
    gap: 10,
  },
  timelineLeft: {
    alignItems: "center",
    width: 16,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 4,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: "#E4E7EB",
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 8,
  },
  timelineTitle: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 12,
    fontWeight: "600",
  },
  timelineTimestamp: {
    color: "#78828A",
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 10,
    marginTop: 2,
  },
  timelineSubtitle: {
    color: "#78828A",
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 10,
    marginTop: 2,
    lineHeight: 14,
  },
  timelineActionBtn: {
    marginTop: 8,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "#F5B81B",
  },
  timelineActionText: {
    color: "#000",
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  // 🌐 Etherscan button
  etherscanButton: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#F5B81B",
    alignItems: "center",
  },
  etherscanButtonText: {
    color: "#000",
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  // Verified row
  verifiedRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 8,
  },
  verifiedCheckbox: {
    width: 14,
    height: 14,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: "#e2ebe2",
    backgroundColor: "#7ed87e",
    justifyContent: "center",
    alignItems: "center",
  },
  verifiedText: {
    color: "#78828A",
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 10,
  },

  // 🔘 Document action buttons
  docActionsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  docActionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#F5B81B",
    gap: 6,
  },
  docActionText: {
    color: "#000",
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 11,
    fontWeight: "700",
  },

  // 🟡 Pay Duty Now Button
  payDutyBtn: {
    paddingVertical: 16,
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
  payDutyBtnText: {
    color: "#000",
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 15,
    fontWeight: "700",
  },

  footerNote: {
    color: "#78828A",
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 10,
    textAlign: "center",
    lineHeight: 14,
    fontStyle: "italic",
    marginTop: 4,
    paddingHorizontal: 8,
  },

  // 🆕 Quick Actions Grid (2x2)
  quickActionsGrid: {
    gap: 12,
    marginTop: 4,
  },
  quickActionsRow: {
    flexDirection: "row",
    gap: 12,
  },
  quickActionBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#F5B81B",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  quickActionText: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 13,
    fontWeight: "600",
  },
});