import CurrencyPicker from '@/components/CurrencyPicker';
import ResultCard from '@/components/ResultCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemeToggleButton } from '@/components/ThemeToggleButton';
import { useTheme } from '@/theme/ThemeContext';
import { convertCurrency, getAllCurrencies } from '@/utils/currencyApi';
import React, { useState, useMemo } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function CurrencyConverterScreen() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { colors } = useTheme();
  
  // Get all available currencies from API
  const CURRENCIES = useMemo(() => getAllCurrencies(), []);

  const handleConvert = async () => {
    if (!amount || isNaN(Number(amount))) {
      setError('Please enter a valid amount.');
      setResult(null);
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);
    const { result, error } = await convertCurrency(fromCurrency, toCurrency, amount);
    setResult(result);
    setError(error || '');
    setLoading(false);
  };

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    // Auto-convert if amount is entered
    if (amount && !isNaN(Number(amount))) {
      setTimeout(() => handleConvert(), 300);
    }
  };

  const handleAmountChange = (text: string) => {
    setAmount(text);
    // Clear previous results when amount changes
    if (result) {
      setResult(null);
      setError('');
    }
  };

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    contentContainer: {
      flex: 1,
      padding: 20,
      paddingTop: 60,
    },
    header: {
      alignItems: 'center',
      marginBottom: 30,
    },
    headerEmoji: {
      fontSize: 48,
      marginBottom: 8,
    },
    headerTitle: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 4,
      textAlign: 'center',
    },
    headerSubtitle: {
      fontSize: 16,
      textAlign: 'center',
    },
    conversionCard: {
      backgroundColor: colors.surface,
      borderRadius: 24,
      padding: 24,
      marginBottom: 20,
      elevation: 8,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    inputSection: {
      marginBottom: 24,
    },
    sectionLabel: {
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 12,
      textAlign: 'center',
    },
    amountInput: {
      borderWidth: 2,
      borderColor: colors.inputBorder,
      borderRadius: 20,
      padding: 20,
      fontSize: 32,
      color: colors.text,
      backgroundColor: colors.primaryTransparent,
      textAlign: 'center',
      fontWeight: '700',
      elevation: 2,
    },
    currencySection: {
      marginBottom: 24,
    },
    currencyRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    currencyCard: {
      flex: 1,
      backgroundColor: colors.primaryTransparent,
      borderRadius: 20,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
      elevation: 2,
    },
    currencyLabel: {
      fontSize: 14,
      fontWeight: '700',
      marginBottom: 8,
      textAlign: 'center',
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    selectedCurrency: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      padding: 12,
      marginBottom: 12,
      alignItems: 'center',
    },
    selectedCurrencyText: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
    },
    swapButton: {
      backgroundColor: colors.primary,
      borderRadius: 25,
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 6,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
    },
    swapIcon: {
      fontSize: 24,
      color: '#fff',
      fontWeight: 'bold',
    },
    convertButton: {
      backgroundColor: colors.primary,
      borderRadius: 25,
      paddingVertical: 18,
      paddingHorizontal: 32,
      elevation: 8,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      marginBottom: 16,
    },
    convertButtonDisabled: {
      backgroundColor: colors.textTertiary,
      elevation: 3,
    },
    convertButtonText: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    quickActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 8,
    },
    quickActionButton: {
      flex: 1,
      backgroundColor: colors.primaryTransparent,
      borderRadius: 12,
      paddingVertical: 10,
      paddingHorizontal: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    quickActionText: {
      fontSize: 14,
      fontWeight: '600',
      textAlign: 'center',
    },
  }), [colors]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ThemeToggleButton />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          <ThemedView style={styles.contentContainer}>
            {/* Header */}
            <View style={styles.header}>
              <ThemedText style={styles.headerEmoji}>💱</ThemedText>
              <ThemedText colorName="primary" type="title" style={styles.headerTitle}>Currency Converter</ThemedText>
              <ThemedText colorName="textSecondary" style={styles.headerSubtitle}>Convert currencies instantly</ThemedText>
            </View>

            {/* Main Conversion Card */}
            <View style={styles.conversionCard}>
              {/* Amount Input */}
              <View style={styles.inputSection}>
                <ThemedText colorName="primary" style={styles.sectionLabel}>💰 Enter Amount</ThemedText>
                <TextInput
                  style={styles.amountInput}
                  placeholder="0.00"
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={handleAmountChange}
                  placeholderTextColor={colors.textTertiary}
                  selectionColor={colors.primary}
                />
              </View>

              {/* Currency Selection */}
              <View style={styles.currencySection}>
                <View style={styles.currencyRow}>
                  <View style={styles.currencyCard}>
                    <ThemedText colorName="primary" style={styles.currencyLabel}>🔄 From</ThemedText>
                    <View style={styles.selectedCurrency}>
                      <ThemedText style={styles.selectedCurrencyText}>{fromCurrency}</ThemedText>
                    </View>
                    <CurrencyPicker 
                      currencies={CURRENCIES} 
                      selected={fromCurrency} 
                      onSelect={setFromCurrency} 
                    />
                  </View>

                  <TouchableOpacity style={styles.swapButton} onPress={swapCurrencies}>
                    <ThemedText style={styles.swapIcon}>⇅</ThemedText>
                  </TouchableOpacity>

                  <View style={styles.currencyCard}>
                    <ThemedText colorName="primary" style={styles.currencyLabel}>🎯 To</ThemedText>
                    <View style={styles.selectedCurrency}>
                      <ThemedText style={styles.selectedCurrencyText}>{toCurrency}</ThemedText>
                    </View>
                    <CurrencyPicker 
                      currencies={CURRENCIES} 
                      selected={toCurrency} 
                      onSelect={setToCurrency} 
                    />
                  </View>
                </View>
              </View>

              {/* Convert Button */}
              <TouchableOpacity 
                style={[styles.convertButton, loading && styles.convertButtonDisabled]} 
                onPress={handleConvert}
                disabled={loading}
              >
                <ThemedText style={styles.convertButtonText}>
                  {loading ? '⏳ Converting...' : '🚀 Convert Now'}
                </ThemedText>
              </TouchableOpacity>

              {/* Quick Actions */}
              <View style={styles.quickActions}>
                <TouchableOpacity 
                  style={styles.quickActionButton} 
                  onPress={() => setAmount('100')}
                >
                  <ThemedText colorName="primary" style={styles.quickActionText}>100</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.quickActionButton} 
                  onPress={() => setAmount('500')}
                >
                  <ThemedText colorName="primary" style={styles.quickActionText}>500</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.quickActionButton} 
                  onPress={() => setAmount('1000')}
                >
                  <ThemedText colorName="primary" style={styles.quickActionText}>1K</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.quickActionButton} 
                  onPress={() => setAmount('')}
                >
                  <ThemedText colorName="primary" style={styles.quickActionText}>Clear</ThemedText>
                </TouchableOpacity>
              </View>
            </View>

            {/* Result Card */}
            <ResultCard
              amount={amount}
              from={fromCurrency}
              to={toCurrency}
              result={result}
              loading={loading}
              error={error}
            />
          </ThemedView>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}
