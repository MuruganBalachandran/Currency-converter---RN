import React, { useState, useMemo } from 'react';
import { FlatList, Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useTheme } from '@/theme/ThemeContext';

interface Props {
  currencies: string[];
  selected: string;
  onSelect: (c: string) => void;
}

const CURRENCY_NAMES: { [key: string]: string } = {
  'USD': 'US Dollar',
  'EUR': 'Euro',
  'GBP': 'British Pound',
  'JPY': 'Japanese Yen',
  'INR': 'Indian Rupee',
  'CAD': 'Canadian Dollar',
  'AUD': 'Australian Dollar',
  'CHF': 'Swiss Franc',
  'CNY': 'Chinese Yuan',
  'BRL': 'Brazilian Real',
  'KRW': 'South Korean Won',
  'MXN': 'Mexican Peso',
  'SGD': 'Singapore Dollar',
  'HKD': 'Hong Kong Dollar',
  'NOK': 'Norwegian Krone',
  'SEK': 'Swedish Krona',
  'DKK': 'Danish Krone',
  'PLN': 'Polish Złoty',
  'CZK': 'Czech Koruna',
  'HUF': 'Hungarian Forint',
  'RUB': 'Russian Ruble',
  'TRY': 'Turkish Lira',
  'ZAR': 'South African Rand',
  'THB': 'Thai Baht',
  'MYR': 'Malaysian Ringgit',
  'IDR': 'Indonesian Rupiah',
  'PHP': 'Philippine Peso',
  'VND': 'Vietnamese Dong',
  'NZD': 'New Zealand Dollar',
  'ILS': 'Israeli Shekel',
  'AED': 'UAE Dirham',
  'SAR': 'Saudi Riyal',
  'EGP': 'Egyptian Pound',
  'QAR': 'Qatari Riyal',
  'KWD': 'Kuwaiti Dinar',
  'BHD': 'Bahraini Dinar',
  'OMR': 'Omani Rial',
  'JOD': 'Jordanian Dinar',
  'LBP': 'Lebanese Pound',
  'PKR': 'Pakistani Rupee',
  'BDT': 'Bangladeshi Taka',
  'LKR': 'Sri Lankan Rupee',
  'NPR': 'Nepalese Rupee',
  'MMK': 'Myanmar Kyat',
  'KHR': 'Cambodian Riel',
  'LAK': 'Lao Kip',
  'BND': 'Brunei Dollar',
  'TWD': 'Taiwan Dollar',
  'CLP': 'Chilean Peso',
  'PEN': 'Peruvian Sol',
  'COP': 'Colombian Peso',
  'ARS': 'Argentine Peso',
  'UYU': 'Uruguayan Peso',
  'VES': 'Venezuelan Bolívar',
  'BOB': 'Bolivian Boliviano',
  'PYG': 'Paraguayan Guaraní',
  'GYD': 'Guyanese Dollar',
  'SRD': 'Surinamese Dollar',
  'FJD': 'Fijian Dollar',
  'TOP': 'Tongan Paʻanga',
};

const CURRENCY_FLAGS: { [key: string]: string } = {
  'USD': '🇺🇸', 'EUR': '🇪🇺', 'GBP': '🇬🇧', 'JPY': '🇯🇵', 'INR': '🇮🇳',
  'CAD': '🇨🇦', 'AUD': '🇦🇺', 'CHF': '🇨🇭', 'CNY': '🇨🇳', 'BRL': '🇧🇷',
  'KRW': '🇰🇷', 'MXN': '🇲🇽', 'SGD': '🇸🇬', 'HKD': '🇭🇰', 'NOK': '🇳🇴',
  'SEK': '🇸🇪', 'DKK': '🇩🇰', 'PLN': '🇵🇱', 'CZK': '🇨🇿', 'HUF': '🇭🇺',
  'RUB': '🇷🇺', 'TRY': '🇹🇷', 'ZAR': '🇿🇦', 'THB': '🇹🇭', 'MYR': '🇲🇾',
  'IDR': '🇮🇩', 'PHP': '🇵🇭', 'VND': '🇻🇳', 'NZD': '🇳🇿', 'ILS': '🇮🇱',
  'AED': '🇦🇪', 'SAR': '🇸🇦', 'EGP': '🇪🇬', 'QAR': '🇶🇦', 'KWD': '🇰🇼',
  'BHD': '🇧🇭', 'OMR': '🇴🇲', 'JOD': '🇯🇴', 'LBP': '🇱🇧', 'PKR': '🇵🇰',
  'BDT': '🇧🇩', 'LKR': '🇱🇰', 'NPR': '🇳🇵', 'MMK': '🇲🇲', 'KHR': '🇰🇭',
  'LAK': '🇱🇦', 'BND': '🇧🇳', 'TWD': '🇹🇼', 'CLP': '🇨🇱', 'PEN': '🇵🇪',
  'COP': '🇨🇴', 'ARS': '🇦🇷', 'UYU': '🇺🇾', 'VES': '🇻🇪', 'BOB': '🇧🇴',
  'PYG': '🇵🇾', 'GYD': '🇬🇾', 'SRD': '🇸🇷', 'FJD': '🇫🇯', 'TOP': '🇹🇴',
};

