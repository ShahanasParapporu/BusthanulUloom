// src/screens/auth/LoginScreen.js
// After successful login, just dispatch loginSuccess — RootNavigator reacts
// and shows the Main screen automatically. No navigation.replace('Main') needed.

import React, { useState } from 'react';
import {
  View, StyleSheet, ScrollView, KeyboardAvoidingView,
  Platform, Text, TouchableOpacity, StatusBar,
} from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/slices/authSlice';
import { storageService, STORAGE_KEYS } from '../../utils/storage';
import { USER_ROLES } from '../../constants/theme';
import { useLanguage } from '../../i18n/LanguageContext';
import LanguageToggle from '../../components/LanguageToggle'

const THEME = {
  primary: '#2E7D32',
  surface: '#F8F9FA',
  textMain: '#1A1A1A',
  textSecondary: '#757575',
  white: '#FFFFFF',
};

const ROLE_LABELS = {
  [USER_ROLES.STUDENT]: { label: 'Student', icon: '🎓', color: '#2E7D32' },
  [USER_ROLES.PARENT]:  { label: 'Parent',  icon: '👨‍👩‍👧', color: '#1565C0' },
};

const LoginScreen = ({ navigation, route }) => {
  const { t } = useLanguage();
  const dispatch = useDispatch();
  const role     = route?.params?.role || USER_ROLES.STUDENT;
  const roleInfo = ROLE_LABELS[role] || ROLE_LABELS[USER_ROLES.STUDENT];

  const [email, setEmail]                   = useState('');
  const [password, setPassword]             = useState('');
  const [showPassword, setShowPassword]     = useState(false);
  const [loading, setLoading]               = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setSnackbarMessage('login.fillCredentials');
      setSnackbarVisible(true);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

    const userData = { name: email.split('@')[0] || 'User', email };
    await storageService.setItem(STORAGE_KEYS.USER_DATA, userData);
    await storageService.setItem(STORAGE_KEYS.AUTH_TOKEN, 'mock-token');
    await storageService.setItem(STORAGE_KEYS.USER_ROLE, role);

    // Dispatching loginSuccess sets isAuthenticated=true in Redux.
    // RootNavigator reacts and mounts Main automatically — no replace() needed.
    dispatch(loginSuccess({ user: userData, role, token: 'mock-token' }));
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerAccent} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>← Change Role</Text>
        </TouchableOpacity> */}

<View style={styles.topRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backBtnText}>{t('login.changeRole')}</Text>
          </TouchableOpacity>
          <LanguageToggle />
        </View>

        {/* <View style={[styles.roleBadge, { backgroundColor: roleInfo.color + '18' }]}>
          <Text style={styles.roleEmoji}>{roleInfo.icon}</Text>
          <Text style={[styles.roleLabel, { color: roleInfo.color }]}>
            Signing in as {roleInfo.label}
          </Text>
        </View> */}

<View style={[styles.roleBadge, { backgroundColor: roleInfo.color + '18' }]}>
          <Text style={styles.roleEmoji}>{roleInfo.icon}</Text>
          <Text style={[styles.roleLabel, { color: roleInfo.color }]}>
            {t('login.signingAs').replace('{role}', t(`roleSelection.roles.${role}.title`))}
          </Text>
        </View>

        {/* <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Sign in to access your {roleInfo.label.toLowerCase()} account
          </Text>
        </View> */}

<View style={styles.header}>
          <Text style={styles.title}>{t('login.title')}</Text>
          <Text style={styles.subtitle}>
            {t('login.subtitle').replace('{role}', t(`roleSelection.roles.${role}.title`).toLowerCase())}
          </Text>
        </View>

        <TextInput
          label={t('login.email')}//"Email Address"
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
          label={t('login.password')}//"Password"
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
          <Text style={styles.forgotPasswordText}>{t('login.forgotPassword')}</Text>
        </TouchableOpacity>

        <Button
          mode="contained"
          onPress={handleLogin}
          loading={loading}
          style={styles.loginButton}
          contentStyle={styles.buttonContent}
          labelStyle={styles.loginButtonLabel}
        >
          {t('login.loginBtn')}
        </Button>

        <View style={styles.registerContainer}>
          <Text style={styles.noAccountText}>{t('login.noAccount')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>{t('login.createAccount')}</Text>
          </TouchableOpacity>
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
    flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start',
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, marginTop: 16, gap: 8,
  },
  roleEmoji: { fontSize: 18 },
  roleLabel: { fontSize: 14, fontWeight: '700' },
  header: { marginTop: 20, marginBottom: 36 },
  title: { fontSize: 34, fontWeight: '800', color: THEME.textMain, letterSpacing: -0.5 },
  subtitle: { fontSize: 16, color: THEME.textSecondary, marginTop: 8 },
  input: {
    marginBottom: 16, backgroundColor: THEME.surface,
    borderTopLeftRadius: 16, borderTopRightRadius: 16, borderRadius: 16, height: 62,
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