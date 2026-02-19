// src/navigation/MainNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector, useDispatch } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-paper';
import StudentPortalScreen from '../screens/student/StudentPortalScreen';
import ParentPortalScreen from '../screens/parent/ParentPortalScreen';
import AdminPanelScreen from '../screens/admin/AdminPanelScreen';
import { COLORS, USER_ROLES } from '../constants/theme';
import { logout } from '../redux/slices/authSlice';
import { storageService } from '../utils/storage';
import HomeStackScreen from './home/HomeStackScreen';

const Tab = createBottomTabNavigator();

const MainNavigator = ({ navigation }) => {
  const { role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const performLogout = async () => {
    await storageService.clearAuthOnly();
    dispatch(logout());
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Auth',
            state: {
              index: 0,
              routes: [{ name: 'RoleSelection' }],
            },
          },
        ],
      })
    );
  };

  const handleLogout = () => {
    performLogout();
  };

  const isAdmin = role === USER_ROLES.ADMIN;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icons = {
            Home: focused ? 'home' : 'home-outline',
            StudentPortal: focused ? 'school' : 'school-outline',
            ParentPortal: focused ? 'account-group' : 'account-group-outline',
            AdminPanel: focused ? 'shield-account' : 'shield-account-outline',
          };
          return <Icon name={icons[route.name] || 'circle'} size={size} color={color} />;
        },
        tabBarActiveTintColor: isAdmin ? '#6A1B9A' : COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        headerStyle: { backgroundColor: isAdmin ? '#6A1B9A' : COLORS.primary },
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
      {/* Home shown for Guest, Student, Parent — not Admin */}
      {!isAdmin && (
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{ tabBarLabel: 'Home', headerShown: false }}
        />
      )}

      {(role === USER_ROLES.STUDENT || isAdmin) && (
        <Tab.Screen
          name="StudentPortal"
          component={StudentPortalScreen}
          options={{ tabBarLabel: 'Students', title: 'Student Portal' }}
        />
      )}

      {(role === USER_ROLES.PARENT || isAdmin) && (
        <Tab.Screen
          name="ParentPortal"
          component={ParentPortalScreen}
          options={{ tabBarLabel: 'Parents', title: 'Parent Portal' }}
        />
      )}

      {isAdmin && (
        <Tab.Screen
          name="AdminPanel"
          component={AdminPanelScreen}
          options={{
            tabBarLabel: 'Admin',
            title: 'Admin Panel',
            headerShown: false,
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export default MainNavigator;