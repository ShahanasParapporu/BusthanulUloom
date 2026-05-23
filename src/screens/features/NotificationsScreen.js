// src/screens/features/NotificationsScreen.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Linking, Text, Platform } from 'react-native';
import { List, Avatar, Divider, Chip, FAB, Snackbar, ActivityIndicator  } from 'react-native-paper';
import { storageService } from '../../utils/storage';
import { CONTENT_KEYS, getDefaults } from '../../constants/contentKeys';
import { COLORS } from '../../constants/theme';
import { useLanguage } from '../../i18n/LanguageContext';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';


const buildNoticeHtml = (item) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>${item.title}</title>
  <style>
    body  { font-family: sans-serif; padding: 32px; color: #222; }
    h1    { color: #1565C0; margin-bottom: 4px; }
    .meta { color: #888; font-size: 13px; margin-bottom: 24px; }
    .body { font-size: 16px; line-height: 1.7; background: #f9f9f9;
            border-left: 4px solid #1565C0; padding: 16px 20px; border-radius: 4px; }
    .footer { margin-top: 40px; color: #aaa; font-size: 12px; }
  </style>
</head>
<body>
  <h1>${item.title}</h1>
  <div class="meta">
    Category: ${item.category ?? '—'} &nbsp;|&nbsp; ${item.time ?? ''}
  </div>
  <div class="body">${item.desc ?? ''}</div>
  <div class="footer">
    Busthanul Uloom Arabic College &nbsp;·&nbsp;
    Generated on ${new Date().toLocaleString()}
  </div>
</body>
</html>
`;

const NotificationsScreen = () => {
  const { t, language } = useLanguage();

  const [filter,        setFilter]        = useState('All');
  const [notifications, setNotifications] = useState(getDefaults(language).NOTIFICATIONS ?? []);
  const [downloading,   setDownloading]   = useState({});
  const [snack,         setSnack]         = useState({ visible: false, message: '' });

  const showSnack = (message) => setSnack({ visible: true, message });
  const hideSnack = ()        => setSnack((s) => ({ ...s, visible: false }));

  const load = () => {
    storageService.getItem(CONTENT_KEYS.NOTIFICATIONS).then((saved) => {
      if (saved) setNotifications(saved);
      else       setNotifications(getDefaults(language).NOTIFICATIONS ?? []);
    });
  };

  useEffect(() => { load(); }, [language]);

  const filtered = notifications.filter(
    (n) => filter === 'All' || n.category === filter
  );

  const FILTER_LABELS = {
    All:      t('notifications.all'),
    Notice:   t('notifications.notice'),
    Document: t('notifications.document'),
  };

  const handleDownload = async (item) => {
    // If it has a real URL, just open it directly
    if (item.url) {
      Linking.openURL(item.url);
      return;
    }

    setDownloading((prev) => ({ ...prev, [item.id]: true }));
    try {
      const filename = `notice-${item.title.replace(/\s+/g, '_')}-${Date.now()}.html`;
      const dir  = Platform.OS === 'android'
        ? RNFS.DownloadDirectoryPath
        : RNFS.DocumentDirectoryPath;
      const path = `${dir}/${filename}`;

      showSnack('⏳ Preparing document…');

      await RNFS.writeFile(path, buildNoticeHtml(item), 'utf8');

      const exists = await RNFS.exists(path);
      if (!exists) { showSnack('❌ Download failed. Please try again.'); return; }

      if (Platform.OS === 'android') {
        showSnack('✅ Saved! Opening…');
        setTimeout(async () => {
          try {
            await Linking.openURL(`file://${path}`);
          } catch {
            showSnack(`✅ Saved to Downloads: ${filename}`);
          }
        }, 500);
      } else {
        await Share.open({
          url:   path,
          type:  'text/html',
          title: 'Save or Share Document',
        });
        showSnack('✅ Ready — save or share from the sheet!');
      }
    } catch (err) {
      if (err?.message !== 'User did not share') {
        console.error('Download error:', err);
        showSnack('❌ Download failed. Please try again.');
      }
    } finally {
      setDownloading((prev) => ({ ...prev, [item.id]: false }));
    }
  };

  return (
    <View style={styles.container}>
      {/* Filter Chips */}
      <View style={styles.filterRow}>
        {['All', 'Notice', 'Document'].map((cat) => (
          <Chip
            key={cat}
            selected={filter === cat}
            onPress={() => setFilter(cat)}
            style={[styles.chip, filter === cat && styles.selectedChip]}
            textStyle={{ color: filter === cat ? COLORS.white : '#444' }}
          >
            {FILTER_LABELS[cat]}
          </Chip>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={item.isDoc ? 0.8 : 1}
            onPress={() => item.isDoc ? handleDownload(item) : null}
          >
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
                  {item.isDoc ? (
                    downloading[item.id]
                      ? <ActivityIndicator size="small" color={COLORS.primary} style={{ marginTop: 4 }} />
                      : (
                        <TouchableOpacity onPress={() => handleDownload(item)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                          <List.Icon icon="download" color={COLORS.primary} />
                        </TouchableOpacity>
                      )
                  ) : null}
                </View>
              )}
            />
            <Divider style={{ marginHorizontal: 70 }} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            {t('notifications.noNotifications') || 'No notifications in this category.'}
          </Text>
        }
      />

      <FAB
        icon="refresh"
        style={styles.fab}
        color={COLORS.white}
        onPress={load}
      />

      <Snackbar
        visible={snack.visible}
        onDismiss={hideSnack}
        duration={3000}
        action={{ label: '✕', onPress: hideSnack }}
      >
        {snack.message}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: '#FFF' },
  filterRow:    { flexDirection: 'row', padding: 14, backgroundColor: '#F8F9FA', gap: 8 },
  chip:         { backgroundColor: '#EEE' },
  selectedChip: { backgroundColor: COLORS.primary },
  list:         { paddingBottom: 100 },
  itemTitle:    { fontWeight: 'bold', fontSize: 15, color: '#333' },
  itemDesc:     { fontSize: 12, color: '#666', marginTop: 3 },
  right:        { justifyContent: 'center', alignItems: 'flex-end' },
  time:         { fontSize: 11, color: '#AAA' },
  empty:        { textAlign: 'center', color: '#999', marginTop: 60 },
  fab:          { position: 'absolute', margin: 16, right: 0, bottom: 0, backgroundColor: COLORS.primary },
});

export default NotificationsScreen;