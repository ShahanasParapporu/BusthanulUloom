// src/constants/contentKeys.js
// Single source of truth for all admin-managed content storage keys and schemas.
// Both AdminPanelScreen and all feature screens import from here.
import { translations } from '../i18n/translations';


export const CONTENT_KEYS = {
    COLLEGE_STATS:    'admin_college_stats',
    TEACHERS:         'admin_teachers',
    DARS_OVERVIEW:    'admin_dars_overview',
    DARS_CURRICULUM:  'admin_dars_curriculum',
    EXAMS:            'admin_exams',
    BUSA:             'admin_busa',
    HOLIDAYS:         'admin_holidays',
    DAY_SCHEDULE:     'admin_day_schedule',
    FACILITIES:       'admin_facilities',
    GALLERY_PHOTOS:   'admin_gallery_photos',
    GALLERY_VIDEOS:   'admin_gallery_videos',
    NOTIFICATIONS:    'admin_notifications',
  };
  
  // ─── Default / seed data ──────────────────────────────────────────────────────
  // Screens render this if admin hasn't saved anything yet.

  //export const getDefaults = (lang = 'en') => translations[lang].defaults ?? translations['en'].defaults;
  export const getDefaults = (lang = 'en') => {
    const d = translations[lang]?.defaults ?? translations['en'].defaults;
    return {
      ...d,
      // Normalise — screen uses UPPERCASE keys, translations use lowercase
      EXAMS:        d.EXAMS        ?? d.exams        ?? [],
      HOLIDAYS:     d.HOLIDAYS     ?? d.holidays      ?? [],
      DAY_SCHEDULE: d.DAY_SCHEDULE ?? d.daySchedule   ?? [],
      FACILITIES:   d.FACILITIES   ?? d.facilities    ?? [],
    };
  };

  
  // export const DEFAULTS = {
  //   COLLEGE_STATS: {
  //     established: '1995',
  //     affiliation: 'Calicut',
  //     students: '1200+',
  //     location: 'Malappuram, Kerala',
  //   },
  
  //   DARS_OVERVIEW:
  //     'The Busthanul Uloom Dars program is a traditional yet systematic approach to Islamic studies, blending classical texts with modern pedagogical methods.',
  
  //   DARS_CURRICULUM: [
  //     { id: '1', level: 'Primary (Years 1–3)',   subjects: 'Arabic Grammar (Nahw/Sarf), Fiqh - Basic' },
  //     { id: '2', level: 'Secondary (Years 4–7)', subjects: 'Usul al-Fiqh, Hadith Studies (Bukhari/Muslim)' },
  //   ],
  
  //   EXAMS: [
  //     { id: '1', name: 'Mid-Term Examination', date: 'Oct 25, 2024', time: '09:00 AM', status: 'Upcoming' },
  //     { id: '2', name: 'Final Semester',        date: 'Dec 15, 2024', time: '10:30 AM', status: 'Scheduled' },
  //   ],
  
  //   BUSA: {
  //     president: 'President Name',
  //     secretary: 'Secretary Name',
  //     achievements: [
  //       'Winners of State Level Arabic Quiz 2024',
  //       "Organized 'Ilm Fest' Community Outreach",
  //     ],
  //   },
  
  //   HOLIDAYS: [
  //     { id: '1', name: 'Eid al-Fitr',      date: 'Apr 10', type: 'Religious' },
  //     { id: '2', name: 'Independence Day', date: 'Aug 15', type: 'National'  },
  //     { id: '3', name: 'Winter Break',     date: 'Dec 24', type: 'Academic'  },
  //   ],
  
  //   DAY_SCHEDULE: [
  //     { id: '1',  time: '06:00 AM', event: 'Fajr Prayer',        detail: 'Congregational prayer at the campus mosque followed by morning Adhkar.', icon: 'mosque' },
  //     { id: '2',  time: '07:00 AM', event: 'Breakfast',           detail: 'Nutritious morning meal served at the Dining Hall.',                       icon: 'coffee' },
  //     { id: '3',  time: '08:00 AM', event: 'Morning Assembly',    detail: 'Daily briefing and spiritual motivation session.',                          icon: 'account-voice' },
  //     { id: '4',  time: '08:30 AM', event: 'Class Sessions',      detail: 'Primary academic and religious instruction periods.',                       icon: 'book-open-page-variant' },
  //     { id: '5',  time: '01:00 PM', event: 'Lunch & Zuhr',        detail: 'Noon break for prayer and dining.',                                         icon: 'food-apple' },
  //     { id: '6',  time: '02:00 PM', event: 'Afternoon Sessions',  detail: 'Specialized subjects and interactive group studies.',                       icon: 'pencil-ruler' },
  //     { id: '7',  time: '05:00 PM', event: 'Sports & Leisure',    detail: 'Physical activities at the Sports Ground or reading time.',                 icon: 'soccer' },
  //     { id: '8',  time: '06:30 PM', event: 'Maghrib & Study',     detail: "Prayer followed by supervised self-study (Muthala'a).",                    icon: 'lamp' },
  //     { id: '9',  time: '09:00 PM', event: 'Dinner',              detail: 'Final meal of the day.',                                                    icon: 'silverware-variant' },
  //     { id: '10', time: '10:00 PM', event: 'Lights Out',          detail: 'Rest period to prepare for the next day.',                                  icon: 'bed-outline' },
  //   ],
  
  //   FACILITIES: [
  //     { id: '1', name: 'Mosque',        icon: 'mosque',                 desc: 'Spacious prayer hall for daily prayers.',                    timing: '24 Hours'    },
  //     { id: '2', name: 'Library',       icon: 'library',                desc: 'Extensive collection of Islamic & academic texts.',         timing: '8 AM – 8 PM' },
  //     { id: '3', name: 'Computer Lab',  icon: 'laptop',                 desc: 'Modern systems with high-speed internet.',                  timing: '9 AM – 4 PM' },
  //     { id: '4', name: 'Sports Ground', icon: 'soccer',                 desc: 'Facilities for football, cricket and more.',                timing: '4 PM – 6:30 PM' },
  //     { id: '5', name: 'Dining Hall',   icon: 'silverware-fork-knife',  desc: 'Hygienic mess providing nutritious meals.',                 timing: 'Meal Times'  },
  //     { id: '6', name: 'Hostel',        icon: 'bed',                    desc: 'Comfortable residential quarters for students.',            timing: '24 Hours'    },
  //   ],
  
  //   GALLERY_PHOTOS: [
  //     { id: '1', url: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=500', caption: '' },
  //     { id: '2', url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=500', caption: '' },
  //     { id: '3', url: 'https://images.unsplash.com/photo-1523050853064-8504f434033b?q=80&w=500', caption: '' },
  //     { id: '4', url: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=500', caption: '' },
  //   ],
  
  //   GALLERY_VIDEOS: [
  //     { id: '1', title: 'Annual Day 2023', duration: '05:20', thumb: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=500', url: '' },
  //     { id: '2', title: 'Campus Tour',     duration: '03:45', thumb: 'https://images.unsplash.com/photo-1524178232363-1fb28f74b0cd?q=80&w=500', url: '' },
  //   ],
  
  //   NOTIFICATIONS: [
  //     { id: '1', title: 'Eid Holidays',        desc: 'The campus will remain closed from April 10 to 15.',         category: 'Notice',   time: '2h ago',  icon: 'bullhorn-variant',  isDoc: false },
  //     { id: '2', title: 'Exam Hall Ticket',    desc: 'Download your hall tickets for the Mid-Term exam.',           category: 'Document', time: '1d ago',  icon: 'file-pdf-box',      isDoc: true  },
  //     { id: '3', title: 'BUSA Election Results', desc: 'New committee members have been announced.',               category: 'Notice',   time: '3d ago',  icon: 'account-group',     isDoc: false },
  //     { id: '4', title: 'Fee Structure 2024',  desc: 'Official fee structure for the upcoming academic year.',      category: 'Document', time: '5d ago',  icon: 'file-document',     isDoc: true  },
  //   ],
  // };