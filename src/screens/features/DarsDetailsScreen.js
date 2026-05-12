// src/screens/features/DarsDetailsScreen.js
import React, { useState, useEffect } from 'react';
import {
  ScrollView, View, StyleSheet, Text, TouchableOpacity,
  ActivityIndicator, Platform, PermissionsAndroid,
} from 'react-native';
import { Card, List, Snackbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//import RNBlobUtil from 'react-native-blob-util';
import { storageService } from '../../utils/storage';
import { CONTENT_KEYS, getDefaults } from '../../constants/contentKeys';
import { COLORS } from '../../constants/theme';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { useLanguage } from '../../i18n/LanguageContext';
import { Linking } from 'react-native';

// ─── HTML builder ─────────────────────────────────────────────────────────────
const buildHtmlContent = (items) => {
  const rows = items.map((item) => {
    const subjectList = (item.subjects || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => `<li>${s}</li>`)
      .join('');
    return `
      <div class="level">
        <h3>${item.level}</h3>
        <ul>${subjectList}</ul>
      </div>`;
  }).join('');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Busthanul Uloom – Dars Syllabus</title>
  <style>
    body  { font-family: Georgia, serif; padding: 40px; color: #1a1a1a; max-width: 700px; margin: auto; }
    h1    { color: #6A1B9A; font-size: 22px; border-bottom: 2px solid #6A1B9A; padding-bottom: 8px; }
    .meta { color: #999; font-size: 12px; margin-bottom: 24px; }
    .level { margin-bottom: 20px; padding: 16px; border: 1px solid #e0d6f0; border-radius: 10px; background: #faf8ff; }
    .level h3 { margin: 0 0 8px; color: #6A1B9A; font-size: 15px; }
    ul { margin: 0; padding-left: 20px; color: #444; font-size: 13px; line-height: 1.8; }
  </style>
</head>
<body>
  <h1>Busthanul Uloom Arabic College</h1>
  <p class="meta">Dars Program – Core Curriculum Syllabus &nbsp;|&nbsp;
    Generated: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
  </p>
  ${rows}
</body>
</html>`;
};

// // ─── Android storage permission (only needed on API < 33) ────────────────────
// const requestAndroidPermission = async () => {
//   if (Platform.OS !== 'android' || Platform.Version >= 33) return true;
//   const result = await PermissionsAndroid.request(
//     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//     { title: 'Storage Permission', message: 'Needed to save the syllabus file.' },
//   );
//   return result === PermissionsAndroid.RESULTS.GRANTED;
// };

// ─── Main component ───────────────────────────────────────────────────────────
const DarsDetailsScreen = () => {
  const { t, language } = useLanguage();
  const [overview,   setOverview]   = useState(() => getDefaults(language)?.darsOverview   ?? '');
  const [curriculum, setCurriculum] = useState(() => getDefaults(language)?.darsCurriculum ?? []);
  const [expanded,   setExpanded]   = useState(null);

  const [selected,   setSelected]   = useState([]);
  const [selectMode, setSelectMode] = useState(false);
  const [loading,    setLoading]    = useState(false);
  const [snack,      setSnack]      = useState('');
  const [snackVis,   setSnackVis]   = useState(false);
  //const { t } = useLanguage();

  const showSnack = (msg) => { setSnack(msg); setSnackVis(true); };

  useEffect(() => {
    (async () => {
      const defaults = getDefaults(language);
      const ov = await storageService.getItem(CONTENT_KEYS.DARS_OVERVIEW);
      const cu = await storageService.getItem(CONTENT_KEYS.DARS_CURRICULUM);
      setOverview(ov ?? defaults?.darsOverview ?? '');
      setCurriculum(cu ?? defaults?.darsCurriculum ?? []);
    })();
  }, [language]);

  // useEffect(() => {
  //   (async () => {
  //     const ov = await storageService.getItem(CONTENT_KEYS.DARS_OVERVIEW);
  //     const cu = await storageService.getItem(CONTENT_KEYS.DARS_CURRICULUM);
  //     if (ov) setOverview(ov);
  //     if (cu) setCurriculum(cu);
  //   })();
  // }, []);

  const toggleSelect = (id) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const toggleSelectAll = () =>
    setSelected(selected.length === curriculum.length ? [] : curriculum.map((c) => c.id));

  // ── Download handler ────────────────────────────────────────────────────────
  const handleDownload = async () => {
    if (curriculum.length === 0) { showSnack(t('dars.noData')); return; }
  
    setLoading(true);
    try {
      const items = selected.length === 0
        ? curriculum
        : curriculum.filter((c) => selected.includes(c.id));
  
      const html     = buildHtmlContent(items);
      const filename = `dars-syllabus-${Date.now()}.html`;
  
      const dir  = Platform.OS === 'android'
        ? RNFS.DownloadDirectoryPath
        : RNFS.DocumentDirectoryPath;
      const path = `${dir}/${filename}`;
  
      await RNFS.writeFile(path, html, 'utf8');
  
      const exists = await RNFS.exists(path);
      if (!exists) { showSnack(t('dars.downloadFailed')); return; }
  
      if (Platform.OS === 'android') {
        showSnack(`✅ Saved! Opening…`);
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
          title: 'Save or Share Syllabus',
        });
        showSnack(t('dars.readyIos'));
      }
  
    } catch (err) {
      if (err?.message !== 'User did not share') {
        console.error('Download error:', err);
        showSnack(t('dars.downloadFailed'));
      }
    } finally {
      setLoading(false);
    }
  };

  const selectedCount = selected.length;
  const allSelected   = selectedCount === curriculum.length && curriculum.length > 0;
  const downloadLabel = selectedCount === 0
    ? t('dars.downloadFull')
    : t('dars.downloadSelected').replace('{count}', selectedCount).replace('{plural}', selectedCount > 1 ? 's' : '');

  return (
    <View style={styles.root}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* ── Overview ──────────────────────────────────────────────────────── */}
        <Card style={styles.card}>
          <Card.Title title={t('dars.programOverview')} titleStyle={styles.bold} />
          <Card.Content>
            <Text style={styles.para}>{overview}</Text>
          </Card.Content>
        </Card>

        {/* ── Curriculum header ─────────────────────────────────────────────── */}
        <View style={styles.curriculumHeader}>
          <Text style={styles.sectionTitle}>{t('dars.coreCurriculum')}</Text>
          <TouchableOpacity
            style={[styles.selectToggle, selectMode && styles.selectToggleActive]}
            onPress={() => { setSelectMode((v) => !v); if (selectMode) setSelected([]); }}
          >
            <Icon
              name={selectMode ? 'close-circle-outline' : 'checkbox-multiple-marked-outline'}
              size={15}
              color={selectMode ? COLORS.primary : '#888'}
            />
            <Text style={[styles.selectToggleTxt, selectMode && { color: COLORS.primary }]}>
              {selectMode ? t('dars.cancelSelect') : t('dars.select')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── Select-all banner ─────────────────────────────────────────────── */}
        {selectMode && curriculum.length > 0 && (
          <TouchableOpacity style={styles.selectAllRow} onPress={toggleSelectAll}>
            <View style={[styles.checkbox, allSelected && styles.checkboxOn]}>
              {allSelected && <Icon name="check" size={12} color="#fff" />}
            </View>
            <Text style={styles.selectAllTxt}>
              {allSelected ? t('dars.deselectAll') : t('dars.selectAllLevels')}
            </Text>
            {selectedCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeTxt}>{t('dars.selected').replace('{count}', selectedCount)}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}

        {/* ── Accordion list ────────────────────────────────────────────────── */}
        <List.Section style={{ marginTop: 0 }}>
          {curriculum.map((item) => {
            const isSelected = selected.includes(item.id);
            return (
              <View key={item.id} style={styles.accordionWrap}>
                {selectMode && (
                  <TouchableOpacity
                    style={styles.checkboxCol}
                    onPress={() => toggleSelect(item.id)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <View style={[styles.checkbox, isSelected && styles.checkboxOn]}>
                      {isSelected && <Icon name="check" size={12} color="#fff" />}
                    </View>
                  </TouchableOpacity>
                )}
                <View style={[
                  styles.accordionCard,
                  isSelected && selectMode && styles.accordionCardSelected,
                ]}>
                  <List.Accordion
                    title={item.level}
                    titleStyle={styles.accordionTitle}
                    expanded={expanded === item.id}
                    onPress={() => {
                      if (selectMode) { toggleSelect(item.id); return; }
                      setExpanded(expanded === item.id ? null : item.id);
                    }}
                    left={(p) => (
                      <List.Icon {...p} icon="book-open-variant" color={COLORS.primary} />
                    )}
                    style={{ backgroundColor: 'transparent', paddingLeft: 0 }}
                  >
                    {(item.subjects || '').split(',').map((subj, i) => (
                      <List.Item
                        key={i}
                        title={subj.trim()}
                        titleStyle={styles.subjectItem}
                        left={(p) => (
                          <List.Icon {...p} icon="circle-small" color={COLORS.primary} />
                        )}
                        style={{ paddingLeft: 8 }}
                      />
                    ))}
                  </List.Accordion>
                </View>
              </View>
            );
          })}
        </List.Section>

        {/* ── Download section ──────────────────────────────────────────────── */}
        <View style={styles.downloadSection}>
          {selectMode && selectedCount === 0 && (
            <Text style={styles.downloadHint}>
               {t('dars.downloadHint')}
            </Text>
          )}

          <TouchableOpacity
            style={[styles.downloadBtn, loading && styles.downloadBtnLoading]}
            onPress={handleDownload}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading
              ? <ActivityIndicator color="#fff" size="small" />
              : <Icon name="download-circle" size={22} color="#fff" />
            }
            <Text style={styles.downloadBtnTxt}>
              {loading ? t('dars.preparing') : downloadLabel}
            </Text>
          </TouchableOpacity>

          <Text style={styles.downloadNote}>
          {t('dars.downloadNoteAndroid')}
          </Text>
        </View>

      </ScrollView>

      <Snackbar
        visible={snackVis}
        onDismiss={() => setSnackVis(false)}
        duration={3500}
        style={styles.snackbar}
      >
        {snack}
      </Snackbar>
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root:      { flex: 1, backgroundColor: '#F8F9FA' },
  container: { flex: 1, padding: 15 },

  card: { marginBottom: 15, backgroundColor: '#FFF', borderRadius: 14 },
  bold: { fontWeight: '700', color: COLORS.primary },
  para: { lineHeight: 22, color: '#444' },

  curriculumHeader:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle:       { fontSize: 16, fontWeight: '700', color: COLORS.primary },
  selectToggle:       { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1.5, borderColor: '#ddd', backgroundColor: '#fff' },
  selectToggleActive: { borderColor: COLORS.primary, backgroundColor: '#F3E5F5' },
  selectToggleTxt:    { fontSize: 12, fontWeight: '600', color: '#888' },

  selectAllRow: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#F3E5F5', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 10 },
  selectAllTxt: { fontSize: 13, color: COLORS.primary, fontWeight: '600', flex: 1 },
  badge:        { backgroundColor: COLORS.primary, borderRadius: 12, paddingHorizontal: 9, paddingVertical: 3 },
  badgeTxt:     { fontSize: 11, color: '#fff', fontWeight: '700' },

  checkbox:    { width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: '#C0A0D0', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  checkboxOn:  { backgroundColor: COLORS.primary, borderColor: COLORS.primary },

  accordionWrap:         { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  checkboxCol:           { marginRight: 10 },
  accordionCard:         { flex: 1, backgroundColor: '#fff', borderRadius: 12, elevation: 1, overflow: 'hidden' },
  accordionCardSelected: { backgroundColor: '#F3E5F5', elevation: 2 },
  accordionTitle:        { fontWeight: '600', color: '#1a1a1a', fontSize: 14 },
  subjectItem:           { fontSize: 13, color: '#555' },

  downloadSection:    { marginTop: 8, marginBottom: 40 },
  downloadHint:       { fontSize: 12, color: '#999', textAlign: 'center', marginBottom: 12 },
  downloadBtn:        { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: COLORS.primary, borderRadius: 14, paddingVertical: 15, elevation: 3 },
  downloadBtnLoading: { opacity: 0.75 },
  downloadBtnTxt:     { color: '#fff', fontSize: 15, fontWeight: '700' },
  downloadNote:       { textAlign: 'center', fontSize: 11, color: '#aaa', marginTop: 10 },

  snackbar: { backgroundColor: '#333', borderRadius: 10 },
});

export default DarsDetailsScreen;
