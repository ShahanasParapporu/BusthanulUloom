import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, ScrollView, Text, TouchableOpacity,
  StatusBar, Alert, Modal, KeyboardAvoidingView, Platform,
} from 'react-native';
import { TextInput, Button, Card, Snackbar, Divider, Switch } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { storageService } from '../../utils/storage';
import { CONTENT_KEYS, getDefaults } from '../../constants/contentKeys';
import useLogout from '../../hooks/useLogout';

const THEME = {
  primary: '#6A1B9A', primaryLight: '#F3E5F5', green: '#2E7D32',
  surface: '#F8F9FA', white: '#FFFFFF', textMain: '#1A1A1A',
  textSecondary: '#757575', border: '#E0E0E0', red: '#C62828',
};

const ADMIN_TABS = [
  { key: 'college',       label: 'College',    icon: 'information-outline'        },
  { key: 'teachers',      label: 'Teachers',   icon: 'account-tie'                },
  { key: 'dars',          label: 'Dars',       icon: 'book-open-page-variant'     },
  { key: 'exams',         label: 'Exams',      icon: 'file-document-edit-outline' },
  { key: 'busa',          label: 'BUSA',       icon: 'account-group'              },
  { key: 'holidays',      label: 'Holidays',   icon: 'calendar-star'              },
  { key: 'schedule',      label: 'Schedule',   icon: 'clock-check-outline'        },
  { key: 'facilities',    label: 'Facilities', icon: 'office-building'            },
  { key: 'gallery',       label: 'Gallery',    icon: 'image-multiple'             },
  { key: 'notices',       label: 'Notices',    icon: 'bell-badge-outline'         },
];

const TEACHER_CATEGORIES = ['Arabic', 'Islamic Studies', 'Science', 'Mathematics', 'English', 'Other'];
const NOTIF_CATEGORIES   = ['Notice', 'Document'];
const HOLIDAY_TYPES      = ['Religious', 'National', 'Academic'];
const EXAM_STATUSES      = ['Upcoming', 'Scheduled', 'Completed'];

const emptyTeacher  = () => ({ id: null, name: '', designation: '', subject: '', category: '', phone: '' });
const emptyExam     = () => ({ id: null, name: '', date: '', time: '', status: 'Upcoming' });
const emptyHoliday  = () => ({ id: null, name: '', date: '', type: 'Religious' });
const emptySched    = () => ({ id: null, time: '', event: '', detail: '', icon: 'clock-outline' });
const emptyFacility = () => ({ id: null, name: '', icon: 'office-building', desc: '', timing: '' });
const emptyPhoto    = () => ({ id: null, url: '', caption: '' });
const emptyVideo    = () => ({ id: null, title: '', duration: '', thumb: '', url: '' });
const emptyNotif    = () => ({ id: null, title: '', desc: '', category: 'Notice', time: 'Just now', icon: 'bullhorn-variant', isDoc: false });
const emptyCurric   = () => ({ id: null, level: '', subjects: '' });

