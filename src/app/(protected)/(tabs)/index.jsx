import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, Circle, G, ClipPath, Defs, Rect } from "react-native-svg";
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from "@expo-google-fonts/plus-jakarta-sans";
import { AuthContext } from "../../../utils/authContext";
import { useRouter } from "expo-router";
import { reportService } from "../../../services/reportService";
import { notificationService } from "../../../services/notificationService";

// ══════════════════════════════════════════════════
// 🎨 SVG ICONS
// ══════════════════════════════════════════════════

// 🔔 Notification Bell
const NotificationBell = () => (
  <Svg width="24" height="24" viewBox="0 0 26 26" fill="none">
    <Path
      d="M20.3106 10.5183V9.75452C20.3106 5.5631 17.0346 2.16577 12.9981 2.16577C8.96161 2.16577 5.68561 5.5631 5.68561 9.75452V10.5183C5.68692 11.43 5.42675 12.3229 4.93595 13.0912L3.73561 14.9599C2.64036 16.6662 3.4767 18.9856 5.38228 19.5251C10.3614 20.9366 15.6348 20.9366 20.6139 19.5251C22.5195 18.9856 23.3559 16.6662 22.2606 14.961L21.0603 13.0923C20.5691 12.3241 20.3086 11.4311 20.3095 10.5194L20.3106 10.5183Z"
      stroke="#171725"
      strokeWidth="1.625"
    />
    <Path
      d="M8.11963 20.585C8.82921 22.4786 10.7435 23.835 12.9946 23.835C15.2458 23.835 17.16 22.4786 17.8696 20.585"
      stroke="#171725"
      strokeWidth="1.625"
      strokeLinecap="round"
    />
    <Circle cx="18.4183" cy="6.4991" r="4.33333" fill="#F5B81B" />
  </Svg>
);

// 👤 Avatar Placeholder
const AvatarPlaceholder = () => (
  <View style={styles.avatar}>
    <Svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="9" r="4" fill="#FFFFFF" />
      <Path
        d="M4 21C4 16.5817 7.58172 13 12 13C16.4183 13 20 16.5817 20 21"
        fill="#FFFFFF"
      />
    </Svg>
  </View>
);

