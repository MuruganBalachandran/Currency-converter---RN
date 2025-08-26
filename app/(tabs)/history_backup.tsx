import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useMemo } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemeToggleButton } from '@/components/ThemeToggleButton';
import { useTheme } from '@/theme/ThemeContext';

interface ConversionHistory {
  amount: string;
  from: string;
  to: string;
  result: string;
  date: string;
}

const CURRENCY_EMOJIS: { [key: string]: string } = {
  'USD': '🇺🇸', 'EUR': '🇪🇺', 'GBP': '🇬🇧', 'JPY': '🇯🇵', 'INR': '🇮🇳',
  'CAD': '🇨🇦', 'AUD': '🇦🇺', 'CHF': '🇨🇭', 'CNY': '🇨🇳', 'BRL': '🇧🇷',
  'KRW': '🇰🇷', 'MXN': '🇲🇽', 'SGD': '🇸🇬', 'HKD': '🇭🇰', 'NOK': '🇳🇴',
};

export default function HistoryScreen() {
  const [history, setHistory] = useState<ConversionHistory[]>([]);
  const { colors } = useTheme();

  const loadHistory = async () => {
    try {
      const savedHistory = await AsyncStorage.getItem('conversionHistory');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Failed to load history:', error);
    }
  };

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem('conversionHistory');
      setHistory([]);
    } catch (error) {
      console.error('Failed to clear history:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getCurrencyEmoji = (currency: string) => {
    return CURRENCY_EMOJIS[currency] || '💰';
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      paddingTop: 60,
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
      justifyContent: 'space-around',
      elevation: 4,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    statItem: {
      alignItems: 'center',
    },
    statNumber: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 14,
      color: colors.textSecondary,
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
      color: colors.primary,
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
      color: colors.text,
    },
    result: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.primary,
    },
    currency: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.textSecondary,
    },
    arrow: {
      fontSize: 20,
      marginHorizontal: 12,
      fontWeight: 'bold',
      color: colors.primary,
    },
    date: {
      fontSize: 12,
      textAlign: 'right',
      fontStyle: 'italic',
      color: colors.textTertiary,
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
                  <ThemedText style={styles.statNumber}>{history.length}</ThemedText>
                  <ThemedText style={styles.statLabel}>Total Conversions</ThemedText>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <ThemedText style={styles.statNumber}>
                    {new Set(history.map(h => h.from)).size}
                  </ThemedText>
                  <ThemedText style={styles.statLabel}>Currencies Used</ThemedText>
                </View>
              </View>

              <View style={styles.historyList}>
                <View style={styles.listHeader}>
                  <ThemedText style={styles.listTitle}>Recent Conversions</ThemedText>
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
                            <ThemedText style={styles.amount}>{item.amount}</ThemedText>
                            <ThemedText style={styles.currency}>{item.from}</ThemedText>
                          </View>
                        </View>
                        
                        <ThemedText style={styles.arrow}>→</ThemedText>
                        
                        <View style={styles.currencyItem}>
                          <ThemedText style={styles.currencyEmoji}>
                            {getCurrencyEmoji(item.to)}
                          </ThemedText>
                          <View>
                            <ThemedText style={styles.result}>{item.result}</ThemedText>
                            <ThemedText style={styles.currency}>{item.to}</ThemedText>
                          </View>
                        </View>
                      </View>
                    </View>
                    
                    <ThemedText style={styles.date}>
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
