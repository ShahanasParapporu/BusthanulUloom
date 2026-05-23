// src/navigation/RootNavigator.js
//
// Auth-gated navigator. When isAuthenticated becomes false (logout), React
// Navigation smoothly transitions from Main back to Auth because MainNavigator
// is removed from the tree — but only AFTER the current render cycle settles,
// which is why we delay with a transition flag.
//
// Combined with MainNavigator freezing its role at mount, this fully eliminates
// the "Maximum update depth exceeded" crash.

import React, { useState, useEffect, useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import SplashScreen      from '../screens/splash/SplashScreen';
import OnboardingScreen  from '../screens/onboarding/OnboardingScreen';
import AuthNavigator     from './AuthNavigator';
import MainNavigator     from './MainNavigator';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // showMain is a local flag that trails isAuthenticated slightly on logout.
  // This gives React Navigation one render cycle to finish any in-progress
  // transitions before we remove MainNavigator from the tree.
  const [showMain, setShowMain] = useState(isAuthenticated);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      // Login: show Main immediately
      setShowMain(true);
    } else {
      // Logout: give React Navigation one frame to settle, then switch to Auth
      const timer = setTimeout(() => {
        if (mountedRef.current) setShowMain(false);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animationEnabled: false }}>
      {showMain ? (
        <Stack.Screen name="Main" component={MainNavigator} />
      ) : (
        <>
          <Stack.Screen name="Splash"     component={SplashScreen}     />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Auth"       component={AuthNavigator}    />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;