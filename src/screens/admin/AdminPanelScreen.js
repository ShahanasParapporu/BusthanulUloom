// src/screens/admin/AdminPanelScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  StatusBar,
  Alert,
  FlatList,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { TextInput, Button, Card, Avatar, Chip, Snackbar, Divider } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import { storageService, STORAGE_KEYS } from '../../utils/storage';
import { logout } from '../../redux/slices/authSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// ─── Storage keys for admin data ─────────────────────────────────────────────
const ADMIN_STATS_KEY = 'admin_college_stats';
const ADMIN_TEACHERS_KEY = 'admin_teachers';

const THEME = {
  primary: '#6A1B9A',
  primaryLight: '#F3E5F5',
  green: '#2E7D32',
  surface: '#F8F9FA',
  white: '#FFFFFF',
  textMain: '#1A1A1A',
  textSecondary: '#757575',
  border: '#E0E0E0',
};

// ─── Default college stats ────────────────────────────────────────────────────
const DEFAULT_STATS = {
  established: '1995',
  affiliation: 'Calicut',
  students: '1200+',
  location: 'Malappuram, Kerala',
};

// ─── Teacher categories ───────────────────────────────────────────────────────
const TEACHER_CATEGORIES = ['Arabic', 'Islamic Studies', 'Science', 'Mathematics', 'English', 'Other'];

// ─── Empty teacher form ───────────────────────────────────────────────────────
const EMPTY_TEACHER = {
  id: null,
  name: '',
  designation: '',
  subject: '',
  category: '',
  phone: '',
};

