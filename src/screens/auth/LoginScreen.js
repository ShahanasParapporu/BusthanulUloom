// src/screens/auth/LoginScreen.js

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/slices/authSlice';
import { storageService, STORAGE_KEYS } from '../../utils/storage';
import { COLORS, USER_ROLES} from '../../constants/theme';

// Ensuring consistency with the modern color palette
const THEME = {
  primary: '#2E7D32', // Your brand green
  surface: '#F8F9FA', // Light grey for inputs
  textMain: '#1A1A1A',
  textSecondary: '#757575',
  white: '#FFFFFF',
};

const ROLE_LABELS = {
  [USER_ROLES.STUDENT]: { label: 'Student', icon: '🎓', color: '#2E7D32' },
  [USER_ROLES.PARENT]: { label: 'Parent', icon: '👨‍👩‍👧', color: '#1565C0' },
};

const LoginScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const role = route?.params?.role || USER_ROLES.STUDENT;
  const roleInfo = ROLE_LABELS[role] || ROLE_LABELS[USER_ROLES.STUDENT];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setSnackbarMessage('Please enter your credentials');
      setSnackbarVisible(true);
      return;
    }
    setLoading(true);
    // Logic remains the same...
    await new Promise((r) => setTimeout(r, 1200));

    const userData = { name: email.split('@')[0] || 'User', email };
    await storageService.setItem(STORAGE_KEYS.USER_DATA, userData);
    await storageService.setItem(STORAGE_KEYS.AUTH_TOKEN, 'mock-token');
    await storageService.setItem(STORAGE_KEYS.USER_ROLE, role);

    dispatch(loginSuccess({ user: userData, role, token: 'mock-token' }));
    setLoading(false);
    navigation.replace('Main');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerAccent} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Back to role selection */}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>← Change Role</Text>
        </TouchableOpacity>

        {/* Role badge */}
        <View style={[styles.roleBadge, { backgroundColor: roleInfo.color + '18' }]}>
          <Text style={styles.roleEmoji}>{roleInfo.icon}</Text>
          <Text style={[styles.roleLabel, { color: roleInfo.color }]}>
            Signing in as {roleInfo.label}
          </Text>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to access your {roleInfo.label.toLowerCase()} account</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            mode="flat"
            underlineColor="transparent"
            activeUnderlineColor={THEME.primary}
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
            left={<TextInput.Icon icon="email-outline" color={THEME.primary} />}
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="flat"
            underlineColor="transparent"
            activeUnderlineColor={THEME.primary}
            secureTextEntry={!showPassword}
            style={styles.input}
            left={<TextInput.Icon icon="lock-outline" color={THEME.primary} />}
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye-off-outline' : 'eye-outline'}
                onPress={() => setShowPassword(!showPassword)}
                color={THEME.textSecondary}
              />
            }
          />

          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            style={styles.loginButton}
            contentStyle={styles.buttonContent}
            labelStyle={styles.loginButtonLabel}
          >
            Login
          </Button>

          <View style={styles.registerContainer}>
            <Text style={styles.noAccountText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}> Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={styles.snackbar}
      >
        {snackbarMessage}
      </Snackbar>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },
  headerAccent: {
    position: 'absolute', top: -50, left: -50,
    width: 200, height: 200, borderRadius: 100,
    backgroundColor: '#E8F5E9', opacity: 0.6,
  },
  scrollContent: { paddingHorizontal: 28, paddingBottom: 40 },
  backBtn: { marginTop: 60, alignSelf: 'flex-start' },
  backBtnText: { color: THEME.textSecondary, fontSize: 15, fontWeight: '500' },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 16,
    gap: 8,
  },
  roleEmoji: { fontSize: 18 },
  roleLabel: { fontSize: 14, fontWeight: '700' },
  header: { marginTop: 20, marginBottom: 36 },
  title: { fontSize: 34, fontWeight: '800', color: THEME.textMain, letterSpacing: -0.5 },
  subtitle: { fontSize: 16, color: THEME.textSecondary, marginTop: 8 },
  form: { flex: 1 },
  input: {
    marginBottom: 16, backgroundColor: THEME.surface,
    borderTopLeftRadius: 16, borderTopRightRadius: 16,
    borderRadius: 16, height: 62,
  },
  forgotPasswordContainer: { alignSelf: 'flex-end', marginBottom: 24 },
  forgotPasswordText: { color: THEME.primary, fontWeight: '600', fontSize: 14 },
  loginButton: {
    borderRadius: 16, backgroundColor: THEME.primary, elevation: 4,
    shadowColor: THEME.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 5,
  },
  buttonContent: { height: 56 },
  loginButtonLabel: { fontSize: 18, fontWeight: 'bold', textTransform: 'none' },
  registerContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  noAccountText: { color: THEME.textSecondary, fontSize: 15 },
  registerLink: { color: THEME.primary, fontWeight: '700', fontSize: 15 },
  snackbar: { backgroundColor: '#333', borderRadius: 10 },
});

