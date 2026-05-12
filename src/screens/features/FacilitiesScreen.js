// src/screens/features/FacilitiesScreen.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Dimensions, Linking, Text } from 'react-native';
import { Card, Button, Avatar, IconButton } from 'react-native-paper';
import { storageService } from '../../utils/storage';
import { CONTENT_KEYS, DEFAULTS } from '../../constants/contentKeys';
import { COLORS } from '../../constants/theme';
import { useLanguage } from '../../i18n/LanguageContext';


const { width } = Dimensions.get('window');

const FacilitiesScreen = () => {
  const { t } = useLanguage();
  const [facilities, setFacilities] = useState(DEFAULTS.FACILITIES);

  useEffect(() => {
    storageService.getItem(CONTENT_KEYS.FACILITIES).then((v) => { if (v) setFacilities(v); });
  }, []);

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        icon="rotate-3d-variant"
        onPress={() => Linking.openURL('https://your-college-tour.com')}
        style={styles.tourBtn}
        contentStyle={{ height: 52 }}
      >
        {t('facilities.virtualTourBtn')}
      </Button>

      <FlatList
        data={facilities}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Card style={styles.gridItem}>
            <Card.Content style={styles.cardContent}>
              <Avatar.Icon
                size={44}
                icon={item.icon || 'office-building'}
                backgroundColor={COLORS.primary + '15'}
                color={COLORS.primary}
              />
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.desc} numberOfLines={2}>{item.desc}</Text>
              <View style={styles.footer}>
                <Text style={styles.timing}>{item.timing}</Text>
                <IconButton icon="information-outline" size={16} onPress={() => {}} />
              </View>
            </Card.Content>
          </Card>
        )}
        ListEmptyComponent={<Text style={styles.empty}>{t('facilities.noFacilities')}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: '#F8F9FA' },
  tourBtn:     { margin: 15, backgroundColor: COLORS.primary, borderRadius: 12, elevation: 4 },
  list:        { paddingHorizontal: 10, paddingBottom: 20 },
  gridItem:    { width: (width / 2) - 20, margin: 10, backgroundColor: '#FFF', borderRadius: 15, elevation: 2 },
  cardContent: { alignItems: 'center', paddingVertical: 14 },
  name:        { fontSize: 14, fontWeight: 'bold', marginTop: 10, color: '#333', textAlign: 'center' },
  desc:        { fontSize: 11, color: '#777', textAlign: 'center', marginTop: 4, lineHeight: 16 },
  footer:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 8, borderTopWidth: 0.5, borderColor: '#EEE', paddingTop: 4 },
  timing:      { fontSize: 10, fontWeight: 'bold', color: COLORS.primary },
  empty:       { textAlign: 'center', color: '#999', marginTop: 60 },
});

export default FacilitiesScreen;