// 💰 Pending Payment Icon (money/wallet with $)
const PendingIcon = () => (
  <Svg width="19" height="20" viewBox="0 0 19 20" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.4972 1.08737e-06H9.39894C8.55003 -2.72568e-05 7.84218 -4.61272e-05 7.28023 0.0755006C6.68709 0.155252 6.15157 0.330674 5.72124 0.761005C5.29091 1.19134 5.11549 1.72685 5.03574 2.31999C4.98158 2.72283 4.96625 3.68614 4.96193 4.51208C3.05129 4.57448 1.90413 4.79752 1.10691 5.59474C8.69607e-08 6.70166 0 8.48323 0 12.0463C0 15.6093 8.69607e-08 17.391 1.10691 18.4978C2.21381 19.6047 3.99536 19.6047 7.55844 19.6047H11.3377C14.9007 19.6047 16.6824 19.6047 17.7892 18.4978C18.8961 17.391 18.8961 15.6093 18.8961 12.0463C18.8961 8.48323 18.8961 6.70166 17.7892 5.59474C16.992 4.79752 15.8449 4.57448 13.9342 4.51208C13.9299 3.68614 13.9145 2.72283 13.8604 2.31999C13.7807 1.72685 13.6052 1.19134 13.1749 0.761005C12.7446 0.330674 12.2091 0.155252 11.6159 0.0755006C11.054 -4.61272e-05 10.3461 -2.72568e-05 9.4972 1.08737e-06ZM12.5167 4.48961C12.5125 3.68969 12.4989 2.82882 12.4559 2.50884C12.3972 2.07284 12.2959 1.88625 12.1728 1.76312C12.0497 1.64 11.8631 1.53869 11.4271 1.48008C10.9707 1.41872 10.3589 1.41721 9.44807 1.41721C8.53728 1.41721 7.92542 1.41872 7.46907 1.48008C7.03308 1.53869 6.84649 1.64 6.72336 1.76312C6.60023 1.88625 6.49893 2.07284 6.44031 2.50884C6.39729 2.82882 6.38369 3.68969 6.37941 4.48961C6.74923 4.48783 7.14165 4.48783 7.55846 4.48783H11.3377C11.7545 4.48783 12.1469 4.48783 12.5167 4.48961ZM9.44807 7.55846C9.83941 7.55846 10.1567 7.87571 10.1567 8.26706V8.2767C11.1854 8.53586 12.0463 9.34698 12.0463 10.4716C12.0463 10.8629 11.729 11.1802 11.3377 11.1802C10.9463 11.1802 10.6291 10.8629 10.6291 10.4716C10.6291 10.1088 10.2268 9.60557 9.44807 9.60557C8.66936 9.60557 8.26706 10.1088 8.26706 10.4716C8.26706 10.8345 8.66936 11.3377 9.44807 11.3377C10.7565 11.3377 12.0463 12.2445 12.0463 13.621C12.0463 14.7456 11.1854 15.5567 10.1567 15.8159V15.8255C10.1567 16.2169 9.83941 16.5341 9.44807 16.5341C9.05673 16.5341 8.73946 16.2169 8.73946 15.8255V15.8159C7.71076 15.5567 6.84985 14.7456 6.84985 13.621C6.84985 13.2297 7.16711 12.9124 7.55846 12.9124C7.94979 12.9124 8.26706 13.2297 8.26706 13.621C8.26706 13.9838 8.66936 14.487 9.44807 14.487C10.2268 14.487 10.6291 13.9838 10.6291 13.621C10.6291 13.2581 10.2268 12.7549 9.44807 12.7549C8.13961 12.7549 6.84985 11.8482 6.84985 10.4716C6.84985 9.34698 7.71076 8.53586 8.73946 8.2767V8.26706C8.73946 7.87571 9.05673 7.55846 9.44807 7.55846Z"
      fill="black"
    />
  </Svg>
);

// ✅ Paid Icon (green checkmark)
const PaidIcon = () => (
  <Svg width="21" height="21" viewBox="0 0 21 21" fill="none">
    <G clipPath="url(#clip0)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.9219 9.91514C2.25347 9.24676 1.16975 9.24676 0.501312 9.91514C-0.167104 10.5835 -0.167104 11.6673 0.501312 12.3357L5.63613 17.4705C6.30457 18.1389 7.38832 18.1389 8.0567 17.4705L20.038 5.48928C20.7063 4.82085 20.7063 3.73713 20.038 3.0687C19.3696 2.40028 18.2858 2.40028 17.6174 3.0687L6.84643 13.8397L2.9219 9.91514Z"
        fill="#4CAF50"
      />
    </G>
    <Defs>
      <ClipPath id="clip0">
        <Rect width="20.5393" height="20.5393" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

// 🚚 Released Icon (delivery truck)
const ReleasedIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M9.92706 2.89867V11.1483C9.92706 12.1609 10.751 12.9848 11.7636 12.9848H20.8471C21.3931 12.9848 21.8398 12.5381 21.8398 11.9921V5.64853C21.8398 3.62336 20.2018 1.98535 18.1767 1.98535H10.8503C10.3341 1.98535 9.92706 2.39237 9.92706 2.89867Z"
      fill="black"
    />
    <Path
      d="M2.48157 15.3876C2.20361 15.3876 1.98521 15.606 1.98521 15.8839V16.8766C1.98521 18.5246 3.31547 19.8548 4.9634 19.8548C4.9634 18.2168 6.30359 16.8766 7.9416 16.8766C9.57961 16.8766 10.9198 18.2168 10.9198 19.8548H12.9053C12.9053 18.2168 14.2454 16.8766 15.8835 16.8766C17.5215 16.8766 18.8616 18.2168 18.8616 19.8548C20.5096 19.8548 21.8398 18.5246 21.8398 16.8766V14.8912C21.8398 14.3452 21.3931 13.8985 20.8471 13.8985H11.4162C10.0462 13.8985 8.93433 12.7866 8.93433 11.4166V5.9566C8.93433 5.4106 8.4876 4.96387 7.9416 4.96387H7.1077C6.39294 4.96387 5.73773 5.35103 5.38035 5.96653L4.745 7.07839C4.65565 7.23722 4.77478 7.4457 4.9634 7.4457C6.33337 7.4457 7.44523 8.55756 7.44523 9.92753V12.9057C7.44523 14.2757 6.33337 15.3876 4.9634 15.3876H2.48157Z"
      fill="black"
    />
    <Path
      d="M15.8837 21.8401C14.7871 21.8401 13.8982 20.9512 13.8982 19.8546C13.8982 18.758 14.7871 17.8691 15.8837 17.8691C16.9802 17.8691 17.8691 18.758 17.8691 19.8546C17.8691 20.9512 16.9802 21.8401 15.8837 21.8401Z"
      fill="black"
    />
    <Path
      d="M7.94227 21.8401C6.8457 21.8401 5.95681 20.9512 5.95681 19.8546C5.95681 18.758 6.8457 17.8691 7.94227 17.8691C9.03884 17.8691 9.92773 18.758 9.92773 19.8546C9.92773 20.9512 9.03884 21.8401 7.94227 21.8401Z"
      fill="black"
    />
    <Path
      d="M1.9861 12.4389V13.8982H4.9643C5.5103 13.8982 5.95703 13.4515 5.95703 12.9055V9.9273C5.95703 9.3813 5.5103 8.93457 4.9643 8.93457H3.68367L2.24421 11.4561C2.07545 11.7539 1.9861 12.0915 1.9861 12.4389Z"
      fill="black"
    />
  </Svg>
);

