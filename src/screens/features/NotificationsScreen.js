// src/screens/features/NotificationsScreen.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Linking, Text } from 'react-native';
import { List, Avatar, Divider, Chip, FAB } from 'react-native-paper';
import { storageService } from '../../utils/storage';
import { CONTENT_KEYS, DEFAULTS } from '../../constants/contentKeys';
import { COLORS } from '../../constants/theme';

const NotificationsScreen = () => {
  const [filter,        setFilter]        = useState('All');
  const [notifications, setNotifications] = useState(DEFAULTS.NOTIFICATIONS);

  const load = () => {
    storageService.getItem(CONTENT_KEYS.NOTIFICATIONS).then((v) => { if (v) setNotifications(v); });
  };

  useEffect(() => { load(); }, []);

  const filtered = notifications.filter(
    (n) => filter === 'All' || n.category === filter
  );

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

// import React, { useState } from 'react';
// import { View, FlatList, StyleSheet, TouchableOpacity, Linking } from 'react-native';
// import { Text, List, Avatar, Divider, Chip, FAB } from 'react-native-paper';
// import { COLORS } from '../../constants/theme';

// const NOTIFICATIONS = [
//   { id: '1', title: 'Eid Holidays', desc: 'The campus will remain closed from April 10 to 15.', category: 'Notice', time: '2h ago', icon: 'bullhorn-variant' },
//   { id: '2', title: 'Exam Hall Ticket', desc: 'Download your hall tickets for the Mid-Term exam.', category: 'Document', time: '1d ago', icon: 'file-pdf-box', isDoc: true },
//   { id: '3', title: 'BUSA Election Results', desc: 'New committee members have been announced.', category: 'Notice', time: '3d ago', icon: 'account-group' },
//   { id: '4', title: 'Fee Structure 2024', desc: 'Official fee structure for the upcoming academic year.', category: 'Document', time: '5d ago', icon: 'file-document', isDoc: true },
// ];

// const NotificationsScreen = () => {
//   const [filter, setFilter] = useState('All');

//   const filteredData = NOTIFICATIONS.filter(item => 
//     filter === 'All' ? true : item.category === filter
//   );

//   const renderItem = ({ item }) => (
//     <TouchableOpacity 
//       style={styles.itemContainer}
//       onPress={() => item.isDoc ? Linking.openURL('https://example.com/sample.pdf') : null}
//     >
//       <List.Item
//         title={item.title}
//         description={item.desc}
//         titleStyle={styles.itemTitle}
//         descriptionStyle={styles.itemDesc}
//         left={props => (
//           <Avatar.Icon 
//             {...props} 
//             icon={item.icon} 
//             size={44} 
//             backgroundColor={item.isDoc ? COLORS.primary + '15' : '#F0F0F0'} 
//             color={item.isDoc ? COLORS.primary : '#666'} 
//           />
//         )}
//         right={() => (
//           <View style={styles.rightContent}>
//             <Text style={styles.timeText}>{item.time}</Text>
//             {item.isDoc && <List.Icon icon="download" color={COLORS.primary} />}
//           </View>
//         )}
//       />
//       <Divider style={styles.divider} />
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       {/* Filter Chips */}
//       <View style={styles.filterRow}>
//         {['All', 'Notice', 'Document'].map((cat) => (
//           <Chip 
//             key={cat}
//             selected={filter === cat}
//             onPress={() => setFilter(cat)}
//             style={styles.chip}
//             selectedColor={COLORS.white}
//             background={filter === cat ? COLORS.primary : '#E0E0E0'}
//           >
//             {cat}
//           </Chip>
//         ))}
//       </View>

//       {/* List */}
//       <FlatList
//         data={filteredData}
//         keyExtractor={item => item.id}
//         renderItem={renderItem}
//         contentContainerStyle={styles.listPadding}
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Text style={styles.emptyText}>No notifications found in this category.</Text>
//           </View>
//         }
//       />

//       {/* Floating Refresh Button */}
//       <FAB
//         icon="refresh"
//         style={styles.fab}
//         color={COLORS.white}
//         onPress={() => console.log('Refreshing...')}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#FFF' },
//   filterRow: { flexDirection: 'row', padding: 15, backgroundColor: '#F8F9FA' },
//   chip: { marginRight: 10 },
//   listPadding: { paddingBottom: 100 },
//   itemContainer: { paddingVertical: 5 },
//   itemTitle: { fontWeight: 'bold', fontSize: 16, color: '#333' },
//   itemDesc: { fontSize: 13, color: '#666', marginTop: 4 },
//   divider: { marginHorizontal: 70 },
//   rightContent: { justifyContent: 'center', alignItems: 'flex-end' },
//   timeText: { fontSize: 11, color: '#AAA' },
//   emptyContainer: { marginTop: 100, alignItems: 'center' },
//   emptyText: { color: '#999' },
//   fab: {
//     position: 'absolute',
//     margin: 16,
//     right: 0,
//     bottom: 0,
//     backgroundColor: COLORS.primary,
//   },
// });

// export default NotificationsScreen;

