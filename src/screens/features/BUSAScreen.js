import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Avatar, Text, Card, Title, Paragraph } from 'react-native-paper';
import { COLORS } from '../../constants/theme';

const BUSAScreen = () => (
  <ScrollView style={styles.container}>
    <Title style={styles.title}>Committee 2024-25</Title>
    <View style={styles.memberRow}>
      <View style={styles.member}>
        <Avatar.Text size={60} label="PR" backgroundColor={COLORS.primary} />
        <Text style={styles.memberName}>President</Text>
      </View>
      <View style={styles.member}>
        <Avatar.Text size={60} label="SE" backgroundColor={COLORS.secondary} color={COLORS.primary}/>
        <Text style={styles.memberName}>Secretary</Text>
      </View>
    </View>

    <Card style={styles.card}>
      <Card.Title title="Latest Achievements" />
      <Card.Content>
        <Paragraph>• Winners of State Level Arabic Quiz 2024</Paragraph>
        <Paragraph>• Organized 'Ilm Fest' Community Outreach</Paragraph>
      </Card.Content>
    </Card>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { textAlign: 'center', marginBottom: 20, color: COLORS.primary },
  memberRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30 },
  member: { alignItems: 'center' },
  memberName: { marginTop: 8, fontWeight: '600' },
  card: { marginTop: 10 }
});

export default BUSAScreen;