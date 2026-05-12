// src/screens/features/BUSAScreen.js
import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Avatar, Text, Card } from 'react-native-paper';
import { storageService } from '../../utils/storage';
// import { CONTENT_KEYS, DEFAULTS } from '../../constants/contentKeys';
import { CONTENT_KEYS, getDefaults } from '../../constants/contentKeys'; // ← restored + getDefaults

import { COLORS } from '../../constants/theme';
import { useLanguage } from '../../i18n/LanguageContext';

const BUSAScreen = () => {
  // //const [busa, setBusa] = useState(DEFAULTS.BUSA);
  // const { t } = useLanguage();

  // const translatedDefault = t('defaults.busa');
 
  // const [busa, setBusa] = useState(translatedDefault);

  // // useEffect(() => {
  // //   storageService.getItem(CONTENT_KEYS.BUSA).then((v) => { if (v) setBusa(v); });
  // // }, []);

  // useEffect(() => {
  //   storageService.getItem(CONTENT_KEYS.BUSA).then((saved) => {
  //     setBusa(saved ?? t('defaults.busa'));  // admin data wins, translated default is fallback
  //   });
  // }, [language]);

  const { t, language } = useLanguage();                              // ← pull language too

  const [busa, setBusa] = useState(() => getDefaults(language).BUSA); // ← lazy init, no stale-t risk

  useEffect(() => {
    storageService.getItem(CONTENT_KEYS.BUSA).then((saved) => {       // ← CONTENT_KEYS now accessible
      setBusa(saved ?? getDefaults(language).BUSA);                   // ← consistent fallback
    });
  }, [language]);  

  const initials = (name) =>
    (name || '')
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || '??';

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{t('busa.committeeTitle')}</Text>

      <View style={styles.memberRow}>
        <View style={styles.member}>
          <Avatar.Text size={64} label={initials(busa.president)} backgroundColor={COLORS.primary} />
          <Text style={styles.memberRole}>{t('busa.president')}</Text>
          <Text style={styles.memberName}>{busa.president}</Text>
        </View>
        <View style={styles.member}>
          <Avatar.Text size={64} label={initials(busa.secretary)} backgroundColor={COLORS.secondary || '#81C784'} color={COLORS.primary} />
          <Text style={styles.memberRole}>{t('busa.secretary')}</Text>
          <Text style={styles.memberName}>{busa.secretary}</Text>
        </View>
      </View>

      <Card style={styles.card}>
        <Card.Title title={t('busa.achievements')} />
        <Card.Content>
          {(busa.achievements || []).length === 0 ? (
            <Text style={styles.empty}>{t('busa.noAchievements')}.</Text>
          ) : (
            (busa.achievements || []).map((item, i) => (
              <Text key={i} style={styles.achievement}>• {item}</Text>
            ))
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container:   { flex: 1, padding: 20, backgroundColor: '#F8F9FA' },
  title:       { textAlign: 'center', fontSize: 20, fontWeight: '800', marginBottom: 24, color: COLORS.primary },
  memberRow:   { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30 },
  member:      { alignItems: 'center' },
  memberRole:  { marginTop: 8, fontSize: 11, color: '#999', fontWeight: '600', textTransform: 'uppercase' },
  memberName:  { marginTop: 2, fontWeight: '700', color: '#333', textAlign: 'center' },
  card:        { marginTop: 10, borderRadius: 14 },
  achievement: { fontSize: 14, lineHeight: 24, color: '#444' },
  empty:       { color: '#999', fontStyle: 'italic' },
});

export default BUSAScreen;