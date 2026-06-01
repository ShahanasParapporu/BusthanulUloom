// src/screens/features/GalleryScreen.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View, FlatList, Image, Dimensions, StyleSheet,
  TouchableOpacity, Text, Modal, StatusBar,
  SafeAreaView, ActivityIndicator, TouchableWithoutFeedback, PanResponder,
} from 'react-native';
import { SegmentedButtons, IconButton } from 'react-native-paper';
import Video from 'react-native-video';
import { storageService } from '../../utils/storage';
import { CONTENT_KEYS, getDefaults } from '../../constants/contentKeys';
import { useLanguage } from '../../i18n/LanguageContext';

const { width, height } = Dimensions.get('window');
const PROGRESS_BAR_WIDTH = width - 40; // paddingHorizontal: 20 on each side

const GalleryScreen = () => {
  const { t, language } = useLanguage();

  const [tab, setTab] = useState('photos');
  const [photos, setPhotos] = useState(getDefaults(language).GALLERY_PHOTOS ?? []);
  const [videos, setVideos] = useState(getDefaults(language).GALLERY_VIDEOS ?? []);

  // Photo lightbox
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Video player
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [paused, setPaused] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekTime, setSeekTime] = useState(0);
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    storageService.getItem(CONTENT_KEYS.GALLERY_PHOTOS).then((saved) => {
      setPhotos(saved ?? getDefaults(language).GALLERY_PHOTOS ?? []);
    });
    storageService.getItem(CONTENT_KEYS.GALLERY_VIDEOS).then((saved) => {
      setVideos(saved ?? getDefaults(language).GALLERY_VIDEOS ?? []);
    });
  }, [language]);

  const openVideo = (item) => {
    setSelectedVideo(item);
    setPaused(false);
    setVideoLoading(true);
    setCurrentTime(0);
    setDuration(0);
  };

  const closeVideo = () => {
    setPaused(true);
    setSelectedVideo(null);
  };

  const formatTime = (secs = 0) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // Seek to a position from a touch X offset on the progress bar
  const seekFromX = (x) => {
    if (!duration) return;
    const clamped = Math.max(0, Math.min(x, PROGRESS_BAR_WIDTH));
    const ratio = clamped / PROGRESS_BAR_WIDTH;
    const time = ratio * duration;
    setSeekTime(time);
    return time;
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: (evt) => {
        setIsSeeking(true);
        seekFromX(evt.nativeEvent.locationX);
      },

      onPanResponderMove: (evt) => {
        seekFromX(evt.nativeEvent.locationX);
      },

      onPanResponderRelease: (evt) => {
        const time = seekFromX(evt.nativeEvent.locationX);
        if (videoRef.current && time !== undefined) {
          videoRef.current.seek(time);
          setCurrentTime(time);
        }
        setIsSeeking(false);
      },
    })
  ).current;

  const skipSeconds = (secs) => {
    if (!videoRef.current) return;
    const newTime = Math.max(0, Math.min(currentTime + secs, duration));
    videoRef.current.seek(newTime);
    setCurrentTime(newTime);
  };

  const displayTime = isSeeking ? seekTime : currentTime;
  const progress = duration > 0 ? displayTime / duration : 0;

  // ─── Renderers ────────────────────────────────────────────────────

  const renderPhoto = ({ item }) => (
    <TouchableOpacity
      style={styles.photoWrap}
      onPress={() => setSelectedPhoto(item)}
      activeOpacity={0.85}
    >
      <Image source={{ uri: item.url }} style={styles.photo} />
      {item.caption ? <Text style={styles.caption}>{item.caption}</Text> : null}
    </TouchableOpacity>
  );

  const renderVideo = ({ item }) => (
    <TouchableOpacity
      style={styles.videoWrap}
      onPress={() => openVideo(item)}
      activeOpacity={0.85}
    >
      <Image source={{ uri: item.thumb }} style={styles.videoThumb} />
      <View style={styles.videoOverlay}>
        <IconButton icon="play-circle" iconColor="#FFF" size={44} />
        <View style={styles.videoInfo}>
          <Text style={styles.videoTitle}>{item.title}</Text>
          {item.duration ? (
            <Text style={styles.videoDuration}>{item.duration}</Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );

  const data = tab === 'photos' ? photos : videos;
  const render = tab === 'photos' ? renderPhoto : renderVideo;

  return (
    <View style={styles.container}>
      <SegmentedButtons
        value={tab}
        onValueChange={setTab}
        buttons={[
          { value: 'photos', label: t('gallery.photos'), icon: 'image' },
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
        ListEmptyComponent={
          <Text style={styles.empty}>
            {tab === 'photos' ? t('gallery.noPhotos') : t('gallery.noVideos')}
          </Text>
        }
      />

      {/* ── Photo Lightbox ── */}
      <Modal
        visible={!!selectedPhoto}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setSelectedPhoto(null)}
      >
        <View style={styles.lightboxBg}>
          <SafeAreaView style={styles.lightboxSafe}>
            <TouchableOpacity
              style={styles.lightboxClose}
              onPress={() => setSelectedPhoto(null)}
            >
              <IconButton icon="close" iconColor="#FFF" size={28} />
            </TouchableOpacity>

            <TouchableWithoutFeedback onPress={() => setSelectedPhoto(null)}>
              <View style={styles.lightboxImageWrap}>
                {selectedPhoto && (
                  <Image
                    source={{ uri: selectedPhoto.url }}
                    style={styles.lightboxImage}
                    resizeMode="contain"
                  />
                )}
              </View>
            </TouchableWithoutFeedback>

            {selectedPhoto?.caption ? (
              <Text style={styles.lightboxCaption}>{selectedPhoto.caption}</Text>
            ) : null}
          </SafeAreaView>
        </View>
      </Modal>

      {/* ── Video Player Modal ── */}
      <Modal
        visible={!!selectedVideo}
        transparent={false}
        animationType="slide"
        statusBarTranslucent
        onRequestClose={closeVideo}
      >
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <View style={styles.playerBg}>
          <SafeAreaView style={styles.playerSafe}>

            {/* Header */}
            <View style={styles.playerHeader}>
              <TouchableOpacity onPress={closeVideo}>
                <IconButton icon="arrow-left" iconColor="#FFF" size={24} />
              </TouchableOpacity>
              <Text style={styles.playerHeaderTitle} numberOfLines={1}>
                {selectedVideo?.title}
              </Text>
            </View>

            {/* Video surface */}
            <View style={styles.playerVideoWrap}>
              {selectedVideo?.url ? (
                <>
                  <Video
                    ref={videoRef}
                    source={{ uri: selectedVideo.url }}
                    style={styles.playerVideo}
                    resizeMode="contain"
                    paused={paused}
                    onLoad={(data) => {
                      setDuration(data.duration);
                      setVideoLoading(false);
                    }}
                    onProgress={(data) => {
                      if (!isSeeking) setCurrentTime(data.currentTime);
                    }}
                    onEnd={() => setPaused(true)}
                    onError={() => setVideoLoading(false)}
                    repeat={false}
                  />
                  {videoLoading && (
                    <ActivityIndicator
                      style={StyleSheet.absoluteFill}
                      color="#FFF"
                      size="large"
                    />
                  )}
                  <TouchableWithoutFeedback onPress={() => setPaused((p) => !p)}>
                    <View style={StyleSheet.absoluteFill} />
                  </TouchableWithoutFeedback>
                </>
              ) : (
                <>
                  <Image
                    source={{ uri: selectedVideo?.thumb }}
                    style={styles.playerVideo}
                    resizeMode="contain"
                  />
                  <View style={styles.noUrlOverlay}>
                    <Text style={styles.noUrlText}>No video URL provided</Text>
                  </View>
                </>
              )}
            </View>

            {/* Controls */}
            <View style={styles.playerControls}>

              {/* Time labels */}
              <View style={styles.timeRow}>
                <Text style={styles.timeText}>{formatTime(displayTime)}</Text>
                <Text style={styles.timeText}>{formatTime(duration)}</Text>
              </View>

              {/* Seekable progress bar */}
              <View
                style={styles.progressBarBg}
                {...panResponder.panHandlers}
                ref={progressBarRef}
              >
                <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
                {/* Thumb indicator */}
                <View
                  style={[
                    styles.progressThumb,
                    { left: `${progress * 100}%` },
                  ]}
                />
              </View>

              {/* Playback controls row */}
              <View style={styles.controlRow}>
                {/* Rewind 10s */}
                <TouchableOpacity
                  style={styles.skipBtn}
                  onPress={() => skipSeconds(-10)}
                >
                  <IconButton icon="rewind-10" iconColor="#FFF" size={32} />
                  <Text style={styles.skipLabel}>10</Text>
                </TouchableOpacity>

                {/* Play / Pause */}
                {selectedVideo?.url ? (
                  <TouchableOpacity
                    onPress={() => setPaused((p) => !p)}
                    style={styles.playBtn}
                  >
                    <IconButton
                      icon={paused ? 'play-circle' : 'pause-circle'}
                      iconColor="#FFF"
                      size={60}
                    />
                  </TouchableOpacity>
                ) : null}

                {/* Forward 10s */}
                <TouchableOpacity
                  style={styles.skipBtn}
                  onPress={() => skipSeconds(10)}
                >
                  <IconButton icon="fast-forward-10" iconColor="#FFF" size={32} />
                  <Text style={styles.skipLabel}>10</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.playerTitle}>{selectedVideo?.title}</Text>
              {selectedVideo?.duration ? (
                <Text style={styles.playerMeta}>Duration: {selectedVideo.duration}</Text>
              ) : null}
            </View>

          </SafeAreaView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  segment: { margin: 15 },
  list: { paddingHorizontal: 10, paddingBottom: 20 },

  photoWrap: { width: (width / 2) - 15, margin: 5 },
  photo: { width: '100%', height: 150, borderRadius: 12 },
  caption: { fontSize: 11, color: '#666', textAlign: 'center', marginTop: 4 },

  videoWrap: {
    width: width - 30, height: 200, margin: 5,
    borderRadius: 12, overflow: 'hidden', backgroundColor: '#000',
  },
  videoThumb: { width: '100%', height: '100%', opacity: 0.7 },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center', alignItems: 'center',
  },
  videoInfo: { position: 'absolute', bottom: 15, left: 15 },
  videoTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
  videoDuration: { color: '#DDD', fontSize: 12 },
  empty: { textAlign: 'center', color: '#999', marginTop: 60 },

  // Lightbox
  lightboxBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.95)' },
  lightboxSafe: { flex: 1 },
  lightboxClose: { alignSelf: 'flex-end', margin: 8 },
  lightboxImageWrap: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  lightboxImage: { width, height: height * 0.75 },
  lightboxCaption: {
    color: '#CCC', fontSize: 14, textAlign: 'center',
    paddingHorizontal: 20, paddingBottom: 30,
  },

  // Video player
  playerBg: { flex: 1, backgroundColor: '#000' },
  playerSafe: { flex: 1 },
  playerHeader: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 8, paddingTop: 8,
  },
  playerHeaderTitle: {
    flex: 1, color: '#FFF', fontSize: 16,
    fontWeight: '600', marginRight: 16,
  },
  playerVideoWrap: {
    width, height: width * 0.5625,
    backgroundColor: '#111',
    justifyContent: 'center', alignItems: 'center',
  },
  playerVideo: { width: '100%', height: '100%' },
  noUrlOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  noUrlText: { color: '#AAA', fontSize: 14, fontStyle: 'italic' },

  playerControls: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },

  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  timeText: { color: '#AAA', fontSize: 12 },

  // Seekable progress bar
  progressBarBg: {
    height: 18,           // tall hit area for easy touch
    justifyContent: 'center',
    marginBottom: 8,
  },
  progressBarFill: {
    position: 'absolute',
    left: 0,
    height: 4,
    backgroundColor: '#4F8EF7',
    borderRadius: 2,
  },
  progressThumb: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FFF',
    marginLeft: -7,       // center on the position
    top: 2,
  },

  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginTop: 8,
    marginBottom: 20,
  },
  skipBtn: { alignItems: 'center' },
  skipLabel: { color: '#AAA', fontSize: 11, marginTop: -8 },
  playBtn: {},

  playerTitle: { color: '#FFF', fontSize: 17, fontWeight: '600', marginBottom: 4 },
  playerMeta: { color: '#888', fontSize: 13 },
});

export default GalleryScreen;