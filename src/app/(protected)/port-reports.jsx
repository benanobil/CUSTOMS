import React, { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, Alert, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { reportService } from "../../services/reportService";

const number = (value) => Number(value || 0).toLocaleString();
const money = (value) => `$${Number(value || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
const statsFrom = (response) => response?.stats || response?.data?.stats || {};
const activityFrom = (response) => response?.activities || response?.data?.activities || [];

const StatCard = ({ icon, label, value, color = "#B27B00" }) => (
  <View style={styles.statCard}>
    <View style={styles.statIcon}><Ionicons name={icon} size={20} color={color} /></View>
    <Text style={styles.statValue}>{value}</Text><Text style={styles.statLabel}>{label}</Text>
  </View>
);

export default function PortReports() {
  const router = useRouter();
  const [dashboard, setDashboard] = useState({});
  const [declarations, setDeclarations] = useState({});
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async (refresh = false) => {
    refresh ? setRefreshing(true) : setLoading(true);
    const results = await Promise.allSettled([
      reportService.getDashboard(), reportService.getDeclarationStats(), reportService.getActivity({ limit: 10, offset: 0 }),
    ]);
    if (results[0].status === "fulfilled") setDashboard(statsFrom(results[0].value));
    if (results[1].status === "fulfilled") setDeclarations(statsFrom(results[1].value));
    if (results[2].status === "fulfilled") setActivities(activityFrom(results[2].value));
    if (results.every((result) => result.status === "rejected")) Alert.alert("Reports unavailable", "Unable to load port reports. Pull down to retry.");
    setLoading(false); setRefreshing(false);
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));
  const statuses = useMemo(() => (declarations.byStatus || []).map((item) => ({ label: String(item.status || "Unknown").replaceAll("_", " "), count: Number(item.count || 0), duty: Number(item.totalDuty || 0) })).sort((a, b) => b.count - a.count), [declarations]);
  const months = useMemo(() => (declarations.byMonth || []).slice(-6), [declarations]);
  const maxMonth = Math.max(1, ...months.map((item) => Number(item.count || 0)));

  if (loading) return <SafeAreaView style={styles.loading}><ActivityIndicator size="large" color="#F5B81B" /></SafeAreaView>;
  return <SafeAreaView style={styles.container}>
    <View style={styles.header}><TouchableOpacity style={styles.back} onPress={() => router.back()}><Ionicons name="arrow-back" size={22} color="#171725" /></TouchableOpacity><View style={styles.headerCopy}><Text style={styles.title}>Port Reports</Text><Text style={styles.subtitle}>Customs activity and declaration insights</Text></View></View>
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => load(true)} tintColor="#F5B81B" />} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.grid}><StatCard icon="documents-outline" label="Processed" value={number(dashboard.totalProcessed)} /><StatCard icon="checkmark-circle-outline" label="Released" value={number(dashboard.released)} color="#279B55" /><StatCard icon="time-outline" label="Pending release" value={number(dashboard.pendingRelease)} /><StatCard icon="flag-outline" label="Flagged by me" value={number(dashboard.flaggedByMe)} color="#C93D3D" /></View>
      <View style={styles.revenueCard}><View><Text style={styles.eyebrow}>REVENUE COLLECTED</Text><Text style={styles.revenue}>{money(dashboard.revenueCollected)}</Text></View><View style={styles.revenueIcon}><Ionicons name="cash-outline" size={27} color="#171725" /></View></View>
      <Text style={styles.sectionTitle}>Declaration status</Text><View style={styles.card}>{statuses.length ? statuses.map((item, index) => <View key={item.label} style={[styles.statusRow, index < statuses.length - 1 && styles.divider]}><View style={styles.statusCopy}><Text style={styles.statusName}>{item.label}</Text><Text style={styles.statusDuty}>Recorded duty: {money(item.duty)}</Text></View><Text style={styles.statusCount}>{number(item.count)}</Text></View>) : <Text style={styles.empty}>No declaration statistics available.</Text>}</View>
      <Text style={styles.sectionTitle}>Last six months</Text><View style={styles.chartCard}>{months.length ? months.map((item) => { const count = Number(item.count || 0); return <View key={item.month} style={styles.barRow}><Text style={styles.month}>{item.month}</Text><View style={styles.track}><View style={[styles.bar, { width: `${Math.max(5, count / maxMonth * 100)}%` }]} /></View><Text style={styles.barCount}>{count}</Text></View>; }) : <Text style={styles.empty}>Monthly declaration data is not available yet.</Text>}<View style={styles.average}><Text style={styles.averageLabel}>Average duty paid</Text><Text style={styles.averageValue}>{money(declarations.averageDutyPaid)}</Text></View></View>
      <Text style={styles.sectionTitle}>Recent port activity</Text><View style={styles.card}>{activities.length ? activities.map((item, index) => <View key={item.id || `${item.action}-${index}`} style={[styles.activity, index < activities.length - 1 && styles.divider]}><View style={styles.activityIcon}><Ionicons name="pulse-outline" size={18} color="#B27B00" /></View><View style={styles.activityCopy}><Text style={styles.activityTitle}>{String(item.action || "Port activity").replaceAll("_", " ")}</Text><Text style={styles.activityDetail} numberOfLines={2}>{item.details || item.declarationId || "Customs activity recorded"}</Text><Text style={styles.activityDate}>{item.createdAt ? new Date(item.createdAt).toLocaleString() : "Recently"}</Text></View></View>) : <Text style={styles.empty}>No recent activity recorded.</Text>}</View>
    </ScrollView>
  </SafeAreaView>;
}

const styles = StyleSheet.create({container:{flex:1,backgroundColor:"#F7F8FA"},loading:{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"#FFF"},header:{backgroundColor:"#FFF",paddingHorizontal:18,paddingVertical:14,flexDirection:"row",alignItems:"center",borderBottomWidth:1,borderBottomColor:"#EEEFF1"},back:{width:42,height:42,borderRadius:14,alignItems:"center",justifyContent:"center",backgroundColor:"#F6F6F7"},headerCopy:{marginLeft:12,flex:1},title:{fontSize:21,fontWeight:"800",color:"#171725"},subtitle:{fontSize:11,color:"#78828A",marginTop:3},content:{padding:18,paddingBottom:45},grid:{flexDirection:"row",flexWrap:"wrap",justifyContent:"space-between",rowGap:12},statCard:{width:"48%",backgroundColor:"#FFF",borderRadius:16,padding:14,borderWidth:1,borderColor:"#ECEDEF"},statIcon:{width:38,height:38,borderRadius:12,alignItems:"center",justifyContent:"center",backgroundColor:"#FFF6D9"},statValue:{fontSize:23,fontWeight:"800",color:"#171725",marginTop:11},statLabel:{fontSize:11,color:"#78828A",marginTop:2},revenueCard:{marginTop:14,borderRadius:18,padding:18,backgroundColor:"#F5B81B",flexDirection:"row",alignItems:"center",justifyContent:"space-between"},eyebrow:{fontSize:9,fontWeight:"800",letterSpacing:1,color:"#6E4B00"},revenue:{fontSize:26,fontWeight:"800",color:"#171725",marginTop:5},revenueIcon:{width:52,height:52,borderRadius:18,backgroundColor:"rgba(255,255,255,.38)",alignItems:"center",justifyContent:"center"},sectionTitle:{fontSize:16,fontWeight:"800",color:"#171725",marginTop:24,marginBottom:10},card:{backgroundColor:"#FFF",borderRadius:16,paddingHorizontal:15,borderWidth:1,borderColor:"#ECEDEF"},statusRow:{minHeight:64,flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingVertical:12},divider:{borderBottomWidth:1,borderBottomColor:"#F0F1F2"},statusCopy:{flex:1,minWidth:0},statusName:{fontSize:12,fontWeight:"700",color:"#292A30"},statusDuty:{fontSize:9,color:"#899198",marginTop:4},statusCount:{fontSize:17,fontWeight:"800",color:"#171725",marginLeft:12},chartCard:{backgroundColor:"#FFF",borderRadius:16,padding:15,borderWidth:1,borderColor:"#ECEDEF"},barRow:{flexDirection:"row",alignItems:"center",marginBottom:13},month:{width:58,fontSize:9,color:"#697178"},track:{height:9,flex:1,borderRadius:6,backgroundColor:"#F0F1F3",overflow:"hidden"},bar:{height:"100%",borderRadius:6,backgroundColor:"#F5B81B"},barCount:{width:30,textAlign:"right",fontSize:10,fontWeight:"700",color:"#171725"},average:{borderTopWidth:1,borderTopColor:"#F0F1F2",paddingTop:13,marginTop:3,flexDirection:"row",justifyContent:"space-between"},averageLabel:{fontSize:11,color:"#78828A"},averageValue:{fontSize:12,fontWeight:"800",color:"#171725"},activity:{flexDirection:"row",paddingVertical:14},activityIcon:{width:36,height:36,borderRadius:12,backgroundColor:"#FFF6D9",alignItems:"center",justifyContent:"center"},activityCopy:{flex:1,minWidth:0,marginLeft:11},activityTitle:{fontSize:11,fontWeight:"800",color:"#292A30",textTransform:"capitalize"},activityDetail:{fontSize:10,color:"#687078",lineHeight:15,marginTop:3},activityDate:{fontSize:8,color:"#9AA0A5",marginTop:5},empty:{textAlign:"center",color:"#899198",paddingVertical:24,fontSize:11}});
