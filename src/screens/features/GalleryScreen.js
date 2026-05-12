// src/screens/features/GalleryScreen.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Dimensions, StyleSheet, TouchableOpacity, Linking, Text } from 'react-native';
import { SegmentedButtons, IconButton } from 'react-native-paper';
import { storageService } from '../../utils/storage';
import { CONTENT_KEYS, DEFAULTS } from '../../constants/contentKeys';
import { useLanguage } from '../../i18n/LanguageContext';


const { width } = Dimensions.get('window');

const GalleryScreen = () => {
  const { t } = useLanguage();
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
          { value: 'photos', label: t('gallery.photos'),  icon: 'image' },
          { value: 'videos', label: t('gallery.videos'), icon: 'play-video' },
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
        ListEmptyComponent={<Text style={styles.empty}>
        {tab === 'photos' ? t('gallery.noPhotos') : t('gallery.noVideos')}
      </Text>}
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

