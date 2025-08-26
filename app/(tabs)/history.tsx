import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemeToggleButton } from '@/components/ThemeToggleButton';
import { useTheme } from '@/theme/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, Alert } from 'react-native';

export default function HistoryScreen() {
  const [history, setHistory] = useState<{ from: string; to: string; amount: string; result: string; date: string }[]>([]);
  const { colors } = useTheme();

  const loadHistory = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem('conversionHistory');
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error loading history:', e);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  // Reload history when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [loadHistory])
  );

  const clearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to delete all conversion history?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('conversionHistory');
              setHistory([]);
            } catch (e) {
              console.error('Error clearing history:', e);
            }
          }
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getCurrencyEmoji = (currency: string) => {
    const emojiMap: { [key: string]: string } = {
      'USD': '🇺🇸', 'EUR': '🇪🇺', 'GBP': '🇬🇧', 'JPY': '🇯🇵', 'INR': '🇮🇳',
      'CAD': '🇨🇦', 'AUD': '🇦🇺', 'CHF': '🇨🇭', 'CNY': '🇨🇳', 'BRL': '🇧🇷',
      'KRW': '🇰🇷', 'MXN': '🇲🇽', 'SGD': '🇸🇬', 'HKD': '🇭🇰', 'NOK': '🇳🇴',
      'SEK': '🇸🇪', 'DKK': '🇩🇰', 'PLN': '🇵🇱', 'CZK': '🇨🇿', 'HUF': '🇭🇺',
      'RUB': '🇷🇺', 'TRY': '🇹🇷', 'ZAR': '🇿🇦', 'THB': '🇹🇭', 'MYR': '🇲🇾',
    };
    return emojiMap[currency] || '💰';
  };

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    headerSection: {
      alignItems: 'center',
      marginBottom: 24,
      paddingTop: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 8,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      textAlign: 'center',
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 60,
    },
    emptyIcon: {
      fontSize: 64,
      marginBottom: 16,
    },
    emptyTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    emptyText: {
      fontSize: 16,
      textAlign: 'center',
      maxWidth: 280,
      lineHeight: 22,
    },
    statsCard: {
      backgroundColor: colors.surface,
      borderRadius: 20,
      padding: 20,
      marginBottom: 24,
      flexDirection: 'row',
      elevation: 4,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    statItem: {
      flex: 1,
      alignItems: 'center',
    },
    statNumber: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 14,
      textAlign: 'center',
    },
    statDivider: {
      width: 1,
      backgroundColor: colors.border,
      marginHorizontal: 20,
    },
    historyList: {
      flex: 1,
    },
    listHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    listTitle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    clearButton: {
      backgroundColor: colors.error + '20',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.error + '40',
    },
    clearButtonText: {
      color: colors.error,
      fontSize: 12,
      fontWeight: '600',
    },
    historyCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      elevation: 3,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
      borderWidth: 1,
      borderColor: colors.border,
    },
    conversionRow: {
      marginBottom: 8,
    },
    currencyFromTo: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    currencyItem: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    currencyEmoji: {
      fontSize: 24,
      marginRight: 12,
    },
    amount: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    result: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    currency: {
      fontSize: 14,
      fontWeight: '500',
    },
    arrow: {
      fontSize: 20,
      marginHorizontal: 12,
      fontWeight: 'bold',
    },
    date: {
      fontSize: 12,
      textAlign: 'right',
      fontStyle: 'italic',
    },
  }), [colors]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ThemeToggleButton />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.container}>
          <View style={styles.headerSection}>
            <ThemedText colorName="primary" type="title" style={styles.title}>📊 Conversion History</ThemedText>
            <ThemedText colorName="textSecondary" style={styles.subtitle}>
              {history.length === 0 ? 'No conversions yet' : `${history.length} conversion${history.length !== 1 ? 's' : ''}`}
            </ThemedText>
          </View>

          {history.length === 0 ? (
            <View style={styles.emptyState}>
              <ThemedText style={styles.emptyIcon}>📈</ThemedText>
              <ThemedText colorName="primary" style={styles.emptyTitle}>No History Yet</ThemedText>
              <ThemedText colorName="textSecondary" style={styles.emptyText}>
                Start converting currencies to see your history here!
              </ThemedText>
            </View>
          ) : (
            <>
              <View style={styles.statsCard}>
                <View style={styles.statItem}>
                  <ThemedText colorName="primary" style={styles.statNumber}>{history.length}</ThemedText>
                  <ThemedText colorName="textSecondary" style={styles.statLabel}>Total Conversions</ThemedText>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <ThemedText colorName="primary" style={styles.statNumber}>
                    {new Set(history.map(h => h.from)).size}
                  </ThemedText>
                  <ThemedText colorName="textSecondary" style={styles.statLabel}>Currencies Used</ThemedText>
                </View>
              </View>

              <View style={styles.historyList}>
                <View style={styles.listHeader}>
                  <ThemedText colorName="primary" style={styles.listTitle}>Recent Conversions</ThemedText>
                  {history.length > 0 && (
                    <TouchableOpacity onPress={clearHistory} style={styles.clearButton}>
                      <ThemedText style={styles.clearButtonText}>🗑️ Clear All</ThemedText>
                    </TouchableOpacity>
                  )}
                </View>

                {history.slice().reverse().map((item, idx) => (
                  <View key={idx} style={styles.historyCard}>
                    <View style={styles.conversionRow}>
                      <View style={styles.currencyFromTo}>
                        <View style={styles.currencyItem}>
                          <ThemedText style={styles.currencyEmoji}>
                            {getCurrencyEmoji(item.from)}
                          </ThemedText>
                          <View>
                            <ThemedText colorName="text" style={styles.amount}>{item.amount}</ThemedText>
                            <ThemedText colorName="textSecondary" style={styles.currency}>{item.from}</ThemedText>
                          </View>
                        </View>
                        
                        <ThemedText colorName="primary" style={styles.arrow}>→</ThemedText>
                        
                        <View style={styles.currencyItem}>
                          <ThemedText style={styles.currencyEmoji}>
                            {getCurrencyEmoji(item.to)}
                          </ThemedText>
                          <View>
                            <ThemedText colorName="primary" style={styles.result}>{item.result}</ThemedText>
                            <ThemedText colorName="textSecondary" style={styles.currency}>{item.to}</ThemedText>
                          </View>
                        </View>
                      </View>
                    </View>
                    
                    <ThemedText colorName="textTertiary" style={styles.date}>
                      {formatDate(item.date)}
                    </ThemedText>
                  </View>
                ))}
              </View>
            </>
          )}
        </ThemedView>
      </ScrollView>
    </View>
  );
}
