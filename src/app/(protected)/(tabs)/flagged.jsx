import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from "@expo-google-fonts/plus-jakarta-sans";
import { useRouter } from "expo-router";

// ══════════════════════════════════════════════════
// 🎨 SVG ICONS
// ══════════════════════════════════════════════════

const WarningIcon = ({ color = "#EF4444" }) => (
  <Svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <Path
      d="M0.607842 7.81673L3.98978 1.05279C4.35833 0.315736 5.41013 0.315741 5.77868 1.05279L9.16063 7.81673C9.49308 8.48163 9.00958 9.26393 8.26618 9.26393H1.50227C0.758882 9.26393 0.275387 8.48163 0.607842 7.81673Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ══════════════════════════════════════════════════
// 📊 MOCK DATA
// ══════════════════════════════════════════════════

const FLAGGED_CASES = [
  {
    id: "TMA-2026-0042",
    risk: "Medium",
    status: "Under Investigation",
    company: "Suspect Trading Co- Fresh Oranges",
    shortfall: "$9,000",
    declared: "$20,000",
    market: "$80,000",
    flaggedDate: "2026-06-09",
    officer: "John Atta Mensah",
    reason:
      "Under-declaration suspected. Market value significantly higher than declared.",
    assignedTo: "Ama Serwaa (Auditor)",
  },
  {
    id: "TMA-2026-0043",
    risk: "High",
    status: "Under Investigation",
    company: "Global Auto Traders- Toyota Corolla",
    shortfall: "$15,000",
    declared: "$25,000",
    market: "$90,000",
    flaggedDate: "2026-06-08",
    officer: "John Atta Mensah",
    reason:
      "Under-declaration suspected. Market value significantly higher than declared.",
    assignedTo: "Ama Serwaa (Auditor)",
  },
  {
    id: "TMA-2026-0044",
    risk: "Low",
    status: "Pending Review",
    company: "Fresh Foods Ltd- Rice Import",
    shortfall: "$500",
    declared: "$4,500",
    market: "$5,000",
    flaggedDate: "2026-06-07",
    officer: "John Atta Mensah",
    reason: "Minor value discrepancy detected during routine audit.",
    assignedTo: "Kwame Boateng (Auditor)",
  },
  {
    id: "TMA-2026-0045",
    risk: "High",
    status: "Resolved",
    company: "Electronics Hub- Laptops",
    shortfall: "$0",
    declared: "$40,000",
    market: "$42,000",
    flaggedDate: "2026-05-30",
    officer: "John Atta Mensah",
    reason: "Case reviewed. Declared value confirmed as accurate.",
    assignedTo: "Ama Serwaa (Auditor)",
  },
];

// ══════════════════════════════════════════════════
// 🧩 SUB-COMPONENTS
// ══════════════════════════════════════════════════

const FilterTab = ({ label, count, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.filterTab, selected && styles.filterTabSelected]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={[styles.filterTabText, selected && styles.filterTabTextSelected]}>
      {label} {count}
    </Text>
  </TouchableOpacity>
);

const riskColorMap = {
  High: "#EF4444",
  Medium: "#F59E0B",
  Low: "#10B981",
};

const FlaggedCard = ({ item, onOpen }) => {
  const riskColor = riskColorMap[item.risk] || "#9CA3AF";
  const isResolved = item.status === "Resolved";

  return (
    <TouchableOpacity
      onPress={() => onOpen && onOpen(item)}
      activeOpacity={0.85}
      style={styles.card}
    >
      {/* Top row: ID + Risk pill */}
      <View style={styles.cardTop}>
        <Text style={styles.cardId}>{item.id}</Text>
        <View style={styles.riskPill}>
          <View style={[styles.riskDot, { backgroundColor: riskColor }]} />
          <Text style={[styles.riskText, { color: riskColor }]}>
            {item.risk} Risk
          </Text>
        </View>
      </View>

      {/* Company name */}
      <Text style={styles.cardName}>{item.company}</Text>

      {/* Meta row */}
      <View style={styles.cardMetaRow}>
        <Text style={styles.cardMeta}>
          Shortfall: <Text style={styles.cardMetaBold}>{item.shortfall}</Text>
        </Text>
        <Text style={styles.cardMetaSeparator}>•</Text>
        <Text style={styles.cardMeta}>
          Declared: <Text style={styles.cardMetaBold}>{item.declared}</Text>
        </Text>
        <Text style={styles.cardMetaSeparator}>•</Text>
        <Text style={styles.cardMeta}>
          Market: <Text style={styles.cardMetaBold}>{item.market}</Text>
        </Text>
      </View>

      {/* Flagged date + officer */}
      <View style={styles.cardMetaRow}>
        <Text style={styles.flaggedLabel}>Flagged:</Text>
        <Text style={styles.cardMeta}> {item.flaggedDate}</Text>
        <Text style={styles.cardMetaSeparator}>•</Text>
        <Text style={styles.cardMeta}>By: {item.officer}</Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Reason */}
      <View style={styles.reasonRow}>
        <WarningIcon color={riskColor} />
        <Text style={styles.reasonText}>
          <Text style={styles.reasonLabel}>Reason: </Text>
          {item.reason}
        </Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Footer */}
      <View style={styles.cardBottom}>
        <Text style={styles.statusText}>
          <Text style={styles.statusLabel}>Status: </Text>
          <Text style={isResolved ? styles.resolvedText : styles.investigationText}>
            {item.status}
          </Text>
        </Text>
        <Text style={styles.assignedText}>Assigned: {item.assignedTo}</Text>
      </View>
    </TouchableOpacity>
  );
};

// ══════════════════════════════════════════════════
// 🚩 MAIN FLAGGED SCREEN
// ══════════════════════════════════════════════════

