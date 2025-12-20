import React, { useState } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import { Text, Card, Avatar, List, IconButton } from 'react-native-paper';
import { COLORS } from '../../constants/theme';

const TIMELINE_DATA = [
    { time: '06:00 AM', event: 'Fajr Prayer', detail: 'Congregational prayer at the campus mosque followed by morning Adhkar.', icon: 'mosque' },
    { time: '07:00 AM', event: 'Breakfast', detail: 'Nutritious morning meal served at the Dining Hall.', icon: 'coffee' },
    { time: '08:00 AM', event: 'Morning Assembly', desc: 'Daily briefing and spiritual motivation session.', icon: 'account-voice' },
    { time: '08:30 AM', event: 'Class Sessions', detail: 'Primary academic and religious instruction periods.', icon: 'book-open-page-variant' },
    { time: '01:00 PM', event: 'Lunch & Zuhr', detail: 'Noon break for prayer and dining.', icon: 'food-apple' },
    { time: '02:00 PM', event: 'Afternoon Sessions', detail: 'Specialized subjects and interactive group studies.', icon: 'pencil-ruler' },
    { time: '05:00 PM', event: 'Sports & Leisure', detail: 'Physical activities at the Sports Ground or reading time.', icon: 'soccer' },
    { time: '06:30 PM', event: 'Maghrib & Evening Study', detail: 'Prayer followed by supervised self-study (Muthala\'a).', icon: 'lamp' },
    { time: '09:00 PM', event: 'Dinner', detail: 'Final meal of the day.', icon: 'silverware-variant' },
    { time: '10:00 PM', event: 'Lights Out', detail: 'Rest period to prepare for the next day.', icon: 'bed-outline' },
];

const DayInDarsScreen = () => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Video Player Placeholder */}
            <Card style={styles.videoCard}>
                <ImageBackground
                    source={{ uri: 'https://images.unsplash.com/photo-1523050853064-8504f434033b?q=80&w=1000' }}
                    style={styles.videoThumbnail}
                    imageStyle={{ borderRadius: 12 }}
                >
                    <View style={styles.videoOverlay}>
                        <IconButton
                            icon="play-circle"
                            iconColor="#FFF"
                            size={60}
                            onPress={() => console.log('Play Video')}
                        />
                        <Text style={styles.videoTitle}>Virtual Tour: A Day in Dars</Text>
                    </View>
                </ImageBackground>
            </Card>

            <Text style={styles.sectionTitle}>Daily Routine</Text>

            {/* Timeline View */}
            <View style={styles.timelineContainer}>
                {TIMELINE_DATA.map((item, index) => (
                    <View key={index} style={styles.timelineRow}>
                        {/* Left Side: Time */}
                        <View style={styles.timeSection}>
                            <Text style={styles.timeText}>{item.time}</Text>
                            {index !== TIMELINE_DATA.length - 1 && <View style={styles.verticalLine} />}
                        </View>

                        {/* Middle: Dot */}
                        <View style={styles.dotSection}>
                            <View style={[styles.dot, { backgroundColor: expandedIndex === index ? COLORS.primary : '#DDD' }]} />
                        </View>

                        {/* Right Side: Content */}
                        {/* Right Side: Content */}
                        <TouchableOpacity
                            style={styles.contentSection}
                            onPress={() => toggleExpand(index)}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.eventCard, expandedIndex === index && styles.activeCard]}>
                                <View style={styles.eventHeader}>
                                    <Avatar.Icon
                                        size={36}
                                        icon={item.icon}
                                        backgroundColor={expandedIndex === index ? COLORS.primary : '#F0F0F0'}
                                        color={expandedIndex === index ? '#FFF' : '#666'}
                                    />
                                    <Text style={[styles.eventTitle, expandedIndex === index && styles.activeText]}>
                                        {item.event}
                                    </Text>
                                </View>

                                {/* Details only show when expanded */}
                                {expandedIndex === index && (
                                    <Text style={styles.eventDetail}>{item.detail}</Text>
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    videoCard: { margin: 15, elevation: 4, borderRadius: 12 },
    videoThumbnail: { width: '100%', height: 200, justifyContent: 'center', alignItems: 'center' },
    videoOverlay: { backgroundColor: 'rgba(0,0,0,0.4)', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 12 },
    videoTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 16, marginTop: -10 },

    sectionTitle: { fontSize: 20, fontWeight: '800', marginHorizontal: 20, marginVertical: 15, color: '#333' },

    timelineContainer: { paddingHorizontal: 20, paddingBottom: 30 },
    timelineRow: { flexDirection: 'row', minHeight: 80 },

    timeSection: { width: 70, alignItems: 'flex-end', paddingRight: 10 },
    timeText: { fontSize: 12, fontWeight: 'bold', color: '#777', marginTop: 5 },
    verticalLine: { width: 2, flex: 1, backgroundColor: '#EEE', marginRight: 5, marginVertical: 5 },

    dotSection: { width: 20, alignItems: 'center', marginTop: 8 },
    dot: { width: 12, height: 12, borderRadius: 6, borderWidth: 2, borderColor: '#FFF', elevation: 2 },

    contentSection: { flex: 1, marginLeft: 10, paddingBottom: 15 },
    eventCard: { backgroundColor: '#FFF', padding: 12, borderRadius: 12, elevation: 1 },
    activeCard: { borderColor: COLORS.primary, borderWidth: 1, backgroundColor: '#F1F8E9' },
    eventHeader: { flexDirection: 'row', alignItems: 'center' },
    eventTitle: { fontSize: 15, fontWeight: '700', marginLeft: 10, color: '#444' },
    activeText: { color: COLORS.primary },
    eventDetail: { fontSize: 13, color: '#666', marginTop: 8, lineHeight: 18, paddingLeft: 46 },
});

