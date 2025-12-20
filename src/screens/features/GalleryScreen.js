import React, { useState } from 'react';
import { View, FlatList, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, SegmentedButtons, IconButton } from 'react-native-paper';
import { COLORS } from '../../constants/theme';

const { width } = Dimensions.get('window');

const PHOTO_DATA = [
  { id: '1', url: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=500' },
  { id: '2', url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=500' },
  { id: '3', url: 'https://images.unsplash.com/photo-1523050853064-8504f434033b?q=80&w=500' },
  { id: '4', url: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=500' },
];

const VIDEO_DATA = [
  { id: '1', title: 'Annual Day 2023', duration: '05:20', thumb: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=500' },
  { id: '2', title: 'Campus Tour', duration: '03:45', thumb: 'https://images.unsplash.com/photo-1524178232363-1fb28f74b0cd?q=80&w=500' },
];

const GalleryScreen = () => {
  const [value, setValue] = useState('photos');

  const renderPhoto = ({ item }) => (
    <TouchableOpacity style={styles.photoContainer}>
      <Image source={{ uri: item.url }} style={styles.photo} />
    </TouchableOpacity>
  );

  const renderVideo = ({ item }) => (
    <TouchableOpacity style={styles.videoContainer}>
      <Image source={{ uri: item.thumb }} style={styles.videoThumb} />
      <View style={styles.videoOverlay}>
        <IconButton icon="play-circle" iconColor="#FFF" size={40} />
        <View style={styles.videoInfo}>
          <Text style={styles.videoTitle}>{item.title}</Text>
          <Text style={styles.videoDuration}>{item.duration}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          { value: 'photos', label: 'Photos', icon: 'image' },
          { value: 'videos', label: 'Videos', icon: 'play-video' },
        ]}
        style={styles.segment}
      />

      <FlatList
        data={value === 'photos' ? PHOTO_DATA : VIDEO_DATA}
        key={value} // Re-renders list when switching tabs
        numColumns={value === 'photos' ? 2 : 1}
        renderItem={value === 'photos' ? renderPhoto : renderVideo}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listPadding}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  segment: { margin: 15 },
  listPadding: { paddingHorizontal: 10, paddingBottom: 20 },
  photoContainer: { width: (width / 2) - 15, height: 150, margin: 5 },
  photo: { width: '100%', height: '100%', borderRadius: 12 },
  videoContainer: { width: width - 30, height: 200, margin: 5, borderRadius: 12, overflow: 'hidden', backgroundColor: '#000' },
  videoThumb: { width: '100%', height: '100%', opacity: 0.7 },
  videoOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center' },
  videoInfo: { position: 'absolute', bottom: 15, left: 15 },
  videoTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  videoDuration: { color: '#DDD', fontSize: 12 },
});

export default GalleryScreen;

// import React from 'react';
// import { FlatList, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

// const { width } = Dimensions.get('window');
// const images = [
//   { id: '1', url: 'https://via.placeholder.com/300' },
//   { id: '2', url: 'https://via.placeholder.com/301' },
//   { id: '3', url: 'https://via.placeholder.com/302' },
//   { id: '4', url: 'https://via.placeholder.com/303' },
// ];

// const GalleryScreen = () => (
//   <FlatList
//     data={images}
//     numColumns={2}
//     renderItem={({ item }) => (
//       <TouchableOpacity style={styles.gridItem}>
//         <Image source={{ uri: item.url }} style={styles.image} />
//       </TouchableOpacity>
//     )}
//     keyExtractor={item => item.id}
//   />
// );

// const styles = StyleSheet.create({
//   gridItem: { width: width / 2, height: 150, padding: 2 },
//   image: { width: '100%', height: '100%', borderRadius: 8 }
// });

// export default GalleryScreen;