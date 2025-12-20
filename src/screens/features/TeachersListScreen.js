import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Searchbar, Card, Avatar, IconButton, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../constants/theme';

// 1. MOCK DATA (Easy to move to a database/API later)
const TEACHERS_DATA = [
  {
    id: '1',
    name: 'Sayyid Ahmed Thangal',
    designation: 'Chief Mudirris',
    department: 'Fiqh',
    subject: 'Islamic Jurisprudence',
    email: 'ahmed@example.com',
    phone: '+919000000001',
    image: 'https://i.pravatar.cc/150?u=1',
  },
  {
    id: '2',
    name: 'Usthad Ibrahim Musliyar',
    designation: 'Senior Lecturer',
    department: 'Hadith',
    subject: 'Sahih Al-Bukhari',
    email: 'ibrahim@example.com',
    phone: '+919000000002',
    image: 'https://i.pravatar.cc/150?u=2',
  },
  {
    id: '3',
    name: 'Dr. Abdul Azeez',
    designation: 'Professor',
    department: 'Arabic',
    subject: 'Arabic Literature',
    email: 'azeez@example.com',
    phone: '+919000000003',
    image: 'https://i.pravatar.cc/150?u=3',
  },
];

const DEPARTMENTS = ['All', 'Fiqh', 'Hadith', 'Arabic', 'History'];

const TeachersListScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [isGridView, setIsGridView] = useState(false);

  // 2. FILTER LOGIC (Memoized for performance)
  const filteredTeachers = useMemo(() => {
    return TEACHERS_DATA.filter((t) => {
      const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            t.subject.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = selectedDept === 'All' || t.department === selectedDept;
      return matchesSearch && matchesDept;
    });
  }, [searchQuery, selectedDept]);

  const handleContact = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  // 3. RENDER ITEM (Grid or List)
  const renderTeacher = ({ item }) => (
    <Card style={[styles.card, isGridView ? styles.gridCard : styles.listCard]}>
      <Card.Content style={isGridView ? styles.gridContent : styles.listContent}>
        <Avatar.Image size={isGridView ? 70 : 60} source={{ uri: item.image }} />
        
        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.designation}>{item.designation}</Text>
          <View style={styles.subjectBadge}>
            <Text style={styles.subjectText}>{item.subject}</Text>
          </View>
        </View>

        <IconButton 
          icon="phone-outline" 
          mode="contained"
          containerColor={COLORS.primary + '15'}
          iconColor={COLORS.primary} 
          size={20} 
          onPress={() => handleContact(item.phone)} 
        />
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Search and Toggle Header */}
      <View style={styles.topHeader}>
        <Searchbar
          placeholder="Search teachers..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          elevation={1}
        />
        <IconButton 
          icon={isGridView ? "view-list" : "view-grid"} 
          onPress={() => setIsGridView(!isGridView)} 
        />
      </View>

      {/* Department Filter Chips */}
      <View>
        <FlatList
          horizontal
          data={DEPARTMENTS}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipList}
          renderItem={({ item }) => (
            <Chip 
              selected={selectedDept === item} 
              onPress={() => setSelectedDept(item)}
              style={styles.chip}
              selectedColor="#FFF"
              showSelectedOverlay
              textStyle={{ color: selectedDept === item ? '#FFF' : '#666' }}
              background={selectedDept === item ? COLORS.primary : '#E0E0E0'}
            >
              {item}
            </Chip>
          )}
        />
      </View>

      {/* Main List */}
      <FlatList
        key={isGridView ? 'G' : 'L'} // Force re-render when switching views
        data={filteredTeachers}
        renderItem={renderTeacher}
        keyExtractor={(item) => item.id}
        numColumns={isGridView ? 2 : 1}
        contentContainerStyle={styles.listPadding}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No teachers found.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  topHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 15, 
    paddingTop: 15 
  },
  searchBar: { flex: 1, borderRadius: 12, backgroundColor: '#FFF', height: 45 },
  chipList: { paddingHorizontal: 15, paddingVertical: 15 },
  chip: { marginRight: 8, height: 34, justifyContent: 'center' },
  listPadding: { paddingHorizontal: 15, paddingBottom: 30 },
  
  card: { backgroundColor: '#FFF', marginBottom: 12, elevation: 2, borderRadius: 15 },
  listCard: { width: '100%' },
  gridCard: { width: '48%', marginHorizontal: '1%' },
  
  listContent: { flexDirection: 'row', alignItems: 'center' },
  gridContent: { alignItems: 'center', paddingTop: 20 },
  
  infoContainer: { flex: 1, marginLeft: 15 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  designation: { fontSize: 12, color: COLORS.primary, fontWeight: '600', marginBottom: 5 },
  subjectBadge: { backgroundColor: '#F0F0F0', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, alignSelf: 'flex-start' },
  subjectText: { fontSize: 10, color: '#666' },
  
  emptyText: { textAlign: 'center', marginTop: 50, color: '#999' },
});

export default TeachersListScreen;