// 💵 Duty Payment Summary Logo (yellow stacked lines)
const DutySummaryIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <Path
      d="M14.5213 0.598633H1.0487C0.809183 0.598633 0.599609 0.808207 0.599609 1.04772V2.54468C0.599609 2.78419 0.809183 2.99377 1.0487 2.99377H14.5213C14.7608 2.99377 14.9704 2.78419 14.9704 2.54468V1.04772C14.9704 0.808207 14.7608 0.598633 14.5213 0.598633Z"
      fill="#F5B81B"
    />
    <Path
      d="M14.5215 4.19141H4.04284C3.80332 4.19141 3.59375 4.40098 3.59375 4.64049V5.53867C3.59375 5.77818 3.80332 5.98776 4.04284 5.98776H14.5215C14.7611 5.98776 14.9706 5.77818 14.9706 5.53867V4.64049C14.9706 4.40098 14.7611 4.19141 14.5215 4.19141Z"
      fill="#F5B81B"
    />
    <Path
      d="M14.5215 10.1797H4.04284C3.80332 10.1797 3.59375 10.3893 3.59375 10.6288V11.5269C3.59375 11.7665 3.80332 11.976 4.04284 11.976H14.5215C14.7611 11.976 14.9706 11.7665 14.9706 11.5269V10.6288C14.9706 10.3893 14.7611 10.1797 14.5215 10.1797Z"
      fill="#F5B81B"
    />
    <Path
      d="M14.5213 13.1736H2.84505C2.60553 13.1736 2.39596 12.964 2.39596 12.7245V10.6288C2.39596 10.3893 2.18638 10.1797 1.94687 10.1797H1.0487C0.809183 10.1797 0.599609 10.3893 0.599609 10.6288V14.5209C0.599609 14.7604 0.809183 14.97 1.0487 14.97H1.94687H2.39596H14.5213C14.7608 14.97 14.9704 14.7604 14.9704 14.5209V13.6227C14.9704 13.3832 14.7608 13.1736 14.5213 13.1736Z"
      fill="#F5B81B"
    />
    <Path
      d="M14.5213 7.18532H2.84505C2.60553 7.18532 2.39596 6.97575 2.39596 6.73623V4.64049C2.39596 4.40098 2.18638 4.19141 1.94687 4.19141H1.0487C0.809183 4.19141 0.599609 4.40098 0.599609 4.64049V8.53258C0.599609 8.7721 0.809183 8.98167 1.0487 8.98167H1.64748H2.39596H14.5213C14.7608 8.98167 14.9704 8.7721 14.9704 8.53258V7.63441C14.9704 7.3949 14.7608 7.18532 14.5213 7.18532Z"
      fill="#F5B81B"
    />
  </Svg>
);

