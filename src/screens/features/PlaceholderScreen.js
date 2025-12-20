import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';

const PlaceholderScreen = ({ route }) => (
  <View style={styles.container}>
    <Text style={styles.text}>Welcome to the</Text>
    <Text style={styles.screenName}>{route?.name || 'Feature'}</Text>
    <Text style={styles.text}>Screen</Text>
    <Text style={styles.subtitle}>Development in Progress</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FA' },
  text: { fontSize: 18, color: '#666' },
  screenName: { fontSize: 24, fontWeight: 'bold', color: COLORS.primary, marginVertical: 10 },
  subtitle: { fontSize: 14, color: '#999', marginTop: 20 },
});

export default PlaceholderScreen;