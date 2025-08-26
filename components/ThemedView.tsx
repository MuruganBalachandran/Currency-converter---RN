import { View, type ViewProps } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { type ThemeColors } from '../theme/colors';

export type ThemedViewProps = ViewProps & {
  colorName?: keyof ThemeColors;
};

export function ThemedView({ style, colorName = 'background', ...otherProps }: ThemedViewProps) {
  const { colors } = useTheme();
  const backgroundColor = colors[colorName];

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
