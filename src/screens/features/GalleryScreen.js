// src/screens/features/GalleryScreen.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Dimensions, StyleSheet, TouchableOpacity, Linking, Text } from 'react-native';
import { SegmentedButtons, IconButton } from 'react-native-paper';
import { storageService } from '../../utils/storage';
import { CONTENT_KEYS, DEFAULTS } from '../../constants/contentKeys';

const { width } = Dimensions.get('window');

const GalleryScreen = () => {
  const [tab,    setTab]    = useState('photos');
  const [photos, setPhotos] = useState(DEFAULTS.GALLERY_PHOTOS);
  const [videos, setVideos] = useState(DEFAULTS.GALLERY_VIDEOS);

  useEffect(() => {
    storageService.getItem(CONTENT_KEYS.GALLERY_PHOTOS).then((v) => { if (v) setPhotos(v); });
    storageService.getItem(CONTENT_KEYS.GALLERY_VIDEOS).then((v) => { if (v) setVideos(v); });
  }, []);

  const renderPhoto = ({ item }) => (
    <View style={styles.photoWrap}>
      <Image source={{ uri: item.url }} style={styles.photo} />
      {item.caption ? <Text style={styles.caption}>{item.caption}</Text> : null}
    </View>
  );

  const renderVideo = ({ item }) => (
    <TouchableOpacity style={styles.videoWrap} onPress={() => item.url && Linking.openURL(item.url)}>
      <Image source={{ uri: item.thumb }} style={styles.videoThumb} />
      <View style={styles.videoOverlay}>
        <IconButton icon="play-circle" iconColor="#FFF" size={40} />
        <View style={styles.videoInfo}>
          <Text style={styles.videoTitle}>{item.title}</Text>
          {item.duration ? <Text style={styles.videoDuration}>{item.duration}</Text> : null}
        </View>
      </View>
    </TouchableOpacity>
  );

  const data   = tab === 'photos' ? photos : videos;
  const render = tab === 'photos' ? renderPhoto : renderVideo;

  return (
    <View style={styles.container}>
      <SegmentedButtons
        value={tab}
        onValueChange={setTab}
        buttons={[
          { value: 'photos', label: 'Photos', icon: 'image' },
          { value: 'videos', label: 'Videos', icon: 'play-video' },
        ]}
        style={styles.segment}
      />
      <FlatList
        data={data}
        key={tab}
        numColumns={tab === 'photos' ? 2 : 1}
        keyExtractor={(item) => item.id}
        renderItem={render}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>No {tab} added yet.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: '#F8F9FA' },
  segment:      { margin: 15 },
  list:         { paddingHorizontal: 10, paddingBottom: 20 },
  photoWrap:    { width: (width / 2) - 15, margin: 5 },
  photo:        { width: '100%', height: 150, borderRadius: 12 },
  caption:      { fontSize: 11, color: '#666', textAlign: 'center', marginTop: 4 },
  videoWrap:    { width: width - 30, height: 200, margin: 5, borderRadius: 12, overflow: 'hidden', backgroundColor: '#000' },
  videoThumb:   { width: '100%', height: '100%', opacity: 0.7 },
  videoOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center' },
  videoInfo:    { position: 'absolute', bottom: 15, left: 15 },
  videoTitle:   { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
  videoDuration:{ color: '#DDD', fontSize: 12 },
  empty:        { textAlign: 'center', color: '#999', marginTop: 60 },
});

export default GalleryScreen;


// import React, { useState } from 'react';
// import { View, FlatList, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
// import { Text, SegmentedButtons, IconButton } from 'react-native-paper';
// import { COLORS } from '../../constants/theme';

// const { width } = Dimensions.get('window');

// const PHOTO_DATA = [
//   { id: '1', url: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=500' },
//   { id: '2', url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=500' },
//   { id: '3', url: 'https://images.unsplash.com/photo-1523050853064-8504f434033b?q=80&w=500' },
//   { id: '4', url: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=500' },
// ];

// const VIDEO_DATA = [
//   { id: '1', title: 'Annual Day 2023', duration: '05:20', thumb: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=500' },
//   { id: '2', title: 'Campus Tour', duration: '03:45', thumb: 'https://images.unsplash.com/photo-1524178232363-1fb28f74b0cd?q=80&w=500' },
// ];

// const GalleryScreen = () => {
//   const [value, setValue] = useState('photos');

//   const renderPhoto = ({ item }) => (
//     <TouchableOpacity style={styles.photoContainer}>
//       <Image source={{ uri: item.url }} style={styles.photo} />
//     </TouchableOpacity>
//   );

//   const renderVideo = ({ item }) => (
//     <TouchableOpacity style={styles.videoContainer}>
//       <Image source={{ uri: item.thumb }} style={styles.videoThumb} />
//       <View style={styles.videoOverlay}>
//         <IconButton icon="play-circle" iconColor="#FFF" size={40} />
//         <View style={styles.videoInfo}>
//           <Text style={styles.videoTitle}>{item.title}</Text>
//           <Text style={styles.videoDuration}>{item.duration}</Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <SegmentedButtons
//         value={value}
//         onValueChange={setValue}
//         buttons={[
//           { value: 'photos', label: 'Photos', icon: 'image' },
//           { value: 'videos', label: 'Videos', icon: 'play-video' },
//         ]}
//         style={styles.segment}
//       />

//       <FlatList
//         data={value === 'photos' ? PHOTO_DATA : VIDEO_DATA}
//         key={value} // Re-renders list when switching tabs
//         numColumns={value === 'photos' ? 2 : 1}
//         renderItem={value === 'photos' ? renderPhoto : renderVideo}
//         keyExtractor={item => item.id}
//         contentContainerStyle={styles.listPadding}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#F8F9FA' },
//   segment: { margin: 15 },
//   listPadding: { paddingHorizontal: 10, paddingBottom: 20 },
//   photoContainer: { width: (width / 2) - 15, height: 150, margin: 5 },
//   photo: { width: '100%', height: '100%', borderRadius: 12 },
//   videoContainer: { width: width - 30, height: 200, margin: 5, borderRadius: 12, overflow: 'hidden', backgroundColor: '#000' },
//   videoThumb: { width: '100%', height: '100%', opacity: 0.7 },
//   videoOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center' },
//   videoInfo: { position: 'absolute', bottom: 15, left: 15 },
//   videoTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
//   videoDuration: { color: '#DDD', fontSize: 12 },
// });

// export default GalleryScreen;

