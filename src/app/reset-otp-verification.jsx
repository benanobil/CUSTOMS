import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { authService } from "../services/authService";
import { RecoveryLayout, styles as shared } from "./forgot-password";

export default function ResetOtpVerification() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const email = String(params.email || "").toLowerCase();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const refs = useRef([]);
  useEffect(() => { if (timer <= 0) return; const id = setInterval(() => setTimer((value) => value - 1), 1000); return () => clearInterval(id); }, [timer]);

  const updateDigit = (index, value) => { if (!/^\d*$/.test(value)) return; const next=[...otp]; next[index]=value.slice(-1); setOtp(next); if(value && index<5) refs.current[index+1]?.focus(); };
  const verify = async () => { const code=otp.join(""); if(code.length!==6 || isSubmitting)return; setIsSubmitting(true); try { const response=await authService.verifyResetOtp({email,otp:code}); router.replace({pathname:"/new-password",params:{email,token:response.resetToken}}); } catch(error){Alert.alert("Verification failed",error.message||"The code could not be verified.");} finally{setIsSubmitting(false);} };
  const resend = async () => { if(timer>0)return; try { const response=await authService.forgotPassword({email}); setOtp(["","","","","",""]); setTimer(60); refs.current[0]?.focus(); Alert.alert("Code sent",response.message||"A new code was sent."); } catch(error){Alert.alert("Resend failed",error.message||"Unable to resend the code.");} };

  return <RecoveryLayout title="Verify your email" subtitle={`Enter the six-digit code sent to ${email}.`} onBack={() => router.back()}>
    <View style={local.otpRow}>{otp.map((digit,index)=><TextInput key={index} ref={(node)=>refs.current[index]=node} style={local.otp} value={digit} onChangeText={(value)=>updateDigit(index,value)} onKeyPress={({nativeEvent})=>nativeEvent.key==="Backspace"&&!otp[index]&&index>0&&refs.current[index-1]?.focus()} keyboardType="number-pad" maxLength={1} selectionColor="#F5B81B" />)}</View>
    <TouchableOpacity onPress={resend} disabled={timer>0}><Text style={[shared.link,timer>0&&local.muted]}>{timer>0?`Resend code in ${timer}s`:"Resend verification code"}</Text></TouchableOpacity>
    <TouchableOpacity style={[shared.primaryButton,otp.join("").length!==6&&shared.disabled]} disabled={otp.join("").length!==6||isSubmitting} onPress={verify}>{isSubmitting?<ActivityIndicator color="#000"/>:<Text style={shared.primaryText}>Verify code</Text>}</TouchableOpacity>
  </RecoveryLayout>;
}
const local=StyleSheet.create({otpRow:{flexDirection:"row",justifyContent:"space-between",gap:6,marginVertical:4},otp:{flex:1,maxWidth:48,height:54,borderWidth:1.5,borderColor:"#E4E7EB",borderRadius:11,textAlign:"center",fontSize:20,fontWeight:"700",color:"#171725",backgroundColor:"#FFF"},muted:{color:"#9CA3AF"}});
