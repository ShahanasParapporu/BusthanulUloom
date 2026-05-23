// // src/screens/features/ExamScheduleScreen.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet , Platform, Linking } from 'react-native';
import { Card, Text, Badge, IconButton, ActivityIndicator, Snackbar } from 'react-native-paper';
import { storageService } from '../../utils/storage';
import { CONTENT_KEYS, getDefaults } from '../../constants/contentKeys';
import { COLORS } from '../../constants/theme';
import { useLanguage } from '../../i18n/LanguageContext';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

const STATUS_COLORS = {
  Upcoming:  COLORS.primary,
  Scheduled: '#1565C0',
  Completed: '#757575',
};

// Builds a dummy HTML schedule for a single exam item
const buildDummyHtml = (item) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Exam Schedule</title>
  <style>
    body { font-family: sans-serif; padding: 32px; color: #222; }
    h1   { color: #1565C0; }
    table{ border-collapse: collapse; width: 100%; margin-top: 24px; }
    td, th { border: 1px solid #ddd; padding: 12px 16px; text-align: left; }
    th   { background: #f0f4ff; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 12px;
             background: #1565C0; color: #fff; font-size: 13px; }
  </style>
</head>
<body>
  <h1>Exam Schedule</h1>
  <p>Generated on ${new Date().toLocaleString()}</p>
  <table>
    <tr><th>Exam</th><th>Date</th><th>Time</th><th>Status</th></tr>
    <tr>
      <td>${item.name}</td>
      <td>${item.date}</td>
      <td>${item.time ?? '—'}</td>
      <td><span class="badge">${item.status}</span></td>
    </tr>
  </table>
  <p style="margin-top:32px;color:#999;font-size:12px;">
    This is a placeholder document. A real PDF will be available soon.
  </p>
</body>
</html>
`;

const ExamScheduleScreen = () => {
  const { t, language } = useLanguage();
  const [exams, setExams]           = useState(() => getDefaults(language).EXAMS ?? []);
  const [downloading, setDownloading] = useState({});
  const [snack, setSnack]           = useState({ visible: false, message: '' });

  const showSnack = (message) => setSnack({ visible: true, message });
  const hideSnack = ()        => setSnack((s) => ({ ...s, visible: false }));

  useEffect(() => {
    storageService.getItem(CONTENT_KEYS.EXAMS).then((saved) => {
      if (saved) setExams(saved);
      else       setExams(getDefaults(language).EXAMS ?? []);
    });
  }, [language]);

  const handleDownload = async (item) => {
    setDownloading((prev) => ({ ...prev, [item.id]: true }));

    try {
      const filename = `exam-${item.name.replace(/\s+/g, '_')}-${Date.now()}.html`;
      const dir  = Platform.OS === 'android'
        ? RNFS.DownloadDirectoryPath
        : RNFS.DocumentDirectoryPath;
      const path = `${dir}/${filename}`;

      showSnack('⏳ Preparing your exam schedule…');

      await RNFS.writeFile(path, buildDummyHtml(item), 'utf8');

      const exists = await RNFS.exists(path);
      if (!exists) { showSnack('❌ Download failed. Please try again.'); return; }

      if (Platform.OS === 'android') {
        showSnack('✅ Saved! Opening…');
        setTimeout(async () => {
          try {
            await Linking.openURL(`file://${path}`);
          } catch {
            showSnack(`✅ Saved to Downloads: ${filename}`);
          }
        }, 500);
      } else {
        await Share.open({
          url:   path,
          type:  'text/html',
          title: 'Save or Share Exam Schedule',
        });
        showSnack('✅ Ready — save or share from the sheet!');
      }
    } catch (err) {
      if (err?.message !== 'User did not share') {
        console.error('Download error:', err);
        showSnack('❌ Download failed. Please try again.');
      }
    } finally {
      setDownloading((prev) => ({ ...prev, [item.id]: false }));
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={exams}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.examName}>{item.name}</Text>
                  <Text style={styles.date}>{item.date}{item.time ? ` • ${item.time}` : ''}</Text>
                </View>
                <Badge style={{ backgroundColor: STATUS_COLORS[item.status] || COLORS.primary }}>
                  {item.status}
                </Badge>
              </View>
            </Card.Content>
            <Card.Actions>
              {downloading[item.id]
                ? <ActivityIndicator size="small" style={styles.spinner} />
                : <IconButton icon="download" onPress={() => handleDownload(item)} />
              }
            </Card.Actions>
          </Card>
        )}
        ListEmptyComponent={<Text style={styles.empty}>{t('exams.noExams')}</Text>}
        contentContainerStyle={{ padding: 15 }}
      />

      <Snackbar
        visible={snack.visible}
        onDismiss={hideSnack}
        duration={3000}
        style={styles.snackbar}
        action={{ label: '✕', onPress: hideSnack }}
      >
        {snack.message}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  card:      { marginBottom: 12 },
  row:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  examName:  { fontSize: 17, fontWeight: 'bold' },
  date:      { color: '#666', marginTop: 4 },
  empty:     { textAlign: 'center', color: '#999', marginTop: 60 },
  spinner:   { marginHorizontal: 8 },
});

