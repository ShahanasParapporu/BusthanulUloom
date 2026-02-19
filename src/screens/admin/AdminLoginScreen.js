// src/screens/admin/AdminLoginScreen.js
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/slices/authSlice';
import { storageService, STORAGE_KEYS } from '../../utils/storage';
import { USER_ROLES } from '../../constants/theme';

// ─── Hardcoded admin credentials (replace with API call in production) ───────
const ADMIN_CREDENTIALS = {
  username: 'admin@busthanululoom.edu',
  password: 'BU@Admin2025',
};

const THEME = {
  primary: '#6A1B9A',     // Purple for admin
  primaryLight: '#F3E5F5',
  surface: '#F8F9FA',
  textMain: '#1A1A1A',
  textSecondary: '#757575',
  white: '#FFFFFF',
};

const AdminLoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [attempts, setAttempts] = useState(0);

  const showError = (msg) => {
    setSnackbarMessage(msg);
    setSnackbarVisible(true);
  };

  const handleLogin = async () => {
    // if (!username.trim() || !password) {
    //   showError('Please enter your credentials.');
    //   return;
    // }

    // if (attempts >= 5) {
    //   showError('Too many failed attempts. Please contact IT support.');
    //   return;
    // }

    // setLoading(true);
    // // Simulate network delay
    // await new Promise((r) => setTimeout(r, 800));

    // if (
    //   username.trim().toLowerCase() === ADMIN_CREDENTIALS.username.toLowerCase() &&
    //   password === ADMIN_CREDENTIALS.password
    // ) {
      const adminUser = { name: 'Administrator', email: username.trim() };
      await storageService.setItem(STORAGE_KEYS.USER_DATA, adminUser);
      await storageService.setItem(STORAGE_KEYS.AUTH_TOKEN, 'admin-token');
      await storageService.setItem(STORAGE_KEYS.USER_ROLE, USER_ROLES.ADMIN);

      dispatch(
        loginSuccess({
          user: adminUser,
          role: USER_ROLES.ADMIN,
          token: 'admin-token',
        })
      );
      navigation.replace('Main');
    // } else {
    //   setAttempts((prev) => prev + 1);
    //   showError(`Invalid credentials. ${5 - attempts - 1} attempt(s) remaining.`);
    // }

    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" />

      {/* Decorative top accent */}
      <View style={styles.topAccent} />
      <View style={styles.topAccent2} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Back button */}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>← Back</Text>
        </TouchableOpacity>

        {/* Shield icon header */}
        <View style={styles.iconWrapper}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconEmoji}>🛡️</Text>
          </View>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Admin Access</Text>
          <Text style={styles.subtitle}>Authorised personnel only</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            label="Admin Username"
            value={username}
            onChangeText={setUsername}
            mode="flat"
            underlineColor="transparent"
            activeUnderlineColor={THEME.primary}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
            left={<TextInput.Icon icon="account-circle-outline" color={THEME.primary} />}
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

          {attempts > 0 && (
            <View style={styles.warningBox}>
              <Text style={styles.warningText}>
                ⚠️ {attempts} failed attempt{attempts > 1 ? 's' : ''}. Account locks after 5.
              </Text>
            </View>
          )}

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            disabled={loading || attempts >= 5}
            style={styles.loginButton}
            contentStyle={styles.buttonContent}
            labelStyle={styles.loginButtonLabel}
          >
            Sign In as Admin
          </Button>

          <Text style={styles.securityNote}>
            🔒 This area is monitored. Unauthorised access attempts are logged.
          </Text>
        </View>
      </ScrollView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3500}
        style={styles.snackbar}
        action={{ label: 'OK', onPress: () => setSnackbarVisible(false) }}
      >
        {snackbarMessage}
      </Snackbar>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },
  topAccent: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: THEME.primaryLight,
    opacity: 0.6,
  },
  topAccent2: {
    position: 'absolute',
    top: -40,
    left: -60,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: THEME.primaryLight,
    opacity: 0.3,
  },
  scrollContent: { paddingHorizontal: 28, paddingBottom: 40 },
  backBtn: { marginTop: 60, alignSelf: 'flex-start' },
  backBtnText: { color: THEME.textSecondary, fontSize: 15, fontWeight: '500' },
  iconWrapper: { alignItems: 'center', marginTop: 20, marginBottom: 10 },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: THEME.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconEmoji: { fontSize: 44 },
  header: { alignItems: 'center', marginBottom: 40 },
  title: { fontSize: 30, fontWeight: '800', color: THEME.primary, letterSpacing: -0.5 },
  subtitle: { fontSize: 15, color: THEME.textSecondary, marginTop: 6 },
  form: { flex: 1 },
  input: {
    marginBottom: 16,
    backgroundColor: THEME.surface,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderRadius: 16,
    height: 62,
  },
  warningBox: {
    backgroundColor: '#FFF3E0',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#FF8F00',
  },
  warningText: { color: '#E65100', fontSize: 13 },
  loginButton: {
    marginTop: 8,
    borderRadius: 16,
    backgroundColor: THEME.primary,
    elevation: 4,
    shadowColor: THEME.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonContent: { height: 56 },
  loginButtonLabel: { fontSize: 18, fontWeight: 'bold', textTransform: 'none' },
  securityNote: {
    textAlign: 'center',
    color: '#9E9E9E',
    fontSize: 12,
    marginTop: 24,
    lineHeight: 18,
  },
  snackbar: { backgroundColor: '#333', borderRadius: 10 },
});

export default AdminLoginScreen;