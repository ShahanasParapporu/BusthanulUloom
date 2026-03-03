// src/screens/features/DarsDetailsScreen.js
import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { Card, List, Button } from 'react-native-paper';
import { storageService } from '../../utils/storage';
import { CONTENT_KEYS, DEFAULTS } from '../../constants/contentKeys';
import { COLORS } from '../../constants/theme';

const DarsDetailsScreen = () => {
  const [overview,    setOverview]    = useState(DEFAULTS.DARS_OVERVIEW);
  const [curriculum,  setCurriculum]  = useState(DEFAULTS.DARS_CURRICULUM);
  const [expanded,    setExpanded]    = useState(null);

  useEffect(() => {
    (async () => {
      const ov = await storageService.getItem(CONTENT_KEYS.DARS_OVERVIEW);
      const cu = await storageService.getItem(CONTENT_KEYS.DARS_CURRICULUM);
      if (ov) setOverview(ov);
      if (cu) setCurriculum(cu);
    })();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Program Overview" titleStyle={styles.bold} />
        <Card.Content>
          <Text style={styles.para}>{overview}</Text>
        </Card.Content>
      </Card>

      <List.Section title="Core Curriculum" titleStyle={styles.sectionTitle}>
        {curriculum.map((item) => (
          <List.Accordion
            key={item.id}
            title={item.level}
            expanded={expanded === item.id}
            onPress={() => setExpanded(expanded === item.id ? null : item.id)}
            left={(p) => <List.Icon {...p} icon="book-outline" />}
          >
            {(item.subjects || '').split(',').map((subj, i) => (
              <List.Item key={i} title={subj.trim()} />
            ))}
          </List.Accordion>
        ))}
      </List.Section>

      <Button icon="download" mode="contained" style={styles.btn}>
        Download Syllabus (PDF)
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: '#F8F9FA', padding: 15 },
  card:         { marginBottom: 15, backgroundColor: '#FFF' },
  bold:         { fontWeight: 'bold', color: COLORS.primary },
  para:         { lineHeight: 22, color: '#444' },
  sectionTitle: { color: COLORS.primary, fontWeight: '700' },
  btn:          { marginVertical: 20, backgroundColor: COLORS.primary },
});

export default DarsDetailsScreen;

// import React from 'react';
// import { ScrollView, View, StyleSheet } from 'react-native';
// import { Text, Card, List, Divider, Button } from 'react-native-paper';
// import { COLORS } from '../../constants/theme';

// const DarsDetailsScreen = () => (
//   <ScrollView style={styles.container}>
//     <Card style={styles.card}>
//       <Card.Title title="Program Overview" titleStyle={styles.bold} />
//       <Card.Content>
//         <Text style={styles.para}>The Busthanul Uloom Dars program is a traditional yet systematic approach to Islamic studies, blending classical texts with modern pedagogical methods.</Text>
//       </Card.Content>
//     </Card>

//     <List.Section title="Core Curriculum">
//       <List.Accordion title="Primary (Years 1-3)" left={p => <List.Icon {...p} icon="book-outline" />}>
//         <List.Item title="Arabic Grammar (Nahw/Sarf)" />
//         <List.Item title="Fiqh (Jurisprudence) - Basic" />
//       </List.Accordion>
//       <List.Accordion title="Secondary (Years 4-7)" left={p => <List.Icon {...p} icon="mosque" />}>
//         <List.Item title="Usul al-Fiqh" />
//         <List.Item title="Hadith Studies (Bukhari/Muslim)" />
//       </List.Accordion>
//     </List.Section>

//     <Button icon="download" mode="contained" style={styles.btn}>Download Syllabus (PDF)</Button>
//   </ScrollView>
// );

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#F8F9FA', padding: 15 },
//   card: { marginBottom: 15, backgroundColor: '#FFF' },
//   bold: { fontWeight: 'bold', color: COLORS.primary },
//   para: { lineHeight: 22, color: '#444' },
//   btn: { marginVertical: 20, backgroundColor: COLORS.primary }
// });

// export default DarsDetailsScreen;