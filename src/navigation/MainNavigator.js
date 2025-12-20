// src/navigation/MainNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-paper';
import StudentPortalScreen from '../screens/student/StudentPortalScreen';
import ParentPortalScreen from '../screens/parent/ParentPortalScreen';
import { COLORS, USER_ROLES } from '../constants/theme';
import { logout } from '../redux/slices/authSlice';
import { storageService } from '../utils/storage';
import HomeStackScreen from './home/HomeStackScreen';

const Tab = createBottomTabNavigator();

const MainNavigator = ({ navigation }) => {
  const { role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await storageService.clear();
    dispatch(logout());
    navigation.replace('Auth');
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'StudentPortal') {
            iconName = focused ? 'school' : 'school-outline';
          } else if (route.name === 'ParentPortal') {
            iconName = focused ? 'account-group' : 'account-group-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.white,
        headerRight: () => (
          <Button
            icon="logout"
            textColor={COLORS.white}
            onPress={handleLogout}
            style={{ marginRight: 10 }}
          >
            Logout
          </Button>
        ),
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
        }}
      />

      {(role === USER_ROLES.STUDENT || role === USER_ROLES.ADMIN) && (
        <Tab.Screen
          name="StudentPortal"
          component={StudentPortalScreen}
          options={{
            tabBarLabel: 'Students',
            title: 'Student Portal',
          }}
        />
      )}

      {(role === USER_ROLES.PARENT || role === USER_ROLES.ADMIN) && (
        <Tab.Screen
          name="ParentPortal"
          component={ParentPortalScreen}
          options={{
            tabBarLabel: 'Parents',
            title: 'Parent Portal',
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export default MainNavigator;