export default LoginScreen;

// import React, { useState } from 'react';
// import {
//   View,
//   StyleSheet,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   Text,
// } from 'react-native';
// import { TextInput, Button, Snackbar } from 'react-native-paper';
// import { useDispatch } from 'react-redux';
// import { loginSuccess } from '../../redux/slices/authSlice';
// import { COLORS, SIZES } from '../../constants/theme';
// import { storageService, STORAGE_KEYS } from '../../utils/storage';

// const LoginScreen = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [snackbarVisible, setSnackbarVisible] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');

//   const handleLogin = async () => {
//     if (!email || !password) {
//       showSnackbar('Please fill in all fields');
//       return;
//     }

//     setLoading(true);

//     // Simulate API call
//     setTimeout(async () => {
//       // Mock authentication - replace with actual API call
//       const mockUser = {
//         id: '123',
//         name: 'John Doe',
//         email: email,
//       };
//       const mockToken = 'mock-jwt-token-123';

//       // Save to storage
//       await storageService.setItem(STORAGE_KEYS.USER_DATA, mockUser);
//       await storageService.setItem(STORAGE_KEYS.AUTH_TOKEN, mockToken);

//       // Navigate to role selection
//       setLoading(false);
//       navigation.replace('RoleSelection');
//     }, 1500);
//   };

//   const showSnackbar = (message) => {
//     setSnackbarMessage(message);
//     setSnackbarVisible(true);
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         <View style={styles.header}>
//           <Text style={styles.title}>Welcome Back</Text>
//           <Text style={styles.subtitle}>Sign in to continue</Text>
//         </View>

//         <View style={styles.form}>
//           <TextInput
//             label="Email"
//             value={email}
//             onChangeText={setEmail}
//             mode="outlined"
//             keyboardType="email-address"
//             autoCapitalize="none"
//             style={styles.input}
//             left={<TextInput.Icon icon="email" />}
//           />

//           <TextInput
//             label="Password"
//             value={password}
//             onChangeText={setPassword}
//             mode="outlined"
//             secureTextEntry={!showPassword}
//             style={styles.input}
//             left={<TextInput.Icon icon="lock" />}
//             right={
//               <TextInput.Icon
//                 icon={showPassword ? 'eye-off' : 'eye'}
//                 onPress={() => setShowPassword(!showPassword)}
//               />
//             }
//           />

//           <Button
//             mode="text"
//             onPress={() => {}}
//             style={styles.forgotPassword}
//             labelStyle={styles.forgotPasswordText}
//           >
//             Forgot Password?
//           </Button>

//           <Button
//             mode="contained"
//             onPress={handleLogin}
//             loading={loading}
//             disabled={loading}
//             style={styles.loginButton}
//             labelStyle={styles.loginButtonText}
//           >
//             Login
//           </Button>

//           <View style={styles.registerContainer}>
//             <Text style={styles.registerText}>Don't have an account? </Text>
//             <Button
//               mode="text"
//               onPress={() => navigation.navigate('Register')}
//               labelStyle={styles.registerLink}
//               compact
//             >
//               Register
//             </Button>
//           </View>

//           <Button
//             mode="outlined"
//             onPress={() => navigation.replace('RoleSelection')}
//             style={styles.guestButton}
//             labelStyle={styles.guestButtonText}
//           >
//             Continue as Guest
//           </Button>
//         </View>
//       </ScrollView>

//       <Snackbar
//         visible={snackbarVisible}
//         onDismiss={() => setSnackbarVisible(false)}
//         duration={3000}
//       >
//         {snackbarMessage}
//       </Snackbar>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//   },
//   scrollContent: {
//     flexGrow: 1,
//     padding: 20,
//   },
//   header: {
//     marginTop: 60,
//     marginBottom: 40,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: COLORS.primary,
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: COLORS.gray,
//   },
//   form: {
//     flex: 1,
//   },
//   input: {
//     marginBottom: 15,
//   },
//   forgotPassword: {
//     alignSelf: 'flex-end',
//     marginBottom: 20,
//   },
//   forgotPasswordText: {
//     color: COLORS.primary,
//   },
//   loginButton: {
//     paddingVertical: 8,
//     marginBottom: 20,
//   },
//   loginButtonText: {
//     fontSize: 16,
//   },
//   registerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   registerText: {
//     color: COLORS.gray,
//     fontSize: 14,
//   },
//   registerLink: {
//     color: COLORS.primary,
//     fontSize: 14,
//   },
//   guestButton: {
//     borderColor: COLORS.gray,
//   },
//   guestButtonText: {
//     color: COLORS.gray,
//   },
// });

// export default LoginScreen;