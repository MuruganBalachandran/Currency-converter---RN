import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { ThemeProvider, useTheme } from '@/theme/ThemeContext';

function ThemedStatusBar() {
  const { theme, colors } = useTheme();
  return (
    <StatusBar 
      style={theme === 'dark' ? 'light' : 'dark'} 
      backgroundColor={colors.background}
    />
  );
}

function ThemedRootLayout() {
  const { colors } = useTheme();
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemedStatusBar />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false,
            gestureEnabled: true,
          }} 
        />
        <Stack.Screen 
          name="+not-found"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </SafeAreaView>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ThemedRootLayout />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});