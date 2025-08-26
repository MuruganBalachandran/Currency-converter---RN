import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { ColorSchemeName, useColorScheme as useDeviceColorScheme } from 'react-native';

const THEME_STORAGE_KEY = '@currency_calc_theme';

export function useThemeManager() {
  const deviceTheme = useDeviceColorScheme();
  const [theme, setThemeState] = useState<ColorSchemeName>(deviceTheme);

  useEffect(() => {
    // Load saved theme preference
    AsyncStorage.getItem(THEME_STORAGE_KEY).then((savedTheme) => {
      if (savedTheme) {
        setThemeState(savedTheme as ColorSchemeName);
      }
    });
  }, []);

  const setTheme = useCallback(async (newTheme: ColorSchemeName) => {
    setThemeState(newTheme);
    await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme || 'light');
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }, [theme, setTheme]);

  return {
    theme,
    setTheme,
    toggleTheme,
  };
}
