import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Card, List, Divider, Button } from 'react-native-paper';
import { COLORS } from '../../constants/theme';

const DarsDetailsScreen = () => (
  <ScrollView style={styles.container}>
    <Card style={styles.card}>
      <Card.Title title="Program Overview" titleStyle={styles.bold} />
      <Card.Content>
        <Text style={styles.para}>The Busthanul Uloom Dars program is a traditional yet systematic approach to Islamic studies, blending classical texts with modern pedagogical methods.</Text>
      </Card.Content>
    </Card>

    <List.Section title="Core Curriculum">
      <List.Accordion title="Primary (Years 1-3)" left={p => <List.Icon {...p} icon="book-outline" />}>
        <List.Item title="Arabic Grammar (Nahw/Sarf)" />
        <List.Item title="Fiqh (Jurisprudence) - Basic" />
      </List.Accordion>
      <List.Accordion title="Secondary (Years 4-7)" left={p => <List.Icon {...p} icon="mosque" />}>
        <List.Item title="Usul al-Fiqh" />
        <List.Item title="Hadith Studies (Bukhari/Muslim)" />
      </List.Accordion>
    </List.Section>

    <Button icon="download" mode="contained" style={styles.btn}>Download Syllabus (PDF)</Button>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', padding: 15 },
  card: { marginBottom: 15, backgroundColor: '#FFF' },
  bold: { fontWeight: 'bold', color: COLORS.primary },
  para: { lineHeight: 22, color: '#444' },
  btn: { marginVertical: 20, backgroundColor: COLORS.primary }
});

export default DarsDetailsScreen;