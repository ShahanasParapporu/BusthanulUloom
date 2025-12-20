// src/constants/theme.js
import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2E7D32', // Islamic green
    accent: '#FFC107',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    text: '#212121',
    error: '#D32F2F',
    disabled: '#BDBDBD',
    placeholder: '#9E9E9E',
    backdrop: 'rgba(0, 0, 0, 0.5)',
  },
  roundness: 8,
};

export const COLORS = {
  primary: '#2E7D32',
  secondary: '#FFC107',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#9E9E9E',
  lightGray: '#F5F5F5',
  danger: '#D32F2F',
  success: '#4CAF50',
};

export const SIZES = {
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  extraLarge: 24,
};

export const USER_ROLES = {
  GUEST: 'guest',
  STUDENT: 'student',
  PARENT: 'parent',
  ADMIN: 'admin',
};