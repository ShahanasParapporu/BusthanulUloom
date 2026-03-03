// src/navigation/home/HomeStackScreen.js
// Sub-screens (DarsDetails, ExamSchedule, etc.) are now rendered INLINE inside
// HomeScreen using local state — no stack push needed. This file is kept minimal
// for future expansion (e.g. deep-linking) if needed.

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/home/HomeScreen';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="HomeMain"
      screenOptions={{ headerShown: false }}
    >
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;