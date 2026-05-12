import React from 'react';
import {
  View, ScrollView, StyleSheet, Text, TouchableOpacity, StatusBar,
} from 'react-native';
import { Card, ProgressBar, Avatar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS, USER_ROLES } from '../../constants/theme';
import AppHeader from '../../components/AppHeader';
import useLogout from '../../hooks/useLogout';
import { useLanguage } from '../../i18n/LanguageContext';

// const courses = [
//   { id: 1, name: 'Quranic Studies',  progress: 0.75, nextClass: 'Tomorrow, 9:00 AM',  color: '#2E7D32' },
//   { id: 2, name: 'Arabic Language',  progress: 0.60, nextClass: 'Today, 2:00 PM',      color: '#1565C0' },
// ];

const courses = [
  { id: 1, name: 'Quranic Studies', progress: 0.75, nextClass: 'Tomorrow, 9:00 AM', color: '#2E7D32' },
  { id: 2, name: 'Arabic Language', progress: 0.60, nextClass: 'Today, 2:00 PM',    color: '#1565C0' },
];


// const QUICK_ACTIONS = [
//   { label: 'Library',   icon: 'library-shelves',       color: '#FF7043' },
//   { label: 'Schedule',  icon: 'calendar-clock',         color: '#42A5F5' },
//   { label: 'Grades',    icon: 'chart-box-outline',      color: '#66BB6A' },
//   { label: 'Messages',  icon: 'chat-processing-outline',color: '#AB47BC' },
// ];

const QUICK_ACTIONS = [
  { labelKey: 'studentPortal.quickActions.library',  icon: 'library-shelves',        color: '#FF7043' },
  { labelKey: 'studentPortal.quickActions.schedule', icon: 'calendar-clock',          color: '#42A5F5' },
  { labelKey: 'studentPortal.quickActions.grades',   icon: 'chart-box-outline',       color: '#66BB6A' },
  { labelKey: 'studentPortal.quickActions.messages', icon: 'chat-processing-outline', color: '#AB47BC' },
];

const StudentPortalScreen = () => {
  const { user, role } = useSelector((state) => state.auth);
  const performLogout = useLogout();
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* Same AppHeader as HomeScreen — consistent top bar with logout */}
      <AppHeader
        role={role}
        user={user}
        onLogout={performLogout}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Welcome strip */}
        <View style={styles.welcomeStrip}>
          <View>
            <Text style={styles.welcomeText}>t('studentPortal.greeting'),</Text>
            <Text style={styles.studentName}>{user?.name || 'Student'}</Text>
          </View>
          <Avatar.Image size={50} source={{ uri: 'https://i.pravatar.cc/150' }} />
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            { val: '92%',  lbl: t('studentPortal.stats.attendance') },
            { val: 'A-',   lbl: t('studentPortal.stats.avgGrade')  },
            { val: '12/15',lbl: t('studentPortal.stats.tasks')},
          ].map((s, i) => (
            <View key={i} style={[styles.statBox, i !== 0 && styles.statBorder]}>
              <Text style={styles.statValue}>{s.val}</Text>
              <Text style={styles.statLabel}>{s.lbl}</Text>
            </View>
          ))}
        </View>

        {/* Courses */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('studentPortal.myCourses')}</Text>
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

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('studentPortal.quickAccess')}</Text>
          <View style={styles.actionsGrid}>
            {QUICK_ACTIONS.map((item, index) => (
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
  welcomeStrip: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: COLORS.primary, paddingHorizontal: 25, paddingVertical: 20,
    paddingBottom: 30,
  },
  welcomeText: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
  studentName: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  statsRow: {
    flexDirection: 'row', backgroundColor: '#FFF',
    marginHorizontal: 25, marginTop: -20, borderRadius: 20,
    paddingVertical: 20, elevation: 4,
  },
  statBox: { flex: 1, alignItems: 'center' },
  statBorder: { borderLeftWidth: 1, borderColor: '#EEE' },
  statValue: { fontSize: 18, fontWeight: 'bold', color: COLORS.primary },
  statLabel: { fontSize: 11, color: '#757575', marginTop: 2 },
  section: { marginTop: 28, paddingHorizontal: 25 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 15 },
  courseCard: { marginBottom: 15, borderRadius: 15, backgroundColor: '#FFF', elevation: 2 },
  courseHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  iconBox: { width: 45, height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  courseName: { fontSize: 16, fontWeight: '700', color: '#1A1A1A' },
  nextClassText: { fontSize: 12, color: '#757575', marginTop: 2 },
  progressPercent: { fontSize: 14, fontWeight: 'bold' },
  progressBar: { height: 6, borderRadius: 3 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  actionItem: {
    width: '47%', backgroundColor: '#FFF', borderRadius: 15,
    padding: 20, alignItems: 'center', marginBottom: 15, elevation: 1,
  },
  actionIconCircle: {
    width: 55, height: 55, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center', marginBottom: 10,
  },
  actionLabel: { fontSize: 13, fontWeight: '600', color: '#333' },
});

export default StudentPortalScreen;