export default function CurrencyPicker({ currencies, selected, onSelect }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { colors } = useTheme();

  const popularCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'INR', 'CAD', 'AUD', 'CHF'];

  const filteredCurrencies = currencies.filter(currency => 
    currency.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (CURRENCY_NAMES[currency] && CURRENCY_NAMES[currency].toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSelect = (currency: string) => {
    onSelect(currency);
    setModalVisible(false);
    setSearchQuery('');
  };

  const styles = useMemo(() => StyleSheet.create({
    popularScroll: {
      maxHeight: 60,
    },
    popularContainer: {
      paddingHorizontal: 4,
      gap: 8,
    },
    popularItem: {
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 12,
      backgroundColor: colors.primaryTransparent,
      borderWidth: 1,
      borderColor: colors.border,
      minWidth: 60,
    },
    popularItemSelected: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    popularFlag: {
      fontSize: 16,
      marginBottom: 2,
    },
    popularText: {
      fontSize: 12,
      color: colors.primary,
      fontWeight: '600',
    },
    popularTextSelected: {
      color: '#fff',
    },
    moreButton: {
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 12,
      backgroundColor: colors.primaryTransparent,
      borderWidth: 1,
      borderColor: colors.border,
      borderStyle: 'dashed',
      minWidth: 60,
    },
    moreText: {
      fontSize: 16,
      color: colors.primary,
      fontWeight: 'bold',
    },
    moreLabel: {
      fontSize: 12,
      color: colors.primary,
      fontWeight: '600',
    },
    modalContainer: {
      flex: 1,
      backgroundColor: colors.background,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      paddingTop: 60,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.primary,
    },
    closeButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.primaryTransparent,
      alignItems: 'center',
      justifyContent: 'center',
    },
    closeText: {
      fontSize: 18,
      color: colors.primary,
      fontWeight: 'bold',
    },
    searchInput: {
      margin: 20,
      padding: 16,
      borderRadius: 12,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.inputBorder,
      fontSize: 16,
      color: colors.text,
    },
    currencyList: {
      flex: 1,
      paddingHorizontal: 20,
    },
    modalCurrencyItem: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    modalCurrencyItemSelected: {
      backgroundColor: colors.primaryTransparent,
      borderColor: colors.primary,
      borderWidth: 2,
    },
    currencyItemContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    currencyFlag: {
      fontSize: 24,
      marginRight: 12,
    },
    currencyInfo: {
      flex: 1,
    },
    currencyCode: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
    },
    currencyName: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 2,
    },
    selectedText: {
      color: colors.primary,
    },
    checkMark: {
      fontSize: 20,
      color: colors.primary,
      fontWeight: 'bold',
    },
    separator: {
      height: 8,
    },
  }), [colors]);

  const renderCurrencyItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.modalCurrencyItem,
        item === selected && styles.modalCurrencyItemSelected
      ]}
      onPress={() => handleSelect(item)}
    >
      <View style={styles.currencyItemContent}>
        <ThemedText style={styles.currencyFlag}>
          {CURRENCY_FLAGS[item] || '💰'}
        </ThemedText>
        <View style={styles.currencyInfo}>
          <ThemedText style={[
            styles.currencyCode,
            item === selected && styles.selectedText
          ]}>
            {item}
          </ThemedText>
          <ThemedText style={[
            styles.currencyName,
            item === selected && styles.selectedText
          ]}>
            {CURRENCY_NAMES[item] || item}
          </ThemedText>
        </View>
        {item === selected && (
          <ThemedText style={styles.checkMark}>✓</ThemedText>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      {/* Popular currencies quick selection */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.popularScroll}
        contentContainerStyle={styles.popularContainer}
      >
        {popularCurrencies.map((currency) => (
          <TouchableOpacity
            key={currency}
            style={[
              styles.popularItem,
              selected === currency && styles.popularItemSelected
            ]}
            onPress={() => onSelect(currency)}
          >
            <ThemedText style={styles.popularFlag}>
              {CURRENCY_FLAGS[currency] || '💰'}
            </ThemedText>
            <ThemedText style={[
              styles.popularText,
              selected === currency && styles.popularTextSelected
            ]}>
              {currency}
            </ThemedText>
          </TouchableOpacity>
        ))}
        
        {/* More button */}
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => setModalVisible(true)}
        >
          <ThemedText style={styles.moreText}>⋯</ThemedText>
          <ThemedText style={styles.moreLabel}>More</ThemedText>
        </TouchableOpacity>
      </ScrollView>

      {/* Full currency selection modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setModalVisible(false)}
      >
        <ThemedView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <ThemedText style={styles.modalTitle}>Select Currency</ThemedText>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <ThemedText style={styles.closeText}>✕</ThemedText>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.searchInput}
            placeholder="Search currencies..."
            placeholderTextColor={colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            selectionColor={colors.primary}
          />

          <FlatList
            data={filteredCurrencies}
            keyExtractor={(item) => item}
            renderItem={renderCurrencyItem}
            style={styles.currencyList}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </ThemedView>
      </Modal>
    </>
  );
}
