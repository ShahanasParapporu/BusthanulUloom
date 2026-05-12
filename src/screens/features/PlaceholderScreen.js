import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';
import { useLanguage } from '../../i18n/LanguageContext';


const PlaceholderScreen = ({ route }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{t('placeholder.welcomeTo')}</Text>
    <Text style={styles.screenName}>{route?.name || t('placeholder.screen')}</Text>
    <Text style={styles.text}>{t('placeholder.screen')}</Text>
    <Text style={styles.subtitle}>{t('placeholder.wip')}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FA' },
  text: { fontSize: 18, color: '#666' },
  screenName: { fontSize: 24, fontWeight: 'bold', color: COLORS.primary, marginVertical: 10 },
  subtitle: { fontSize: 14, color: '#999', marginTop: 20 },
});

export default PlaceholderScreen;