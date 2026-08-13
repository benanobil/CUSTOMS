import React, { useState } from "react";
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { authService } from "../services/authService";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isValid = /^\S+@\S+\.\S+$/.test(email.trim());

  const handleSubmit = async () => {
    if (!isValid || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const normalizedEmail = email.trim().toLowerCase();
      await authService.forgotPassword({ email: normalizedEmail });
      router.push({ pathname: "/reset-otp-verification", params: { email: normalizedEmail } });
    } catch (error) {
      Alert.alert("Request failed", error.message || "Unable to send a reset code.");
    } finally { setIsSubmitting(false); }
  };

  return <RecoveryLayout title="Forgot password?" subtitle="Enter your account email and we’ll send you a verification code." onBack={() => router.back()}>
    <View style={styles.inputWrap}>
      <Ionicons name="mail-outline" size={19} color="#78828A" />
      <TextInput style={styles.input} placeholder="Email address" placeholderTextColor="#78828A" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} value={email} onChangeText={setEmail} />
      {isValid && <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />}
    </View>
    <TouchableOpacity style={[styles.primaryButton, !isValid && styles.disabled]} disabled={!isValid || isSubmitting} onPress={handleSubmit}>
      {isSubmitting ? <ActivityIndicator color="#000" /> : <Text style={styles.primaryText}>Send verification code</Text>}
    </TouchableOpacity>
    <TouchableOpacity onPress={() => router.replace("/login")}><Text style={styles.link}>Back to sign in</Text></TouchableOpacity>
  </RecoveryLayout>;
}

export function RecoveryLayout({ title, subtitle, onBack, children }) {
  return <View style={styles.container}><StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
    <LinearGradient colors={["rgba(245,184,27,0.5)", "rgba(245,184,27,0.15)", "rgba(255,255,255,0)"]} locations={[0, 0.42, 1]} style={styles.gradient} />
    <SafeAreaView style={styles.safe}><KeyboardAvoidingView style={styles.safe} behavior={Platform.OS === "ios" ? "padding" : "height"}><ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <TouchableOpacity style={styles.back} onPress={onBack}><Ionicons name="arrow-back" size={24} color="#171725" /></TouchableOpacity>
      <View style={styles.brand}><Image source={require("../../assets/TRUST-icon.png")} style={styles.logo} resizeMode="contain" /><Text style={styles.brandText}>TRUST</Text></View>
      <View style={styles.card}><View style={styles.iconCircle}><Ionicons name="key-outline" size={28} color="#171725" /></View><Text style={styles.title}>{title}</Text><Text style={styles.subtitle}>{subtitle}</Text>{children}</View>
    </ScrollView></KeyboardAvoidingView></SafeAreaView>
  </View>;
}

export const styles = StyleSheet.create({ container:{flex:1,backgroundColor:"#FFF"},safe:{flex:1},gradient:{...StyleSheet.absoluteFillObject,height:360},content:{flexGrow:1,padding:22,paddingBottom:40},back:{width:44,height:44,justifyContent:"center"},brand:{flexDirection:"row",alignItems:"center",justifyContent:"center",gap:8,marginTop:18,marginBottom:38},logo:{width:38,height:38},brandText:{fontSize:24,fontWeight:"800",color:"#171725"},card:{backgroundColor:"#FFF",borderRadius:20,borderWidth:1,borderColor:"#EDF1F3",padding:22,gap:16,shadowColor:"#000",shadowOpacity:.06,shadowRadius:12,elevation:2},iconCircle:{width:56,height:56,borderRadius:28,backgroundColor:"#FFF7DA",alignItems:"center",justifyContent:"center",alignSelf:"center"},title:{fontSize:25,fontWeight:"800",color:"#171725",textAlign:"center"},subtitle:{fontSize:14,lineHeight:21,color:"#6C7278",textAlign:"center",marginBottom:6},inputWrap:{height:54,borderWidth:1,borderColor:"#E4E7EB",borderRadius:12,backgroundColor:"#FFF",flexDirection:"row",alignItems:"center",paddingHorizontal:14,gap:10},input:{flex:1,fontSize:14,color:"#171725"},primaryButton:{height:52,borderRadius:12,backgroundColor:"#F5B81B",alignItems:"center",justifyContent:"center",marginTop:4},disabled:{opacity:.45},primaryText:{fontSize:15,fontWeight:"700",color:"#000"},link:{color:"#B27B00",fontSize:13,fontWeight:"600",textAlign:"center",padding:8} });