export default DayInDarsScreen;

// import React from 'react';
// import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
// import { List, Avatar } from 'react-native-paper';
// import { COLORS } from '../../constants/theme';

// const timelineData = [
//   { time: '06:00 AM', title: 'Fajr Prayer', desc: 'Congregational prayer at the Mosque', icon: 'mosque' },
//   { time: '07:00 AM', title: 'Breakfast', desc: 'Morning meal at the Dining Hall', icon: 'coffee' },
//   { time: '08:00 AM', title: 'Morning Assembly', desc: 'Daily briefing and spiritual talk', icon: 'account-voice' },
//   { time: '08:30 AM', title: 'Class Sessions', desc: 'Core Islamic and Academic subjects', icon: 'book-open-variant' },
//   { time: '01:00 PM', title: 'Lunch Break', desc: 'Noon prayer and lunch', icon: 'food' },
// ];

// const DayInDarsScreen = () => {
//   return (
//     <ScrollView style={styles.container}>
//       <Image
//         source={{ uri: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=1000' }}
//         style={styles.topImage}
//       />
//       <View style={styles.content}>
//         <Text style={styles.sectionTitle}>Daily Schedule</Text>
//         {timelineData.map((item, index) => (
//           <View key={index} style={styles.timelineItem}>
//             <View style={styles.timeColumn}>
//               <Text style={styles.timeText}>{item.time}</Text>
//               <View style={styles.line} />
//             </View>
//             <View style={styles.cardColumn}>
//               <List.Item
//                 title={item.title}
//                 description={item.desc}
//                 left={props => <Avatar.Icon {...props} icon={item.icon} size={40} backgroundColor={COLORS.primary + '15'} color={COLORS.primary} />}
//                 style={styles.listItem}
//                 titleStyle={{ fontWeight: 'bold' }}
//               />
//             </View>
//           </View>
//         ))}
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#FFF' },
//   topImage: { width: '100%', height: 200 },
//   content: { padding: 20 },
//   sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: COLORS.primary },
//   timelineItem: { flexDirection: 'row', minHeight: 80 },
//   timeColumn: { width: 80, alignItems: 'center' },
//   timeText: { fontSize: 12, fontWeight: 'bold', color: '#666' },
//   line: { flex: 1, width: 2, backgroundColor: '#E0E0E0', marginVertical: 5 },
//   cardColumn: { flex: 1, paddingBottom: 20 },
//   listItem: { backgroundColor: '#F8F9FA', borderRadius: 12, marginBottom: 5 },
// });

// export default DayInDarsScreen;