// src/components/AppHeader.js
import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Platform, StatusBar,
} from 'react-native';
import { Avatar, Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { USER_ROLES } from '../constants/theme';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '../i18n/LanguageContext';

// ── Fix 2: Correct status-bar height per platform ─────────────────────────────
const STATUS_BAR_HEIGHT =
  Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 44;

const ROLE_COLOR = {
  [USER_ROLES.GUEST]:   '#2E7D32',
  [USER_ROLES.STUDENT]: '#2E7D32',
  [USER_ROLES.PARENT]:  '#1565C0',
  [USER_ROLES.ADMIN]:   '#6A1B9A',
};

/**
 * Props:
 *  role           – current USER_ROLES value
 *  user           – { name, email } from auth state
 *  onLogout       – called when logout/switch pressed
 *  onNotification – called when bell pressed (optional)
 *  notifCount     – badge count (optional, default 0)
 *  title          – page title shown on sub-pages
 *  showBack       – show back arrow instead of logo
 *  onBack         – called when back arrow pressed
 */
const AppHeader = ({
  role,
  user,
  onLogout,
  onNotification,
  notifCount = 0,
  title,
  showBack = false,
  onBack,
}) => {
  const isGuest = role === USER_ROLES.GUEST;
  const bgColor = ROLE_COLOR[role] ?? '#2E7D32';
  const { t } = useLanguage();

  return (
    <View style={[styles.wrapper, { backgroundColor: bgColor }]}>
      {/* Fix 2: explicit status-bar spacer — no magic paddingTop guesses */}
      <View style={{ height: STATUS_BAR_HEIGHT }} />

      <View style={styles.row}>

        {/* ── Left: back arrow OR logo + college name ───────────────────── */}
        {showBack ? (
          <TouchableOpacity onPress={onBack} style={styles.backBtn} hitSlop={HIT_SLOP}>
            <Icon name="arrow-left" size={22} color="#FFF" />
          </TouchableOpacity>
        ) : (
          // Fix 1: flexShrink:1 so long college names yield to action buttons
          <View style={styles.logoRow}>
            <Avatar.Image
              size={34}
              source={{ uri: 'https://via.placeholder.com/100' }}
              style={styles.logo}
            />
            <View style={styles.nameBlock}>
              {/* Fix 1: numberOfLines so text never wraps into 2 rows */}
              <Text style={styles.collegeName} numberOfLines={1}>
                {t('header.collegeName')}
              </Text>
              <Text style={styles.collegeSub} numberOfLines={1}>
                {t('header.collegeSub')}
              </Text>
            </View>
          </View>
        )}

        {/* ── Centre: page title on sub-pages ─────────────────────────── */}
        {title && showBack && (
          <Text style={styles.pageTitle} numberOfLines={1}>
            {title}
          </Text>
        )}

        {/* ── Right: language toggle + bell + logout ───────────────────── */}
        {/* Fix 1: each item sized tightly; no unconstrained flex growth   */}
        <View style={styles.actions}>

          {/* Language toggle */}
          <LanguageToggle dark />

          {/* Bell */}
          {onNotification && (
            <TouchableOpacity
              onPress={onNotification}
              style={styles.iconBtn}
              hitSlop={HIT_SLOP}
            >
              <Icon name="bell-outline" size={22} color="#FFF" />
              {notifCount > 0 && (
                <Badge style={styles.badge} size={14}>
                  {notifCount}
                </Badge>
              )}
            </TouchableOpacity>
          )}

          {/* Logout (authenticated users) */}
          {!isGuest && onLogout && (
            <TouchableOpacity onPress={onLogout} style={styles.logoutBtn} hitSlop={HIT_SLOP}>
              <Icon name="logout" size={18} color="#FFF" />
            </TouchableOpacity>
          )}

          {/* Account-switch (guest) */}
          {isGuest && (
            <TouchableOpacity onPress={onLogout} style={styles.iconBtn} hitSlop={HIT_SLOP}>
              <Icon name="account-switch-outline" size={22} color="#FFF" />
            </TouchableOpacity>
          )}

        </View>
      </View>
    </View>
  );
};

// Generous hit area without bloating visual padding
const HIT_SLOP = { top: 8, bottom: 8, left: 8, right: 8 };

const styles = StyleSheet.create({
  // Fix 2: wrapper contains the status-bar spacer + the actual header row
  wrapper: {
    // No paddingTop here — handled by the explicit spacer View above
    paddingBottom: 10,
    paddingHorizontal: 12,
  },

  // Fix 1: fixed-height row keeps everything on one line
  row: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
  },

  backBtn: {
    marginRight: 8,
    justifyContent: 'center',
  },

  // Fix 1: flex:1 + flexShrink:1 — name area shrinks before action buttons wrap
  logoRow: {
    flex: 1,
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    overflow: 'hidden',   // hard clip — no bleed into actions area
  },

  logo: {
    backgroundColor: '#FFF',
    marginRight: 8,
  },

  nameBlock: {
    flexShrink: 1,        // shrinks when logoRow is squeezed
  },

  collegeName: {
    color: '#FFF',
    fontSize: 14,         // down from 16 — fits longer names on small screens
    fontWeight: 'bold',
  },
  collegeSub: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 10,
  },

  pageTitle: {
    flex: 1,
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginHorizontal: 6,
  },

  // Fix 1: no flex on actions — it takes only what it needs
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  // Compact icon button — touch area expanded via hitSlop, not padding
  iconBtn: {
    padding: 4,
  },

  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF5252',
  },

  // Fix 1: icon-only logout — removes the "Logout" text that ate horizontal space
  logoutBtn: {
    padding: 4,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppHeader;

// // src/components/AppHeader.js
// // A single shared header used by Home, StudentPortal, and ParentPortal tabs.
// // Ensures the same top bar (brand + logout) appears everywhere for logged-in users.

// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { Avatar, IconButton, Badge } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { USER_ROLES } from '../constants/theme';
// import LanguageToggle from './LanguageToggle';
// import { useLanguage } from '../i18n/LanguageContext';

// const ROLE_COLOR = {
//   [USER_ROLES.GUEST]:   '#2E7D32',
//   [USER_ROLES.STUDENT]: '#2E7D32',
//   [USER_ROLES.PARENT]:  '#1565C0',
//   [USER_ROLES.ADMIN]:   '#6A1B9A',
// };

// /**
//  * Props:
//  * 
//  *  role          – current USER_ROLES value
//  *  user          – { name, email } from auth state
//  *  onLogout      – called when logout icon pressed (only shown for non-guest)
//  *  onNotification– called when bell pressed (optional)
//  *  notifCount    – badge count (optional, default 0)
//  *  title         – override the college name area with a page title (for sub-pages)
//  *  showBack      – show back arrow instead of logo (for sub-pages)
//  *  onBack        – called when back arrow pressed
//  */
// const AppHeader = ({
//   role,
//   user,
//   onLogout,
//   onNotification,
//   notifCount = 0,
//   title,
//   showBack = false,
//   onBack,
// }) => {
//   const isGuest = role === USER_ROLES.GUEST;
//   const bgColor = ROLE_COLOR[role] || '#2E7D32';
//   const { t } = useLanguage();

//   return (
//     <View style={[styles.header, { backgroundColor: bgColor }]}>
//       {/* Left: back arrow OR logo+name */}
//       {showBack ? (
//         <TouchableOpacity onPress={onBack} style={styles.backBtn}>
//           <Icon name="arrow-left" size={24} color="#FFF" />
//         </TouchableOpacity>
//       ) : (
//         <View style={styles.logoRow}>
//           <Avatar.Image
//             size={36}
//             source={{ uri: 'https://via.placeholder.com/100' }}
//             style={styles.logo}
//           />
//           <View>
//             <Text style={styles.collegeName}>{t('header.collegeName')}</Text>
//             <Text style={styles.collegeSub}>{t('header.collegeSub')}</Text>
//           </View>
//         </View>
//       )}

//       {/* Centre: page title (only on sub-pages) */}
//       {title && showBack ? (
//         <Text style={styles.pageTitle} numberOfLines={1}>
//           {title}
//         </Text>
//       ) : null}

//             {/* Right: language toggle + bell + logout */}
//             <View style={styles.actions}>

// {/* Language toggle — always visible */}
// <LanguageToggle dark />

// {/* Bell notification */}
// {onNotification ? (
//   <View>
//     <IconButton
//       icon="bell-outline"
//       iconColor="#FFF"
//       size={22}
//       onPress={onNotification}
//       style={styles.iconBtn}
//     />
//     {notifCount > 0 && (
//       <Badge style={styles.badge} size={15}>
//         {notifCount}
//       </Badge>
//     )}
//   </View>
// ) : null}

//       {/* Right: bell + logout
//       <View style={styles.actions}>
//         {onNotification ? (
//           <View>
//             <IconButton
//               icon="bell-outline"
//               iconColor="#FFF"
//               size={22}
//               onPress={onNotification}
//               style={styles.iconBtn}
//             />
//             {notifCount > 0 && (
//               <Badge style={styles.badge} size={15}>
//                 {notifCount}
//               </Badge>
//             )}
//           </View>
//         ) : null} */}

//         {/* Only show logout for authenticated users */}
//         {!isGuest && onLogout ? (
//           <TouchableOpacity onPress={onLogout} style={styles.logoutBtn}>
//             <Icon name="logout" size={20} color="#FFF" />
//             <Text style={styles.logoutText}>Logout</Text>
//           </TouchableOpacity>
//         ) : null}

//         {/* Guest gets a role-switch button */}
//         {isGuest ? (
//           <TouchableOpacity onPress={onLogout} style={styles.switchBtn}>
//             <Icon name="account-switch-outline" size={22} color="#FFF" />
//           </TouchableOpacity>
//         ) : null}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     paddingTop: 48,
//     paddingBottom: 12,
//     paddingHorizontal: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   backBtn: { padding: 4, marginRight: 8 },
//   logoRow: { flexDirection: 'row', alignItems: 'center', flex: 1 },
//   logo: { backgroundColor: '#FFF', marginRight: 10 },
//   collegeName: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
//   collegeSub: { color: 'rgba(255,255,255,0.7)', fontSize: 11 },
//   pageTitle: {
//     flex: 1,
//     color: '#FFF',
//     fontSize: 17,
//     fontWeight: '700',
//     textAlign: 'center',
//     marginHorizontal: 8,
//   },
//   actions: { flexDirection: 'row', alignItems: 'center' },
//   iconBtn: { margin: 0 },
//   badge: { position: 'absolute', top: 4, right: 4, backgroundColor: '#FF5252' },
//   logoutBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255,255,255,0.18)',
//     borderRadius: 20,
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     gap: 4,
//   },
//   logoutText: { color: '#FFF', fontSize: 13, fontWeight: '600' },
//   switchBtn: { padding: 6 },
// });

// export default AppHeader;