import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { useLanguage } from '../../i18n/LanguageContext';

// Assuming COLORS.primary is your green #2E7D32
const COLORS = {
  primary: '#2E7D32',
  secondary: '#E8F5E9',
  white: '#FFFFFF',
  text: '#1A1A1A',
  gray: '#757575',
  lightGray: '#F5F5F5',
};

const RegisterScreen = ({ navigation }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const updateFormData = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleRegister = () => {
    if (!formData.fullName || !formData.email || !formData.password) {
      setSnackbarMessage(t('register.fillRequired'));
      setSnackbarVisible(true);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Login');
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" />
      
      {/* Visual Accent Circle in background */}
      <View style={styles.backgroundCircle} />

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>t('register.title')</Text>
          <Text style={styles.subtitle}>
  {t('register.subtitle')}
  <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>
    {t('register.subtitleBold')}
  </Text>
  {t('register.subtitleEnd')}
</Text>        </View>

        <View style={styles.form}>
          <TextInput
            label="t('register.fullName')"
            value={formData.fullName}
            onChangeText={(text) => updateFormData('fullName', text)}
            mode="flat"
            underlineColor="transparent"
            activeUnderlineColor={COLORS.primary}
            style={styles.input}
            left={<TextInput.Icon icon="account-outline" color={COLORS.primary} />}
          />

          <TextInput
            label="t('register.email')"
            value={formData.email}
            onChangeText={(text) => updateFormData('email', text)}
            mode="flat"
            underlineColor="transparent"
            activeUnderlineColor={COLORS.primary}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            left={<TextInput.Icon icon="email-outline" color={COLORS.primary} />}
          />

          <TextInput
            label="t('register.phone')"
            value={formData.phone}
            onChangeText={(text) => updateFormData('phone', text)}
            mode="flat"
            underlineColor="transparent"
            activeUnderlineColor={COLORS.primary}
            keyboardType="phone-pad"
            style={styles.input}
            left={<TextInput.Icon icon="phone-outline" color={COLORS.primary} />}
          />

          <TextInput
            label="t('register.password')"
            value={formData.password}
            onChangeText={(text) => updateFormData('password', text)}
            mode="flat"
            underlineColor="transparent"
            activeUnderlineColor={COLORS.primary}
            secureTextEntry={!showPassword}
            style={styles.input}
            left={<TextInput.Icon icon="lock-outline" color={COLORS.primary} />}
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye-off-outline' : 'eye-outline'}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />

          <TextInput
            label="t('register.confirmPassword')"
            value={formData.confirmPassword}
            onChangeText={(text) => updateFormData('confirmPassword', text)}
            mode="flat"
            underlineColor="transparent"
            activeUnderlineColor={COLORS.primary}
            secureTextEntry={!showConfirmPassword}
            style={styles.input}
            left={<TextInput.Icon icon="shield-check-outline" color={COLORS.primary} />}
            right={
              <TextInput.Icon
                icon={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            }
          />

          <Button
            mode="contained"
            onPress={handleRegister}
            loading={loading}
            style={styles.registerButton}
            contentStyle={styles.buttonContent}
            labelStyle={styles.registerButtonText}
          >
            t('register.createBtn')
          </Button>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>t('register.haveAccount')</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>t('register.logIn')</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{ label: 'OK', onPress: () => {} }}
      >
        {snackbarMessage}
      </Snackbar>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  backgroundCircle: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: COLORS.secondary,
    opacity: 0.5,
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  header: {
    marginTop: 80,
    marginBottom: 40,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray,
    marginTop: 8,
  },
  form: {
    flex: 1,
  },
  input: {
    marginBottom: 16,
    backgroundColor: COLORS.lightGray,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderRadius: 15, // Smooth rounded corners
    height: 60,
  },
  registerButton: {
    marginTop: 20,
    borderRadius: 15,
    elevation: 4,
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonContent: {
    height: 56,
  },
  registerButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'none',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  loginText: {
    color: COLORS.gray,
    fontSize: 15,
  },
  loginLink: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '700',
  },
});

export default RegisterScreen;