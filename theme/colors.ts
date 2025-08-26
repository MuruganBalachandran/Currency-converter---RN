export interface ThemeColors {
  primary: string;
  primaryTransparent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  border: string;
  inputBorder: string;
  error: string;
  success: string;
  warning: string;
  info: string;
}

export const lightColors: ThemeColors = {
  primary: '#007AFF',
  primaryTransparent: '#007AFF20',
  background: '#F2F2F7',
  surface: '#FFFFFF',
  text: '#000000',
  textSecondary: '#6B6B6B',
  textTertiary: '#A1A1A1',
  border: '#E5E5EA',
  inputBorder: '#D1D1D6',
  error: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',
  info: '#5856D6',
};

export const darkColors: ThemeColors = {
  primary: '#0A84FF',
  primaryTransparent: '#0A84FF20',
  background: '#000000',
  surface: '#1C1C1E',
  text: '#FFFFFF',
  textSecondary: '#8E8E93',
  textTertiary: '#636366',
  border: '#38383A',
  inputBorder: '#48484A',
  error: '#FF453A',
  success: '#32D74B',
  warning: '#FF9F0A',
  info: '#5E5CE6',
};
