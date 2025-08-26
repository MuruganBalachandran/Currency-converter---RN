import { useTheme } from '../theme/ThemeContext';
import { ThemeColors } from '../theme/colors';

export function useColorValue(colorName: keyof ThemeColors) {
  const { colors } = useTheme();
  return colors[colorName];
}