// 🕐 Recent Declarations / Quick Actions Logo (clock with yellow accent)
const ClockIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <Path
      d="M9.78438 1.95703C5.46918 1.95703 1.95703 5.46918 1.95703 9.78438C1.95703 14.0996 5.46918 17.6117 9.78438 17.6117C14.0996 17.6117 17.6117 14.0996 17.6117 9.78438C17.6117 5.46918 14.0996 1.95703 9.78438 1.95703ZM9.78438 3.26159C13.3945 3.26159 16.3072 6.17421 16.3072 9.78438C16.3072 13.3945 13.3945 16.3072 9.78438 16.3072C6.17421 16.3072 3.26159 13.3945 3.26159 9.78438C3.26159 6.17421 6.17421 3.26159 9.78438 3.26159ZM9.78438 4.56615C9.42301 4.56615 9.1321 4.85706 9.1321 5.21842V9.78438C9.1321 10.1457 9.42301 10.4367 9.78438 10.4367H14.3503C14.7117 10.4367 15.0026 10.1457 15.0026 9.78438C15.0026 9.42301 14.7117 9.1321 14.3503 9.1321H10.4367V5.21842C10.4367 4.85706 10.1457 4.56615 9.78438 4.56615Z"
      fill="#F5B81B"
    />
  </Svg>
);

