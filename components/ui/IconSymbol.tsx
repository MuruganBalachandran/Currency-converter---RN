// Fallback for using various icon sets on Android and web.

import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconVariant = 'material' | 'materialCommunity' | 'entypo';

type IconInfo = {
  type: IconVariant;
  name: ComponentProps<typeof MaterialIcons>['name'] | ComponentProps<typeof MaterialCommunityIcons>['name'] | ComponentProps<typeof Entypo>['name'];
};

type IconMapping = Record<string, IconInfo>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Icon mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'house.fill': { type: 'material', name: 'home' },
  'paperplane.fill': { type: 'material', name: 'send' },
  'chevron.left.forwardslash.chevron.right': { type: 'material', name: 'code' },
  'chevron.right': { type: 'material', name: 'chevron-right' },
  'moon.fill': { type: 'material', name: 'dark-mode' },
  'sun.max.fill': { type: 'material', name: 'light-mode' },
  'clock.arrow.circlepath': { type: 'entypo', name: 'back-in-time' },
  'dollarsign.circle': { type: 'materialCommunity', name: 'currency-eth' },
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const iconInfo = MAPPING[name];

  switch (iconInfo.type) {
    case 'material':
      return <MaterialIcons color={color} size={size} name={iconInfo.name as ComponentProps<typeof MaterialIcons>['name']} style={style} />;
    case 'materialCommunity':
      return <MaterialCommunityIcons color={color} size={size} name={iconInfo.name as ComponentProps<typeof MaterialCommunityIcons>['name']} style={style} />;
    case 'entypo':
      return <Entypo color={color} size={size} name={iconInfo.name as ComponentProps<typeof Entypo>['name']} style={style} />;
    default:
      return <MaterialIcons color={color} size={size} name="error" style={style} />;
  }
}
