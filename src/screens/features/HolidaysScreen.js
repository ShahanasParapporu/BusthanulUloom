import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { List, Avatar } from 'react-native-paper';

const holidays = [
  { id: '1', name: 'Eid al-Fitr', date: 'Apr 10', type: 'Religious', color: '#2E7D32' },
  { id: '2', name: 'Independence Day', date: 'Aug 15', type: 'National', color: '#1565C0' },
  { id: '3', name: 'Winter Break', date: 'Dec 24', type: 'Academic', color: '#E65100' },
];

const HolidaysScreen = () => (
  <FlatList
    data={holidays}
    renderItem={({ item }) => (
      <List.Item
        title={item.name}
        description={item.date}
        left={p => <Avatar.Icon {...p} icon="calendar-check" backgroundColor={item.color} size={40} />}
        right={p => <List.Subheader>{item.type}</List.Subheader>}
        style={styles.item}
      />
    )}
  />
);

const styles = StyleSheet.create({ item: { backgroundColor: '#FFF', borderBottomWidth: 1, borderColor: '#EEE' } });

export default HolidaysScreen;