// 📋 My Declarations Icon
const MyDeclarationsIcon = () => (
  <Svg width="25" height="25" viewBox="0 0 25 25" fill="none">
    <Path
      d="M11.0999 6.05427L21.1906 6.055M11.0999 12.1087L21.1906 12.1094M11.0999 18.1631L21.1906 18.1638M3.02734 12.0526L4.57976 13.6223L8.0727 10.0906M3.02734 5.99821L4.57976 7.56788L8.0727 4.03613M4.54095 18.1631H4.55104M5.04548 18.1631C5.04548 18.4417 4.81959 18.6677 4.54095 18.6677C4.2623 18.6677 4.03641 18.4417 4.03641 18.1631C4.03641 17.8845 4.2623 17.6586 4.54095 17.6586C4.81959 17.6586 5.04548 17.8845 5.04548 18.1631Z"
      stroke="black"
      strokeWidth="2.01814"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 💳 Make Payment Icon
const MakePaymentIcon = () => (
  <Svg width="20" height="21" viewBox="0 0 20 21" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.052 1.15089e-06H9.948C9.0495 -2.88491e-05 8.3003 -4.88218e-05 7.70552 0.0799112C7.07773 0.164321 6.51093 0.349991 6.05546 0.805461C5.59999 1.26093 5.41432 1.82773 5.32991 2.45552C5.27259 2.88189 5.25637 3.90147 5.25179 4.77566C3.22954 4.84171 2.01536 5.07778 1.17157 5.92157C9.20407e-08 7.09315 0 8.9788 0 12.75C0 16.5212 9.20407e-08 18.4069 1.17157 19.5784C2.34314 20.75 4.22876 20.75 7.99998 20.75H12C15.7712 20.75 17.6569 20.75 18.8284 19.5784C20 18.4069 20 16.5212 20 12.75C20 8.9788 20 7.09315 18.8284 5.92157C17.9846 5.07778 16.7705 4.84171 14.7482 4.77566C14.7436 3.90147 14.7274 2.88189 14.6701 2.45552C14.5857 1.82773 14.4 1.26093 13.9445 0.805461C13.4891 0.349991 12.9223 0.164321 12.2945 0.0799112C11.6997 -4.88218e-05 10.9505 -2.88491e-05 10.052 1.15089e-06ZM13.2479 4.75188C13.2434 3.90523 13.229 2.99407 13.1835 2.6554C13.1214 2.19393 13.0142 1.99644 12.8839 1.86612C12.7536 1.7358 12.5561 1.62858 12.0946 1.56654C11.6116 1.5016 10.964 1.5 10 1.5C9.036 1.5 8.3884 1.5016 7.90539 1.56654C7.44393 1.62858 7.24644 1.7358 7.11612 1.86612C6.9858 1.99644 6.87858 2.19393 6.81654 2.6554C6.771 2.99407 6.75661 3.90523 6.75208 4.75188C7.1435 4.75 7.55885 4.75 8 4.75H12C12.4412 4.75 12.8565 4.75 13.2479 4.75188ZM10 8C10.4142 8 10.75 8.33579 10.75 8.75V8.7602C11.8388 9.0345 12.75 9.893 12.75 11.0833C12.75 11.4975 12.4142 11.8333 12 11.8333C11.5858 11.8333 11.25 11.4975 11.25 11.0833C11.25 10.6993 10.8242 10.1667 10 10.1667C9.1758 10.1667 8.75 10.6993 8.75 11.0833C8.75 11.4674 9.1758 12 10 12C11.3849 12 12.75 12.9598 12.75 14.4167C12.75 15.607 11.8388 16.4655 10.75 16.7398V16.75C10.75 17.1642 10.4142 17.5 10 17.5C9.5858 17.5 9.25 17.1642 9.25 16.75V16.7398C8.1612 16.4655 7.25 15.607 7.25 14.4167C7.25 14.0025 7.58579 13.6667 8 13.6667C8.4142 13.6667 8.75 14.0025 8.75 14.4167C8.75 14.8007 9.1758 15.3333 10 15.3333C10.8242 15.3333 11.25 14.8007 11.25 14.4167C11.25 14.0326 10.8242 13.5 10 13.5C8.6151 13.5 7.25 12.5403 7.25 11.0833C7.25 9.893 8.1612 9.0345 9.25 8.7602V8.75C9.25 8.33579 9.5858 8 10 8Z"
      fill="black"
    />
  </Svg>
);

// 🧮 Duty Calculator Icon
const DutyCalculatorIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.0007 25.6663C8.50093 25.6663 5.75107 25.6663 4.04253 23.9578C2.33398 22.2493 2.33398 19.4993 2.33398 13.9997C2.33398 8.49995 2.33398 5.75009 4.04253 4.04156C5.75107 2.33301 8.50093 2.33301 14.0007 2.33301C19.5003 2.33301 22.2503 2.33301 23.9587 4.04156C25.6673 5.75009 25.6673 8.49995 25.6673 13.9997C25.6673 19.4993 25.6673 22.2493 23.9587 23.9578C22.2503 25.6663 19.5003 25.6663 14.0007 25.6663ZM10.209 7.58298C10.209 7.09973 9.81723 6.70798 9.33398 6.70798C8.85074 6.70798 8.45898 7.09973 8.45898 7.58298V9.04133H7.00065C6.51741 9.04133 6.12565 9.43309 6.12565 9.91633C6.12565 10.3996 6.51741 10.7913 7.00065 10.7913H8.45898V12.2497C8.45898 12.7329 8.85074 13.1247 9.33398 13.1247C9.81723 13.1247 10.209 12.7329 10.209 12.2497V10.7913H11.6673C12.1506 10.7913 12.5423 10.3996 12.5423 9.91633C12.5423 9.43309 12.1506 9.04133 11.6673 9.04133H10.209V7.58298ZM16.334 9.04132C15.8508 9.04132 15.459 9.43306 15.459 9.91632C15.459 10.3996 15.8508 10.7913 16.334 10.7913H21.0007C21.4839 10.7913 21.8757 10.3996 21.8757 9.91632C21.8757 9.43306 21.4839 9.04132 21.0007 9.04132H16.334ZM16.334 16.0413C15.8508 16.0413 15.459 16.4331 15.459 16.9163C15.459 17.3996 15.8508 17.7913 16.334 17.7913H21.0007C21.4839 17.7913 21.8757 17.3996 21.8757 16.9163C21.8757 16.4331 21.4839 16.0413 21.0007 16.0413H16.334ZM8.2027 16.2977C7.861 15.9559 7.30697 15.9559 6.96527 16.2977C6.62356 16.6394 6.62356 17.1933 6.96527 17.535L8.09656 18.6663L6.96528 19.7977C6.62357 20.1394 6.62357 20.6933 6.96528 21.035C7.30699 21.3767 7.86101 21.3767 8.20271 21.035L9.334 19.9038L10.4653 21.035C10.807 21.3767 11.361 21.3767 11.7027 21.035C12.0444 20.6933 12.0444 20.1394 11.7027 19.7977L10.5714 18.6663L11.7027 17.535C12.0444 17.1933 12.0444 16.6394 11.7027 16.2977C11.361 15.9559 10.807 15.9559 10.4653 16.2977L9.334 17.4289L8.2027 16.2977ZM16.334 19.5413C15.8508 19.5413 15.459 19.9331 15.459 20.4163C15.459 20.8996 15.8508 21.2913 16.334 21.2913H21.0007C21.4839 21.2913 21.8757 20.8996 21.8757 20.4163C21.8757 19.9331 21.4839 19.5413 21.0007 19.5413H16.334Z"
      fill="black"
    />
  </Svg>
);

