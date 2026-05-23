// src/i18n/translations.js
// All UI strings for English (en) and Malayalam (ml)

export const translations = {
  en: {
    // ── App-wide ────────────────────────────────────────────────────────────
    app: {
      name: 'Busthanul Uloom',
      sub: 'Arabic College',
      tagline: 'Knowledge Garden',
      logout: 'Logout',
      cancel: 'Cancel',
      save: 'Save',
      edit: 'Edit',
      add: 'Add',
      update: 'Update',
      delete: 'Delete',
      back: 'Back',
      continue: 'Continue',
      search: 'Search',
      close: 'Close',
      loading: 'Loading…',
      noData: 'No data available.',
      ok: 'OK',
    },

    // ── Language Toggle ─────────────────────────────────────────────────────
    language: {
      select: 'Language',
      en: 'English',
      ml: 'മലയാളം',
    },

    // ── Splash ──────────────────────────────────────────────────────────────
    splash: {
      tagline: 'Knowledge Garden',
    },

    // ── Onboarding ──────────────────────────────────────────────────────────
    onboarding: {
      skip: 'Skip',
      next: 'Next',
      getStarted: 'Get Started',
      slides: [
        {
          title: 'Welcome to Busthanul Uloom',
          description: 'Your gateway to Islamic education and knowledge',
        },
        {
          title: 'Student Portal',
          description: 'Access courses, assignments, and track your progress',
        },
        {
          title: 'Parent Portal',
          description: "Monitor your child's academic journey and performance",
        },
      ],
    },

    // ── Role Selection ───────────────────────────────────────────────────────
    roleSelection: {
      title: 'Who are you?',
      subtitle: 'Select your profile to personalize your experience',
      continue: 'Continue',
      roles: {
        guest: { title: 'Guest', description: 'Explore public courses & info' },
        student: { title: 'Student', description: 'Access your portal & lessons' },
        parent: { title: 'Parent', description: "Track your child's growth" },
        admin: { title: 'Admin', description: 'Manage institution settings' },
      },
    },

    // ── Login ────────────────────────────────────────────────────────────────
    login: {
      title: 'Welcome Back',
      subtitle: 'Sign in to access your {role} account',
      email: 'Email Address',
      password: 'Password',
      forgotPassword: 'Forgot Password?',
      loginBtn: 'Login',
      noAccount: "Don't have an account?",
      createAccount: ' Create Account',
      changeRole: '← Change Role',
      signingAs: 'Signing in as {role}',
      fillCredentials: 'Please enter your credentials',
    },

    // ── Register ─────────────────────────────────────────────────────────────
    register: {
      title: 'Create Account',
      subtitle: 'Join the',
      subtitleBold: 'Busthanul Uloom',
      subtitleEnd: 'community',
      fullName: 'Full Name',
      email: 'Email Address',
      phone: 'Phone (Optional)',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      createBtn: 'Create Account',
      haveAccount: 'Already have an account?',
      logIn: ' Log In',
      fillRequired: 'Please fill in required fields',
    },

    // ── Admin Login ──────────────────────────────────────────────────────────
    adminLogin: {
      title: 'Admin Access',
      subtitle: 'Authorised personnel only',
      username: 'Admin Username',
      password: 'Password',
      signInBtn: 'Sign In as Admin',
      backBtn: '← Back',
      securityNote: '🔒 This area is monitored. Unauthorised access attempts are logged.',
      fillCredentials: 'Please enter your credentials.',
      tooManyAttempts: 'Too many failed attempts. Please contact IT support.',
      invalidCredentials: 'Invalid credentials. {remaining} attempt(s) remaining.',
      failedAttempt: '⚠️ {count} failed attempt{plural}. Account locks after 5.',
    },

    // ── Home ─────────────────────────────────────────────────────────────────
    home: {
      greeting: 'As-salamu alaykum,',
      guestUser: 'Guest User',
      aboutTitle: 'About the Institution',
      campusServices: 'Campus Services',
      viewTeachers: 'View Our Teachers',
      logoutConfirmTitle: 'Logout',
      logoutConfirmMsg: 'Are you sure you want to logout?',
      statLabels: {
        est: 'Est.',
        affiliated: 'Affiliated',
        students: 'Students',
      },
      features: {
        dars: 'Bustanul Uloom Dars',
        examSchedule: 'Exam Schedule',
        busa: 'BUSA (Association)',
        holidays: 'Official Holidays',
        dayInDars: 'A Day in Dars',
        facilities: 'Facilities',
        gallery: 'Gallery & Videos',
        notifications: 'Notifications',
      },
    },

    // ── App Header ────────────────────────────────────────────────────────────
    header: {
      collegeName: 'Busthanul Uloom',
      collegeSub: 'Arabic College',
      logout: 'Logout',
    },

    // ── Teachers ─────────────────────────────────────────────────────────────
    teachers: {
      screenTitle: 'Our Teachers',
      searchPlaceholder: 'Search teachers...',
      noTeachers: 'No teachers added yet.',
      noResults: 'No results found.',
    },

    // ── Dars ─────────────────────────────────────────────────────────────────
    dars: {
      screenTitle: 'Busthanul Uloom Dars',
      programOverview: 'Program Overview',
      coreCurriculum: 'Core Curriculum',
      select: 'Select',
      cancelSelect: 'Cancel',
      deselectAll: 'Deselect all',
      selectAllLevels: 'Select all levels',
      selected: '{count} selected',
      downloadFull: 'Download Full Syllabus',
      downloadSelected: 'Download {count} Level{plural}',
      preparing: 'Preparing…',
      downloadHint: '☝️ Select levels above, or tap Download for the full syllabus',
      downloadNoteIos: 'Opens Files app · save or share from there',
      downloadNoteAndroid: 'Saves to Downloads · opens automatically',
      noData: 'No curriculum data available.',
      permissionDenied: '❌ Storage permission denied.',
      downloadFailed: '❌ Download failed. Please try again.',
      savedDownloads: '✅ Saved to Downloads folder!',
      readyIos: '✅ Syllabus ready — save or share from the sheet!',
    },

    // ── Exam Schedule ────────────────────────────────────────────────────────
    exams: {
      screenTitle: 'Examinations',
      noExams: 'No exams scheduled yet.',
    },

    // ── BUSA ─────────────────────────────────────────────────────────────────
    busa: {
      screenTitle: 'BUSA',
      committeeTitle: 'Committee 2024–25',
      president: 'President',
      secretary: 'Secretary',
      achievements: 'Latest Achievements',
      noAchievements: 'No achievements listed yet.',
    },

    // ── Holidays ─────────────────────────────────────────────────────────────
    holidays: {
      screenTitle: 'Official Holidays',
      noHolidays: 'No holidays listed yet.',
    },

    // ── Day in Dars ───────────────────────────────────────────────────────────
    dayInDars: {
      screenTitle: 'A Day in Dars',
      videoTitle: 'Virtual Tour: A Day in Dars',
      dailyRoutine: 'Daily Routine',
    },

    // ── Facilities ────────────────────────────────────────────────────────────
    facilities: {
      screenTitle: 'Campus Facilities',
      virtualTourBtn: 'START VIRTUAL TOUR (360°)',
      noFacilities: 'No facilities listed yet.',
    },

    // ── Gallery ───────────────────────────────────────────────────────────────
    gallery: {
      screenTitle: 'Gallery',
      photos: 'Photos',
      videos: 'Videos',
      noPhotos: 'No photos added yet.',
      noVideos: 'No videos added yet.',
    },

    // ── Notifications ─────────────────────────────────────────────────────────
    notifications: {
      screenTitle: 'Notifications',
      all: 'All',
      notice: 'Notice',
      document: 'Document',
      noNotifications: 'No notifications in this category.',
    },

    // ── Student Portal ────────────────────────────────────────────────────────
    studentPortal: {
      greeting: 'As-salamu alaykum,',
      myCourses: 'My Courses',
      quickAccess: 'Quick Access',
      stats: {
        attendance: 'Attendance',
        avgGrade: 'Avg Grade',
        tasks: 'Tasks',
      },
      quickActions: {
        library: 'Library',
        schedule: 'Schedule',
        grades: 'Grades',
        messages: 'Messages',
      },
    },

    // ── Parent Portal ─────────────────────────────────────────────────────────
    parentPortal: {
      dashboardTitle: 'Parental Dashboard',
      welcomeText: 'Welcome, {name}',
      myChildren: 'My Children',
      quickActions: 'Quick Actions',
      recentUpdates: 'Recent School Updates',
      attendance: 'Attendance',
      performance: 'Academic Performance',
      quickActionLabels: {
        feePayment: 'Fee Payment',
        examResults: 'Exam Results',
        leaveNote: 'Leave Note',
        busTracking: 'Bus Tracking',
      },
    },

    // ── Admin Panel ───────────────────────────────────────────────────────────
    adminPanel: {
      title: 'Admin Panel',
      subtitle: 'Busthanul Uloom Arabic College',
      logoutTitle: 'Logout',
      logoutMsg: 'Are you sure?',
      tabs: {
        college: 'College',
        teachers: 'Teachers',
        dars: 'Dars',
        exams: 'Exams',
        busa: 'BUSA',
        holidays: 'Holidays',
        schedule: 'Schedule',
        facilities: 'Facilities',
        gallery: 'Gallery',
        notices: 'Notices',
      },
      sections: {
        college: { title: 'College Information', sub: 'Displayed on Home screen' },
        teachers: { title: 'Teachers', sub: 'Home → View Our Teachers' },
        dars: { title: 'Dars Program', sub: 'Busthanul Uloom Dars screen' },
        exams: { title: 'Exam Schedule', sub: 'Exam Schedule screen' },
        busa: { title: 'BUSA Committee', sub: 'BUSA screen' },
        holidays: { title: 'Official Holidays', sub: 'Holidays screen' },
        schedule: { title: 'Day Schedule', sub: 'A Day in Dars screen' },
        facilities: { title: 'Facilities', sub: 'Facilities screen' },
        gallery: { title: 'Gallery', sub: 'Gallery screen' },
        notices: { title: 'Notifications', sub: 'Notifications screen' },
      },
      fields: {
        established: 'Establishment Year',
        affiliation: 'Affiliated University',
        students: 'Total Students',
        location: 'Location',
        president: 'President',
        secretary: 'Secretary',
        achievements: 'Achievements (one per line)',
        overview: 'Overview text',
        levelName: 'Level Name *',
        subjects: 'Subjects',
        examName: 'Exam Name *',
        date: 'Date',
        time: 'Time',
        status: 'Status',
        holidayName: 'Holiday Name *',
        type: 'Type',
        event: 'Event *',
        details: 'Details',
        iconName: 'Icon (MaterialCommunity name)',
        facilityName: 'Name *',
        description: 'Description',
        timing: 'Timing',
        imageUrl: 'Image URL *',
        caption: 'Caption',
        videoTitle: 'Title *',
        duration: 'Duration',
        thumbUrl: 'Thumbnail URL',
        videoUrl: 'Video URL',
        notifTitle: 'Title *',
        notifDesc: 'Description',
        timeLabel: 'Time label',
        category: 'Category',
        isDoc: 'Is Document (shows download icon)',
        fullName: 'Full Name *',
        designation: 'Designation *',
        subject: 'Subject',
        phone: 'Phone',
      },
      actions: {
        addTeacher: 'Add Teacher',
        addLevel: 'Add Level',
        addExam: 'Add Exam',
        addHoliday: 'Add Holiday',
        addItem: 'Add Item',
        addFacility: 'Add Facility',
        addPhoto: 'Add Photo',
        addVideo: 'Add Video',
        addNotice: 'Add Notice',
      },
      snacks: {
        collegeSaved: '✅ College info saved!',
        overviewSaved: '✅ Overview saved!',
        busaSaved: '✅ BUSA info saved!',
        teacherUpdated: '✅ Teacher updated!',
        teacherAdded: '✅ Teacher added!',
        levelUpdated: '✅ Level updated!',
        levelAdded: '✅ Level added!',
        examUpdated: '✅ Exam updated!',
        examAdded: '✅ Exam added!',
        holidayUpdated: '✅ Holiday updated!',
        holidayAdded: '✅ Holiday added!',
        itemUpdated: '✅ Item updated!',
        itemAdded: '✅ Item added!',
        facilityUpdated: '✅ Facility updated!',
        facilityAdded: '✅ Facility added!',
        photoUpdated: '✅ Photo updated!',
        photoAdded: '✅ Photo added!',
        videoUpdated: '✅ Video updated!',
        videoAdded: '✅ Video added!',
        noticeUpdated: '✅ Notice updated!',
        noticeAdded: '✅ Notice added!',
        itemRemoved: 'Item removed.',
      },
      empty: {
        teachers: 'No teachers yet.',
        exams: 'No exams yet.',
        holidays: 'No holidays yet.',
        notices: 'No notices yet.',
      },
      modal: {
        add: 'Add {type}',
        edit: 'Edit {type}',
        types: {
          teacher: 'Teacher',
          exam: 'Exam',
          holiday: 'Holiday',
          schedule: 'Schedule Item',
          facility: 'Facility',
          photo: 'Photo',
          video: 'Video',
          notification: 'Notification',
          curriculum: 'Curriculum Level',
        },
      },
      deleteConfirm: {
        title: 'Delete',
        msg: 'Remove this item?',
      },
    },

    // ── Placeholder ───────────────────────────────────────────────────────────
    placeholder: {
      welcomeTo: 'Welcome to the',
      screen: 'Screen',
      wip: 'Development in Progress',
    },

    defaults: {
      collegeStats: {
        established: '1995',
        affiliation: 'Calicut',
        students: '1200+',
        location: 'Malappuram, Kerala',
      },

      darsOverview:
        'The Busthanul Uloom Dars program is a traditional yet systematic approach to Islamic studies, blending classical texts with modern pedagogical methods.',

      darsCurriculum: [
        { id: '1', level: 'Primary (Years 1–3)', subjects: 'Arabic Grammar (Nahw/Sarf), Fiqh - Basic' },
        { id: '2', level: 'Secondary (Years 4–7)', subjects: 'Usul al-Fiqh, Hadith Studies (Bukhari/Muslim)' },
      ],

      exams: [
        { id: '1', name: 'Mid-Term Examination', date: 'Oct 25, 2024', time: '09:00 AM', status: 'Upcoming' },
        { id: '2', name: 'Final Semester', date: 'Dec 15, 2024', time: '10:30 AM', status: 'Scheduled' },
      ],

      busa: {
        president: 'President Name',
        secretary: 'Secretary Name',
        achievements: [
          'Winners of State Level Arabic Quiz 2024',
          "Organized 'Ilm Fest' Community Outreach",
        ],
      },

      holidays: [
        { id: '1', name: 'Eid al-Fitr', date: 'Apr 10', type: 'Religious' },
        { id: '2', name: 'Independence Day', date: 'Aug 15', type: 'National' },
        { id: '3', name: 'Winter Break', date: 'Dec 24', type: 'Academic' },
      ],

      daySchedule: [
        { id: '1', time: '06:00 AM', event: 'Fajr Prayer', detail: 'Congregational prayer at the campus mosque followed by morning Adhkar.', icon: 'mosque' },
        { id: '2', time: '07:00 AM', event: 'Breakfast', detail: 'Nutritious morning meal served at the Dining Hall.', icon: 'coffee' },
        { id: '3', time: '08:00 AM', event: 'Morning Assembly', detail: 'Daily briefing and spiritual motivation session.', icon: 'account-voice' },
        { id: '4', time: '08:30 AM', event: 'Class Sessions', detail: 'Primary academic and religious instruction periods.', icon: 'book-open-page-variant' },
        { id: '5', time: '01:00 PM', event: 'Lunch & Zuhr', detail: 'Noon break for prayer and dining.', icon: 'food-apple' },
        { id: '6', time: '02:00 PM', event: 'Afternoon Sessions', detail: 'Specialized subjects and interactive group studies.', icon: 'pencil-ruler' },
        { id: '7', time: '05:00 PM', event: 'Sports & Leisure', detail: 'Physical activities at the Sports Ground or reading time.', icon: 'soccer' },
        { id: '8', time: '06:30 PM', event: 'Maghrib & Study', detail: "Prayer followed by supervised self-study (Muthala'a).", icon: 'lamp' },
        { id: '9', time: '09:00 PM', event: 'Dinner', detail: 'Final meal of the day.', icon: 'silverware-variant' },
        { id: '10', time: '10:00 PM', event: 'Lights Out', detail: 'Rest period to prepare for the next day.', icon: 'bed-outline' },
      ],

      facilities: [
        { id: '1', name: 'Mosque', icon: 'mosque', desc: 'Spacious prayer hall for daily prayers.', timing: '24 Hours' },
        { id: '2', name: 'Library', icon: 'library', desc: 'Extensive collection of Islamic & academic texts.', timing: '8 AM – 8 PM' },
        { id: '3', name: 'Computer Lab', icon: 'laptop', desc: 'Modern systems with high-speed internet.', timing: '9 AM – 4 PM' },
        { id: '4', name: 'Sports Ground', icon: 'soccer', desc: 'Facilities for football, cricket and more.', timing: '4 PM – 6:30 PM' },
        { id: '5', name: 'Dining Hall', icon: 'silverware-fork-knife', desc: 'Hygienic mess providing nutritious meals.', timing: 'Meal Times' },
        { id: '6', name: 'Hostel', icon: 'bed', desc: 'Comfortable residential quarters for students.', timing: '24 Hours' },
      ],

      // en.defaults
      galleryPhotos: [
        { id: '1', url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=500', caption: 'Campus View' },
        { id: '2', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=500', caption: 'Classroom' },
        // { id: '3', url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=500', caption: 'Library' },
        // { id: '4', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=500', caption: 'Morning Assembly' },
      ],

      galleryVideos: [
        { id: '1', title: 'Annual Day 2023', duration: '05:20', thumb: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=500', url: '' },
        { id: '2', title: 'Campus Tour', duration: '03:45', thumb: 'https://images.unsplash.com/photo-1524178232363-1fb28f74b0cd?q=80&w=500', url: '' },
      ],

      notifications: [
        { id: '1', title: 'Eid Holidays', desc: 'The campus will remain closed from April 10 to 15.', category: 'Notice', time: '2h ago', icon: 'bullhorn-variant', isDoc: false },
        { id: '2', title: 'Exam Hall Ticket', desc: 'Download your hall tickets for the Mid-Term exam.', category: 'Document', time: '1d ago', icon: 'file-pdf-box', isDoc: true },
        { id: '3', title: 'BUSA Election Results', desc: 'New committee members have been announced.', category: 'Notice', time: '3d ago', icon: 'account-group', isDoc: false },
        { id: '4', title: 'Fee Structure 2024', desc: 'Official fee structure for the upcoming academic year.', category: 'Document', time: '5d ago', icon: 'file-document', isDoc: true },
      ],

      examStatuses: {
        upcoming: 'Upcoming',
        scheduled: 'Scheduled',
        completed: 'Completed',
      },

      holidayTypes: {
        religious: 'Religious',
        national: 'National',
        academic: 'Academic',
      },

      notificationCategories: {
        notice: 'Notice',
        document: 'Document',
      },

      EXAMS: [
        { id: '1', name: 'Mid-Term Examination', date: 'Oct 25, 2024', time: '09:00 AM', status: 'Upcoming' },
        { id: '2', name: 'Final Semester', date: 'Dec 15, 2024', time: '10:30 AM', status: 'Scheduled' },
      ],
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // MALAYALAM
  // ══════════════════════════════════════════════════════════════════════════
  ml: {
    app: {
      name: 'ബുസ്താനുൽ ഉലൂം',
      sub: 'അറബിക് കോളേജ്',
      tagline: 'അറിവിൻ്റെ പൂന്തോട്ടം',
      logout: 'ലോഗൗട്ട്',
      cancel: 'റദ്ദാക്കുക',
      save: 'സേവ് ചെയ്യുക',
      edit: 'തിരുത്തുക',
      add: 'ചേർക്കുക',
      update: 'അപ്‌ഡേറ്റ് ചെയ്യുക',
      delete: 'ഇല്ലാതാക്കുക',
      back: 'തിരികെ',
      continue: 'തുടരുക',
      search: 'തിരയുക',
      close: 'അടയ്ക്കുക',
      loading: 'ലോഡ് ആകുന്നു…',
      noData: 'ഡേറ്റ ലഭ്യമല്ല.',
      ok: 'ശരി',
    },

    language: {
      select: 'ഭാഷ',
      en: 'English',
      ml: 'മലയാളം',
    },

    splash: {
      tagline: 'അറിവിൻ്റെ പൂന്തോട്ടം',
    },

    onboarding: {
      skip: 'ഒഴിവാക്കുക',
      next: 'അടുത്തത്',
      getStarted: 'ആരംഭിക്കുക',
      slides: [
        {
          title: 'ബുസ്താനുൽ ഉലൂമിലേക്ക് സ്വാഗതം',
          description: 'ഇസ്‌ലാമിക വിദ്യാഭ്യാസത്തിൻ്റെ കവാടം',
        },
        {
          title: 'സ്റ്റുഡൻ്റ് പോർട്ടൽ',
          description: 'കോഴ്‌സുകൾ, അസൈൻമെൻ്റുകൾ, പുരോഗതി ട്രാക്ക് ചെയ്യുക',
        },
        {
          title: 'രക്ഷിതാവ് പോർട്ടൽ',
          description: 'മകൻ/മകളുടെ പഠനപുരോഗതി നിരീക്ഷിക്കുക',
        },
      ],
    },

    roleSelection: {
      title: 'നിങ്ങൾ ആരാണ്?',
      subtitle: 'നിങ്ങളുടെ അനുഭവം വ്യക്തിഗതമാക്കാൻ പ്രൊഫൈൽ തിരഞ്ഞെടുക്കുക',
      continue: 'തുടരുക',
      roles: {
        guest: { title: 'അതിഥി', description: 'പൊതു കോഴ്‌സുകളും വിവരങ്ങളും പര്യവേക്ഷണം ചെയ്യുക' },
        student: { title: 'വിദ്യാർത്ഥി', description: 'പോർട്ടൽ ആക്‌സസ്സ് ചെയ്ത് പഠിക്കുക' },
        parent: { title: 'രക്ഷിതാവ്', description: 'മകൻ/മകളുടെ വളർച്ച ട്രാക്ക് ചെയ്യുക' },
        admin: { title: 'അഡ്മിൻ', description: 'സ്ഥാപനത്തിൻ്റെ ക്രമീകരണം നിയന്ത്രിക്കുക' },
      },
    },

    login: {
      title: 'തിരിച്ചുവരവ് സ്വാഗതം',
      subtitle: '{role} അക്കൗണ്ടിൽ സൈൻ ഇൻ ചെയ്യുക',
      email: 'ഇമെയിൽ വിലാസം',
      password: 'പാസ്‌വേർഡ്',
      forgotPassword: 'പാസ്‌വേർഡ് മറന്നോ?',
      loginBtn: 'ലോഗിൻ',
      noAccount: 'അക്കൗണ്ട് ഇല്ലേ?',
      createAccount: ' അക്കൗണ്ട് ഉണ്ടാക്കുക',
      changeRole: '← റോൾ മാറ്റുക',
      signingAs: '{role} ആയി സൈൻ ഇൻ ചെയ്യുന്നു',
      fillCredentials: 'ദയവായി ലോഗിൻ വിവരങ്ങൾ നൽകുക',
    },

    register: {
      title: 'അക്കൗണ്ട് ഉണ്ടാക്കുക',
      subtitle: '',
      subtitleBold: 'ബുസ്താനുൽ ഉലൂം',
      subtitleEnd: 'കമ്മ്യൂണിറ്റിയിൽ ചേരുക',
      fullName: 'പൂർണ്ണ നാമം',
      email: 'ഇമെയിൽ വിലാസം',
      phone: 'ഫോൺ (ഐച്ഛിക)',
      password: 'പാസ്‌വേർഡ്',
      confirmPassword: 'പാസ്‌വേർഡ് സ്ഥിരീകരിക്കുക',
      createBtn: 'അക്കൗണ്ട് ഉണ്ടാക്കുക',
      haveAccount: 'ഇതിനകം അക്കൗണ്ട് ഉണ്ടോ?',
      logIn: ' ലോഗിൻ ചെയ്യുക',
      fillRequired: 'ആവശ്യമായ ഫീൽഡുകൾ പൂരിപ്പിക്കുക',
    },

    adminLogin: {
      title: 'അഡ്മിൻ ആക്‌സസ്',
      subtitle: 'അധികൃത ഉദ്യോഗസ്ഥർക്ക് മാത്രം',
      username: 'അഡ്മിൻ യൂസർനേം',
      password: 'പാസ്‌വേർഡ്',
      signInBtn: 'അഡ്മിൻ ആയി സൈൻ ഇൻ ചെയ്യുക',
      backBtn: '← തിരികെ',
      securityNote: '🔒 ഈ ഏരിയ നിരീക്ഷണ വിധേയമാണ്. അനധികൃത പ്രവേശന ശ്രമങ്ങൾ രേഖപ്പെടുത്തും.',
      fillCredentials: 'ദയവായി ലോഗിൻ വിവരങ്ങൾ നൽകുക.',
      tooManyAttempts: 'പരിശ്രമങ്ങൾ അധികമായി. IT സപ്പോർട്ടിനെ ബന്ധപ്പെടുക.',
      invalidCredentials: 'തെറ്റായ ക്രെഡൻഷ്യൽ. {remaining} ശ്രമം ബാക്കിയുണ്ട്.',
      failedAttempt: '⚠️ {count} ശ്രമം പരാജയപ്പെട്ടു. 5 ശ്രമത്തിന് ശേഷം അക്കൗണ്ട് ലോക്ക് ആകും.',
    },

    home: {
      greeting: 'അസ്സലാമു അലൈക്കും,',
      guestUser: 'അതിഥി',
      aboutTitle: 'സ്ഥാപനത്തെ കുറിച്ച്',
      campusServices: 'ക്യാമ്പസ് സേവനങ്ങൾ',
      viewTeachers: 'ഞങ്ങളുടെ അദ്ധ്യാപകരെ കാണുക',
      logoutConfirmTitle: 'ലോഗൗട്ട്',
      logoutConfirmMsg: 'ലോഗൗട്ട് ആകണോ?',
      statLabels: {
        est: 'സ്ഥാപിതം',
        affiliated: 'അഫിലിയേഷൻ',
        students: 'വിദ്യാർത്ഥികൾ',
      },
      features: {
        dars: 'ബുസ്താനുൽ ഉലൂം ദർസ്',
        examSchedule: 'പരീക്ഷ ഷെഡ്യൂൾ',
        busa: 'BUSA (അസോസിയേഷൻ)',
        holidays: 'ഔദ്യോഗിക അവധി',
        dayInDars: 'ദർസിലെ ഒരു ദിവസം',
        facilities: 'സൗകര്യങ്ങൾ',
        gallery: 'ഗ്യാലറി & വീഡിയോകൾ',
        notifications: 'അറിയിപ്പുകൾ',
      },
    },

    header: {
      collegeName: 'ബുസ്താനുൽ ഉലൂം',
      collegeSub: 'അറബിക് കോളേജ്',
      logout: 'ലോഗൗട്ട്',
    },

    teachers: {
      screenTitle: 'ഞങ്ങളുടെ അദ്ധ്യാപകർ',
      searchPlaceholder: 'അദ്ധ്യാപകരെ തിരയുക...',
      noTeachers: 'ഇതുവരെ അദ്ധ്യാപകരെ ചേർത്തിട്ടില്ല.',
      noResults: 'ഫലങ്ങൾ കണ്ടെത്തിയില്ല.',
    },

    dars: {
      screenTitle: 'ബുസ്താനുൽ ഉലൂം ദർസ്',
      programOverview: 'പ്രോഗ്രാം അവലോകനം',
      coreCurriculum: 'കോർ കരിക്കുലം',
      select: 'തിരഞ്ഞെടുക്കുക',
      cancelSelect: 'റദ്ദാക്കുക',
      deselectAll: 'എല്ലാം നീക്കം ചെയ്യുക',
      selectAllLevels: 'എല്ലാ ലെവലുകളും തിരഞ്ഞെടുക്കുക',
      selected: '{count} തിരഞ്ഞെടുത്തു',
      downloadFull: 'പൂർണ്ണ സിലബസ് ഡൗൺലോഡ് ചെയ്യുക',
      downloadSelected: '{count} ലെവൽ ഡൗൺലോഡ് ചെയ്യുക',
      preparing: 'തയ്യാറാകുന്നു…',
      downloadHint: '☝️ ലെവലുകൾ തിരഞ്ഞെടുക്കുക അല്ലെങ്കിൽ പൂർണ്ണ സിലബസ് ഡൗൺലോഡ് ചെയ്യുക',
      downloadNoteIos: 'Files ആപ്പ് തുറക്കും · അവിടെ നിന്ന് സേവ് ചെയ്യുക',
      downloadNoteAndroid: 'Downloads ഫോൾഡറിൽ സേവ് ആകും · സ്വയം തുറക്കും',
      noData: 'കരിക്കുലം ഡേറ്റ ലഭ്യമല്ല.',
      permissionDenied: '❌ സ്റ്റോറേജ് അനുമതി നിരസിക്കപ്പെട്ടു.',
      downloadFailed: '❌ ഡൗൺലോഡ് പരാജയപ്പെട്ടു. വീണ്ടും ശ്രമിക്കുക.',
      savedDownloads: '✅ Downloads ഫോൾഡറിൽ സേവ് ആയി!',
      readyIos: '✅ സിലബസ് തയ്യാർ — ഷീറ്റിൽ നിന്ന് സേവ് ചെയ്യുക!',
    },

    exams: {
      screenTitle: 'പരീക്ഷകൾ',
      noExams: 'ഇതുവരെ പരീക്ഷകൾ ഷെഡ്യൂൾ ചെയ്തിട്ടില്ല.',
    },

    busa: {
      screenTitle: 'BUSA',
      committeeTitle: 'കമ്മിറ്റി 2024–25',
      president: 'പ്രസിഡൻ്റ്',
      secretary: 'സെക്രട്ടറി',
      achievements: 'സമീപകാല നേട്ടങ്ങൾ',
      noAchievements: 'ഇതുവരെ നേട്ടങ്ങൾ രേഖപ്പെടുത്തിയിട്ടില്ല.',
    },

    holidays: {
      screenTitle: 'ഔദ്യോഗിക അവധി',
      noHolidays: 'ഇതുവരെ അവധി ദിവസങ്ങൾ ചേർത്തിട്ടില്ല.',
    },

    dayInDars: {
      screenTitle: 'ദർസിലെ ഒരു ദിവസം',
      videoTitle: 'വർച്ചൽ ടൂർ: ദർസിലെ ഒരു ദിവസം',
      dailyRoutine: 'ദൈനദിന ദിനചര്യ',
    },

    facilities: {
      screenTitle: 'ക്യാമ്പസ് സൗകര്യങ്ങൾ',
      virtualTourBtn: 'വർച്ചൽ ടൂർ ആരംഭിക്കുക (360°)',
      noFacilities: 'ഇതുവരെ സൗകര്യങ്ങൾ ചേർത്തിട്ടില്ല.',
    },

    gallery: {
      screenTitle: 'ഗ്യാലറി',
      photos: 'ഫോട്ടോകൾ',
      videos: 'വീഡിയോകൾ',
      noPhotos: 'ഫോട്ടോകൾ ചേർത്തിട്ടില്ല.',
      noVideos: 'വീഡിയോകൾ ചേർത്തിട്ടില്ല.',
    },

    notifications: {
      screenTitle: 'അറിയിപ്പുകൾ',
      all: 'എല്ലാം',
      notice: 'നോട്ടീസ്',
      document: 'ഡോക്കുമെൻ്റ്',
      noNotifications: 'ഈ വിഭാഗത്തിൽ അറിയിപ്പുകൾ ഇല്ല.',
    },

    studentPortal: {
      greeting: 'അസ്സലാമു അലൈക്കും,',
      myCourses: 'എൻ്റെ കോഴ്‌സുകൾ',
      quickAccess: 'ദ്രുത ആക്‌സസ്',
      stats: {
        attendance: 'ഹാജർ',
        avgGrade: 'ശരാശരി ഗ്രേഡ്',
        tasks: 'ടാസ്‌കുകൾ',
      },
      quickActions: {
        library: 'ലൈബ്രറി',
        schedule: 'ഷെഡ്യൂൾ',
        grades: 'ഗ്രേഡുകൾ',
        messages: 'സന്ദേശങ്ങൾ',
      },
    },

    parentPortal: {
      dashboardTitle: 'രക്ഷിതാവ് ഡാഷ്‌ബോർഡ്',
      welcomeText: 'സ്വാഗതം, {name}',
      myChildren: 'എൻ്റെ കുട്ടികൾ',
      quickActions: 'ദ്രുത പ്രവർത്തനങ്ങൾ',
      recentUpdates: 'സ്‌കൂൾ അപ്‌ഡേറ്റുകൾ',
      attendance: 'ഹാജർ',
      performance: 'അക്കാദമിക് പ്രകടനം',
      quickActionLabels: {
        feePayment: 'ഫീസ് അടക്കൽ',
        examResults: 'പരീക്ഷാ ഫലം',
        leaveNote: 'ലീവ് കത്ത്',
        busTracking: 'ബസ് ട്രാക്കിംഗ്',
      },
    },

    adminPanel: {
      title: 'അഡ്മിൻ പാനൽ',
      subtitle: 'ബുസ്താനുൽ ഉലൂം അറബിക് കോളേജ്',
      logoutTitle: 'ലോഗൗട്ട്',
      logoutMsg: 'തുടരണോ?',
      tabs: {
        college: 'കോളേജ്',
        teachers: 'അദ്ധ്യാപകർ',
        dars: 'ദർസ്',
        exams: 'പരീക്ഷ',
        busa: 'BUSA',
        holidays: 'അവധി',
        schedule: 'ഷെഡ്യൂൾ',
        facilities: 'സൗകര്യം',
        gallery: 'ഗ്യാലറി',
        notices: 'നോട്ടീസ്',
      },
      sections: {
        college: { title: 'കോളേജ് വിവരങ്ങൾ', sub: 'ഹോം സ്‌ക്രീനിൽ കാണിക്കും' },
        teachers: { title: 'അദ്ധ്യാപകർ', sub: 'ഹോം → ഞങ്ങളുടെ അദ്ധ്യാപകർ' },
        dars: { title: 'ദർസ് പ്രോഗ്രാം', sub: 'ബുസ്താനുൽ ഉലൂം ദർസ് സ്‌ക്രീൻ' },
        exams: { title: 'പരീക്ഷ ഷെഡ്യൂൾ', sub: 'പരീക്ഷ ഷെഡ്യൂൾ സ്‌ക്രീൻ' },
        busa: { title: 'BUSA കമ്മിറ്റി', sub: 'BUSA സ്‌ക്രീൻ' },
        holidays: { title: 'ഔദ്യോഗിക അവധി', sub: 'അവധി സ്‌ക്രീൻ' },
        schedule: { title: 'ദൈനദിന ഷെഡ്യൂൾ', sub: 'ദർസിലെ ഒരു ദിവസം സ്‌ക്രീൻ' },
        facilities: { title: 'സൗകര്യങ്ങൾ', sub: 'സൗകര്യ സ്‌ക്രീൻ' },
        gallery: { title: 'ഗ്യാലറി', sub: 'ഗ്യാലറി സ്‌ക്രീൻ' },
        notices: { title: 'അറിയിപ്പുകൾ', sub: 'അറിയിപ്പ് സ്‌ക്രീൻ' },
      },
      fields: {
        established: 'സ്ഥാപന വർഷം',
        affiliation: 'അഫിലിയേറ്റഡ് യൂണിവേഴ്‌സിറ്റി',
        students: 'മൊത്തം വിദ്യാർത്ഥികൾ',
        location: 'സ്ഥലം',
        president: 'പ്രസിഡൻ്റ്',
        secretary: 'സെക്രട്ടറി',
        achievements: 'നേട്ടങ്ങൾ (ഓരോ വരിയിൽ ഒന്ന്)',
        overview: 'അവലോകന വാചകം',
        levelName: 'ലെവൽ നാമം *',
        subjects: 'വിഷയങ്ങൾ',
        examName: 'പരീക്ഷ നാമം *',
        date: 'തീയതി',
        time: 'സമയം',
        status: 'സ്റ്റാറ്റസ്',
        holidayName: 'അവധി നാമം *',
        type: 'തരം',
        event: 'ഇവൻ്റ് *',
        details: 'വിശദാംശങ്ങൾ',
        iconName: 'ഐക്കൺ (MaterialCommunity)',
        facilityName: 'നാമം *',
        description: 'വിവരണം',
        timing: 'സമയ ക്രമം',
        imageUrl: 'ചിത്ര URL *',
        caption: 'ക്യാപ്ഷൻ',
        videoTitle: 'ശീർഷകം *',
        duration: 'ദൈർഘ്യം',
        thumbUrl: 'തംബ്‌നെയിൽ URL',
        videoUrl: 'വീഡിയോ URL',
        notifTitle: 'ശീർഷകം *',
        notifDesc: 'വിവരണം',
        timeLabel: 'സമയ ലേബൽ',
        category: 'വിഭാഗം',
        isDoc: 'ഡോക്കുമെൻ്റ് ആണോ (ഡൗൺലോഡ് ഐക്കൺ)',
        fullName: 'പൂർണ്ണ നാമം *',
        designation: 'ഉദ്യോഗ പദവി *',
        subject: 'വിഷയം',
        phone: 'ഫോൺ',
      },
      actions: {
        addTeacher: 'അദ്ധ്യാപകനെ ചേർക്കുക',
        addLevel: 'ലെവൽ ചേർക്കുക',
        addExam: 'പരീക്ഷ ചേർക്കുക',
        addHoliday: 'അവധി ചേർക്കുക',
        addItem: 'ഇനം ചേർക്കുക',
        addFacility: 'സൗകര്യം ചേർക്കുക',
        addPhoto: 'ഫോട്ടോ ചേർക്കുക',
        addVideo: 'വീഡിയോ ചേർക്കുക',
        addNotice: 'നോട്ടീസ് ചേർക്കുക',
      },
      snacks: {
        collegeSaved: '✅ കോളേജ് വിവരങ്ങൾ സേവ് ആയി!',
        overviewSaved: '✅ അവലോകനം സേവ് ആയി!',
        busaSaved: '✅ BUSA വിവരങ്ങൾ സേവ് ആയി!',
        teacherUpdated: '✅ അദ്ധ്യാപകൻ അപ്‌ഡേറ്റ് ആയി!',
        teacherAdded: '✅ അദ്ധ്യാപകനെ ചേർത്തു!',
        levelUpdated: '✅ ലെവൽ അപ്‌ഡേറ്റ് ആയി!',
        levelAdded: '✅ ലെവൽ ചേർത്തു!',
        examUpdated: '✅ പരീക്ഷ അപ്‌ഡേറ്റ് ആയി!',
        examAdded: '✅ പരീക്ഷ ചേർത്തു!',
        holidayUpdated: '✅ അവധി അപ്‌ഡേറ്റ് ആയി!',
        holidayAdded: '✅ അവധി ചേർത്തു!',
        itemUpdated: '✅ ഇനം അപ്‌ഡേറ്റ് ആയി!',
        itemAdded: '✅ ഇനം ചേർത്തു!',
        facilityUpdated: '✅ സൗകര്യം അപ്‌ഡേറ്റ് ആയി!',
        facilityAdded: '✅ സൗകര്യം ചേർത്തു!',
        photoUpdated: '✅ ഫോട്ടോ അപ്‌ഡേറ്റ് ആയി!',
        photoAdded: '✅ ഫോട്ടോ ചേർത്തു!',
        videoUpdated: '✅ വീഡിയോ അപ്‌ഡേറ്റ് ആയി!',
        videoAdded: '✅ വീഡിയോ ചേർത്തു!',
        noticeUpdated: '✅ നോട്ടീസ് അപ്‌ഡേറ്റ് ആയി!',
        noticeAdded: '✅ നോട്ടീസ് ചേർത്തു!',
        itemRemoved: 'ഇനം നീക്കം ചെയ്തു.',
      },
      empty: {
        teachers: 'ഇതുവരെ അദ്ധ്യാപകർ ഇല്ല.',
        exams: 'ഇതുവരെ പരീക്ഷകൾ ഇല്ല.',
        holidays: 'ഇതുവരെ അവധി ഇല്ല.',
        notices: 'ഇതുവരെ നോട്ടീസ് ഇല്ല.',
      },
      modal: {
        add: '{type} ചേർക്കുക',
        edit: '{type} തിരുത്തുക',
        types: {
          teacher: 'അദ്ധ്യാപകൻ',
          exam: 'പരീക്ഷ',
          holiday: 'അവധി',
          schedule: 'ഷെഡ്യൂൾ ഇനം',
          facility: 'സൗകര്യം',
          photo: 'ഫോട്ടോ',
          video: 'വീഡിയോ',
          notification: 'അറിയിപ്പ്',
          curriculum: 'കരിക്കുലം ലെവൽ',
        },
      },
      deleteConfirm: {
        title: 'ഇല്ലാതാക്കുക',
        msg: 'ഈ ഇനം നീക്കം ചെയ്യണോ?',
      },
    },

    placeholder: {
      welcomeTo: 'സ്വാഗതം',
      screen: 'സ്‌ക്രീൻ',
      wip: 'വികസനം പുരോഗതിയിൽ',
    },

    defaults: {
      collegeStats: {
        established: '1995',
        affiliation: 'കോഴിക്കോട്',
        students: '1200+',
        location: 'മലപ്പുറം, കേരള',
      },

      darsOverview:
        'ബുസ്താനുൽ ഉലൂം ദർസ് പ്രോഗ്രാം ഇസ്‌ലാമിക് പഠനത്തോടുള്ള പരമ്പരാഗതവും ചിട്ടയായതുമായ ഒരു സമീപനമാണ്, ക്ലാസിക്കൽ ഗ്രന്ഥങ്ങളും ആധുനിക അദ്ധ്യാപന രീതികളും സമന്വയിപ്പിക്കുന്നു.',

      darsCurriculum: [
        { id: '1', level: 'പ്രൈമറി (വർഷം 1–3)', subjects: 'അറബി വ്യാകരണം (നഹ്‌വ്/സർഫ്), ഫിഖ്‌ഹ് - അടിസ്ഥാനം' },
        { id: '2', level: 'സെക്കൻഡറി (വർഷം 4–7)', subjects: 'ഉസൂൽ അൽ-ഫിഖ്‌ഹ്, ഹദീസ് പഠനം (ബുഖാരി/മുസ്‌ലിം)' },
      ],

      exams: [
        { id: '1', name: 'മിഡ്-ടേം പരീക്ഷ', date: 'ഒക്ടോ 25, 2024', time: '09:00 AM', status: 'ഉടൻ വരുന്നത്' },
        { id: '2', name: 'ഫൈനൽ സെമസ്റ്റർ', date: 'ഡിസം 15, 2024', time: '10:30 AM', status: 'ഷെഡ്യൂൾ ചെയ്തത്' },
      ],

      busa: {
        president: 'പ്രസിഡൻ്റിൻ്റെ പേര്',
        secretary: 'സെക്രട്ടറിയുടെ പേര്',
        achievements: [
          'സ്റ്റേറ്റ് ലെവൽ അറബിക് ക്വിസ് 2024 ജേതാക്കൾ',
          "'ഇൽം ഫെസ്റ്റ്' കമ്മ്യൂണിറ്റി ഔട്ട്‌റീച്ച് സംഘടിപ്പിച്ചു",
        ],
      },

      holidays: [
        { id: '1', name: 'ഈദുൽ ഫിത്ർ', date: 'ഏപ്രി 10', type: 'മതപരം' },
        { id: '2', name: 'സ്വാതന്ത്ര്യ ദിനം', date: 'ആഗ 15', type: 'ദേശീയം' },
        { id: '3', name: 'ശൈത്യകാല അവധി', date: 'ഡിസം 24', type: 'അക്കാദമിക്' },
      ],

      daySchedule: [
        { id: '1', time: '06:00 AM', event: 'ഫജ്‌ർ നമസ്‌കാരം', detail: 'ക്യാമ്പസ് പള്ളിയിൽ ജമാഅത്ത് നമസ്‌കാരം, തുടർന്ന് പ്രഭാത അദ്കാർ.', icon: 'mosque' },
        { id: '2', time: '07:00 AM', event: 'പ്രഭാത ഭക്ഷണം', detail: 'ഡൈനിംഗ് ഹാളിൽ പോഷകസമൃദ്ധമായ രാവിലെ ഭക്ഷണം.', icon: 'coffee' },
        { id: '3', time: '08:00 AM', event: 'മോർണിംഗ് അസംബ്ലി', detail: 'ദൈനദിന ബ്രീഫിംഗും ആത്മീയ പ്രേരണ സെഷനും.', icon: 'account-voice' },
        { id: '4', time: '08:30 AM', event: 'ക്ലാസ് സെഷനുകൾ', detail: 'പ്രാഥമിക അക്കാദമിക്, മതബോധന കാലഘട്ടങ്ങൾ.', icon: 'book-open-page-variant' },
        { id: '5', time: '01:00 PM', event: 'ഉച്ചഭക്ഷണം & ളുഹ്‌ർ', detail: 'നമസ്‌കാരത്തിനും ഭക്ഷണത്തിനുമുള്ള ഉച്ചനേര ഇടവേള.', icon: 'food-apple' },
        { id: '6', time: '02:00 PM', event: 'ഉച്ചകഴിഞ്ഞ സെഷനുകൾ', detail: 'പ്രത്യേക വിഷയങ്ങളും ഇൻ്ററാക്ടീവ് ഗ്രൂപ്പ് പഠനവും.', icon: 'pencil-ruler' },
        { id: '7', time: '05:00 PM', event: 'കളിയും ഒഴിവ് സമയവും', detail: 'സ്‌പോർട്‌സ് ഗ്രൗണ്ടിൽ ശാരീരിക പ്രവർത്തനങ്ങൾ അല്ലെങ്കിൽ വായനാ സമയം.', icon: 'soccer' },
        { id: '8', time: '06:30 PM', event: 'മഗ്‌രിബ് & പഠനം', detail: 'നമസ്‌കാരം, തുടർന്ന് മേൽനോട്ടത്തിൽ സ്വയം പഠനം (മുതാലഅ).', icon: 'lamp' },
        { id: '9', time: '09:00 PM', event: 'അത്താഴം', detail: 'ദിവസത്തെ അവസാന ഭക്ഷണം.', icon: 'silverware-variant' },
        { id: '10', time: '10:00 PM', event: 'ലൈറ്റ്സ് ഔട്ട്', detail: 'അടുത്ത ദിവസത്തിനുള്ള വിശ്രമ കാലഘട്ടം.', icon: 'bed-outline' },
      ],

      facilities: [
        { id: '1', name: 'പള്ളി', icon: 'mosque', desc: 'ദൈനദിന നമസ്‌കാരത്തിനുള്ള വിശാലമായ പ്രാർഥനാ ഹാൾ.', timing: '24 മണിക്കൂർ' },
        { id: '2', name: 'ലൈബ്രറി', icon: 'library', desc: 'ഇസ്‌ലാമിക്, അക്കാദമിക് ഗ്രന്ഥങ്ങളുടെ വലിയ ശേഖരം.', timing: '8 AM – 8 PM' },
        { id: '3', name: 'കംപ്യൂട്ടർ ലാബ്', icon: 'laptop', desc: 'ഹൈ-സ്പീഡ് ഇൻ്റർനെറ്റ് സഹിതം ആധുനിക സംവിധാനങ്ങൾ.', timing: '9 AM – 4 PM' },
        { id: '4', name: 'സ്‌പോർട്‌സ് ഗ്രൗണ്ട്', icon: 'soccer', desc: 'ഫുട്‌ബോൾ, ക്രിക്കറ്റ് തുടങ്ങിയ കളിക്കുള്ള സൗകര്യങ്ങൾ.', timing: '4 PM – 6:30 PM' },
        { id: '5', name: 'ഡൈനിംഗ് ഹാൾ', icon: 'silverware-fork-knife', desc: 'ശുചിത്വമുള്ള, പോഷകസമൃദ്ധ ഭക്ഷണം നൽകുന്ന മെസ്.', timing: 'ഭക്ഷണ സമയങ്ങൾ' },
        { id: '6', name: 'ഹോസ്റ്റൽ', icon: 'bed', desc: 'വിദ്യാർഥികൾക്കുള്ള സൗകര്യപ്രദമായ താമസ സൗകര്യം.', timing: '24 മണിക്കൂർ' },
      ],

      // en.defaults
      galleryPhotos: [
        { id: '1', url: 'https://images.unsplash.com/photo-1523050853064-8504f434033b?q=80&w=500', caption: 'Campus View' },
        { id: '2', url: 'https://images.unsplash.com/photo-1524178232363-1fb28f74b0cd?q=80&w=500', caption: 'Classroom' },
        { id: '3', url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=500', caption: 'Library' },
        { id: '4', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=500', caption: 'Morning Assembly' },
      ],

      galleryVideos: [
        { id: '1', title: 'വാർഷിക ദിനം 2023', duration: '05:20', thumb: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=500', url: '' },
        { id: '2', title: 'ക്യാമ്പസ് ടൂർ', duration: '03:45', thumb: 'https://images.unsplash.com/photo-1524178232363-1fb28f74b0cd?q=80&w=500', url: '' },
      ],

      notifications: [
        { id: '1', title: 'ഈദ് അവധി', desc: 'ക്യാമ്പസ് ഏപ്രിൽ 10 മുതൽ 15 വരെ അടഞ്ഞിരിക്കും.', category: 'Notice', time: '2 മണിക്കൂർ മുമ്പ്', icon: 'bullhorn-variant', isDoc: false },
        { id: '2', title: 'പരീക്ഷ ഹാൾ ടിക്കറ്റ്', desc: 'മിഡ്-ടേം പരീക്ഷയ്ക്കുള്ള ഹാൾ ടിക്കറ്റ് ഡൗൺലോഡ് ചെയ്യുക.', category: 'Document', time: '1 ദിവസം മുമ്പ്', icon: 'file-pdf-box', isDoc: true },
        { id: '3', title: 'BUSA ഇലക്ഷൻ ഫലം', desc: 'പുതിയ കമ്മിറ്റി അംഗങ്ങൾ പ്രഖ്യാപിക്കപ്പെട്ടു.', category: 'Notice', time: '3 ദിവസം മുമ്പ്', icon: 'account-group', isDoc: false },
        { id: '4', title: 'ഫീ സ്ട്രക്ചർ 2024', desc: 'വരുന്ന അക്കാദമിക് വർഷത്തിലെ ഔദ്യോഗിക ഫീ വിശദാംശങ്ങൾ.', category: 'Document', time: '5 ദിവസം മുമ്പ്', icon: 'file-document', isDoc: true },
      ],

      examStatuses: {
        upcoming: 'ഉടൻ വരുന്നത്',
        scheduled: 'ഷെഡ്യൂൾ ചെയ്തത്',
        completed: 'പൂർത്തിയായത്',
      },

      holidayTypes: {
        religious: 'മതപരം',
        national: 'ദേശീയം',
        academic: 'അക്കാദമിക്',
      },

      notificationCategories: {
        notice: 'നോട്ടീസ്',
        document: 'ഡോക്കുമെൻ്റ്',
      },
      EXAMS: [
        {
          id: '1',
          name: 'മിഡ്-ടേം പരീക്ഷ',
          date: 'ഒക്ടോബർ 25, 2024',
          time: 'രാവിലെ 09:00',
          status: 'വരാനിരിക്കുന്നത്'
        },
        {
          id: '2',
          name: 'ഫൈനൽ സെമസ്റ്റർ',
          date: 'ഡിസംബർ 15, 2024',
          time: 'രാവിലെ 10:30',
          status: 'ക്രമീകരിച്ചത്'
        },
      ],
    },

  },


};