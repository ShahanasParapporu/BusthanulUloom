// src/screens/features/TeachersListScreen.js
// ─── UPDATED: Reads teacher data from admin-controlled storage ────────────────
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  StatusBar,
} from 'react-native';
import { Card, Avatar, Chip, Searchbar } from 'react-native-paper';
import { storageService } from '../../utils/storage';
import { useLanguage } from '../../i18n/LanguageContext';

const ADMIN_TEACHERS_KEY = 'admin_teachers';

const TeachersListScreen = () => {
  const [teachers, setTeachers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const saved = await storageService.getItem(ADMIN_TEACHERS_KEY);
      const data = saved || [];
      setTeachers(data);
      setFiltered(data);
      setLoading(false);
    })();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFiltered(teachers);
      return;
    }
    const q = query.toLowerCase();
    setFiltered(
      teachers.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.designation.toLowerCase().includes(q) ||
          (t.subject || '').toLowerCase().includes(q) ||
          (t.category || '').toLowerCase().includes(q)
      )
    );
  };

  const renderTeacher = ({ item }) => (
    <Card style={styles.card}>
      <View style={styles.row}>
        <Avatar.Icon
          size={52}
          icon="account-tie"
          backgroundColor="#F3E5F5"
          color="#6A1B9A"
        />
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.designation}>{item.designation}</Text>
          {item.subject ? <Text style={styles.meta}>📖 {item.subject}</Text> : null}
          {item.phone ? <Text style={styles.meta}>📞 {item.phone}</Text> : null}
          {item.category ? (
            <Chip compact style={styles.chip} textStyle={styles.chipText}>
              {item.category}
            </Chip>
          ) : null}
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E7D32" />

      <Searchbar
        placeholder={t('teachers.searchPlaceholder')}
        value={searchQuery}
        onChangeText={handleSearch}
        style={styles.searchbar}
        iconColor="#2E7D32"
      />

      {!loading && filtered.length === 0 && (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>👨‍🏫</Text>
          <Text style={styles.emptyText}>
            {teachers.length === 0 ? t('teachers.noTeachers') : t('teachers.noResults') }
          </Text>
        </View>
      )}

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderTeacher}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6FA' },
  searchbar: { margin: 16, borderRadius: 14, elevation: 2, backgroundColor: '#FFF' },
  list: { paddingHorizontal: 16, paddingBottom: 30 },
  card: {
    borderRadius: 16,
    backgroundColor: '#FFF',
    elevation: 2,
    marginBottom: 12,
    padding: 14,
  },
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  info: { flex: 1, marginLeft: 14 },
  name: { fontSize: 16, fontWeight: '700', color: '#1A1A1A' },
  designation: { fontSize: 13, color: '#757575', marginTop: 2 },
  meta: { fontSize: 12, color: '#666', marginTop: 4 },
  chip: { marginTop: 6, backgroundColor: '#F3E5F5', alignSelf: 'flex-start', height: 24 },
  chipText: { fontSize: 10, color: '#6A1B9A' },
  empty: { alignItems: 'center', marginTop: 80 },
  emptyIcon: { fontSize: 60, marginBottom: 12 },
  emptyText: { fontSize: 17, fontWeight: '600', color: '#757575' },
});

export default TeachersListScreen;
