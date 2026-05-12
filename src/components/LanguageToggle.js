// src/components/LanguageToggle.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../i18n/LanguageContext';

/**
 * A compact pill-style EN / ML switcher.
 * Drop it anywhere: AppHeader, settings page, onboarding, etc.
 *
 * Props:
 *   dark  – set true when placed on a dark/coloured background (text turns white)
 */
const LanguageToggle = ({ dark = false }) => {
  const { language, switchLanguage } = useLanguage();

  const options = [
    { code: 'en', label: 'EN' },
    { code: 'ml', label: 'മല' },
  ];

  return (
    <View style={[styles.pill, dark && styles.pillDark]}>
      {options.map((opt, i) => {
        const active = language === opt.code;
        return (
          <TouchableOpacity
            key={opt.code}
            onPress={() => switchLanguage(opt.code)}
            style={[
              styles.option,
              active && (dark ? styles.activeOptionDark : styles.activeOptionLight),
              i === 0 && styles.leftOption,
              i === options.length - 1 && styles.rightOption,
            ]}
            activeOpacity={0.75}
          >
            <Text
              style={[
                styles.optionText,
                dark && styles.optionTextDark,
                active && styles.activeText,
              ]}
            >
              {opt.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#DDD',
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
  pillDark: {
    borderColor: 'rgba(255,255,255,0.35)',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  leftOption: { borderTopLeftRadius: 18, borderBottomLeftRadius: 18 },
  rightOption: { borderTopRightRadius: 18, borderBottomRightRadius: 18 },
  activeOptionLight: { backgroundColor: '#2E7D32' },
  activeOptionDark:  { backgroundColor: 'rgba(255,255,255,0.3)' },
  optionText:     { fontSize: 12, fontWeight: '700', color: '#555' },
  optionTextDark: { color: 'rgba(255,255,255,0.8)' },
  activeText:     { color: '#FFF' },
});

export default LanguageToggle;