// ─────────────────────────────────────────────────────────────────────────────
const AdminPanelScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  // College stats state
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [editingStats, setEditingStats] = useState(false);
  const [draftStats, setDraftStats] = useState(DEFAULT_STATS);

  // Teachers state
  const [teachers, setTeachers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [teacherForm, setTeacherForm] = useState(EMPTY_TEACHER);
  const [isEditingTeacher, setIsEditingTeacher] = useState(false);

  // UI state
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('stats'); // 'stats' | 'teachers'

  const showSnack = (msg) => { setSnackbarMsg(msg); setSnackbarVisible(true); };

  // ─── Load persisted data on mount ──────────────────────────────────────────
  useEffect(() => {
    (async () => {
      const savedStats = await storageService.getItem(ADMIN_STATS_KEY);
      if (savedStats) { setStats(savedStats); setDraftStats(savedStats); }

      const savedTeachers = await storageService.getItem(ADMIN_TEACHERS_KEY);
      if (savedTeachers) setTeachers(savedTeachers);
    })();
  }, []);

    // ─── Logout: clears auth, resets nav stack cleanly to RoleSelection ────────
    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Logout',
            style: 'destructive',
            onPress: async () => {
              await storageService.clearAuthOnly();
              dispatch(logout());
              // ✅ CommonActions.reset clears the ENTIRE navigation stack
              // and lands on Auth > RoleSelection with nothing behind it
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
            },
          },
        ]);
      };

  // ─── Save stats ────────────────────────────────────────────────────────────
  const handleSaveStats = async () => {
    if (!draftStats.established.trim() || !draftStats.location.trim()) {
      showSnack('Establishment year and location are required.');
      return;
    }
    await storageService.setItem(ADMIN_STATS_KEY, draftStats);
    setStats(draftStats);
    setEditingStats(false);
    showSnack('✅College information saved! Changes will appear in all portals.');
  };

  // ─── Teacher CRUD ──────────────────────────────────────────────────────────
  const openAddTeacher = () => {
    setTeacherForm(EMPTY_TEACHER);
    setIsEditingTeacher(false);
    setModalVisible(true);
  };

  const openEditTeacher = (teacher) => {
    setTeacherForm({ ...teacher });
    setIsEditingTeacher(true);
    setModalVisible(true);
  };

  const handleSaveTeacher = async () => {
    if (!teacherForm.name.trim() || !teacherForm.designation.trim()) {
      showSnack('Name and designation are required.');
      return;
    }

    let updated;
    if (isEditingTeacher) {
      updated = teachers.map((t) => (t.id === teacherForm.id ? teacherForm : t));
      showSnack('✅ Teacher updated!');
    } else {
      const newTeacher = { ...teacherForm, id: Date.now().toString() };
      updated = [...teachers, newTeacher];
      showSnack('✅ Teacher added!');
    }

    await storageService.setItem(ADMIN_TEACHERS_KEY, updated);
    setTeachers(updated);
    setModalVisible(false);
  };

  const handleDeleteTeacher = (id) => {
    Alert.alert('Delete Teacher', 'Are you sure you want to remove this teacher?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const updated = teachers.filter((t) => t.id !== id);
          await storageService.setItem(ADMIN_TEACHERS_KEY, updated);
          setTeachers(updated);
          showSnack('Teacher removed.');
        },
      },
    ]);
  };

  // ─── Header ────────────────────────────────────────────────────────────────
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.headerTitle}>Admin Panel</Text>
          <Text style={styles.headerSub}>Busthanul Uloom Arabic College</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Icon name="logout" size={22} color="#FFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.tabs}>
        {[
          { key: 'stats', label: 'College Info', icon: 'information-outline' },
          { key: 'teachers', label: `Teachers (${teachers.length})`, icon: 'account-tie' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Icon name={tab.icon} size={16} color={activeTab === tab.key ? THEME.primary : '#FFF'} />
            <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  // ─── Stats Section ─────────────────────────────────────────────────────────
  const renderStatsSection = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>College Information</Text>
        <Text style={styles.sectionSubtitle}>
          Changes here appear on the Home screen for Guest, Student &amp; Parent
        </Text>
      </View>

      {!editingStats ? (
        <Card style={styles.statsCard}>
          <View style={styles.statsGrid}>
            <StatDisplay icon="calendar-outline" label="Established" value={stats.established} color="#E65100" />
            <StatDisplay icon="school-outline" label="Affiliated" value={stats.affiliation} color={THEME.green} />
            <StatDisplay icon="account-group-outline" label="Students" value={stats.students} color="#1565C0" />
          </View>
          <Divider style={{ marginHorizontal: 16 }} />
          <View style={styles.locationRow}>
            <Icon name="map-marker-outline" size={18} color={THEME.textSecondary} />
            <Text style={styles.locationValue}>{stats.location}</Text>
          </View>
          <Button
            mode="outlined"
            onPress={() => { setDraftStats(stats); setEditingStats(true); }}
            style={styles.editStatsBtn}
            icon="pencil-outline"
            textColor={THEME.primary}
          >
            Edit Information
          </Button>
        </Card>
      ) : (
        <Card style={styles.editCard}>
          <Text style={styles.editCardTitle}>✏️ Edit College Information</Text>
          {[
            { key: 'established', label: 'Establishment Year', icon: 'calendar-outline', hint: 'e.g. 1995' },
            { key: 'affiliation', label: 'Affiliated University', icon: 'school-outline', hint: 'e.g. Calicut University' },
            { key: 'students', label: 'Total Students', icon: 'account-group-outline', hint: 'e.g. 1200+' },
            { key: 'location', label: 'Location', icon: 'map-marker-outline', hint: 'e.g. Malappuram, Kerala' },
          ].map((field) => (
            <TextInput
              key={field.key}
              label={field.label}
              value={draftStats[field.key]}
              onChangeText={(v) => setDraftStats((prev) => ({ ...prev, [field.key]: v }))}
              mode="flat"
              underlineColor="transparent"
              activeUnderlineColor={THEME.primary}
              placeholder={field.hint}
              style={styles.editInput}
              left={<TextInput.Icon icon={field.icon} color={THEME.primary} />}
            />
          ))}
          <View style={styles.rowBtns}>
            <Button
              mode="outlined"
              onPress={() => setEditingStats(false)}
              style={[styles.actionBtn, { borderColor: THEME.border }]}
              textColor={THEME.textSecondary}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleSaveStats}
              style={[styles.actionBtn, { backgroundColor: THEME.primary }]}
            >
              Save Changes
            </Button>
          </View>
        </Card>
      )}
    </View>
  );

  // ─── Teachers Section ──────────────────────────────────────────────────────
  const renderTeachersSection = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Teachers Management</Text>
        <Text style={styles.sectionSubtitle}>
          Teachers list is visible to all users via Home screen
        </Text>
      </View>

      <Button
        mode="contained"
        icon="plus"
        onPress={openAddTeacher}
        style={styles.addTeacherBtn}
        contentStyle={{ height: 48 }}
      >
        Add New Teacher
      </Button>

      {teachers.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>👨‍🏫</Text>
          <Text style={styles.emptyText}>No teachers added yet.</Text>
          <Text style={styles.emptySubtext}>Tap the button above to add your first teacher.</Text>
        </View>
      ) : (
        teachers.map((teacher) => (
          <Card key={teacher.id} style={styles.teacherCard}>
            <View style={styles.teacherRow}>
              <Avatar.Icon size={46} icon="account-tie" backgroundColor={THEME.primaryLight} color={THEME.primary} />
              <View style={styles.teacherInfo}>
                <Text style={styles.teacherName}>{teacher.name}</Text>
                <Text style={styles.teacherDesig}>{teacher.designation}</Text>
                {teacher.subject ? <Text style={styles.teacherMeta}>📖 {teacher.subject}</Text> : null}
                {teacher.category ? (
                  <Chip compact style={styles.categoryChip} textStyle={styles.categoryChipText}>
                    {teacher.category}
                  </Chip>
                ) : null}
                {teacher.phone ? <Text style={styles.teacherMeta}>📞 {teacher.phone}</Text> : null}
              </View>
              <View style={styles.teacherActions}>
                <TouchableOpacity onPress={() => openEditTeacher(teacher)} style={styles.iconBtn}>
                  <Icon name="pencil-outline" size={20} color={THEME.primary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteTeacher(teacher.id)} style={[styles.iconBtn, styles.deleteBtn]}>
                  <Icon name="trash-can-outline" size={20} color="#C62828" />
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        ))
      )}
    </View>
  );

  // ─── Teacher Modal ─────────────────────────────────────────────────────────
  const renderTeacherModal = () => (
    <Modal
      visible={modalVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setModalVisible(false)}
    >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {isEditingTeacher ? 'Edit Teacher' : 'Add New Teacher'}
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Icon name="close" size={24} color={THEME.textSecondary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.modalSubtitle}>* Name and Designation are required</Text>

          <ScrollView contentContainerStyle={styles.modalScroll} showsVerticalScrollIndicator={false}>
            <TextInput
              label="Full Name *"
              value={teacherForm.name}
              onChangeText={(v) => setTeacherForm((p) => ({ ...p, name: v }))}
              mode="flat" underlineColor="transparent" activeUnderlineColor={THEME.primary}
              style={styles.modalInput}
              left={<TextInput.Icon icon="account-outline" color={THEME.primary} />}
            />
            <TextInput
              label="Designation *"
              value={teacherForm.designation}
              onChangeText={(v) => setTeacherForm((p) => ({ ...p, designation: v }))}
              mode="flat" underlineColor="transparent" activeUnderlineColor={THEME.primary}
              style={styles.modalInput}
              placeholder="e.g. Senior Lecturer, Head of Department"
              left={<TextInput.Icon icon="briefcase-outline" color={THEME.primary} />}
            />
            <TextInput
              label="Subject (Optional)"
              value={teacherForm.subject}
              onChangeText={(v) => setTeacherForm((p) => ({ ...p, subject: v }))}
              mode="flat" underlineColor="transparent" activeUnderlineColor={THEME.primary}
              style={styles.modalInput}
              placeholder="e.g. Fiqh, Arabic Grammar"
              left={<TextInput.Icon icon="book-open-outline" color={THEME.primary} />}
            />

            <Text style={styles.fieldLabel}>Category (Optional)</Text>
            <View style={styles.categoryRow}>
              {TEACHER_CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setTeacherForm((p) => ({ ...p, category: p.category === cat ? '' : cat }))}
                  style={[styles.categoryOption, teacherForm.category === cat && styles.categoryOptionSelected]}
                >
                  <Text style={[styles.categoryOptionText, teacherForm.category === cat && styles.categoryOptionTextSelected]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              label="Phone Number (Optional)"
              value={teacherForm.phone}
              onChangeText={(v) => setTeacherForm((p) => ({ ...p, phone: v }))}
              mode="flat" underlineColor="transparent" activeUnderlineColor={THEME.primary}
              keyboardType="phone-pad" style={styles.modalInput}
              left={<TextInput.Icon icon="phone-outline" color={THEME.primary} />}
            />

            <View style={styles.rowBtns}>
              <Button
                mode="outlined"
                onPress={() => setModalVisible(false)}
                style={[styles.actionBtn, { borderColor: THEME.border }]}
                textColor={THEME.textSecondary}
              >
                Cancel
              </Button>
              <Button
                mode="contained"
                onPress={handleSaveTeacher}
                style={[styles.actionBtn, { backgroundColor: THEME.primary }]}
              >
                {isEditingTeacher ? 'Update' : 'Add Teacher'}
              </Button>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={THEME.primary} />
      {renderHeader()}
      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent} showsVerticalScrollIndicator={false}>
        {activeTab === 'stats' ? renderStatsSection() : renderTeachersSection()}
      </ScrollView>
      {renderTeacherModal()}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={styles.snackbar}
      >
        {snackbarMsg}
      </Snackbar>
    </View>
  );
};

