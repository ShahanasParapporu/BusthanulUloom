// src/screens/features/NotificationsScreen.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Linking, Text } from 'react-native';
import { List, Avatar, Divider, Chip, FAB } from 'react-native-paper';
import { storageService } from '../../utils/storage';
import { CONTENT_KEYS, DEFAULTS } from '../../constants/contentKeys';
import { COLORS } from '../../constants/theme';
import { useLanguage } from '../../i18n/LanguageContext';


const NotificationsScreen = () => {
  const { t } = useLanguage();

  const [filter,        setFilter]        = useState('All');
  const [notifications, setNotifications] = useState(DEFAULTS.NOTIFICATIONS);

  const load = () => {
    storageService.getItem(CONTENT_KEYS.NOTIFICATIONS).then((v) => { if (v) setNotifications(v); });
  };

  useEffect(() => { load(); }, []);

  const filtered = notifications.filter(
    (n) => filter === 'All' || n.category === filter
  );

  const FILTER_LABELS = {
    All:      t('notifications.all'),
    Notice:   t('notifications.notice'),
    Document: t('notifications.document'),
  };

  return (
    <View style={styles.container}>
      {/* Filter chips */}
      <View style={styles.filterRow}>
        {['All', 'Notice', 'Document'].map((cat) => (
          <Chip
            key={cat}
            selected={filter === cat}
            onPress={() => setFilter(cat)}
            style={styles.chip}
            selectedColor={COLORS.white}
          >
            {cat}
          </Chip>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => item.isDoc && item.url ? Linking.openURL(item.url) : null}>
            <List.Item
              title={item.title}
              description={item.desc}
              titleStyle={styles.itemTitle}
              descriptionStyle={styles.itemDesc}
              left={() => (
                <Avatar.Icon
                  icon={item.icon || 'bell-outline'}
                  size={44}
                  backgroundColor={item.isDoc ? COLORS.primary + '15' : '#F0F0F0'}
                  color={item.isDoc ? COLORS.primary : '#666'}
                />
              )}
              right={() => (
                <View style={styles.right}>
                  <Text style={styles.time}>{item.time}</Text>
                  {item.isDoc ? <List.Icon icon="download" color={COLORS.primary} /> : null}
                </View>
              )}
            />
            <Divider style={{ marginHorizontal: 70 }} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No notifications in this category.</Text>}
      />

      <FAB icon="refresh" style={styles.fab} color={COLORS.white} onPress={load} />
    </View>
  );
};

const styles = StyleSheet.create({
  container:  { flex: 1, backgroundColor: '#FFF' },
  filterRow:  { flexDirection: 'row', padding: 14, backgroundColor: '#F8F9FA', gap: 8 },
  chip:       {},
  list:       { paddingBottom: 100 },
  itemTitle:  { fontWeight: 'bold', fontSize: 15, color: '#333' },
  itemDesc:   { fontSize: 12, color: '#666', marginTop: 3 },
  right:      { justifyContent: 'center', alignItems: 'flex-end' },
  time:       { fontSize: 11, color: '#AAA' },
  empty:      { textAlign: 'center', color: '#999', marginTop: 60 },
  fab:        { position: 'absolute', margin: 16, right: 0, bottom: 0, backgroundColor: COLORS.primary },
});

export default NotificationsScreen;
