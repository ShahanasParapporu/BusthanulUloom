// src/screens/features/ExamScheduleScreen.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Text, Badge, IconButton } from 'react-native-paper';
import { storageService } from '../../utils/storage';
import { CONTENT_KEYS, DEFAULTS } from '../../constants/contentKeys';
import { COLORS } from '../../constants/theme';

const STATUS_COLORS = {
  Upcoming:  COLORS.primary,
  Scheduled: '#1565C0',
  Completed: '#757575',
};

const ExamScheduleScreen = () => {
  const [exams, setExams] = useState(DEFAULTS.EXAMS);

  useEffect(() => {
    storageService.getItem(CONTENT_KEYS.EXAMS).then((v) => { if (v) setExams(v); });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={exams}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.examName}>{item.name}</Text>
                  <Text style={styles.date}>{item.date}{item.time ? ` • ${item.time}` : ''}</Text>
                </View>
                <Badge style={{ backgroundColor: STATUS_COLORS[item.status] || COLORS.primary }}>
                  {item.status}
                </Badge>
              </View>
            </Card.Content>
            <Card.Actions>
              <IconButton icon="bell-outline" onPress={() => {}} />
              <IconButton icon="download"     onPress={() => {}} />
            </Card.Actions>
          </Card>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No exams scheduled yet.</Text>}
        contentContainerStyle={{ padding: 15 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  card:      { marginBottom: 12 },
  row:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  examName:  { fontSize: 17, fontWeight: 'bold' },
  date:      { color: '#666', marginTop: 4 },
  empty:     { textAlign: 'center', color: '#999', marginTop: 60 },
});

export default ExamScheduleScreen;


// import React from 'react';
// import { FlatList, View, StyleSheet } from 'react-native';
// import { Card, Text, Badge, IconButton } from 'react-native-paper';
// import { COLORS } from '../../constants/theme';

// const exams = [
//   { id: '1', name: 'Mid-Term Examination', date: 'Oct 25, 2024', time: '09:00 AM', status: 'Upcoming' },
//   { id: '2', name: 'Final Semester', date: 'Dec 15, 2024', time: '10:30 AM', status: 'Scheduled' },
// ];

// const ExamScheduleScreen = () => (
//   <View style={styles.container}>
//     <FlatList
//       data={exams}
//       renderItem={({ item }) => (
//         <Card style={styles.card}>
//           <Card.Content>
//             <View style={styles.row}>
//               <View>
//                 <Text style={styles.examName}>{item.name}</Text>
//                 <Text style={styles.date}>{item.date} • {item.time}</Text>
//               </View>
//               <Badge style={{ backgroundColor: COLORS.primary }}>{item.status}</Badge>
//             </View>
//           </Card.Content>
//           <Card.Actions>
//             <IconButton icon="bell-outline" onPress={() => {}} />
//             <IconButton icon="download" onPress={() => {}} />
//           </Card.Actions>
//         </Card>
//       )}
//     />
//   </View>
// );

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 15, backgroundColor: '#F8F9FA' },
//   card: { marginBottom: 12 },
//   row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
//   examName: { fontSize: 18, fontWeight: 'bold' },
//   date: { color: '#666', marginTop: 4 }
// });

// export default ExamScheduleScreen;