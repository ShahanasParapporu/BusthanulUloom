// src/screens/auth/RoleSelectionScreen.js


import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, StatusBar } from 'react-native';
import { Button, Card, Avatar } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/slices/authSlice';
import { COLORS, USER_ROLES } from '../../constants/theme';
import { storageService, STORAGE_KEYS } from '../../utils/storage';

const roles = [
  {
    id: USER_ROLES.GUEST,
    title: 'Guest',
    description: 'Explore public courses & info',
    icon: 'account-eye-outline',
    color: '#757575',
  },
  {
    id: USER_ROLES.STUDENT,
    title: 'Student',
    description: 'Access your portal & lessons',
    icon: 'school-outline',
    color: '#2E7D32',
  },
  {
    id: USER_ROLES.PARENT,
    title: 'Parent',
    description: 'Track your child\'s growth',
    icon: 'family-tree',
    color: '#1565C0',
  },
];

const RoleSelectionScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleContinue = async () => {
    if (!selectedRole) return;
    
    // Logic for saving and navigation remains the same
    await storageService.setItem(STORAGE_KEYS.USER_ROLE, selectedRole);
    const userData = await storageService.getItem(STORAGE_KEYS.USER_DATA);
    const token = await storageService.getItem(STORAGE_KEYS.AUTH_TOKEN);

    dispatch(loginSuccess({
      user: userData || { name: 'Guest User' },
      role: selectedRole,
      token: token || null,
    }));

    navigation.replace('Main');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Decorative background element */}
      <View style={styles.topAccent} />

      <View style={styles.header}>
        <Text style={styles.title}>Who are you?</Text>
        <Text style={styles.subtitle}>Select your profile to personalize your experience</Text>
      </View>

      <View style={styles.rolesContainer}>
        {roles.map((role) => {
          const isSelected = selectedRole === role.id;
          return (
            <TouchableOpacity
              key={role.id}
              onPress={() => setSelectedRole(role.id)}
              activeOpacity={0.9}
            >
              <Card
                style={[
                  styles.roleCard,
                  isSelected && { ...styles.roleCardSelected, borderColor: role.color }
                ]}
              >
                <View style={styles.cardLayout}>
                  <Avatar.Icon 
                    size={50} 
                    icon={role.icon} 
                    backgroundColor={isSelected ? role.color : '#F5F5F5'} 
                    color={isSelected ? '#FFF' : role.color}
                  />
                  <View style={styles.textContainer}>
                    <Text style={[styles.roleTitle, isSelected && { color: role.color }]}>
                      {role.title}
                    </Text>
                    <Text style={styles.roleDescription}>{role.description}</Text>
                  </View>
                  {isSelected && (
                    <Avatar.Icon 
                      size={24} 
                      icon="check-circle" 
                      style={styles.checkmark}
                      color={role.color}
                      backgroundColor="transparent"
                    />
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
        style={[
          styles.continueButton, 
          !selectedRole ? styles.disabledButton : { backgroundColor: COLORS.primary }
        ]}
        contentStyle={styles.buttonContent}
        labelStyle={styles.continueButtonText}
      >
        Get Started
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 25,
  },
  topAccent: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#E8F5E9',
    opacity: 0.5,
  },
  header: {
    marginTop: 80,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1A1A1A',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    marginTop: 10,
    lineHeight: 22,
  },
  rolesContainer: {
    flex: 1,
  },
  roleCard: {
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    elevation: 0,
    borderWidth: 1.5,
    borderColor: '#F0F0F0',
  },
  roleCardSelected: {
    borderWidth: 2,
    backgroundColor: '#F9FFF9', // very slight green tint
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  roleTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  roleDescription: {
    fontSize: 14,
    color: '#757575',
    marginTop: 2,
  },
  checkmark: {
    marginLeft: 10,
  },
  continueButton: {
    marginBottom: 40,
    borderRadius: 16,
    elevation: 2,
  },
  disabledButton: {
    backgroundColor: '#E0E0E0',
  },
  buttonContent: {
    height: 56,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'none',
  },
});

export default RoleSelectionScreen;

// import React, { useState } from 'react';
// import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
// import { Button, Card } from 'react-native-paper';
// import { useDispatch } from 'react-redux';
// import { loginSuccess, setRole } from '../../redux/slices/authSlice';
// import { COLORS, USER_ROLES } from '../../constants/theme';
// import { storageService, STORAGE_KEYS } from '../../utils/storage';

// const roles = [
//   {
//     id: USER_ROLES.GUEST,
//     title: 'Guest',
//     description: 'Browse public content',
//     icon: '👤',
//     color: COLORS.gray,
//   },
//   {
//     id: USER_ROLES.STUDENT,
//     title: 'Student',
//     description: 'Access student portal and courses',
//     icon: '🎓',
//     color: COLORS.primary,
//   },
//   {
//     id: USER_ROLES.PARENT,
//     title: 'Parent',
//     description: 'Monitor child\'s progress',
//     icon: '👨‍👩‍👧‍👦',
//     color: COLORS.secondary,
//   },
// ];

// const RoleSelectionScreen = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const [selectedRole, setSelectedRole] = useState(null);

//   const handleRoleSelect = (role) => {
//     setSelectedRole(role);
//   };

//   const handleContinue = async () => {
//     if (!selectedRole) return;

//     // Save role to storage
//     await storageService.setItem(STORAGE_KEYS.USER_ROLE, selectedRole);

//     // Update Redux state
//     const userData = await storageService.getItem(STORAGE_KEYS.USER_DATA);
//     const token = await storageService.getItem(STORAGE_KEYS.AUTH_TOKEN);

//     dispatch(
//       loginSuccess({
//         user: userData || { name: 'Guest User' },
//         role: selectedRole,
//         token: token || null,
//       })
//     );

//     // Navigate to main app
//     navigation.replace('Main');
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Select Your Role</Text>
//         <Text style={styles.subtitle}>Choose how you want to use the app</Text>
//       </View>

//       <View style={styles.rolesContainer}>
//         {roles.map((role) => (
//           <TouchableOpacity
//             key={role.id}
//             onPress={() => handleRoleSelect(role.id)}
//             activeOpacity={0.7}
//           >
//             <Card
//               style={[
//                 styles.roleCard,
//                 selectedRole === role.id && styles.roleCardSelected,
//               ]}
//             >
//               <Card.Content style={styles.roleContent}>
//                 <Text style={styles.roleIcon}>{role.icon}</Text>
//                 <Text style={styles.roleTitle}>{role.title}</Text>
//                 <Text style={styles.roleDescription}>{role.description}</Text>
//                 {selectedRole === role.id && (
//                   <View style={styles.checkmark}>
//                     <Text style={styles.checkmarkText}>✓</Text>
//                   </View>
//                 )}
//               </Card.Content>
//             </Card>
//           </TouchableOpacity>
//         ))}
//       </View>

//       <Button
//         mode="contained"
//         onPress={handleContinue}
//         disabled={!selectedRole}
//         style={styles.continueButton}
//         labelStyle={styles.continueButtonText}
//       >
//         Continue
//       </Button>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//     padding: 20,
//   },
//   header: {
//     marginTop: 40,
//     marginBottom: 30,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: COLORS.primary,
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: COLORS.gray,
//   },
//   rolesContainer: {
//     flex: 1,
//   },
//   roleCard: {
//     marginBottom: 15,
//     elevation: 2,
//   },
//   roleCardSelected: {
//     borderWidth: 2,
//     borderColor: COLORS.primary,
//     elevation: 4,
//   },
//   roleContent: {
//     alignItems: 'center',
//     paddingVertical: 20,
//     position: 'relative',
//   },
//   roleIcon: {
//     fontSize: 50,
//     marginBottom: 10,
//   },
//   roleTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: COLORS.primary,
//     marginBottom: 5,
//   },
//   roleDescription: {
//     fontSize: 14,
//     color: COLORS.gray,
//     textAlign: 'center',
//   },
//   checkmark: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     backgroundColor: COLORS.primary,
//     borderRadius: 15,
//     width: 30,
//     height: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   checkmarkText: {
//     color: COLORS.white,
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   continueButton: {
//     paddingVertical: 8,
//     marginTop: 20,
//   },
//   continueButtonText: {
//     fontSize: 16,
//   },
// });

// export default RoleSelectionScreen;