// ─────────────────────────────────────────────────────────────────────────────
const AdminPanelScreen = () => {
  const DEFAULTS = getDefaults('en');
  const performLogout = useLogout();

  const [activeTab, setActiveTab]         = useState('college');
  const [snackMsg, setSnackMsg]           = useState('');
  const [snackVisible, setSnackVisible]   = useState(false);
  const [modalConfig, setModalConfig]     = useState(null);

  // Content state
  const [stats,          setStats]          = useState(DEFAULTS.COLLEGE_STATS);
  const [draftStats,     setDraftStats]     = useState(DEFAULTS.COLLEGE_STATS);
  const [editingStats,   setEditingStats]   = useState(false);

  const [teachers,       setTeachers]       = useState([]);

  const [darsOverview,   setDarsOverview]   = useState(DEFAULTS.DARS_OVERVIEW);
  const [draftDars,      setDraftDars]      = useState(DEFAULTS.DARS_OVERVIEW);
  const [editingDars,    setEditingDars]    = useState(false);
  const [curriculum,     setCurriculum]     = useState(DEFAULTS.DARS_CURRICULUM);

  const [exams,          setExams]          = useState(DEFAULTS.EXAMS);

  const [busa,           setBusa]           = useState(DEFAULTS.BUSA);
  const [draftBusa,      setDraftBusa]      = useState(DEFAULTS.BUSA);
  const [editingBusa,    setEditingBusa]    = useState(false);

  const [holidays,       setHolidays]       = useState(DEFAULTS.HOLIDAYS);
  const [schedule,       setSchedule]       = useState(DEFAULTS.DAY_SCHEDULE);
  const [facilities,     setFacilities]     = useState(DEFAULTS.FACILITIES);
  const [photos,         setPhotos]         = useState(DEFAULTS.GALLERY_PHOTOS);
  const [videos,         setVideos]         = useState(DEFAULTS.GALLERY_VIDEOS);
  const [notifications,  setNotifications]  = useState(DEFAULTS.NOTIFICATIONS);

  const snack = (msg) => { setSnackMsg(msg); setSnackVisible(true); };

  // Load all on mount
  useEffect(() => {
    (async () => {
      const g = async (key, fallback) => {
        const v = await storageService.getItem(key);
        return v !== null ? v : fallback;
      };
      const [st, tc, do_, cu, ex, bu, ho, sc, fa, ph, vi, no] = await Promise.all([
        g(CONTENT_KEYS.COLLEGE_STATS,   DEFAULTS.COLLEGE_STATS),
        g(CONTENT_KEYS.TEACHERS,        []),
        g(CONTENT_KEYS.DARS_OVERVIEW,   DEFAULTS.DARS_OVERVIEW),
        g(CONTENT_KEYS.DARS_CURRICULUM, DEFAULTS.DARS_CURRICULUM),
        g(CONTENT_KEYS.EXAMS,           DEFAULTS.EXAMS),
        g(CONTENT_KEYS.BUSA,            DEFAULTS.BUSA),
        g(CONTENT_KEYS.HOLIDAYS,        DEFAULTS.HOLIDAYS),
        g(CONTENT_KEYS.DAY_SCHEDULE,    DEFAULTS.DAY_SCHEDULE),
        g(CONTENT_KEYS.FACILITIES,      DEFAULTS.FACILITIES),
        g(CONTENT_KEYS.GALLERY_PHOTOS,  DEFAULTS.GALLERY_PHOTOS),
        g(CONTENT_KEYS.GALLERY_VIDEOS,  DEFAULTS.GALLERY_VIDEOS),
        g(CONTENT_KEYS.NOTIFICATIONS,   DEFAULTS.NOTIFICATIONS),
      ]);
      setStats(st);       setDraftStats(st);
      setTeachers(tc);
      setDarsOverview(do_); setDraftDars(do_);
      setCurriculum(cu);
      setExams(ex);
      setBusa(bu);        setDraftBusa(bu);
      setHolidays(ho);
      setSchedule(sc);
      setFacilities(fa);
      setPhotos(ph);
      setVideos(vi);
      setNotifications(no);
    })();
  }, []);

  const handleLogout = () => Alert.alert('Logout', 'Are you sure?', [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Logout', style: 'destructive', onPress: performLogout },
  ]);

  // Generic list upsert + delete
  const upsert = async (key, list, setter, form, editMsg, addMsg) => {
    let updated;
    if (form.id) { updated = list.map((i) => (i.id === form.id ? form : i)); snack(editMsg); }
    else         { updated = [...list, { ...form, id: Date.now().toString() }]; snack(addMsg); }
    await storageService.setItem(key, updated);
    setter(updated);
    setModalConfig(null);
  };

  const del = (key, list, setter, id) =>
    Alert.alert('Delete', 'Remove this item?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => {
        const updated = list.filter((i) => i.id !== id);
        await storageService.setItem(key, updated);
        setter(updated);
        snack('Item removed.');
      }},
    ]);

  const openModal = (type, item = null) => setModalConfig({ type, item, isEdit: !!item });

  // ── Tab renderers ─────────────────────────────────────────────────────────
  const College = () => (
    <Section title="College Information" sub="Displayed on Home screen">
      {!editingStats ? (
        <Card style={S.card}>
          <View style={S.statsRow}>
            {[['Est.', stats.established,'#E65100'],['Affiliated',stats.affiliation,THEME.green],['Students',stats.students,'#1565C0']].map(([l,v,c])=>(
              <View key={l} style={{alignItems:'center',flex:1}}>
                <Text style={{fontSize:15,fontWeight:'800',color:c}}>{v}</Text>
                <Text style={{fontSize:11,color:THEME.textSecondary}}>{l}</Text>
              </View>
            ))}
          </View>
          <Divider style={{marginHorizontal:16,marginVertical:8}}/>
          <Text style={{textAlign:'center',color:THEME.textSecondary,paddingBottom:12}}>📍 {stats.location}</Text>
          <EditBtn onPress={()=>{setDraftStats(stats);setEditingStats(true);}}/>
        </Card>
      ) : (
        <Card style={S.card}>
          {[['established','Establishment Year'],['affiliation','Affiliated University'],['students','Total Students'],['location','Location']].map(([k,l])=>(
            <FI key={k} label={l} value={draftStats[k]} onChange={(v)=>setDraftStats(p=>({...p,[k]:v}))}/>
          ))}
          <SaveCancel onCancel={()=>setEditingStats(false)} onSave={async()=>{
            await storageService.setItem(CONTENT_KEYS.COLLEGE_STATS,draftStats);
            setStats(draftStats);setEditingStats(false);snack('✅ College info saved!');
          }}/>
        </Card>
      )}
    </Section>
  );

  const Teachers = () => (
    <Section title="Teachers" sub="Home → View Our Teachers">
      <AddBtn label="Add Teacher" onPress={()=>openModal('teacher')}/>
      {teachers.length===0 ? <Empty icon="👨‍🏫" text="No teachers yet."/> : teachers.map(t=>(
        <ICard key={t.id} title={t.name} sub={t.designation} meta={[t.subject,t.category,t.phone].filter(Boolean).join(' · ')}
          onEdit={()=>openModal('teacher',t)} onDel={()=>del(CONTENT_KEYS.TEACHERS,teachers,setTeachers,t.id)}/>
      ))}
    </Section>
  );

  const Dars = () => (
    <Section title="Dars Program" sub="Busthanul Uloom Dars screen">
      <Text style={S.subHead}>Program Overview</Text>
      {!editingDars ? (
        <Card style={S.card}>
          <Text style={S.bodyText}>{darsOverview}</Text>
          <EditBtn onPress={()=>{setDraftDars(darsOverview);setEditingDars(true);}}/>
        </Card>
      ) : (
        <Card style={S.card}>
<FI label="Overview text" value={draftDars} onChangeText={setDraftDars} multiline height={100}/>
<SaveCancel onCancel={()=>setEditingDars(false)} onSave={async()=>{
            await storageService.setItem(CONTENT_KEYS.DARS_OVERVIEW,draftDars);
            setDarsOverview(draftDars);setEditingDars(false);snack('✅ Overview saved!');
          }}/>
        </Card>
      )}
      <Text style={[S.subHead,{marginTop:18}]}>Core Curriculum</Text>
      <AddBtn label="Add Level" onPress={()=>openModal('curriculum')}/>
      {curriculum.map(c=>(
        <ICard key={c.id} title={c.level} sub={c.subjects}
          onEdit={()=>openModal('curriculum',c)} onDel={()=>del(CONTENT_KEYS.DARS_CURRICULUM,curriculum,setCurriculum,c.id)}/>
      ))}
    </Section>
  );

  const Exams = () => (
    <Section title="Exam Schedule" sub="Exam Schedule screen">
      <AddBtn label="Add Exam" onPress={()=>openModal('exam')}/>
      {exams.length===0?<Empty icon="📋" text="No exams yet."/>:exams.map(e=>(
        <ICard key={e.id} title={e.name} sub={`${e.date} • ${e.time}`} meta={e.status}
          onEdit={()=>openModal('exam',e)} onDel={()=>del(CONTENT_KEYS.EXAMS,exams,setExams,e.id)}/>
      ))}
    </Section>
  );

  const Busa = () => (
    <Section title="BUSA Committee" sub="BUSA screen">
      {!editingBusa ? (
        <Card style={S.card}>
          <Text style={S.fieldLbl}>President</Text><Text style={S.bodyText}>{busa.president}</Text>
          <Text style={S.fieldLbl}>Secretary</Text><Text style={S.bodyText}>{busa.secretary}</Text>
          <Text style={S.fieldLbl}>Achievements</Text>
          {(busa.achievements||[]).map((a,i)=><Text key={i} style={S.bodyText}>• {a}</Text>)}
          <EditBtn onPress={()=>{setDraftBusa({...busa,achievements:[...(busa.achievements||[])]});setEditingBusa(true);}}/>
        </Card>
      ) : (
        <Card style={S.card}>
          <FI label="President Name" value={draftBusa.president} onChangeText={(v)=>setDraftBusa(p=>({...p,president:v}))}/>
          <FI label="Secretary Name" value={draftBusa.secretary} onChangeText={(v)=>setDraftBusa(p=>({...p,secretary:v}))}/>
          <Text style={S.fieldLbl}>Achievements (one per line)</Text>
          <FI value={(draftBusa.achievements||[]).join('\n')} multiline height={110}
  onChangeText={(v)=>setDraftBusa(p=>({...p,achievements:v.split('\n').filter(Boolean)}))}/>
          <SaveCancel onCancel={()=>setEditingBusa(false)} onSave={async()=>{
            await storageService.setItem(CONTENT_KEYS.BUSA,draftBusa);
            setBusa(draftBusa);setEditingBusa(false);snack('✅ BUSA info saved!');
          }}/>
        </Card>
      )}
    </Section>
  );

  const Holidays = () => (
    <Section title="Official Holidays" sub="Holidays screen">
      <AddBtn label="Add Holiday" onPress={()=>openModal('holiday')}/>
      {holidays.length===0?<Empty icon="📅" text="No holidays yet."/>:holidays.map(h=>(
        <ICard key={h.id} title={h.name} sub={h.date} meta={h.type}
          onEdit={()=>openModal('holiday',h)} onDel={()=>del(CONTENT_KEYS.HOLIDAYS,holidays,setHolidays,h.id)}/>
      ))}
    </Section>
  );

  const Schedule = () => (
    <Section title="Day Schedule" sub="A Day in Dars screen">
      <AddBtn label="Add Item" onPress={()=>openModal('schedule')}/>
      {schedule.map(item=>(
        <ICard key={item.id} title={item.event} sub={item.time} meta={item.detail}
          onEdit={()=>openModal('schedule',item)} onDel={()=>del(CONTENT_KEYS.DAY_SCHEDULE,schedule,setSchedule,item.id)}/>
      ))}
    </Section>
  );

  const Facilities = () => (
    <Section title="Facilities" sub="Facilities screen">
      <AddBtn label="Add Facility" onPress={()=>openModal('facility')}/>
      {facilities.map(f=>(
        <ICard key={f.id} title={f.name} sub={f.desc} meta={`⏰ ${f.timing}`}
          onEdit={()=>openModal('facility',f)} onDel={()=>del(CONTENT_KEYS.FACILITIES,facilities,setFacilities,f.id)}/>
      ))}
    </Section>
  );

  const Gallery = () => (
    <Section title="Gallery" sub="Gallery screen">
      <Text style={S.subHead}>Photos</Text>
      <AddBtn label="Add Photo" onPress={()=>openModal('photo')}/>
      {photos.map(p=>(
        <ICard key={p.id} title={p.caption||'(no caption)'} sub={p.url}
          onEdit={()=>openModal('photo',p)} onDel={()=>del(CONTENT_KEYS.GALLERY_PHOTOS,photos,setPhotos,p.id)}/>
      ))}
      <Text style={[S.subHead,{marginTop:18}]}>Videos</Text>
      <AddBtn label="Add Video" onPress={()=>openModal('video')}/>
      {videos.map(v=>(
        <ICard key={v.id} title={v.title} sub={`Duration: ${v.duration}`} meta={v.url}
          onEdit={()=>openModal('video',v)} onDel={()=>del(CONTENT_KEYS.GALLERY_VIDEOS,videos,setVideos,v.id)}/>
      ))}
    </Section>
  );

  const Notices = () => (
    <Section title="Notifications" sub="Notifications screen">
      <AddBtn label="Add Notice" onPress={()=>openModal('notification')}/>
      {notifications.length===0?<Empty icon="🔔" text="No notices yet."/>:notifications.map(n=>(
        <ICard key={n.id} title={n.title} sub={n.desc} meta={`${n.category} · ${n.time}`}
          onEdit={()=>openModal('notification',n)} onDel={()=>del(CONTENT_KEYS.NOTIFICATIONS,notifications,setNotifications,n.id)}/>
      ))}
    </Section>
  );

  const RENDERERS = { college:College, teachers:Teachers, dars:Dars, exams:Exams,
    busa:Busa, holidays:Holidays, schedule:Schedule, facilities:Facilities, gallery:Gallery, notices:Notices };
  const ActiveTab = RENDERERS[activeTab] || (() => null);

  return (
    <View style={S.container}>
      <StatusBar barStyle="light-content" backgroundColor={THEME.primary}/>
      <View style={S.header}>
        <View style={S.headerRow}>
          <View><Text style={S.headerTitle}>Admin Panel</Text><Text style={S.headerSub}>Busthanul Uloom Arabic College</Text></View>
          <TouchableOpacity onPress={handleLogout} style={S.logoutBtn}>
            <Icon name="logout" size={22} color="#FFF"/>
          </TouchableOpacity>
        </View>
      </View>

      <View style={S.tabBarWrap}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={S.tabBarContent}>
          {ADMIN_TABS.map(t=>(
            <TouchableOpacity key={t.key} style={[S.tab, activeTab===t.key&&S.tabActive]} onPress={()=>setActiveTab(t.key)}>
              <Icon name={t.icon} size={13} color={activeTab===t.key?THEME.primary:'rgba(255,255,255,0.8)'}/>
              <Text style={[S.tabTxt, activeTab===t.key&&S.tabTxtActive]}>{t.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={S.body} contentContainerStyle={S.bodyPad} showsVerticalScrollIndicator={false}>
        <ActiveTab/>
      </ScrollView>

      {modalConfig && (
        <ModalForm
          {...modalConfig}
          onClose={()=>setModalConfig(null)}
          onSave={(form)=>{
            const map = {
              teacher:      [CONTENT_KEYS.TEACHERS,        teachers,      setTeachers,      '✅ Teacher updated!',  '✅ Teacher added!'],
              curriculum:   [CONTENT_KEYS.DARS_CURRICULUM, curriculum,    setCurriculum,    '✅ Level updated!',    '✅ Level added!'],
              exam:         [CONTENT_KEYS.EXAMS,           exams,         setExams,         '✅ Exam updated!',     '✅ Exam added!'],
              holiday:      [CONTENT_KEYS.HOLIDAYS,        holidays,      setHolidays,      '✅ Holiday updated!',  '✅ Holiday added!'],
              schedule:     [CONTENT_KEYS.DAY_SCHEDULE,    schedule,      setSchedule,      '✅ Item updated!',     '✅ Item added!'],
              facility:     [CONTENT_KEYS.FACILITIES,      facilities,    setFacilities,    '✅ Facility updated!', '✅ Facility added!'],
              photo:        [CONTENT_KEYS.GALLERY_PHOTOS,  photos,        setPhotos,        '✅ Photo updated!',    '✅ Photo added!'],
              video:        [CONTENT_KEYS.GALLERY_VIDEOS,  videos,        setVideos,        '✅ Video updated!',    '✅ Video added!'],
              notification: [CONTENT_KEYS.NOTIFICATIONS,   notifications, setNotifications, '✅ Notice updated!',   '✅ Notice added!'],
            };
            const [key,list,setter,em,am] = map[form._type] || [];
            if (key) upsert(key,list,setter,form,em,am);
          }}
          snack={snack}
        />
      )}

      <Snackbar visible={snackVisible} onDismiss={()=>setSnackVisible(false)} duration={3000} style={S.snackbar}>
        {snackMsg}
      </Snackbar>
    </View>
  );
};

// ─── Modal Form ───────────────────────────────────────────────────────────────
const ModalForm = ({ type, item, isEdit, onClose, onSave, snack }) => {
  const empties = { teacher:emptyTeacher, exam:emptyExam, holiday:emptyHoliday,
    schedule:emptySched, facility:emptyFacility, photo:emptyPhoto,
    video:emptyVideo, notification:emptyNotif, curriculum:emptyCurric };
  const [form, setForm] = useState({ ...(item || empties[type]()), _type: type });
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const validate = () => {
    const required = { teacher:'name', exam:'name', holiday:'name', schedule:'event',
      facility:'name', photo:'url', video:'title', notification:'title', curriculum:'level' };
    const field = required[type];
    if (field && !form[field]?.trim()) { snack(`${field.charAt(0).toUpperCase()+field.slice(1)} is required.`); return false; }
    return true;
  };

  const labels = { teacher:'Teacher', exam:'Exam', holiday:'Holiday', schedule:'Schedule Item',
    facility:'Facility', photo:'Photo', video:'Video', notification:'Notification', curriculum:'Curriculum Level' };

  const FI = (props) => (
    <TextInput mode="flat" underlineColor="transparent" activeUnderlineColor={THEME.primary}
      style={[MS.input, props.height && { height: props.height }]} {...props}/>
  );

  const fields = {
    teacher: (<>
      <FI label="Full Name *"       value={form.name}        onChangeText={v=>f('name',v)}/>
      <FI label="Designation *"     value={form.designation} onChangeText={v=>f('designation',v)}/>
      <FI label="Subject"           value={form.subject}     onChangeText={v=>f('subject',v)}/>
      <FI label="Phone"             value={form.phone}       onChangeText={v=>f('phone',v)} keyboardType="phone-pad"/>
      <Chips label="Category" opts={TEACHER_CATEGORIES} val={form.category} onPick={v=>f('category',v)}/>
    </>),
    curriculum: (<>
      <FI label="Level Name *" value={form.level}    onChangeText={v=>f('level',v)} placeholder="e.g. Primary (Years 1–3)"/>
      <FI label="Subjects"     value={form.subjects} onChangeText={v=>f('subjects',v)} multiline height={80} placeholder="e.g. Arabic Grammar, Fiqh"/>
    </>),
    exam: (<>
      <FI label="Exam Name *" value={form.name} onChangeText={v=>f('name',v)}/>
      <FI label="Date"        value={form.date} onChangeText={v=>f('date',v)} placeholder="e.g. Oct 25, 2024"/>
      <FI label="Time"        value={form.time} onChangeText={v=>f('time',v)} placeholder="e.g. 09:00 AM"/>
      <Chips label="Status" opts={EXAM_STATUSES} val={form.status} onPick={v=>f('status',v)}/>
    </>),
    holiday: (<>
      <FI label="Holiday Name *" value={form.name} onChangeText={v=>f('name',v)}/>
      <FI label="Date"           value={form.date} onChangeText={v=>f('date',v)} placeholder="e.g. Apr 10"/>
      <Chips label="Type" opts={HOLIDAY_TYPES} val={form.type} onPick={v=>f('type',v)}/>
    </>),
    schedule: (<>
      <FI label="Time *"   value={form.time}   onChangeText={v=>f('time',v)}  placeholder="e.g. 06:00 AM"/>
      <FI label="Event *"  value={form.event}  onChangeText={v=>f('event',v)}/>
      <FI label="Details"  value={form.detail} onChangeText={v=>f('detail',v)} multiline height={80}/>
      <FI label="Icon (MaterialCommunity name)" value={form.icon} onChangeText={v=>f('icon',v)} placeholder="e.g. mosque, coffee"/>
    </>),
    facility: (<>
      <FI label="Name *"       value={form.name}   onChangeText={v=>f('name',v)}/>
      <FI label="Description"  value={form.desc}   onChangeText={v=>f('desc',v)}   multiline height={70}/>
      <FI label="Timing"       value={form.timing} onChangeText={v=>f('timing',v)} placeholder="e.g. 8 AM – 8 PM"/>
      <FI label="Icon name"    value={form.icon}   onChangeText={v=>f('icon',v)}   placeholder="e.g. library"/>
    </>),
    photo: (<>
      <FI label="Image URL *" value={form.url}     onChangeText={v=>f('url',v)}     placeholder="https://..."/>
      <FI label="Caption"     value={form.caption} onChangeText={v=>f('caption',v)}/>
    </>),
    video: (<>
      <FI label="Title *"       value={form.title}    onChangeText={v=>f('title',v)}/>
      <FI label="Duration"      value={form.duration} onChangeText={v=>f('duration',v)} placeholder="e.g. 05:20"/>
      <FI label="Thumbnail URL" value={form.thumb}    onChangeText={v=>f('thumb',v)}    placeholder="https://..."/>
      <FI label="Video URL"     value={form.url}      onChangeText={v=>f('url',v)}      placeholder="https://..."/>
    </>),
    notification: (<>
      <FI label="Title *"      value={form.title} onChangeText={v=>f('title',v)}/>
      <FI label="Description"  value={form.desc}  onChangeText={v=>f('desc',v)}  multiline height={80}/>
      <FI label="Time label"   value={form.time}  onChangeText={v=>f('time',v)}  placeholder="e.g. 2h ago"/>
      <Chips label="Category" opts={NOTIF_CATEGORIES} val={form.category} onPick={v=>f('category',v)}/>
      <View style={MS.swRow}>
        <Text style={MS.swLbl}>Is Document (shows download icon)</Text>
        <Switch value={!!form.isDoc} onValueChange={v=>f('isDoc',v)} color={THEME.primary}/>
      </View>
    </>),
  };

  return (
    <Modal visible animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS==='ios'?'padding':'height'} style={{flex:1}}>
        <View style={MS.container}>
          <View style={MS.header}>
            <Text style={MS.title}>{isEdit?`Edit ${labels[type]}`:`Add ${labels[type]}`}</Text>
            <TouchableOpacity onPress={onClose}><Icon name="close" size={24} color={THEME.textSecondary}/></TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={MS.scroll} showsVerticalScrollIndicator={false}>
            {fields[type] || null}
            <View style={MS.rowBtns}>
              <Button mode="outlined" onPress={onClose} style={[MS.btn,{borderColor:THEME.border}]} textColor={THEME.textSecondary}>Cancel</Button>
              <Button mode="contained" onPress={()=>validate()&&onSave(form)} style={[MS.btn,{backgroundColor:THEME.primary}]}>
                {isEdit?'Update':'Add'}
              </Button>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

// ─── Tiny reusable pieces ─────────────────────────────────────────────────────
const Section = ({title,sub,children}) => (
  <View style={S.section}>
    <Text style={S.secTitle}>{title}</Text>
    <Text style={S.secSub}>{sub}</Text>
    {children}
  </View>
);
const ICard = ({title,sub,meta,onEdit,onDel}) => (
  <Card style={S.icard}>
    <View style={S.irow}>
      <View style={{flex:1}}>
        <Text style={S.ititle} numberOfLines={1}>{title}</Text>
        {sub  && <Text style={S.isub}  numberOfLines={2}>{sub}</Text>}
        {meta && <Text style={S.imeta} numberOfLines={1}>{meta}</Text>}
      </View>
      <View style={S.iacts}>
        <TouchableOpacity onPress={onEdit} style={S.ibtn}><Icon name="pencil-outline"    size={17} color={THEME.primary}/></TouchableOpacity>
        <TouchableOpacity onPress={onDel}  style={[S.ibtn,S.delbtn]}><Icon name="trash-can-outline" size={17} color={THEME.red}/></TouchableOpacity>
      </View>
    </View>
  </Card>
);
const AddBtn  = ({label,onPress}) => <Button mode="contained" icon="plus" onPress={onPress} style={{backgroundColor:THEME.primary,borderRadius:12,marginBottom:14}} contentStyle={{height:44}}>{label}</Button>;
const EditBtn = ({onPress}) => <Button mode="outlined" icon="pencil-outline" textColor={THEME.primary} style={{borderColor:THEME.primary,borderRadius:10,marginTop:8}} onPress={onPress}>Edit</Button>;
const SaveCancel = ({onCancel,onSave}) => (
  <View style={{flexDirection:'row',gap:12,marginTop:8}}>
    <Button mode="outlined" onPress={onCancel} style={{flex:1,borderColor:THEME.border}} textColor={THEME.textSecondary}>Cancel</Button>
    <Button mode="contained" onPress={onSave} style={{flex:1,backgroundColor:THEME.primary}}>Save</Button>
  </View>
);
const Empty = ({icon,text}) => <View style={S.empty}><Text style={{fontSize:40}}>{icon}</Text><Text style={S.emptyTxt}>{text}</Text></View>;
const Chips = ({label,opts,val,onPick}) => (
  <View style={{marginBottom:14}}>
    <Text style={S.fieldLbl}>{label}</Text>
    <View style={{flexDirection:'row',flexWrap:'wrap',gap:8}}>
      {opts.map(o=>(
        <TouchableOpacity key={o} onPress={()=>onPick(val===o?'':o)} style={[S.chip,val===o&&S.chipOn]}>
          <Text style={[S.chipTxt,val===o&&S.chipTxtOn]}>{o}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);
const FI = (props) => (
  <TextInput mode="flat" underlineColor="transparent" activeUnderlineColor={THEME.primary}
    style={[S.fi, props.height&&{height:props.height}]} {...props}/>
);

const S = StyleSheet.create({
  container: {flex:1,backgroundColor:'#F5F6FA'},
  header:    {backgroundColor:THEME.primary,paddingTop:52,paddingBottom:12,paddingHorizontal:20},
  headerRow: {flexDirection:'row',justifyContent:'space-between',alignItems:'center'},
  headerTitle:{fontSize:24,fontWeight:'800',color:'#FFF'},
  headerSub: {fontSize:12,color:'rgba(255,255,255,0.7)',marginTop:2},
  logoutBtn: {backgroundColor:'rgba(255,255,255,0.2)',borderRadius:10,padding:8},
  tabBarWrap:{backgroundColor:THEME.primary},
  tabBarContent:{paddingHorizontal:12,gap:4},
  tab:       {flexDirection:'row',alignItems:'center',paddingVertical:10,paddingHorizontal:11,borderTopLeftRadius:8,borderTopRightRadius:8,gap:4},
  tabActive: {backgroundColor:'#F5F6FA'},
  tabTxt:    {fontSize:11,color:'rgba(255,255,255,0.85)',fontWeight:'600'},
  tabTxtActive:{color:THEME.primary},
  body:      {flex:1},
  bodyPad:   {padding:16,paddingBottom:40},
  section:   {marginBottom:20},
  secTitle:  {fontSize:20,fontWeight:'800',color:THEME.textMain,marginBottom:3},
  secSub:    {fontSize:12,color:THEME.textSecondary,marginBottom:14},
  subHead:   {fontSize:14,fontWeight:'700',color:THEME.textMain,marginBottom:10},
  card:      {borderRadius:14,backgroundColor:THEME.white,elevation:2,padding:16,marginBottom:12},
  statsRow:  {flexDirection:'row',justifyContent:'space-around',paddingBottom:10},
  fi:        {marginBottom:12,backgroundColor:'#F0F0F0',borderTopLeftRadius:10,borderTopRightRadius:10,borderRadius:10,height:54},
  fieldLbl:  {fontSize:12,color:THEME.textSecondary,marginBottom:6},
  bodyText:  {fontSize:13,color:THEME.textMain,lineHeight:20,marginBottom:4},
  icard:     {borderRadius:12,backgroundColor:THEME.white,elevation:1,marginBottom:10,padding:12},
  irow:      {flexDirection:'row',alignItems:'flex-start'},
  ititle:    {fontSize:14,fontWeight:'700',color:THEME.textMain},
  isub:      {fontSize:12,color:THEME.textSecondary,marginTop:2},
  imeta:     {fontSize:11,color:'#999',marginTop:2},
  iacts:     {flexDirection:'row',gap:6,marginLeft:8},
  ibtn:      {backgroundColor:'#F5F5F5',padding:6,borderRadius:8},
  delbtn:    {backgroundColor:'#FFEBEE'},
  empty:     {alignItems:'center',paddingVertical:36},
  emptyTxt:  {fontSize:14,color:THEME.textSecondary,marginTop:8},
  chip:      {paddingHorizontal:12,paddingVertical:6,borderRadius:20,borderWidth:1.5,borderColor:THEME.border,backgroundColor:THEME.white},
  chipOn:    {borderColor:THEME.primary,backgroundColor:THEME.primaryLight},
  chipTxt:   {fontSize:12,color:THEME.textSecondary},
  chipTxtOn: {color:THEME.primary,fontWeight:'700'},
  snackbar:  {backgroundColor:'#333',borderRadius:10},
});

const MS = StyleSheet.create({
  container:{flex:1,backgroundColor:THEME.white,paddingTop:20},
  header:   {flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:20,paddingBottom:8},
  title:    {fontSize:20,fontWeight:'800',color:THEME.textMain},
  scroll:   {paddingHorizontal:20,paddingBottom:40},
  input:    {marginBottom:12,backgroundColor:'#F0F0F0',borderTopLeftRadius:10,borderTopRightRadius:10,borderRadius:10,height:54},
  rowBtns:  {flexDirection:'row',gap:12,marginTop:8},
  btn:      {flex:1,borderRadius:10},
  swRow:    {flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:14,paddingVertical:4},
  swLbl:    {fontSize:13,color:THEME.textSecondary,flex:1},
});

export default AdminPanelScreen;
