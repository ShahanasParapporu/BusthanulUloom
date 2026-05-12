// src/screens/auth/RoleSelectionScreen.js
// Guest path: dispatch loginSuccess → RootNavigator shows Main automatically.
// No navigation.replace('Main') needed anywhere.

import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, StatusBar } from 'react-native';
import { Button, Card, Avatar } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/slices/authSlice';
import { COLORS, USER_ROLES } from '../../constants/theme';
import { storageService, STORAGE_KEYS } from '../../utils/storage';
import { useLanguage } from '../../i18n/LanguageContext';


// const roles = [
//   { id: USER_ROLES.GUEST,   title: 'Guest',   description: 'Explore public courses & info',     icon: 'account-eye-outline',    color: '#757575' },
//   { id: USER_ROLES.STUDENT, title: 'Student', description: 'Access your portal & lessons',      icon: 'school-outline',         color: '#2E7D32' },
//   { id: USER_ROLES.PARENT,  title: 'Parent',  description: "Track your child's growth",         icon: 'family-tree',            color: '#1565C0' },
//   { id: USER_ROLES.ADMIN,   title: 'Admin',   description: 'Manage institution settings',       icon: 'shield-account-outline', color: '#6A1B9A' },
// ];

const roles = [
  { id: USER_ROLES.GUEST,   icon: 'account-eye-outline',    color: '#757575' },
  { id: USER_ROLES.STUDENT, icon: 'school-outline',         color: '#2E7D32' },
  { id: USER_ROLES.PARENT,  icon: 'family-tree',            color: '#1565C0' },
  { id: USER_ROLES.ADMIN,   icon: 'shield-account-outline', color: '#6A1B9A' },
];

const RoleSelectionScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = useState(null);
  const { t } = useLanguage();

  const handleContinue = async () => {
    if (!selectedRole) return;

    await storageService.setItem(STORAGE_KEYS.USER_ROLE, selectedRole);

    if (selectedRole === USER_ROLES.GUEST) {
      // Guest: set isAuthenticated=true → RootNavigator shows Main
      dispatch(loginSuccess({ user: { name: 'Guest User' }, role: USER_ROLES.GUEST, token: null }));
    } else if (selectedRole === USER_ROLES.ADMIN) {
      navigation.navigate('AdminLogin');
    } else {
      navigation.navigate('Login', { role: selectedRole });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.topAccent} />

      <View style={styles.header}>
        <Text style={styles.title}>{t('roleSelection.title')}</Text>
        <Text style={styles.subtitle}>{t('roleSelection.subtitle')}</Text>
      </View>

      <View style={styles.rolesContainer}>
        {roles.map((role) => {
          const isSelected = selectedRole === role.id;
          return (
            <TouchableOpacity key={role.id} onPress={() => setSelectedRole(role.id)} activeOpacity={0.9}>
              <Card style={[styles.roleCard, isSelected && { ...styles.roleCardSelected, borderColor: role.color }]}>
                <View style={styles.cardLayout}>
                  <Avatar.Icon
                    size={50}
                    icon={role.icon}
                    backgroundColor={isSelected ? role.color : '#F5F5F5'}
                    color={isSelected ? '#FFF' : role.color}
                  />
                  <View style={styles.textContainer}>
                    <Text style={[styles.roleTitle, isSelected && { color: role.color }]}>{t(`roleSelection.roles.${role.id}.title`)}</Text>
                    <Text style={styles.roleDescription}>{t(`roleSelection.roles.${role.id}.description`)}</Text>
                  </View>
                  {isSelected && (
                    <Avatar.Icon size={24} icon="check-circle" style={styles.checkmark} color={role.color} backgroundColor="transparent" />
                  )}
                </View>
              </Card>
            </TouchableOpacity>
          );
        })}
      </View>

      <Button
        mode="contained"
        onPress={handleContinue}
        disabled={!selectedRole}
        style={[styles.continueButton, !selectedRole ? styles.disabledButton : { backgroundColor: COLORS.primary }]}
        contentStyle={styles.buttonContent}
        labelStyle={styles.continueButtonText}
      >
        {t('roleSelection.continue')}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 25 },
  topAccent: {
    position: 'absolute', top: -60, right: -60, width: 220, height: 220,
    borderRadius: 110, backgroundColor: '#E8F5E9', opacity: 0.5,
  },
  header: { marginTop: 80, marginBottom: 35 },
  title: { fontSize: 32, fontWeight: '800', color: '#1A1A1A', letterSpacing: -0.5 },
  subtitle: { fontSize: 16, color: '#757575', marginTop: 10, lineHeight: 22 },
  rolesContainer: { flex: 1 },
  roleCard: { marginBottom: 16, borderRadius: 20, backgroundColor: '#FFFFFF', elevation: 0, borderWidth: 1.5, borderColor: '#F0F0F0' },
  roleCardSelected: { borderWidth: 2, backgroundColor: '#FAFAFA', elevation: 4 },
  cardLayout: { flexDirection: 'row', alignItems: 'center', padding: 18 },
  textContainer: { flex: 1, marginLeft: 15 },
  roleTitle: { fontSize: 20, fontWeight: '700', color: '#1A1A1A' },
  roleDescription: { fontSize: 14, color: '#757575', marginTop: 2 },
  checkmark: { marginLeft: 10 },
  continueButton: { marginBottom: 40, borderRadius: 16, elevation: 2 },
  disabledButton: { backgroundColor: '#E0E0E0' },
  buttonContent: { height: 56 },
  continueButtonText: { fontSize: 18, fontWeight: 'bold', textTransform: 'none' },
});

export default RoleSelectionScreen;