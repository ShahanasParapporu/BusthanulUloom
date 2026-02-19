// src/utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  USER_DATA: '@user_data',
  USER_ROLE: '@user_role',
  AUTH_TOKEN: '@auth_token',
  ONBOARDING_COMPLETED: '@onboarding_completed',
};

// ─── Keys that belong to admin content — must NEVER be cleared on logout ─────
const ADMIN_DATA_KEYS = [
  'admin_college_stats',
  'admin_teachers',
];

export const storageService = {
  async setItem(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (error) {
      console.error('Error saving data:', error);
      return false;
    }
  },

  async getItem(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error reading data:', error);
      return null;
    }
  },

  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing data:', error);
      return false;
    }
  },

  // ✅ Clears ONLY auth keys — admin content (stats, teachers) is preserved
  async clearAuthOnly() {
    try {
      const authKeys = Object.values(STORAGE_KEYS);
      await AsyncStorage.multiRemove(authKeys);
      return true;
    } catch (error) {
      console.error('Error clearing auth data:', error);
      return false;
    }
  },

  // Full clear — only use this if you want to wipe everything (e.g. factory reset)
  async clear() {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  },
};