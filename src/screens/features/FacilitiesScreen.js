// src/screens/features/FacilitiesScreen.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Dimensions, Linking, Text } from 'react-native';
import { Card, Button, Avatar, IconButton } from 'react-native-paper';
import { storageService } from '../../utils/storage';
import { CONTENT_KEYS, DEFAULTS } from '../../constants/contentKeys';
import { COLORS } from '../../constants/theme';

const { width } = Dimensions.get('window');

const FacilitiesScreen = () => {
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
        START VIRTUAL TOUR (360°)
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
        ListEmptyComponent={<Text style={styles.empty}>No facilities listed yet.</Text>}
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

// import React from 'react';
// import { 
//   View, 
//   FlatList, 
//   StyleSheet, 
//   Dimensions, 
//   TouchableOpacity, 
//   Linking 
// } from 'react-native';
// import { Text, Card, Button, Avatar, IconButton } from 'react-native-paper';
// import { COLORS } from '../../constants/theme';

// const { width } = Dimensions.get('window');

// const FACILITIES_DATA = [
//   { 
//     id: '1', 
//     name: 'Mosque', 
//     icon: 'mosque', 
//     desc: 'Spacious prayer hall for daily prayers.', 
//     timing: '24 Hours',
//     contact: 'Imam' 
//   },
//   { 
//     id: '2', 
//     name: 'Library', 
//     icon: 'library', 
//     desc: 'Extensive collection of Islamic & academic texts.', 
//     timing: '8 AM - 8 PM',
//     contact: 'Librarian' 
//   },
//   { 
//     id: '3', 
//     name: 'Computer Lab', 
//     icon: 'laptop', 
//     desc: 'Modern systems with high-speed internet.', 
//     timing: '9 AM - 4 PM',
//     contact: 'Lab Asst.' 
//   },
//   { 
//     id: '4', 
//     name: 'Sports Ground', 
//     icon: 'soccer', 
//     desc: 'Facilities for football, cricket and more.', 
//     timing: '4 PM - 6:30 PM',
//     contact: 'Coach' 
//   },
//   { 
//     id: '5', 
//     name: 'Dining Hall', 
//     icon: 'silverware-fork-knife', 
//     desc: 'Hygienic mess providing nutritious meals.', 
//     timing: 'Meal Times',
//     contact: 'Warden' 
//   },
//   { 
//     id: '6', 
//     name: 'Hostel', 
//     icon: 'bed', 
//     desc: 'Comfortable residential quarters for students.', 
//     timing: '24 Hours',
//     contact: 'Hostel Mgr' 
//   },
// ];

// const FacilitiesScreen = () => {

//   const handleVirtualTour = () => {
//     // Replace with actual 360 link or video URL
//     Linking.openURL('https://your-college-tour.com');
//   };

//   const renderFacility = ({ item }) => (
//     <Card style={styles.gridItem}>
//       <Card.Content style={styles.cardContent}>
//         <Avatar.Icon 
//           size={45} 
//           icon={item.icon} 
//           backgroundColor={COLORS.primary + '15'} 
//           color={COLORS.primary} 
//         />
//         <Text style={styles.facilityName}>{item.name}</Text>
//         <Text style={styles.description} numberOfLines={2}>{item.desc}</Text>
        
//         <View style={styles.footer}>
//           <Text style={styles.timing}>{item.timing}</Text>
//           <IconButton 
//             icon="information-outline" 
//             size={18} 
//             onPress={() => {}} 
//           />
//         </View>
//       </Card.Content>
//     </Card>
//   );

//   return (
//     <View style={styles.container}>
//       {/* 360 Virtual Tour Button */}
//       <Button 
//         mode="contained" 
//         icon="rotate-3d-variant" 
//         onPress={handleVirtualTour}
//         style={styles.tourButton}
//         contentStyle={styles.tourButtonContent}
//       >
//         START VIRTUAL TOUR (360°)
//       </Button>

//       <FlatList
//         data={FACILITIES_DATA}
//         numColumns={2}
//         renderItem={renderFacility}
//         keyExtractor={item => item.id}
//         contentContainerStyle={styles.listPadding}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { 
//     flex: 1, 
//     backgroundColor: '#F8F9FA' 
//   },
//   tourButton: {
//     margin: 15,
//     backgroundColor: COLORS.primary,
//     borderRadius: 12,
//     elevation: 4,
//   },
//   tourButtonContent: {
//     height: 55,
//   },
//   listPadding: { 
//     paddingHorizontal: 10, 
//     paddingBottom: 20 
//   },
//   gridItem: { 
//     width: (width / 2) - 20, 
//     margin: 10, 
//     backgroundColor: '#FFF',
//     borderRadius: 15,
//     elevation: 2,
//   },
//   cardContent: {
//     alignItems: 'center',
//     paddingVertical: 15,
//   },
//   facilityName: { 
//     fontSize: 15, 
//     fontWeight: 'bold', 
//     marginTop: 10,
//     color: '#333'
//   },
//   description: { 
//     fontSize: 11, 
//     color: '#777', 
//     textAlign: 'center', 
//     marginTop: 5,
//     lineHeight: 16
//   },
//   footer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginTop: 10,
//     borderTopWidth: 0.5,
//     borderColor: '#EEE',
//     paddingTop: 5
//   },
//   timing: {
//     fontSize: 10,
//     fontWeight: 'bold',
//     color: COLORS.primary
//   }
// });

// export default FacilitiesScreen;