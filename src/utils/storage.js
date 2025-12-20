// src/utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  USER_DATA: '@user_data',
  USER_ROLE: '@user_role',
  AUTH_TOKEN: '@auth_token',
  ONBOARDING_COMPLETED: '@onboarding_completed',
};

export const storageService = {
  // Save data
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

  // Get data
  async getItem(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error reading data:', error);
      return null;
    }
  },

  // Remove data
  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing data:', error);
      return false;
    }
  },

  // Clear all data
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