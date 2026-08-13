import React, { useState } from "react";
import { ActivityIndicator, Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { authService } from "../services/authService";
import { RecoveryLayout, styles as shared } from "./forgot-password";

const PasswordField=({placeholder,value,onChangeText,visible,onToggle})=><View style={shared.inputWrap}><Ionicons name="lock-closed-outline" size={19} color="#78828A"/><TextInput style={shared.input} placeholder={placeholder} placeholderTextColor="#78828A" value={value} onChangeText={onChangeText} secureTextEntry={!visible} autoCapitalize="none"/><TouchableOpacity onPress={onToggle}><Ionicons name={visible?"eye-outline":"eye-off-outline"} size={20} color="#78828A"/></TouchableOpacity></View>;

export default function NewPassword(){
  const router=useRouter(); const params=useLocalSearchParams(); const token=String(params.token||"");
  const [password,setPassword]=useState(""); const [confirm,setConfirm]=useState(""); const [show,setShow]=useState(false); const [showConfirm,setShowConfirm]=useState(false); const [busy,setBusy]=useState(false); const [success,setSuccess]=useState(false);
  const valid=password.length>=6&&password===confirm;
  const submit=async()=>{if(!valid||busy)return;setBusy(true);try{await authService.resetPassword({token,newPassword:password});setSuccess(true);}catch(error){Alert.alert("Reset failed",error.message||"Unable to reset your password.");}finally{setBusy(false);}};
  return <><RecoveryLayout title="Create new password" subtitle="Choose a secure password you haven’t used before." onBack={()=>router.back()}>
    <PasswordField placeholder="New password" value={password} onChangeText={setPassword} visible={show} onToggle={()=>setShow(!show)}/>
    <PasswordField placeholder="Confirm new password" value={confirm} onChangeText={setConfirm} visible={showConfirm} onToggle={()=>setShowConfirm(!showConfirm)}/>
    <View style={local.rules}><Text style={[local.rule,password.length>=6&&local.valid]}>• At least 6 characters</Text><Text style={[local.rule,confirm&&password===confirm&&local.valid]}>• Passwords match</Text></View>
    <TouchableOpacity style={[shared.primaryButton,!valid&&shared.disabled]} disabled={!valid||busy} onPress={submit}>{busy?<ActivityIndicator color="#000"/>:<Text style={shared.primaryText}>Reset password</Text>}</TouchableOpacity>
  </RecoveryLayout>
  <Modal visible={success} transparent animationType="fade"><View style={local.overlay}><View style={local.modal}><View style={local.successIcon}><Ionicons name="checkmark" size={34} color="#000"/></View><Text style={local.title}>Password reset</Text><Text style={local.copy}>Your password was changed successfully. You can now sign in with your new password.</Text><TouchableOpacity style={shared.primaryButton} onPress={()=>router.replace("/login")}><Text style={shared.primaryText}>Back to sign in</Text></TouchableOpacity></View></View></Modal></>;
}
const local=StyleSheet.create({rules:{gap:6,paddingHorizontal:4},rule:{fontSize:12,color:"#9CA3AF"},valid:{color:"#4CAF50"},overlay:{flex:1,backgroundColor:"rgba(0,0,0,.45)",alignItems:"center",justifyContent:"center",padding:24},modal:{width:"100%",maxWidth:350,backgroundColor:"#FFF",borderRadius:20,padding:24,gap:15},successIcon:{width:62,height:62,borderRadius:31,backgroundColor:"#F5B81B",alignItems:"center",justifyContent:"center",alignSelf:"center"},title:{fontSize:22,fontWeight:"800",color:"#171725",textAlign:"center"},copy:{fontSize:14,lineHeight:21,color:"#6C7278",textAlign:"center"}});
