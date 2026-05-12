// src/screens/features/DayInDarsScreen.js
import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Text, Card, Avatar, IconButton } from 'react-native-paper';
import { storageService } from '../../utils/storage';
import { CONTENT_KEYS, DEFAULTS } from '../../constants/contentKeys';
import { COLORS } from '../../constants/theme';
import { useLanguage } from '../../i18n/LanguageContext';

const DayInDarsScreen = () => {
  const [schedule, setSchedule]   = useState(DEFAULTS.DAY_SCHEDULE);
  const [expanded, setExpanded]   = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    storageService.getItem(CONTENT_KEYS.DAY_SCHEDULE).then((v) => { if (v) setSchedule(v); });
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Video placeholder */}
      <Card style={styles.videoCard}>
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1523050853064-8504f434033b?q=80&w=1000' }}
          style={styles.videoThumb}
          imageStyle={{ borderRadius: 12 }}
        >
          <View style={styles.videoOverlay}>
            <IconButton icon="play-circle" iconColor="#FFF" size={60} onPress={() => {}} />
            <Text style={styles.videoTitle}>{t('dayInDars.videoTitle')}</Text>
          </View>
        </ImageBackground>
      </Card>

      <Text style={styles.sectionTitle}>{t('dayInDars.dailyRoutine')}</Text>

      <View style={styles.timeline}>
        {schedule.map((item, index) => (
          <View key={item.id} style={styles.row}>
            {/* Time column */}
            <View style={styles.timeCol}>
              <Text style={styles.timeText}>{item.time}</Text>
              {index !== schedule.length - 1 && <View style={styles.line} />}
            </View>
            {/* Dot */}
            <View style={styles.dotCol}>
              <View style={[styles.dot, { backgroundColor: expanded === item.id ? COLORS.primary : '#DDD' }]} />
            </View>
            {/* Card */}
            <TouchableOpacity
              style={styles.contentCol}
              onPress={() => setExpanded(expanded === item.id ? null : item.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.eventCard, expanded === item.id && styles.activeCard]}>
                <View style={styles.eventHeader}>
                  <Avatar.Icon
                    size={34}
                    icon={item.icon || 'clock-outline'}
                    backgroundColor={expanded === item.id ? COLORS.primary : '#F0F0F0'}
                    color={expanded === item.id ? '#FFF' : '#666'}
                  />
                  <Text style={[styles.eventTitle, expanded === item.id && { color: COLORS.primary }]}>
                    {item.event}
                  </Text>
                </View>
                {expanded === item.id && item.detail ? (
                  <Text style={styles.detail}>{item.detail}</Text>
                ) : null}
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: '#F8F9FA' },
  videoCard:    { margin: 15, elevation: 4, borderRadius: 12 },
  videoThumb:   { width: '100%', height: 200, justifyContent: 'center', alignItems: 'center' },
  videoOverlay: { backgroundColor: 'rgba(0,0,0,0.4)', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 12 },
  videoTitle:   { color: '#FFF', fontWeight: 'bold', fontSize: 15, marginTop: -8 },
  sectionTitle: { fontSize: 20, fontWeight: '800', marginHorizontal: 20, marginVertical: 14, color: '#333' },
  timeline:     { paddingHorizontal: 20, paddingBottom: 30 },
  row:          { flexDirection: 'row', minHeight: 76 },
  timeCol:      { width: 72, alignItems: 'flex-end', paddingRight: 10 },
  timeText:     { fontSize: 11, fontWeight: 'bold', color: '#777', marginTop: 6 },
  line:         { width: 2, flex: 1, backgroundColor: '#EEE', marginRight: 4, marginVertical: 4 },
  dotCol:       { width: 18, alignItems: 'center', marginTop: 8 },
  dot:          { width: 12, height: 12, borderRadius: 6, borderWidth: 2, borderColor: '#FFF', elevation: 2 },
  contentCol:   { flex: 1, marginLeft: 10, paddingBottom: 14 },
  eventCard:    { backgroundColor: '#FFF', padding: 10, borderRadius: 12, elevation: 1 },
  activeCard:   { borderColor: COLORS.primary, borderWidth: 1, backgroundColor: '#F1F8E9' },
  eventHeader:  { flexDirection: 'row', alignItems: 'center' },
  eventTitle:   { fontSize: 14, fontWeight: '700', marginLeft: 10, color: '#444', flex: 1 },
  detail:       { fontSize: 12, color: '#666', marginTop: 8, lineHeight: 18, paddingLeft: 44 },
});

export default DayInDarsScreen;