export default ExamScheduleScreen;

// const ExamScheduleScreen = () => {
//   //const [exams, setExams] = useState(DEFAULTS.EXAMS);
//   const { t, language } = useLanguage();                          // ← pull language too
//   const [exams, setExams] = useState(() => getDefaults(language).EXAMS ?? []); // ← lazy init with lang
//   //const { t } = useLanguage();

//   useEffect(() => {
//     storageService.getItem(CONTENT_KEYS.EXAMS).then((v) => { if (v) setExams(v); });
//   }, []);

//   const handleDownload = async (item) => {
//     if (!item.pdfUrl) {
//       Alert.alert(t('exams.noFile') ?? 'No file available', t('exams.noFileDesc') ?? 'There is no PDF linked to this exam.');
//       return;
//     }

//     setDownloading((prev) => ({ ...prev, [item.id]: true }));

//     try {
//       const fileName = `${item.name.replace(/\s+/g, '_')}.pdf`;
//       const fileUri = FileSystem.documentDirectory + fileName;

//       const { uri } = await FileSystem.downloadAsync(item.pdfUrl, fileUri);

//       const canShare = await Sharing.isAvailableAsync();
//       if (canShare) {
//         await Sharing.shareAsync(uri, {
//           mimeType: 'application/pdf',
//           dialogTitle: t('exams.downloadTitle') ?? 'Save or open PDF',
//           UTI: 'com.adobe.pdf',
//         });
//       } else {
//         Alert.alert(t('exams.downloadSuccess') ?? 'Downloaded', `${t('exams.savedTo') ?? 'Saved to'}: ${uri}`);
//       }
//     } catch (error) {
//       console.error('Download error:', error);
//       Alert.alert(
//         t('exams.downloadError') ?? 'Download failed',
//         t('exams.downloadErrorDesc') ?? 'Could not download the file. Please try again.'
//       );
//     } finally {
//       setDownloading((prev) => ({ ...prev, [item.id]: false }));
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={exams}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <Card style={styles.card}>
//             <Card.Content>
//               <View style={styles.row}>
//                 <View style={{ flex: 1 }}>
//                   <Text style={styles.examName}>{item.name}</Text>
//                   <Text style={styles.date}>{item.date}{item.time ? ` • ${item.time}` : ''}</Text>
//                 </View>
//                 <Badge style={{ backgroundColor: STATUS_COLORS[item.status] || COLORS.primary }}>
//                   {item.status}
//                 </Badge>
//               </View>
//             </Card.Content>
//             <Card.Actions>
//             <IconButton
//                     icon="download"
//                     onPress={() => handleDownload(item)}
//                     disabled={!item.pdfUrl}
//                   />
//             </Card.Actions>
//           </Card>
//         )}
//         ListEmptyComponent={<Text style={styles.empty}>{t('exams.noExams')}</Text>}
//         contentContainerStyle={{ padding: 15 }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#F8F9FA' },
//   card:      { marginBottom: 12 },
//   row:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
//   examName:  { fontSize: 17, fontWeight: 'bold' },
//   date:      { color: '#666', marginTop: 4 },
//   empty:     { textAlign: 'center', color: '#999', marginTop: 60 },
// });

// export default ExamScheduleScreen;
