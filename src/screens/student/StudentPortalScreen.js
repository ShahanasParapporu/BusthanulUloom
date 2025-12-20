import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, StatusBar } from 'react-native';
import { Card, ProgressBar, Avatar, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../constants/theme';

const StudentPortalScreen = () => {
  const courses = [
    { id: 1, name: 'Quranic Studies', progress: 0.75, nextClass: 'Tomorrow, 9:00 AM', color: '#2E7D32' },
    { id: 2, name: 'Arabic Language', progress: 0.6, nextClass: 'Today, 2:00 PM', color: '#1565C0' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        {/* --- Immersive Header --- */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.welcomeText}>As-salamu alaykum,</Text>
              <Text style={styles.studentName}>Ahmed Ali</Text>
            </View>
            <Avatar.Image size={50} source={{ uri: 'https://i.pravatar.cc/150' }} />
          </View>
        </View>

        {/* --- Floating Stats Card --- */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>92%</Text>
            <Text style={styles.statLabel}>Attendance</Text>
          </View>
          <View style={[styles.statBox, { borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#EEE' }]}>
            <Text style={styles.statValue}>A-</Text>
            <Text style={styles.statLabel}>Avg Grade</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>12/15</Text>
            <Text style={styles.statLabel}>Tasks</Text>
          </View>
        </View>

        {/* --- Courses Section --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Courses</Text>
          {courses.map((course) => (
            <Card key={course.id} style={styles.courseCard}>
              <Card.Content>
                <View style={styles.courseHeader}>
                  <View style={[styles.iconBox, { backgroundColor: course.color + '15' }]}>
                    <Icon name="book-open-variant" size={24} color={course.color} />
                  </View>
                  <View style={{ flex: 1, marginLeft: 15 }}>
                    <Text style={styles.courseName}>{course.name}</Text>
                    <Text style={styles.nextClassText}>Next: {course.nextClass}</Text>
                  </View>
                  <Text style={[styles.progressPercent, { color: course.color }]}>
                    {Math.round(course.progress * 100)}%
                  </Text>
                </View>
                <ProgressBar progress={course.progress} color={course.color} style={styles.progressBar} />
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* --- Modern Quick Actions --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.actionsGrid}>
            {[
              { label: 'Library', icon: 'library-shelves', color: '#FF7043' },
              { label: 'Schedule', icon: 'calendar-clock', color: '#42A5F5' },
              { label: 'Grades', icon: 'chart-box-outline', color: '#66BB6A' },
              { label: 'Messages', icon: 'chat-processing-outline', color: '#AB47BC' },
            ].map((item, index) => (
              <TouchableOpacity key={index} style={styles.actionItem}>
                <View style={[styles.actionIconCircle, { backgroundColor: item.color + '10' }]}>
                  <Icon name={item.icon} size={28} color={item.color} />
                </View>
                <Text style={styles.actionLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 60,
    paddingBottom: 60,
    paddingHorizontal: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  welcomeText: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
  studentName: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginHorizontal: 25,
    marginTop: -35,
    borderRadius: 20,
    paddingVertical: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  statBox: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: 'bold', color: COLORS.primary },
  statLabel: { fontSize: 11, color: '#757575', marginTop: 2 },

  section: { marginTop: 30, paddingHorizontal: 25 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 15 },
  
  courseCard: { marginBottom: 15, borderRadius: 15, backgroundColor: '#FFF', elevation: 2 },
  courseHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  iconBox: { width: 45, height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  courseName: { fontSize: 16, fontWeight: '700', color: '#1A1A1A' },
  nextClassText: { fontSize: 12, color: '#757575', marginTop: 2 },
  progressPercent: { fontSize: 14, fontWeight: 'bold' },
  progressBar: { height: 6, borderRadius: 3 },

  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  actionItem: { width: '47%', backgroundColor: '#FFF', borderRadius: 15, padding: 20, alignItems: 'center', marginBottom: 15, elevation: 1 },
  actionIconCircle: { width: 55, height: 55, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  actionLabel: { fontSize: 13, fontWeight: '600', color: '#333' }
});

export default StudentPortalScreen;