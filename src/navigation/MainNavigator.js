// src/navigation/MainNavigator.js
//
// CRITICAL: Role is captured via useRef at mount time and NEVER re-read from
// Redux. This prevents React Navigation from crashing when dispatch(logout())
// changes `role` to GUEST while the tab navigator is still mounted.
//
// The RootNavigator unmounts MainNavigator when isAuthenticated becomes false,
// so there is no need for MainNavigator to react to role changes at all.

import React, { useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeStackScreen     from './home/HomeStackScreen';
import StudentPortalScreen from '../screens/student/StudentPortalScreen';
import ParentPortalScreen  from '../screens/parent/ParentPortalScreen';
import AdminPanelScreen    from '../screens/admin/AdminPanelScreen';
import { COLORS, USER_ROLES } from '../constants/theme';

const Tab = createBottomTabNavigator();

const ICONS = {
  Home:          { focused: 'home',           blur: 'home-outline'           },
  StudentPortal: { focused: 'school',         blur: 'school-outline'         },
  ParentPortal:  { focused: 'account-group',  blur: 'account-group-outline'  },
  AdminPanel:    { focused: 'shield-account', blur: 'shield-account-outline' },
};

const MainNavigator = () => {
  // Read role from Redux ONCE at mount and freeze it.
  // useRef ensures re-renders (from logout dispatch) never alter the tab structure.
  const { role: currentRole } = useSelector((state) => state.auth);
  const frozenRole = useRef(currentRole).current;

  const isAdmin   = frozenRole === USER_ROLES.ADMIN;
  const isStudent = frozenRole === USER_ROLES.STUDENT;
  const isParent  = frozenRole === USER_ROLES.PARENT;
  const accentColor = isAdmin ? '#6A1B9A' : COLORS.primary;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const icon = ICONS[route.name];
          return (
            <Icon
              name={icon ? (focused ? icon.focused : icon.blur) : 'circle'}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor:   accentColor,
        tabBarInactiveTintColor: COLORS.gray,
      })}
    >
      {!isAdmin && (
        <Tab.Screen name="Home" component={HomeStackScreen} options={{ tabBarLabel: 'Home' }} />
      )}
      {isStudent && (
        <Tab.Screen name="StudentPortal" component={StudentPortalScreen} options={{ tabBarLabel: 'Portal' }} />
      )}
      {isParent && (
        <Tab.Screen name="ParentPortal" component={ParentPortalScreen} options={{ tabBarLabel: 'Portal' }} />
      )}
      {isAdmin && (
        <Tab.Screen name="AdminPanel" component={AdminPanelScreen} options={{ tabBarLabel: 'Admin' }} />
      )}
    </Tab.Navigator>
  );
};

export default MainNavigator;