// 📞 Support Icon
const SupportIcon = () => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 0 0-1.02.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.58l2.2-2.21c.28-.27.36-.66.25-1.01A11.36 11.36 0 0 1 8.5 4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1c0 9.39 7.61 17 17 17a1 1 0 0 0 1-1v-3.5a1 1 0 0 0-1-1z"
      fill="black"
    />
  </Svg>
);

// ══════════════════════════════════════════════════
// 🧩 SUB-COMPONENTS
// ══════════════════════════════════════════════════

// Section Header (icon + title)
const SectionHeader = ({ Icon, title }) => (
  <View style={styles.sectionHeader}>
    <Icon />
    <Text style={styles.sectionTitle}>{title}</Text>
  </View>
);

// Status Card
const StatusCard = ({ label, value, Icon }) => (
  <View style={styles.statusCard}>
    <Text style={styles.statusLabel} numberOfLines={1}>
      {label}
    </Text>
    <View style={styles.statusValueRow}>
      <View style={styles.statusIconWrapper}>
        <Icon />
      </View>
      <Text style={styles.statusValue}>{value}</Text>
    </View>
  </View>
);

// Declaration Item
const DeclarationItem = ({ id, name, duty, date, status, onPress }) => {
  const statusColor =
    status === "Paid" ? "#2196F3" : status === "Pending" ? "#F5B81B" : "#4CAF50";
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={styles.declarationCard}>
      <View style={styles.declarationTop}>
        <Text style={styles.declarationId}>{id}</Text>
        <View style={styles.statusPill}>
          <View style={[styles.statusPillDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusPillText, { color: statusColor }]}>{status}</Text>
        </View>
      </View>
      <Text style={styles.declarationName}>{name}</Text>
      <View style={styles.declarationBottom}>
        <Text style={styles.declarationMeta}>Duty: {duty}</Text>
        <Text style={styles.declarationMeta}>Declared: {date}</Text>
      </View>
    </TouchableOpacity>
  );
};

// Quick Action (yellow bg, black icon)
const QuickAction = ({ Icon, label, onPress }) => (
  <TouchableOpacity style={styles.quickAction} onPress={onPress} activeOpacity={0.85}>
    <View style={styles.quickActionIcon}>
      <Icon />
    </View>
    <Text style={styles.quickActionLabel}>{label}</Text>
  </TouchableOpacity>
);

