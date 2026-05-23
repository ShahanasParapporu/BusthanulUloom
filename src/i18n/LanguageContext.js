// src/i18n/LanguageContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations } from './translations';
import { storageService } from '../utils/storage';

const LANG_KEY = 'app_language';

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  // Load saved language on mount
  useEffect(() => {
    (async () => {
      const saved = await storageService.getItem(LANG_KEY);
      if (saved === 'en' || saved === 'ml') setLanguage(saved);
    })();
  }, []);

  const switchLanguage = useCallback(async (lang) => {
    setLanguage(lang);
    await storageService.setItem(LANG_KEY, lang);
  }, []);

  const t = useCallback(
    (path) => {
      const keys = path.split('.');
      let result = translations[language];
      for (const key of keys) {
        if (result == null) return path; // fallback: return the key string
        result = result[key];
      }
      return result ?? path;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, t, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook — use this in every screen
export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
};