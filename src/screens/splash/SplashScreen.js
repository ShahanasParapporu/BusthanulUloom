// src/screens/splash/SplashScreen.js
// SplashScreen only ever navigates to Auth. The RootNavigator handles whether
// to show Auth or Main based on isAuthenticated in Redux.
// On app start, if the user was previously logged in, restore their session
// from storage and dispatch loginSuccess — RootNavigator will show Main directly.

import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { COLORS } from '../../constants/theme';
import { storageService, STORAGE_KEYS } from '../../utils/storage';
import { loginSuccess } from '../../redux/slices/authSlice';

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const bootstrap = async () => {
      // Try to restore a previous session from storage
      const token    = await storageService.getItem(STORAGE_KEYS.AUTH_TOKEN);
      const userData = await storageService.getItem(STORAGE_KEYS.USER_DATA);
      const role     = await storageService.getItem(STORAGE_KEYS.USER_ROLE);

      if (token && userData && role) {
        // Restore session → RootNavigator will show Main automatically
        dispatch(loginSuccess({ user: userData, role, token }));
      } else {
        // No session → navigate to Auth flow
        navigation.replace('Auth');
      }
    };

    const timer = setTimeout(bootstrap, 1500); // Show splash for 1.5s
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Busthanul Uloom</Text>
          <Text style={styles.tagline}>Knowledge Garden</Text>
        </View>
        <ActivityIndicator animating color={COLORS.primary} size="large" style={styles.loader} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logoContainer: { alignItems: 'center', marginBottom: 50 },
  logoText: { fontSize: 32, fontWeight: 'bold', color: COLORS.primary, marginBottom: 10 },
  tagline: { fontSize: 16, color: COLORS.gray, fontStyle: 'italic' },
  loader: { marginTop: 20 },
});

export default SplashScreen;