export default function Flagged() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
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

  // ─── Dynamic counts based on actual data ────────
  const counts = {
    All: FLAGGED_CASES.length,
    High: FLAGGED_CASES.filter((c) => c.risk === "High").length,
    Medium: FLAGGED_CASES.filter((c) => c.risk === "Medium").length,
    Low: FLAGGED_CASES.filter((c) => c.risk === "Low").length,
    Resolved: FLAGGED_CASES.filter((c) => c.status === "Resolved").length,
  };

  // ─── Filter data based on selection ─────────────
  let filteredData;
  if (selectedFilter === "All") {
    filteredData = FLAGGED_CASES;
  } else if (selectedFilter === "Resolved") {
    filteredData = FLAGGED_CASES.filter((c) => c.status === "Resolved");
  } else {
    // High / Medium / Low
    filteredData = FLAGGED_CASES.filter((c) => c.risk === selectedFilter);
  }

  // ─── Search filter ──────────────────────────────
  if (searchQuery.trim()) {
    filteredData = filteredData.filter(
      (c) =>
        c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const handleOpenCase = (item) => {
  router.push({
    pathname: "/flagged-declaration-details",
    params: {
      id: item.id,
      description: item.company,
      declaredValue: item.declared,
      status: "Flagged",
      flagReason: item.reason,
      assignedAuditor: item.assignedTo,
      investigationStatus: item.status,
    },
  });
};

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Flagged Cases</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchWrapper}>
          <Ionicons name="search" size={18} color="#78828A" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#78828A"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScrollView}
          contentContainerStyle={styles.filterRow}
        >
          <FilterTab
            label="All"
            count={counts.All}
            selected={selectedFilter === "All"}
            onPress={() => setSelectedFilter("All")}
          />
          <FilterTab
            label="High"
            count={counts.High}
            selected={selectedFilter === "High"}
            onPress={() => setSelectedFilter("High")}
          />
          <FilterTab
            label="Medium"
            count={counts.Medium}
            selected={selectedFilter === "Medium"}
            onPress={() => setSelectedFilter("Medium")}
          />
          <FilterTab
            label="Low"
            count={counts.Low}
            selected={selectedFilter === "Low"}
            onPress={() => setSelectedFilter("Low")}
          />
          <FilterTab
            label="Resolved"
            count={counts.Resolved}
            selected={selectedFilter === "Resolved"}
            onPress={() => setSelectedFilter("Resolved")}
          />
        </ScrollView>

        {/* Results count */}
        <Text style={styles.resultsCount}>
          Showing {filteredData.length}{" "}
          {filteredData.length === 1 ? "result" : "results"}
        </Text>

        {/* Cards List */}
        <ScrollView
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredData.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No flagged cases found</Text>
            </View>
          ) : (
            filteredData.map((item, idx) => (
              <FlaggedCard
                key={`${item.id}-${idx}`}
                item={item}
                onOpen={handleOpenCase}
              />
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// ══════════════════════════════════════════════════
// 🎨 STYLES (mirrors declarations.jsx)
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

  // ─── Header ─────────────────────────────────────
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
  headerTitle: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 22,
    fontWeight: "720",
  },

  // ─── Search Bar ─────────────────────────────────
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E4E7EB",
    backgroundColor: "#f8f0f0",
    gap: 8,
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    color: "#171725",
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 13,
    padding: 0,
  },

  // ─── Filter Tabs ────────────────────────────────
  filterScrollView: {
    flexGrow: 0,
    maxHeight: 45,
    marginBottom: 4,
  },
  filterRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 8,
    paddingBottom: 4,
  },
  filterTab: {
    paddingHorizontal: 14,
    paddingVertical: 2,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#E4E7EB",
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  filterTabSelected: {
    backgroundColor: "#F5B81B",
    borderColor: "#F5B81B",
  },
  filterTabText: {
    color: "#78828A",
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 12,
    fontWeight: "500",
  },
  filterTabTextSelected: {
    color: "#000",
    fontFamily: "PlusJakartaSans_700Bold",
    fontWeight: "700",
  },

  // ─── Results Count ──────────────────────────────
  resultsCount: {
    color: "#78828A",
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 12,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 6,
  },

  // ─── List ───────────────────────────────────────
  list: { flex: 1 },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 140,
    gap: 12,
  },

  // ─── Card ───────────────────────────────────────
  card: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4E7EB",
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardId: {
    color: "#78828A",
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 11,
  },
  riskPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  riskDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  riskText: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 11,
    fontWeight: "500",
  },
  cardName: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 2,
  },
  cardMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 4,
    marginTop: 2,
  },
  cardMeta: {
    color: "#78828A",
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 11,
  },
  cardMetaBold: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 11,
  },
  cardMetaSeparator: {
    color: "#78828A",
    fontSize: 11,
  },
  flaggedLabel: {
    color: "#EF4444",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 11,
  },

  // ─── Divider ────────────────────────────────────
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginVertical: 6,
  },

  // ─── Reason Row ─────────────────────────────────
  reasonRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
  },
  reasonText: {
    flex: 1,
    color: "#4B5563",
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 11,
    lineHeight: 16,
  },
  reasonLabel: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_600SemiBold",
  },

  // ─── Card Bottom ────────────────────────────────
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 4,
  },
  statusText: {
    color: "#4B5563",
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 11,
  },
  statusLabel: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  investigationText: {
    color: "#F59E0B",
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  resolvedText: {
    color: "#10B981",
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  assignedText: {
    color: "#78828A",
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 10,
    fontStyle: "italic",
  },

  // ─── Empty State ────────────────────────────────
  emptyState: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    color: "#78828A",
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 14,
  },
});