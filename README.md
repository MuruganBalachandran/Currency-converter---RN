# CurrencyCalc 💱

A modern, feature-rich currency converter app built with React Native and Expo. Convert between currencies with real-time rates, track your conversion history, and enjoy a beautiful dark/light theme experience.

# UI Images
![Image](https://github.com/user-attachments/assets/126737b5-96e7-453e-a587-53b26d69730e)
![Image](https://github.com/user-attachments/assets/767092ec-6b35-48e5-abfe-777ea2d4777e)
![Image](https://github.com/user-attachments/assets/cfade311-ef29-4e04-89d2-5153a6d4a70d)
![Image](https://github.com/user-attachments/assets/8d0f3e46-744e-4a43-99df-e0347d1c280f)
![Image](https://github.com/user-attachments/assets/d4f20f7b-4a33-48f6-96f4-5eb29f109d42)

## ✨ Features

### 🔄 Currency Conversion
- **Complete Currency Support**: Convert between all major world currencies
- **Real-time Conversion**: Instant currency conversion with up-to-date rates
- **Smart Currency Selection**: Popular currencies for quick access + full searchable list
- **Swap Functionality**: Easily swap between source and target currencies
- **Quick Amount Buttons**: Preset amounts (100, 500, 1K) for faster input

### 🎨 Modern UI/UX
- **Dark/Light Theme Toggle**: System-wide theme switching with persistence
- **Beautiful Design**: Modern, clean interface with smooth animations
- **Responsive Layout**: Optimized for all screen sizes
- **Intuitive Navigation**: Tab-based navigation with themed icons

### 📊 Conversion History
- **Track All Conversions**: Automatic saving of all currency conversions
- **Detailed History View**: See amount, currencies, results, and timestamps
- **Statistics Dashboard**: View total conversions and currencies used
- **Clear History**: Option to clear all conversion history
- **Persistent Storage**: History saved locally using AsyncStorage

### 🌟 Additional Features
- **Theme Persistence**: Your theme choice is remembered across app restarts
- **Search Functionality**: Search through currencies by code or name
- **Flag Emojis**: Visual currency identification with country flags
- **Error Handling**: Graceful error handling with user-friendly messages

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CurrencyCalc
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run the app**
   - Scan the QR code with Expo Go app on your phone
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Press `w` to run in web browser

## 📱 App Structure

### Screens
- **Home** (`app/(tabs)/index.tsx`): Welcome screen with app features and FAQs
- **Currency Converter** (`app/(tabs)/explore.tsx`): Main conversion interface
- **History** (`app/(tabs)/history.tsx`): Conversion history and statistics

### Key Components
- **CurrencyPicker**: Advanced currency selection with search and popular currencies
- **ResultCard**: Displays conversion results with theme-aware styling
- **ThemeToggleButton**: System-wide theme switching component
- **ThemedText/ThemedView**: Theme-aware UI components

### Theme System
- **ThemeContext**: Centralized theme management
- **useThemeManager**: Hook for theme state and persistence
- **Color System**: Comprehensive color palette for light/dark modes

## 🛠 Technical Details

### Built With
- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **TypeScript**: Type-safe JavaScript
- **Expo Router**: File-based navigation
- **AsyncStorage**: Local data persistence

### Architecture
- **Component-based**: Modular, reusable components
- **Context API**: Global state management for themes
- **Custom Hooks**: Reusable logic for theme management
- **File-based Routing**: Expo Router for navigation

### Key Dependencies
- `@react-native-async-storage/async-storage`: Local storage
- `expo-router`: Navigation and routing
- `expo-status-bar`: Status bar management
- `react-native-safe-area-context`: Safe area handling

## 🎨 Theming

The app features a comprehensive theming system with:
- **Light Theme**: Clean, bright interface
- **Dark Theme**: Easy on the eyes for low-light usage
- **Automatic Persistence**: Theme choice saved across app restarts
- **System-wide Application**: All components respect the current theme

## 💾 Data Storage

- **Conversion History**: Stored locally using AsyncStorage
- **Theme Preference**: Persisted theme selection
- **Automatic Cleanup**: Efficient storage management

## 🔧 Development

### Project Structure
```
CurrencyCalc/
├── app/                    # Main app screens
│   ├── (tabs)/            # Tab-based screens
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
├── constants/            # App constants
├── hooks/               # Custom hooks
├── theme/              # Theme system
├── utils/             # Utility functions
└── assets/           # Images and fonts
```

### Adding New Features
1. Create components in `components/`
2. Add screens to `app/(tabs)/`
3. Update theme colors in `theme/colors.ts`
4. Use `useTheme` hook for theme-aware styling

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or issues, please open an issue on GitHub.

---

**CurrencyCalc** - Making currency conversion simple, beautiful, and efficient! 💱✨
