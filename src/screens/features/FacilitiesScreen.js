// src/screens/features/FacilitiesScreen.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Dimensions, Linking, Text,TouchableOpacity } from 'react-native';
import { Card, Button, Avatar, IconButton } from 'react-native-paper';
import { storageService } from '../../utils/storage';
import { CONTENT_KEYS, getDefaults } from '../../constants/contentKeys';
import { COLORS } from '../../constants/theme';
import { useLanguage } from '../../i18n/LanguageContext';

const { width } = Dimensions.get('window');

const FacilitiesScreen = () => {
  const { t, language } = useLanguage();
const [facilities, setFacilities] = useState(
  getDefaults(language).FACILITIES
);

const [expandedId, setExpandedId] = useState(null);

// const FacilitiesScreen = () => {
//   const { t, language } = useLanguage();
// const [facilities, setFacilities] = useState(
//   getDefaults(language).FACILITIES
// );

useEffect(() => {
  storageService
    .getItem(CONTENT_KEYS.FACILITIES)
    .then((saved) => {
      if (saved) {
        setFacilities(saved);
      } else {
        setFacilities(
          getDefaults(language).FACILITIES ?? []
        );
      }
    });
}, [language]);

return (
  <View style={styles.container}>
    {/* Optional Virtual Tour Button */}
    {/* 
    <Button
      mode="contained"
      icon="rotate-3d-variant"
      onPress={() =>
        Linking.openURL(
          'https://your-college-tour.com'
        )
      }
      style={styles.tourBtn}
      contentStyle={{ height: 52 }}
    >
      {t('facilities.virtualTourBtn')}
    </Button>
    */}

    <FlatList
      data={facilities}
      numColumns={2}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        const expanded = expandedId === item.id;

        return (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              setExpandedId(
                expanded ? null : item.id
              )
            }
          >
            <Card
              style={[
                styles.gridItem,
                expanded && styles.expandedCard,
              ]}
            >
              <Card.Content
                style={styles.cardContent}
              >
                <Avatar.Icon
                  size={44}
                  icon={
                    item.icon ||
                    'office-building'
                  }
                  backgroundColor={
                    COLORS.primary + '15'
                  }
                  color={COLORS.primary}
                />

                <Text style={styles.name}>
                  {item.name}
                </Text>

                <Text
                  style={styles.desc}
                  numberOfLines={
                    expanded ? undefined : 2
                  }
                >
                  {item.desc}
                </Text>

                <View style={styles.footer}>
                  <Text style={styles.timing}>
                    {item.timing}
                  </Text>

                  <IconButton
                    icon={
                      expanded
                        ? 'chevron-up'
                        : 'information-outline'
                    }
                    size={16}
                    onPress={() =>
                      setExpandedId(
                        expanded
                          ? null
                          : item.id
                      )
                    }
                  />
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        );
      }}
      ListEmptyComponent={
        <Text style={styles.empty}>
          {t('facilities.noFacilities')}
        </Text>
      }
    />
  </View>
);
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },

  tourBtn: {
    margin: 15,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    elevation: 4,
  },

  list: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },

  gridItem: {
    width: (width / 2) - 20,
    margin: 10,
    backgroundColor: '#FFF',
    borderRadius: 15,
    elevation: 2,
  },

  expandedCard: {
    borderWidth: 1,
    borderColor: COLORS.primary,
  },

  cardContent: {
    alignItems: 'center',
    paddingVertical: 14,
  },

  name: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
    textAlign: 'center',
  },

  desc: {
    fontSize: 11,
    color: '#777',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 16,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
    borderTopWidth: 0.5,
    borderColor: '#EEE',
    paddingTop: 4,
  },

  timing: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.primary,
  },

  empty: {
    textAlign: 'center',
    color: '#999',
    marginTop: 60,
  },
});

export default FacilitiesScreen;