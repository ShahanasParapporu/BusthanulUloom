// src/screens/features/BUSAScreen.js
import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Avatar, Text, Card } from 'react-native-paper';
import { storageService } from '../../utils/storage';
import { CONTENT_KEYS, DEFAULTS } from '../../constants/contentKeys';
import { COLORS } from '../../constants/theme';

const BUSAScreen = () => {
  const [busa, setBusa] = useState(DEFAULTS.BUSA);

  useEffect(() => {
    storageService.getItem(CONTENT_KEYS.BUSA).then((v) => { if (v) setBusa(v); });
  }, []);

  const initials = (name) =>
    (name || '')
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || '??';

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Committee 2024–25</Text>

      <View style={styles.memberRow}>
        <View style={styles.member}>
          <Avatar.Text size={64} label={initials(busa.president)} backgroundColor={COLORS.primary} />
          <Text style={styles.memberRole}>President</Text>
          <Text style={styles.memberName}>{busa.president}</Text>
        </View>
        <View style={styles.member}>
          <Avatar.Text size={64} label={initials(busa.secretary)} backgroundColor={COLORS.secondary || '#81C784'} color={COLORS.primary} />
          <Text style={styles.memberRole}>Secretary</Text>
          <Text style={styles.memberName}>{busa.secretary}</Text>
        </View>
      </View>

      <Card style={styles.card}>
        <Card.Title title="Latest Achievements" />
        <Card.Content>
          {(busa.achievements || []).length === 0 ? (
            <Text style={styles.empty}>No achievements listed yet.</Text>
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

// import React from 'react';
// import { ScrollView, View, StyleSheet } from 'react-native';
// import { Avatar, Text, Card, Title, Paragraph } from 'react-native-paper';
// import { COLORS } from '../../constants/theme';

// const BUSAScreen = () => (
//   <ScrollView style={styles.container}>
//     <Title style={styles.title}>Committee 2024-25</Title>
//     <View style={styles.memberRow}>
//       <View style={styles.member}>
//         <Avatar.Text size={60} label="PR" backgroundColor={COLORS.primary} />
//         <Text style={styles.memberName}>President</Text>
//       </View>
//       <View style={styles.member}>
//         <Avatar.Text size={60} label="SE" backgroundColor={COLORS.secondary} color={COLORS.primary}/>
//         <Text style={styles.memberName}>Secretary</Text>
//       </View>
//     </View>

//     <Card style={styles.card}>
//       <Card.Title title="Latest Achievements" />
//       <Card.Content>
//         <Paragraph>• Winners of State Level Arabic Quiz 2024</Paragraph>
//         <Paragraph>• Organized 'Ilm Fest' Community Outreach</Paragraph>
//       </Card.Content>
//     </Card>
//   </ScrollView>
// );

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { textAlign: 'center', marginBottom: 20, color: COLORS.primary },
//   memberRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30 },
//   member: { alignItems: 'center' },
//   memberName: { marginTop: 8, fontWeight: '600' },
//   card: { marginTop: 10 }
// });

// export default BUSAScreen;