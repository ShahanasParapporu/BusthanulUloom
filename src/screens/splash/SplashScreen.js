// src/screens/splash/SplashScreen.js
import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { COLORS, SIZES } from '../../constants/theme';
import { storageService, STORAGE_KEYS } from '../../utils/storage';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = () => {
    setTimeout(() => {
      navigation.replace('Auth');
    }, 2500);
  };
  

  // const checkOnboardingStatus = async () => {
  //   setTimeout(async () => {
  //     const onboardingCompleted = await storageService.getItem(
  //       STORAGE_KEYS.ONBOARDING_COMPLETED
  //     );
      
  //     if (onboardingCompleted) {
  //       navigation.replace('Auth');
  //     } else {
  //       navigation.replace('Onboarding');
  //     }
  //   }, 2500);
  // };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Busthanul Uloom</Text>
          <Text style={styles.tagline}>Knowledge Garden</Text>
        </View>
        <ActivityIndicator
          animating={true}
          color={COLORS.primary}
          size="large"
          style={styles.loader}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: COLORS.gray,
    fontStyle: 'italic',
  },
  loader: {
    marginTop: 20,
  },
});

export default SplashScreen;