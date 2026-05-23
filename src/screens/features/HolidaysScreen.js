// src/screens/features/HolidaysScreen.js
import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { List, Avatar } from 'react-native-paper';
import { storageService } from '../../utils/storage';
import { CONTENT_KEYS, getDefaults  } from '../../constants/contentKeys';
import { useLanguage } from '../../i18n/LanguageContext';


const TYPE_COLORS = { Religious: '#2E7D32', National: '#1565C0', Academic: '#E65100' };

const HolidaysScreen = () => {
  const { t, language } = useLanguage();  
  const [holidays, setHolidays] = useState(() => getDefaults(language).HOLIDAYS); // ← lazy init

  useEffect(() => {
    storageService.getItem(CONTENT_KEYS.HOLIDAYS).then((saved) => {
      if (saved) setHolidays(saved);
      else       setHolidays(getDefaults(language).HOLIDAYS);                      // ← language-aware fallback
    });
  }, [language]);

  return (
    <FlatList
      data={holidays}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <List.Item
          title={item.name}
          description={item.date}
          left={(p) => (
            <Avatar.Icon
              {...p}
              icon="calendar-check"
              backgroundColor={TYPE_COLORS[item.type] || '#757575'}
              size={40}
            />
          )}
          right={() => <List.Subheader>{item.type}</List.Subheader>}
          style={styles.item}
        />
      )}
      ListEmptyComponent={<Text style={styles.empty}>{t('holidays.noHolidays')}</Text>}
    />
  );
};

const styles = StyleSheet.create({
  item:  { backgroundColor: '#FFF', borderBottomWidth: 1, borderColor: '#EEE' },
  empty: { textAlign: 'center', color: '#999', marginTop: 60 },
});

export default HolidaysScreen;