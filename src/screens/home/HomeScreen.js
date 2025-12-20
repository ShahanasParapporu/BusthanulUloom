// // src/screens/home/HomeScreen.js

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Dimensions,
  Alert, 
} from 'react-native';
import { Card, Avatar, IconButton, Badge, List, Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

// 1. DATA CONFIGURATION (Move this to a separate constants file later)
//In your DASHBOARD_FEATURES array inside HomeScreen.js, ensure the screen names match exactly what you named them in the Stack
const DASHBOARD_FEATURES = [
  { 
    id: 10, 
    title: 'Bustanul Uloom Dars', 
    icon: 'book-open-page-variant', 
    color: '#2E7D32', 
    screen: 'DarsDetails' 
  },
  { 
    id: 11, 
    title: 'Exam Schedule', 
    icon: 'file-document-edit-outline', 
    color: '#1565C0', 
    screen: 'ExamSchedule' 
  },
  { 
    id: 12, 
    title: 'BUSA (Association)', 
    icon: 'account-group', 
    color: '#E65100', 
    screen: 'BUSA' 
  },
  { 
    id: 13, 
    title: 'Official Holidays', 
    icon: 'calendar-star', 
    color: '#C62828', 
    screen: 'Holidays' 
  },
  { 
    id: 14, 
    title: 'A Day in Dars', 
    icon: 'clock-check-outline', 
    color: '#00838F', 
    screen: 'DayInDars' 
  },
  { 
    id: 15, 
    title: 'Facilities', 
    icon: 'office-building', 
    color: '#4527A0', 
    screen: 'Facilities' 
  },
  { 
    id: 16, 
    title: 'Gallery & Videos', 
    icon: 'play-box-multiple-outline', 
    color: '#AD1457', 
    screen: 'Gallery' 
  },
  { 
    id: 17, 
    title: 'Notifications', 
    icon: 'bell-badge-outline', 
    color: '#5D4037', 
    screen: 'Notifications' 
  },
];

const COLLEGE_STATS = {
  established: '1995',
  location: 'Malappuram, Kerala',
  affiliated: 'Calicut University',
  totalStudents: '1200+',
};

const HomeScreen = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);
  const [aboutExpanded, setAboutExpanded] = useState(false);

  const handleLogoutPress = () => {
    Alert.alert(
      "Switch Role / Logout",
      "Are you sure you want to exit? You will need to select your role again.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Yes, Exit", 
          onPress: () => {
            // Reaches RootNavigator and resets to Auth flow
            navigation.getParent()?.reset({
              index: 0,
              routes: [{ name: 'Auth' }],
            });
          },
          style: "destructive" 
        }
      ]
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View style={styles.logoRow}>
          <Avatar.Image size={40} source={{ uri: 'https://via.placeholder.com/100' }} style={styles.logo} />
          <View>
            <Text style={styles.collegeName}>Busthanul Uloom</Text>
            <Text style={styles.collegeSub}>Arabic College</Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <View>
            <IconButton 
                icon="bell-outline" 
                iconColor="#FFF" 
                size={24} 
                onPress={() => navigation.navigate('Notifications')} 
            />
            <Badge style={styles.badge} size={16}>3</Badge>
          </View>
          
          {/* UPDATED: Profile icon replaced or supplemented with Logout */}
          <IconButton 
            icon="logout" // Changed icon to match your old screen's exit intent
            iconColor="#FFF" 
            size={24} 
            onPress={handleLogoutPress} 
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E7D32" />
      {renderHeader()}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* 2. Welcome Banner */}
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

        {/* 3. About Section (Collapsible) */}
        <Card style={styles.aboutCard}>
          <List.Accordion
            title="About the Institution"
            left={props => <List.Icon {...props} icon="information-outline" color="#2E7D32" />}
            expanded={aboutExpanded}
            onPress={() => setAboutExpanded(!aboutExpanded)}
            titleStyle={styles.aboutTitle}
          >
            <View style={styles.aboutContent}>
              <View style={styles.statsGrid}>
                <StatItem label="Est." value="1995" />
                <StatItem label="Affiliated" value="Calicut" />
                <StatItem label="Students" value="1200+" />
              </View>
              <Text style={styles.locationText}>
                <Icon name="map-marker" color="#666" /> Malappuram, Kerala
              </Text>
              <Button 
                mode="contained" 
                style={styles.teachersBtn}
                onPress={() => navigation.navigate('TeachersList')}
              >
                View Our Teachers
              </Button>
            </View>
          </List.Accordion>
        </Card>

        {/* 4. Feature Grid */}
        <View style={styles.gridContainer}>
          <Text style={styles.sectionTitle}>Campus Services</Text>
          <View style={styles.grid}>
            {DASHBOARD_FEATURES.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.gridItem}
                onPress={() => navigation.navigate(item.screen)}
              >
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

// Helper Component for Stats
const StatItem = ({ label, value }) => (
  <View style={styles.statBox}>
    <Text style={styles.statVal}>{value}</Text>
    <Text style={styles.statLab}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { backgroundColor: '#2E7D32', paddingTop: 5, paddingBottom: 10, paddingHorizontal: 20 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logo: { backgroundColor: '#FFF', marginRight: 10 },
  collegeName: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  collegeSub: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
  headerActions: { flexDirection: 'row', alignItems: 'center' },
  badge: { position: 'absolute', top: 5, right: 5 },
  
  scrollContent: {paddingHorizontal: 20,   paddingTop:0,    marginTop: 0,
    paddingBottom: 20 },
  banner: { width: '100%', height: 160, justifyContent: 'flex-end', marginTop: -45, marginBottom: 20 },
  bannerOverlay: { padding: 20, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 20 },
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
    width: (width - 60) / 2, 
    backgroundColor: '#FFF', 
    borderRadius: 20, 
    padding: 20, 
    alignItems: 'center', 
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  iconCircle: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  gridText: { fontSize: 14, fontWeight: '600', color: '#444', textAlign: 'center' },
});

export default HomeScreen;