const StatDisplay = ({ icon, label, value, color }) => (
  <View style={styles.statBox}>
    <Icon name={icon} size={22} color={color} />
    <Text style={[styles.statValue, { color }]}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6FA' },
  header: { backgroundColor: THEME.primary, paddingTop: 55, paddingBottom: 0, paddingHorizontal: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#FFF', letterSpacing: -0.3 },
  headerSub: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  logoutBtn: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 10, padding: 8 },
  tabs: { flexDirection: 'row', marginTop: 4 },
  tab: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 18, marginRight: 4, borderTopLeftRadius: 10, borderTopRightRadius: 10, gap: 6 },
  tabActive: { backgroundColor: '#F5F6FA' },
  tabText: { color: 'rgba(255,255,255,0.8)', fontWeight: '600', fontSize: 14 },
  tabTextActive: { color: THEME.primary },
  body: { flex: 1 },
  bodyContent: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 40 },
  section: { marginBottom: 24 },
  sectionHeader: { marginBottom: 14 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: THEME.textMain },
  sectionSubtitle: { fontSize: 13, color: THEME.textSecondary, marginTop: 3 },
  statsCard: { borderRadius: 18, backgroundColor: THEME.white, elevation: 2, paddingTop: 20, paddingBottom: 8 },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 16 },
  statBox: { alignItems: 'center', flex: 1, gap: 4 },
  statValue: { fontSize: 17, fontWeight: '800', marginTop: 4 },
  statLabel: { fontSize: 11, color: THEME.textSecondary },
  locationRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 14 },
  locationValue: { fontSize: 14, color: THEME.textSecondary },
  editStatsBtn: { margin: 16, marginTop: 4, borderColor: THEME.primary, borderRadius: 12 },
  editCard: { borderRadius: 18, backgroundColor: THEME.white, elevation: 2, padding: 16 },
  editCardTitle: { fontSize: 16, fontWeight: '700', color: THEME.textMain, marginBottom: 16 },
  editInput: { marginBottom: 14, backgroundColor: THEME.surface, borderTopLeftRadius: 12, borderTopRightRadius: 12, borderRadius: 12, height: 58 },
  rowBtns: { flexDirection: 'row', gap: 12, marginTop: 8 },
  actionBtn: { flex: 1, borderRadius: 12 },
  addTeacherBtn: { backgroundColor: THEME.primary, borderRadius: 14, marginBottom: 16, elevation: 2 },
  teacherCard: { borderRadius: 16, backgroundColor: THEME.white, elevation: 2, marginBottom: 12, padding: 14 },
  teacherRow: { flexDirection: 'row', alignItems: 'flex-start' },
  teacherInfo: { flex: 1, marginLeft: 12 },
  teacherName: { fontSize: 16, fontWeight: '700', color: THEME.textMain },
  teacherDesig: { fontSize: 13, color: THEME.textSecondary, marginTop: 2 },
  teacherMeta: { fontSize: 12, color: '#666', marginTop: 4 },
  categoryChip: { marginTop: 6, backgroundColor: THEME.primaryLight, alignSelf: 'flex-start', height: 24 },
  categoryChipText: { fontSize: 10, color: THEME.primary },
  teacherActions: { flexDirection: 'column', gap: 6 },
  iconBtn: { backgroundColor: THEME.surface, padding: 7, borderRadius: 8 },
  deleteBtn: { backgroundColor: '#FFEBEE' },
  emptyState: { alignItems: 'center', paddingVertical: 50 },
  emptyIcon: { fontSize: 60, marginBottom: 12 },
  emptyText: { fontSize: 18, fontWeight: '700', color: THEME.textMain },
  emptySubtext: { fontSize: 14, color: THEME.textSecondary, marginTop: 6, textAlign: 'center' },
  modalContainer: { flex: 1, backgroundColor: THEME.white, paddingTop: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 4 },
  modalTitle: { fontSize: 22, fontWeight: '800', color: THEME.textMain },
  modalSubtitle: { fontSize: 12, color: THEME.textSecondary, paddingHorizontal: 20, marginBottom: 10 },
  modalScroll: { paddingHorizontal: 20, paddingBottom: 40 },
  modalInput: { marginBottom: 14, backgroundColor: THEME.surface, borderTopLeftRadius: 12, borderTopRightRadius: 12, borderRadius: 12, height: 58 },
  fieldLabel: { fontSize: 13, color: THEME.textSecondary, marginBottom: 8, marginTop: 4 },
  categoryRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  categoryOption: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, borderWidth: 1.5, borderColor: THEME.border, backgroundColor: THEME.white },
  categoryOptionSelected: { borderColor: THEME.primary, backgroundColor: THEME.primaryLight },
  categoryOptionText: { fontSize: 13, color: THEME.textSecondary },
  categoryOptionTextSelected: { color: THEME.primary, fontWeight: '700' },
  snackbar: { backgroundColor: '#333', borderRadius: 10 },
});

export default AdminPanelScreen;
