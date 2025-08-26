import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from '@/theme/ThemeContext';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export function ThemeToggleButton() {
  const { theme, toggleTheme, colors } = useTheme();
  const isDark = theme === 'dark';

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={[
        styles.container,
        { 
          backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
          borderColor: colors.border,
          borderWidth: 1,
        }
      ]}>
      <IconSymbol 
        name={isDark ? 'moon.fill' : 'sun.max.fill'}
        size={24}
        color={isDark ? colors.text : colors.primary}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
  },
});
