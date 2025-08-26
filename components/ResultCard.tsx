import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { useTheme } from '@/theme/ThemeContext';

interface Props {
  amount: string;
  from: string;
  to: string;
  result: string | null;
  loading: boolean;
  error: string;
}

export default function ResultCard({ amount, from, to, result, loading, error }: Props) {
  const { colors } = useTheme();
  
  const styles = useMemo(() => StyleSheet.create({
    card: {
      marginTop: 24,
      padding: 20,
      borderRadius: 16,
      backgroundColor: colors.primaryTransparent,
      alignItems: 'center',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
      minWidth: 260,
      borderWidth: 1,
      borderColor: colors.border,
    },
    result: {
      fontSize: 24,
      color: colors.primary,
      textAlign: 'center',
    },
    error: {
      color: colors.error,
      fontSize: 16,
      textAlign: 'center',
    },
    loading: {
      color: colors.primary,
      fontSize: 18,
      textAlign: 'center',
    },
    hint: {
      color: colors.textTertiary,
      fontSize: 16,
      textAlign: 'center',
    },
  }), [colors]);

  return (
    <View style={styles.card}>
      {loading ? (
        <ThemedText style={styles.loading}>Converting...</ThemedText>
      ) : result ? (
        <ThemedText style={styles.result} type="title">
          {amount} {from} = {result} {to}
        </ThemedText>
      ) : error ? (
        <ThemedText style={styles.error}>{error}</ThemedText>
      ) : (
        <ThemedText style={styles.hint}>Enter amount and select currencies</ThemedText>
      )}
    </View>
  );
}