// ══════════════════════════════════════════════════
// 🏠 MAIN HOME SCREEN
// ══════════════════════════════════════════════════

export default function Home() {
  const { user } = useContext(AuthContext);
  const router = useRouter();     // ✅ ADD THIS
  const [dashboard, setDashboard] = useState({});
  const [reportStats, setReportStats] = useState({});
  const [activities, setActivities] = useState([]);
  const [isLoadingReports, setIsLoadingReports] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  const loadReports = useCallback(async ({ refreshing = false } = {}) => {
    refreshing ? setIsRefreshing(true) : setIsLoadingReports(true);
    try {
      const [dashboardResponse, activityResponse, statsResponse] = await Promise.all([
        reportService.getDashboard(),
        reportService.getActivity({ limit: 5 }),
        reportService.getDeclarationStats(),
      ]);
      setDashboard(dashboardResponse.stats || {});
      setActivities(activityResponse.activities || []);
      setReportStats(statsResponse.stats || {});
      const notificationCount = await notificationService.getUnreadCount().catch(() => null);
      setUnreadNotifications(notificationCount?.unreadCount || 0);
    } catch (error) {
      Alert.alert("Reports unavailable", error.message || "Unable to load dashboard reports.");
    } finally {
      setIsLoadingReports(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => { loadReports(); }, [loadReports]);

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

  const userName = user?.name || "Joel Ltd";
  const orgInfo = user?.orgInfo || "Customs Officer";

  const declarations = activities.filter((activity) => activity.declarationId).map((activity) => ({
    id: activity.declarationId,
    name: activity.details || activity.action?.replace(/_/g, " ") || "Declaration activity",
    duty: "Activity",
    date: activity.createdAt?.slice(0, 10) || "",
    status: activity.newValues?.status === "GOODS_RELEASED" ? "Released" : activity.action === "DECLARATION_FLAG" ? "Flagged" : "Paid",
  }));

  // ✅ Open declaration details
  const openDeclarationDetails = (d) => {
    router.push({
      pathname: "/declaration-details",
      params: {
        id: d.id,
        description: d.name,
        totalDutyPayable: d.duty,
        dutyPaid: d.duty,
        dutyCalculated: d.duty,
        status: d.status,
      },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <SafeAreaView style={styles.safeArea}>
        {/* Header — same as before */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <AvatarPlaceholder />
            <View style={styles.userTextWrapper}>
              <Text style={styles.greetingText}>Hello, {userName}</Text>
              <Text style={styles.roleText}>{orgInfo}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.notificationButton} activeOpacity={0.7} onPress={() => router.push("/notifications")}>
            <NotificationBell />
            {unreadNotifications > 0 && <View style={styles.notificationBadge}><Text style={styles.notificationBadgeText}>{unreadNotifications > 99 ? "99+" : unreadNotifications}</Text></View>}
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentInner}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => loadReports({ refreshing: true })} tintColor="#F5B81B" />}
        >
          {/* Status Cards Row */}
          <View style={styles.statusRowWrapper}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.statusRow}
            >
              <StatusCard label="Pending Release" value={String(dashboard.pendingRelease ?? 0)} Icon={PendingIcon} />
              <StatusCard label="Processed" value={String(dashboard.totalProcessed ?? 0)} Icon={PaidIcon} />
              <StatusCard label="Released" value={String(dashboard.released ?? 0)} Icon={ReleasedIcon} />
            </ScrollView>
          </View>

          {/* Duty Payment Summary */}
          <SectionHeader Icon={DutySummaryIcon} title="Duty Payment Summary" />
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>This Month</Text>
              <Text style={styles.summaryValue}>${Number(dashboard.revenueCollected || 0).toLocaleString()}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Average Duty Paid</Text>
              <Text style={styles.summaryValue}>${Number(reportStats.averageDutyPaid || 0).toLocaleString()}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Declarations</Text>
              <Text style={styles.summaryValue}>{reportStats.total || 0}</Text>
            </View>
          </View>

          {/* Recent Declarations — now tappable */}
          <SectionHeader Icon={ClockIcon} title="Recent Declarations" />
          {isLoadingReports ? <ActivityIndicator color="#F5B81B" /> : declarations.map((d) => (
            <DeclarationItem
              key={d.id}
              {...d}
              onPress={() => openDeclarationDetails(d)}   // ✅ wire onPress
            />
          ))}

          {/* Quick Actions — all wired */}
          <SectionHeader Icon={ClockIcon} title="Quick Actions" />
          <View style={styles.quickActionsGrid}>
            <QuickAction
              Icon={MyDeclarationsIcon}
              label="My Declarations"
              onPress={() => router.push("/(protected)/(tabs)/declarations")}
            />
            <QuickAction
              Icon={MakePaymentIcon}
              label="Make Payment"
              onPress={() => router.push("/payment-confirmation")}
            />
            <QuickAction
              Icon={DutyCalculatorIcon}
              label="Duty Calculator"
              onPress={() => router.push("/duty-calculator")}
            />
            <QuickAction
              Icon={SupportIcon}
              label="Support"
              onPress={() => console.log("Support tapped")}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// ══════════════════════════════════════════════════
// 🎨 STYLES
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

  // 🔝 Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F2F4",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#444444",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  userTextWrapper: {
    flexDirection: "column",
    gap: 2,
  },
  greetingText: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 15,
    fontWeight: "600",
  },
  roleText: {
    color: "#78828A",
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 11,
  },
  notificationButton: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationBadge:{position:"absolute",top:2,right:1,minWidth:18,height:18,borderRadius:9,backgroundColor:"#EF4444",alignItems:"center",justifyContent:"center",paddingHorizontal:4,borderWidth:2,borderColor:"#FFF"},
  notificationBadgeText:{color:"#FFF",fontSize:9,fontWeight:"700"},

  
  // 📜 Content
  content: { flex: 1 },
  contentInner: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 120,
    gap: 20,
  },

  // 📊 Status Cards Wrapper (opacity behind the grid)
  statusRowWrapper: {
    backgroundColor: "rgba(221, 210, 182, 0.08)",
    borderRadius: 14,
    padding: 8,
  },
  statusRow: {
    flexDirection: "row",
    gap: 10,
    paddingRight: 8,
  },
  statusCard: {
    minWidth: 130,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#e9e8eb",
    borderColor: "rgba(241, 242, 244, 0.8)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    gap: 10,
  },
  statusLabel: {
    color: "#78828A",
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 11,
  },
  statusValueRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusIconWrapper: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  statusValue: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 24,
    fontWeight: "700",
  },

  // 🏷 Section Header
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
    marginTop: 4,
  },
  sectionTitle: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 14,
    fontWeight: "600",
  },

  // 💵 Duty Summary
  summaryCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#858a94",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: "#b5bbc7",
  },
  summaryLabel: {
    color: "#494e52",
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 13,
  },
  summaryValue: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 14,
    fontWeight: "600",
  },

  // 📝 Declarations
  declarationCard: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#f0f0f5",
    borderWidth: 1,
    borderColor: "#F1F2F4",
    marginBottom: 10,
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  declarationTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  declarationId: {
    color: "#78828A",
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 11,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  statusPillDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusPillText: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 10,
    fontWeight: "500",
  },
  declarationName: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 14,
    fontWeight: "600",
  },
  declarationBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 2,
  },
  declarationMeta: {
    color: "#78828A",
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 10,
  },

  // ⚡ Quick Actions
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  quickAction: {
    width: "48%",
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#F5B81B",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  quickActionIcon: {
    width: 36,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#F5B81B",
    justifyContent: "center",
    alignItems: "center",
  },
  quickActionLabel: {
    color: "#171725",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 13,
    fontWeight: "600",
    flex: 1,
    flexShrink: 1,
  },
});
