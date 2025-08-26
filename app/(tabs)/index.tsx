import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemeToggleButton } from '@/components/ThemeToggleButton';
import { useTheme } from '@/theme/ThemeContext';
import React, { useMemo, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const FEATURES = [
  '🌍 150+ currencies supported worldwide',
  '⚡ Lightning-fast offline conversion',
  '📊 Complete conversion history tracking',
  '🎨 Beautiful, intuitive modern design',
  '🔒 Privacy-focused - no ads, no tracking',
  '📱 Works perfectly offline',
  '🔄 Real-time exchange rates when online',
];

const FAQS = [
  { q: 'Is the app completely free?', a: 'Yes, absolutely free forever with no hidden costs or premium features!' },
  { q: 'Does it work without internet?', a: 'Yes, all exchange rates are cached locally for offline use.' },
  { q: 'How often are rates updated?', a: 'Rates are updated automatically when you have an internet connection.' },
  { q: 'Is my conversion history saved?', a: 'Yes, all conversions are automatically saved locally on your device.' },
  { q: 'Which currencies are supported?', a: 'We support 150+ major world currencies including crypto currencies.' },
  { q: 'How accurate are the exchange rates?', a: 'We use reliable financial data sources for the most accurate rates available.' },
  { q: 'Can I use it for business purposes?', a: 'Yes, but rates are for reference only. Consult official sources for business transactions.' },
  { q: 'How do I get help or report issues?', a: 'Contact our support team through the Help section in the app settings.' },
  { q: 'Does the app track my usage?', a: 'No, we respect your privacy. No tracking, analytics, or data collection.' },
  { q: 'Can I customize the interface?', a: 'Yes, the app supports both light and dark themes that adapt to your system preferences.' },
];

export default function HomeScreen() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { colors } = useTheme();
  
  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      backgroundColor: colors.background,
    },
    heroSection: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 50,
      paddingHorizontal: 20,
    },
    logoContainer: {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    emojiLogo: {
      fontSize: 80,
      textAlign: 'center',
    },
    logoGlow: {
      position: 'absolute',
      width: 120,
      height: 120,
      borderRadius: 60,
      top: -20,
      zIndex: -1,
    },
    heroTitle: {
      fontSize: 42,
      fontWeight: '800',
      marginBottom: 8,
      textAlign: 'center',
      letterSpacing: -1,
    },
    heroSlogan: {
      fontSize: 18,
      marginBottom: 30,
      textAlign: 'center',
      fontWeight: '400',
    },
    heroStats: {
      flexDirection: 'row',
      borderRadius: 20,
      padding: 20,
      backgroundColor: colors.surface,
    },
    statItem: {
      alignItems: 'center',
      flex: 1,
    },
    statNumber: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      fontWeight: '500',
      textAlign: 'center',
    },
    statDivider: {
      width: 1,
      marginHorizontal: 15,
      backgroundColor: colors.border,
    },
    featuresSection: {
      padding: 24,
      margin: 16,
    },
    sectionTitle: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    featuresGrid: {
      gap: 12,
    },
    featureCard: {
      borderRadius: 12,
      padding: 16,
      borderLeftWidth: 4,
      borderLeftColor: colors.primary,
      backgroundColor: colors.surface,
    },
    feature: {
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 22,
    },
    faqSection: {
      padding: 24,
      margin: 16,
    },
    faqContainer: {
      gap: 8,
    },
    faqItem: {
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      backgroundColor: colors.surface,
    },
    faqHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    faqQ: {
      fontWeight: '600',
      fontSize: 16,
      flex: 1,
      marginRight: 10,
    },
    faqToggle: {
      fontSize: 20,
      fontWeight: 'bold',
      width: 24,
      textAlign: 'center',
    },
    faqA: {
      marginTop: 12,
      fontSize: 15,
      lineHeight: 22,
      paddingLeft: 0,
    },
    footerSection: {
      padding: 32,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
    },
    footerContent: {
      alignItems: 'center',
      maxWidth: width - 40,
    },
    footerEmoji: {
      fontSize: 32,
      marginBottom: 12,
    },
    footerText: {
      fontSize: 16,
      textAlign: 'center',
      fontWeight: '500',
      marginBottom: 8,
    },
    footerSubtext: {
      fontSize: 13,
      textAlign: 'center',
      fontStyle: 'italic',
      lineHeight: 18,
    },
  }), [colors]);
  return (
    <View style={styles.container}>
      <ThemeToggleButton />
      <ScrollView 
        style={{ flex: 1 }} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <ThemedView colorName="surface" style={styles.heroSection}>
          <View style={styles.logoContainer}>
            <ThemedText style={styles.emojiLogo}>🌐</ThemedText>
            <View style={[styles.logoGlow, { backgroundColor: 'rgba(106,90,205,0.1)' }]} />
          </View>
        <ThemedText colorName="primary" type="title" style={styles.heroTitle}>
          CurrencyCalc
        </ThemedText>
        <ThemedText colorName="textSecondary" style={styles.heroSlogan}>
          Your trusted global currency companion
        </ThemedText>
        <View style={styles.heroStats}>
          <View style={styles.statItem}>
            <ThemedText colorName="primary" style={styles.statNumber}>150+</ThemedText>
            <ThemedText colorName="textSecondary" style={styles.statLabel}>Currencies</ThemedText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <ThemedText colorName="primary" style={styles.statNumber}>⚡</ThemedText>
            <ThemedText colorName="textSecondary" style={styles.statLabel}>Offline Ready</ThemedText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <ThemedText colorName="primary" style={styles.statNumber}>🔒</ThemedText>
            <ThemedText colorName="textSecondary" style={styles.statLabel}>Privacy First</ThemedText>
          </View>
        </View>
      </ThemedView>

      <ThemedView colorName="surface" style={styles.featuresSection}>
        <ThemedText colorName="primary" type="title" style={styles.sectionTitle}>
          ✨ Key Features
        </ThemedText>
        <View style={styles.featuresGrid}>
          {FEATURES.map((feature, i) => (
            <ThemedView key={i} colorName="background" style={styles.featureCard}>
              <ThemedText colorName="text" style={styles.feature}>{feature}</ThemedText>
            </ThemedView>
          ))}
        </View>
      </ThemedView>

      <ThemedView colorName="surface" style={styles.faqSection}>
        <ThemedText colorName="primary" type="title" style={styles.sectionTitle}>
          ❓ Frequently Asked Questions
        </ThemedText>
        <View style={styles.faqContainer}>
          {FAQS.map((faq, i) => (
            <TouchableOpacity 
              key={i} 
              style={[
                styles.faqItem,
                { borderColor: openFaq === i ? colors.primary : colors.border }
              ]}
              onPress={() => setOpenFaq(openFaq === i ? null : i)}
              activeOpacity={0.7}
            >
              <View style={styles.faqHeader}>
                <ThemedText colorName="primary" style={styles.faqQ}>{faq.q}</ThemedText>
                <ThemedText colorName="primary" style={styles.faqToggle}>
                  {openFaq === i ? '−' : '+'}
                </ThemedText>
              </View>
              {openFaq === i && (
                <ThemedText colorName="textSecondary" style={styles.faqA}>{faq.a}</ThemedText>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ThemedView>

      <ThemedView colorName="surface" style={styles.footerSection}>
        <View style={styles.footerContent}>
          <ThemedText style={styles.footerEmoji}>💱</ThemedText>
          <ThemedText colorName="textSecondary" style={styles.footerText}>
            Exchange rates are provided for informational purposes only.
          </ThemedText>
          <ThemedText colorName="textTertiary" style={styles.footerSubtext}>
            Always verify rates with official financial institutions for important transactions.
          </ThemedText>
        </View>
      </ThemedView>
  </ScrollView>
    </View>
  );
}

