import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// Corrected: Go up two levels to find constants
import { COLORS } from '../../constants/theme'; 

// Corrected: Go up two levels to find screens
import HomeScreen from '../../screens/home/HomeScreen';
import TeachersListScreen from '../../screens/features/TeachersListScreen';
import DarsDetailsScreen from '../../screens/features/DarsDetailsScreen';
import ExamScheduleScreen from '../../screens/features/ExamScheduleScreen';
import BUSAScreen from '../../screens/features/BUSAScreen';
import HolidaysScreen from '../../screens/features/HolidaysScreen';
import DayInDarsScreen from '../../screens/features/DayInDarsScreen';
import FacilitiesScreen from '../../screens/features/FacilitiesScreen';
import GalleryScreen from '../../screens/features/GalleryScreen';
import NotificationsScreen from '../../screens/features/NotificationsScreen';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
    return (
      <HomeStack.Navigator 
        initialRouteName="HomeMain"
        screenOptions={{
          headerStyle: { 
            backgroundColor: COLORS.primary,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: { fontWeight: 'bold' },
          headerBackTitleVisible: false,
        }}
      >
        <HomeStack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
        <HomeStack.Screen name="TeachersList" component={TeachersListScreen} options={{ title: 'Our Teachers' }} />
        <HomeStack.Screen name="DarsDetails" component={DarsDetailsScreen} options={{ title: 'Busthanul Uloom Dars' }} />
        <HomeStack.Screen name="ExamSchedule" component={ExamScheduleScreen} options={{ title: 'Examinations' }} />
        <HomeStack.Screen name="BUSA" component={BUSAScreen} options={{ title: 'BUSA' }} />
        <HomeStack.Screen name="Holidays" component={HolidaysScreen} options={{ title: 'Official Holidays' }} />
        <HomeStack.Screen name="DayInDars" component={DayInDarsScreen} options={{ title: 'A Day in Dars' }} />
        <HomeStack.Screen name="Facilities" component={FacilitiesScreen} options={{ title: 'Campus Facilities' }} />
        <HomeStack.Screen name="Gallery" component={GalleryScreen} options={{ title: 'Gallery' }} />
        <HomeStack.Screen name="Notifications" component={NotificationsScreen} options={{ title: 'Notifications' }} />
      </HomeStack.Navigator>
    );
  };

export default HomeStackScreen;