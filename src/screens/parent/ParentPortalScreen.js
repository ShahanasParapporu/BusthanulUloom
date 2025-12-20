import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Text, Card, Avatar, ProgressBar, IconButton, Surface } from 'react-native-paper';
import { COLORS } from '../../constants/theme';

const { width } = Dimensions.get('window');

const CHILDREN_DATA = [
  {
    id: '1',
    name: 'Mohammed Rizwan',
    class: 'Grade 10 - B',
    attendance: 0.92,
    performance: 0.85,
    image: 'https://i.pravatar.cc/150?u=rizwan',
  },
  {
    id: '2',
    name: 'Aisha Fathima',
    class: 'Grade 7 - A',
    attendance: 0.98,
    performance: 0.91,
    image: 'https://i.pravatar.cc/150?u=aisha',
  },
];

const QUICK_ACTIONS = [
  { id: '1', title: 'Fee Payment', icon: 'cash-register', color: '#4CAF50' },
  { id: '2', title: 'Exam Results', icon: 'file-check-outline', color: '#2196F3' },
  { id: '3', title: 'Leave Note', icon: 'message-draw', color: '#FF9800' },
  { id: '4', title: 'Bus Tracking', icon: 'bus-clock', color: '#9C27B0' },
];

const ParentPortalScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 1. Header Section */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Parental Dashboard</Text>
        <Text style={styles.subText}>Monitor your children's progress</Text>
      </View>

      {/* 2. My Children Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Children</Text>
        {CHILDREN_DATA.map((child) => (
          <Card key={child.id} style={styles.childCard}>
            <Card.Content>
              <View style={styles.childHeader}>
                <Avatar.Image size={50} source={{ uri: child.image }} />
                <View style={styles.childInfo}>
                  <Text style={styles.childName}>{child.name}</Text>
                  <Text style={styles.childClass}>{child.class}</Text>
                </View>
                <IconButton icon="chevron-right" onPress={() => {}} />
              </View>

              <View style={styles.progressSection}>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Attendance</Text>
                  <Text style={styles.statValue}>{(child.attendance * 100).toFixed(0)}%</Text>
                </View>
                <ProgressBar progress={child.attendance} color={COLORS.primary} style={styles.bar} />

                <View style={[styles.statRow, { marginTop: 10 }]}>
                  <Text style={styles.statLabel}>Academic Performance</Text>
                  <Text style={styles.statValue}>{(child.performance * 100).toFixed(0)}%</Text>
                </View>
                <ProgressBar progress={child.performance} color="#FFC107" style={styles.bar} />
              </View>
            </Card.Content>
          </Card>
        ))}
      </View>

      {/* 3. Quick Actions Grid */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          {QUICK_ACTIONS.map((action) => (
            <TouchableOpacity key={action.id} style={styles.actionItem}>
              <Surface style={[styles.actionSurface, { backgroundColor: action.color + '15' }]}>
                <IconButton icon={action.icon} iconColor={action.color} size={30} />
              </Surface>
              <Text style={styles.actionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 4. Recent Activities */}
      <Card style={styles.activityCard}>
        <Card.Title title="Recent School Updates" titleStyle={styles.bold} />
        <Card.Content>
          <View style={styles.updateRow}>
            <Avatar.Icon size={30} icon="bell-ring" backgroundColor="#E8F5E9" color="#2E7D32" />
            <Text style={styles.updateText}>PTA Meeting scheduled for next Saturday at 10:00 AM.</Text>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { padding: 20, backgroundColor: COLORS.primary, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, paddingBottom: 40 },
  welcomeText: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  subText: { color: 'rgba(255,255,255,0.8)', fontSize: 14, marginTop: 5 },
  section: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  childCard: { marginBottom: 15, borderRadius: 15, elevation: 3 },
  childHeader: { flexDirection: 'row', alignItems: 'center' },
  childInfo: { flex: 1, marginLeft: 15 },
  childName: { fontSize: 16, fontWeight: 'bold' },
  childClass: { color: '#777', fontSize: 13 },
  progressSection: { marginTop: 15 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  statLabel: { fontSize: 12, color: '#666' },
  statValue: { fontSize: 12, fontWeight: 'bold', color: COLORS.primary },
  bar: { height: 6, borderRadius: 3 },
  actionGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  actionItem: { width: (width - 60) / 2, alignItems: 'center', marginBottom: 20 },
  actionSurface: { width: 70, height: 70, borderRadius: 20, justifyContent: 'center', alignItems: 'center', elevation: 2 },
  actionText: { marginTop: 8, fontSize: 13, fontWeight: '600', color: '#444' },
  activityCard: { margin: 20, borderRadius: 15 },
  bold: { fontWeight: 'bold' },
  updateRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  updateText: { flex: 1, marginLeft: 12, fontSize: 13, color: '#555', lineHeight: 18 },
});

export default ParentPortalScreen;