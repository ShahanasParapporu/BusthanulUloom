// src/screens/home/HomeScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import {
  View, StyleSheet, ScrollView, Text, TouchableOpacity,
  StatusBar, ImageBackground, Dimensions, Alert,
} from 'react-native';
import { Card, List, Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { storageService } from '../../utils/storage';
import { USER_ROLES } from '../../constants/theme';
import AppHeader from '../../components/AppHeader';
import useLogout from '../../hooks/useLogout';

// ─── Inline sub-screen imports ────────────────────────────────────────────────
import TeachersListScreen from '../features/TeachersListScreen';
import DarsDetailsScreen from '../features/DarsDetailsScreen';
import ExamScheduleScreen from '../features/ExamScheduleScreen';
import BUSAScreen from '../features/BUSAScreen';
import HolidaysScreen from '../features/HolidaysScreen';
import DayInDarsScreen from '../features/DayInDarsScreen';
import FacilitiesScreen from '../features/FacilitiesScreen';
import GalleryScreen from '../features/GalleryScreen';
import NotificationsScreen from '../features/NotificationsScreen';

const { width } = Dimensions.get('window');
const ADMIN_STATS_KEY = 'admin_college_stats';
const DEFAULT_STATS = {
  established: '1995', affiliation: 'Calicut',
  students: '1200+', location: 'Malappuram, Kerala',
};

const SUB_SCREENS = {
  TeachersList:  { component: TeachersListScreen,  title: 'Our Teachers' },
  DarsDetails:   { component: DarsDetailsScreen,   title: 'Busthanul Uloom Dars' },
  ExamSchedule:  { component: ExamScheduleScreen,  title: 'Examinations' },
  BUSA:          { component: BUSAScreen,           title: 'BUSA' },
  Holidays:      { component: HolidaysScreen,       title: 'Official Holidays' },
  DayInDars:     { component: DayInDarsScreen,      title: 'A Day in Dars' },
  Facilities:    { component: FacilitiesScreen,     title: 'Campus Facilities' },
  Gallery:       { component: GalleryScreen,        title: 'Gallery' },
  Notifications: { component: NotificationsScreen,  title: 'Notifications' },
};

const DASHBOARD_FEATURES = [
  { id: 10, title: 'Bustanul Uloom Dars',  icon: 'book-open-page-variant',     color: '#2E7D32', screen: 'DarsDetails'   },
  { id: 11, title: 'Exam Schedule',         icon: 'file-document-edit-outline', color: '#1565C0', screen: 'ExamSchedule'  },
  { id: 12, title: 'BUSA (Association)',    icon: 'account-group',              color: '#E65100', screen: 'BUSA'          },
  { id: 13, title: 'Official Holidays',     icon: 'calendar-star',              color: '#C62828', screen: 'Holidays'      },
  { id: 14, title: 'A Day in Dars',         icon: 'clock-check-outline',        color: '#00838F', screen: 'DayInDars'     },
  { id: 15, title: 'Facilities',            icon: 'office-building',            color: '#4527A0', screen: 'Facilities'    },
  { id: 16, title: 'Gallery & Videos',      icon: 'play-box-multiple-outline',  color: '#AD1457', screen: 'Gallery'       },
  { id: 17, title: 'Notifications',         icon: 'bell-badge-outline',         color: '#5D4037', screen: 'Notifications' },
];

const HomeScreen = ({ navigation }) => {
  const { user, role } = useSelector((state) => state.auth);
  const performLogout = useLogout();

  const [activePage, setActivePage]       = useState(null);
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [collegeStats, setCollegeStats]   = useState(DEFAULT_STATS);

  useEffect(() => {
    const load = async () => {
      const saved = await storageService.getItem(ADMIN_STATS_KEY);
      if (saved) setCollegeStats(saved);
    };
    load();
    const unsub = navigation.addListener('focus', load);
    return unsub;
  }, [navigation]);

  const openPage = useCallback((key) => setActivePage(key), []);
  const goBack   = useCallback(() => setActivePage(null), []);

  const handleLogout = () => {
    const isGuest = role === USER_ROLES.GUEST;
    if (isGuest) { performLogout(); return; }
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: performLogout },
    ]);
  };

  // Shared header props used on BOTH home feed and sub-pages
  const sharedHeaderProps = {
    role, user,
    onLogout: handleLogout,
    onNotification: () => openPage('Notifications'),
    notifCount: 3,
  };

  // ─── Sub-page: same AppHeader, back arrow, content swaps below ───────────────
  if (activePage && SUB_SCREENS[activePage]) {
    const { component: SubComponent, title } = SUB_SCREENS[activePage];
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#2E7D32" />
        <AppHeader {...sharedHeaderProps} showBack title={title} onBack={goBack} />
        <SubComponent navigation={navigation} />
      </View>
    );
  }

  // ─── Home feed ────────────────────────────────────────────────────────────────
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E7D32" />
      <AppHeader {...sharedHeaderProps} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Welcome Banner */}
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1590076215667-873917098492?q=80&w=1000&auto=format&fit=crop' }}
          style={styles.banner}
          imageStyle={{ borderRadius: 20 }}
        >
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerGreeting}>As-salamu alaykum,</Text>
            <Text style={styles.bannerName}>{user?.name || 'Guest User'}</Text>
          </View>
        </ImageBackground>

        {/* About Section */}
        <Card style={styles.aboutCard}>
          <List.Accordion
            title="About the Institution"
            left={(p) => <List.Icon {...p} icon="information-outline" color="#2E7D32" />}
            expanded={aboutExpanded}
            onPress={() => setAboutExpanded(!aboutExpanded)}
            titleStyle={styles.aboutTitle}
          >
            <View style={styles.aboutContent}>
              <View style={styles.statsGrid}>
                <StatItem label="Est." value={collegeStats.established} />
                <StatItem label="Affiliated" value={collegeStats.affiliation} />
                <StatItem label="Students" value={collegeStats.students} />
              </View>
              <Text style={styles.locationText}>📍 {collegeStats.location}</Text>
              <Button mode="contained" style={styles.teachersBtn} onPress={() => openPage('TeachersList')}>
                View Our Teachers
              </Button>
            </View>
          </List.Accordion>
        </Card>

        {/* Feature Grid */}
        <View style={styles.gridContainer}>
          <Text style={styles.sectionTitle}>Campus Services</Text>
          <View style={styles.grid}>
            {DASHBOARD_FEATURES.map((item) => (
              <TouchableOpacity key={item.id} style={styles.gridItem} onPress={() => openPage(item.screen)}>
                <View style={[styles.iconCircle, { backgroundColor: item.color + '15' }]}>
                  <Icon name={item.icon} size={30} color={item.color} />
                </View>
                <Text style={styles.gridText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const StatItem = ({ label, value }) => (
  <View style={styles.statBox}>
    <Text style={styles.statVal}>{value}</Text>
    <Text style={styles.statLab}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },
  banner: { width: '100%', height: 160, justifyContent: 'flex-end', marginBottom: 20 },
  bannerOverlay: { padding: 20, backgroundColor: 'rgba(0,0,0,0.35)', borderRadius: 20 },
  bannerGreeting: { color: '#EEE', fontSize: 14 },
  bannerName: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  aboutCard: { borderRadius: 15, backgroundColor: '#FFF', elevation: 2, marginBottom: 20 },
  aboutTitle: { fontWeight: 'bold', fontSize: 16 },
  aboutContent: { padding: 15, paddingTop: 0 },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  statBox: { alignItems: 'center', flex: 1 },
  statVal: { fontSize: 16, fontWeight: 'bold', color: '#2E7D32' },
  statLab: { fontSize: 11, color: '#777' },
  locationText: { textAlign: 'center', color: '#666', marginBottom: 15 },
  teachersBtn: { backgroundColor: '#2E7D32', borderRadius: 8 },
  gridContainer: { marginTop: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridItem: {
    width: (width - 60) / 2, backgroundColor: '#FFF', borderRadius: 20,
    padding: 20, alignItems: 'center', marginBottom: 15, elevation: 3,
  },
  iconCircle: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  gridText: { fontSize: 14, fontWeight: '600', color: '#444', textAlign: 'center' },
});

export default HomeScreen;