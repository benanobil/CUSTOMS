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
import Svg, { Path, Rect, G, ClipPath, Defs } from "react-native-svg";
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

const RequestIcon = () => (
  <Svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <G clipPath="url(#clip_req)">
      <Path
        d="M10.9688 0H2.03125C1.49253 0 0.975873 0.214006 0.594939 0.594939C0.214006 0.975873 0 1.49253 0 2.03125V8.53125C0 9.06997 0.214006 9.58663 0.594939 9.96756C0.975873 10.3485 1.49253 10.5625 2.03125 10.5625H2.4375V12.5938C2.43751 12.6741 2.46138 12.7527 2.50607 12.8195C2.55076 12.8864 2.61427 12.9384 2.68856 12.9691C2.7377 12.9897 2.79047 13.0002 2.84375 13C2.89714 13.0001 2.95002 12.9897 2.99937 12.9693C3.04872 12.949 3.09358 12.9191 3.13138 12.8814L5.44944 10.5625H10.9688C11.5075 10.5625 12.0241 10.3485 12.4051 9.96756C12.786 9.58663 13 9.06997 13 8.53125V2.03125C13 1.49253 12.786 0.975873 12.4051 0.594939C12.0241 0.214006 11.5075 0 10.9688 0ZM12.1875 8.53125C12.1875 8.85448 12.0591 9.16448 11.8305 9.39304C11.602 9.6216 11.292 9.75 10.9688 9.75H5.28125C5.22786 9.74991 5.17498 9.76033 5.12563 9.78069C5.07628 9.80104 5.03142 9.83092 4.99362 9.86863L3.25 11.6131V10.1563C3.25 10.0485 3.2072 9.94518 3.13101 9.86899C3.05483 9.7928 2.95149 9.75 2.84375 9.75H2.03125C1.70802 9.75 1.39802 9.6216 1.16946 9.39304C0.940904 9.16448 0.8125 8.85448 0.8125 8.53125V2.03125C0.8125 1.70802 0.940904 1.39802 1.16946 1.16946C1.39802 0.940904 1.70802 0.8125 2.03125 0.8125H10.9688C11.292 0.8125 11.602 0.940904 11.8305 1.16946C12.0591 1.39802 12.1875 1.70802 12.1875 2.03125V8.53125ZM10.5316 5.43644C10.5108 5.48582 10.4807 5.53077 10.4431 5.56888L8.81806 7.19388C8.74193 7.26982 8.63879 7.31248 8.53125 7.3125C8.47786 7.3126 8.42498 7.30217 8.37563 7.28181C8.32628 7.26146 8.28142 7.23158 8.24362 7.19388C8.20579 7.15614 8.17578 7.11131 8.1553 7.06195C8.13482 7.0126 8.12427 6.95969 8.12427 6.90625C8.12427 6.85281 8.13482 6.7999 8.1553 6.75055C8.17578 6.70119 8.20579 6.65636 8.24362 6.61863L9.17556 5.6875H5.28125C4.95802 5.6875 4.64802 5.8159 4.41946 6.04446C4.1909 6.27302 4.0625 6.58302 4.0625 6.90625C4.0625 7.01399 4.0197 7.11733 3.94351 7.19351C3.86733 7.2697 3.76399 7.3125 3.65625 7.3125C3.54851 7.3125 3.44517 7.2697 3.36899 7.19351C3.2928 7.11733 3.25 7.01399 3.25 6.90625C3.25 6.36753 3.46401 5.85087 3.84494 5.46994C4.22587 5.08901 4.74253 4.875 5.28125 4.875H9.17556L8.24362 3.94388C8.20579 3.90614 8.17578 3.86131 8.1553 3.81195C8.13482 3.7626 8.12427 3.70969 8.12427 3.65625C8.12427 3.60281 8.13482 3.5499 8.1553 3.50055C8.17578 3.45119 8.20579 3.40636 8.24362 3.36863C8.28136 3.33079 8.32619 3.30078 8.37555 3.2803C8.4249 3.25982 8.47781 3.24927 8.53125 3.24927C8.58469 3.24927 8.6376 3.25982 8.68695 3.2803C8.73631 3.30078 8.78114 3.33079 8.81888 3.36863L10.4439 4.99363C10.4816 5.03173 10.5116 5.07668 10.5324 5.12606C10.5728 5.22564 10.5725 5.33708 10.5316 5.43644Z"
        fill="black"
      />
    </G>
    <Defs>
      <ClipPath id="clip_req">
        <Rect width="13" height="13" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

const WarningIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <Path
      d="M0.607842 7.81673L3.98978 1.05279C4.35833 0.315736 5.41013 0.315741 5.77868 1.05279L9.16063 7.81673C9.49308 8.48163 9.00958 9.26393 8.26618 9.26393H1.50227C0.758882 9.26393 0.275387 8.48163 0.607842 7.81673Z"
      stroke="#FF3D00"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ══════════════════════════════════════════════════
// 📊 MOCK DATA
// ══════════════════════════════════════════════════

const declarationsData = [
  {
    id: "TMA-2026-0042",
    name: "Toyota Corolla 2022- 1 unit",
    hsCode: "870323",
    value: "$115,000",
    duty: "$3,750",
    status: "Paid",
    declaredDate: "2026-08-08",
  },
  {
    id: "TMA-2026-0042",
    name: "Fresh Oranges- 500 cartons",
    hsCode: "870324",
    value: "$115,000",
    duty: "$3,750",
    status: "Pending",
  },
  {
    id: "TMA-2026-0042",
    name: "Lithium Batteries- 1000 units",
    hsCode: "870503",
    value: "$115,000",
    duty: "$3,750",
    status: "Released",
    releasedDate: "2026-08-09",
  },
  {
    id: "TMA-2026-0042",
    name: "Lithium Batteries- 1000 units",
    hsCode: "870323",
    value: "$115,000",
    duty: "$3,750",
    status: "Flagged",
    note: "Under Investigation- Contact Auditor",
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

const statusColorMap = {
  Paid: "#2196F3",
  Pending: "#F5B81B",
  Released: "#4CAF50",
  Flagged: "#FF3D00",
};

// ✅ Card is fully tappable — opens details on tap
const DeclarationCard = ({ item, onPay, onOpen }) => {
  const statusColor = statusColorMap[item.status];

  return (
    <TouchableOpacity
      onPress={() => onOpen && onOpen(item)}
      activeOpacity={0.85}
      style={styles.card}
    >
      <View style={styles.cardTop}>
        <Text style={styles.cardId}>{item.id}</Text>
        <View style={styles.statusPill}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusText, { color: statusColor }]}>
            {item.status}
          </Text>
        </View>
      </View>

      <Text style={styles.cardName}>{item.name}</Text>

      <View style={styles.cardMetaRow}>
        <Text style={styles.cardMeta}>HS Code: {item.hsCode}</Text>
        <Text style={styles.cardMetaSeparator}>•</Text>
        <Text style={styles.cardMeta}>Value: {item.value}</Text>
        <Text style={styles.cardMetaSeparator}>•</Text>
        <Text style={styles.cardMeta}>Duty: {item.duty}</Text>
      </View>

      <View style={styles.cardBottom}>
        {item.status === "Paid" && (
          <>
            <Text style={styles.declaredText}>Declared: {item.declaredDate}</Text>
            <Text style={styles.verifiedText}>Blockchain Verified</Text>
          </>
        )}

        {item.status === "Pending" && (
          <>
            {/* Pressing PAY DUTY NOW! triggers onPay directly (doesn't propagate to card tap) */}
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation && e.stopPropagation();
                onPay && onPay(item);
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.payDutyText}>PAY DUTY NOW!</Text>
            </TouchableOpacity>
            <Text style={styles.verifiedText}>Blockchain Verified</Text>
          </>
        )}

        {item.status === "Released" && (
          <>
            <Text style={styles.releasedText}>Released: {item.releasedDate}</Text>
            <Text style={styles.verifiedText}>Blockchain Verified</Text>
          </>
        )}

        {item.status === "Flagged" && (
          <>
            <View style={styles.flaggedRow}>
              <WarningIcon />
              <Text style={styles.flaggedText}>{item.note}</Text>
            </View>
            <Text style={styles.verifiedText}>Blockchain Verified</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

// ══════════════════════════════════════════════════
// 📋 MAIN DECLARATIONS SCREEN
// ══════════════════════════════════════════════════

export default function Declarations() {
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

  const counts = {
    All: declarationsData.length,
    Pending: declarationsData.filter((d) => d.status === "Pending").length,
    Paid: declarationsData.filter((d) => d.status === "Paid").length,
    Released: declarationsData.filter((d) => d.status === "Released").length,
    Flagged: declarationsData.filter((d) => d.status === "Flagged").length,
  };

  let filteredData =
    selectedFilter === "All"
      ? declarationsData
      : declarationsData.filter((d) => d.status === selectedFilter);

  if (searchQuery.trim()) {
    filteredData = filteredData.filter((d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // 🟡 Pay Duty handler
  const handlePayDuty = (item) => {
    router.push({
      pathname: "/payment-confirmation",
      params: {
        id: item.id,
        product: item.name,
        hsCode: item.hsCode,
        declaredValue: item.value,
        totalDuty: item.duty,
      },
    });
  };

  // 📄 Open Details handler
const handleOpenDetails = (item) => {
  // Route Flagged declarations to the dedicated flagged details screen
  if (item.status === "Flagged") {
    router.push({
      pathname: "/flagged-declaration-details",   // ✅ updated name
      params: {
        id: item.id,
        description: item.name,
        hsCode: item.hsCode,
        declaredValue: item.value,
        dutyCalculated: item.duty,
        dutyPaid: "$0",
        status: item.status,
        port: "Tema Port",
      },
    });
    return;
  }

  // All other statuses → regular details screen
  router.push({
    pathname: "/declaration-details",
    params: {
      id: item.id,
      description: item.name,
      hsCode: item.hsCode,
      declaredValue: item.value,
      totalDutyPayable: item.duty,
      dutyPaid: item.duty,
      dutyCalculated: item.duty,
      status: item.status,
    },
  });
};

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Declarations</Text>

          <TouchableOpacity
            style={styles.requestButton}
            activeOpacity={0.85}
            onPress={() => router.push("/request-declaration")}
          >
            <RequestIcon />
            <Text style={styles.requestButtonText}>Request</Text>
          </TouchableOpacity>
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
            label="Pending"
            count={counts.Pending}
            selected={selectedFilter === "Pending"}
            onPress={() => setSelectedFilter("Pending")}
          />
          <FilterTab
            label="Paid"
            count={counts.Paid}
            selected={selectedFilter === "Paid"}
            onPress={() => setSelectedFilter("Paid")}
          />
          <FilterTab
            label="Released"
            count={counts.Released}
            selected={selectedFilter === "Released"}
            onPress={() => setSelectedFilter("Released")}
          />
          <FilterTab
            label="Flagged"
            count={counts.Flagged}
            selected={selectedFilter === "Flagged"}
            onPress={() => setSelectedFilter("Flagged")}
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
              <Text style={styles.emptyText}>No declarations found</Text>
            </View>
          ) : (
            filteredData.map((item, idx) => (
              <DeclarationCard
                key={`${item.id}-${idx}`}
                item={item}
                onPay={handlePayDuty}
                onOpen={handleOpenDetails}
              />
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// ══════════════════════════════════════════════════
// 🎨 STYLES  (same as before — no changes)
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
  requestButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    width: 93,
    height: 41,
    justifyContent: "center",
    borderRadius: 15.375,
    backgroundColor: "rgba(245, 184, 27, 0.7)",
  },
  requestButtonText: {
    color: "#000",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 12,
    fontWeight: "600",
  },
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
  filterScrollView: {
    flexGrow: 0,
    maxHeight: 45,
    marginBottom: 4,
  },
  resultsCount: {
    color: "#78828A",
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 12,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 6,
  },
  list: { flex: 1 },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 140,
    gap: 12,
  },
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
  cardMetaSeparator: {
    color: "#78828A",
    fontSize: 11,
  },
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
    flexWrap: "wrap",
    gap: 4,
  },
  declaredText: {
    color: "#4CAF50",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 11,
    fontWeight: "600",
  },
  releasedText: {
    color: "#4CAF50",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 11,
    fontWeight: "600",
  },
  payDutyText: {
    color: "#FF3D00",
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 11,
    fontWeight: "700",
  },
  flaggedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  flaggedText: {
    color: "#FF3D00",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 11,
    fontWeight: "600",
  },
  verifiedText: {
    color: "#78828A",
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 10,
    fontStyle: "italic",
  },
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