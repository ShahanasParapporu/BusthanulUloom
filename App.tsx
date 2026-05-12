// App.tsx
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from './src/redux/store';
import { theme } from './src/constants/theme';
import RootNavigator from './src/navigation/RootNavigator';
import { LanguageProvider } from './src/i18n/LanguageContext'; // ← ADD


const App = () => {
  return (
    <ReduxProvider store={store}>
      <LanguageProvider>    
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <StatusBar
            barStyle="light-content"
            backgroundColor={theme.colors.primary}
          />
          <RootNavigator />
        </NavigationContainer>
      </PaperProvider>
      </LanguageProvider>
    </ReduxProvider>
  );
};

export default App;






// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import { NewAppScreen } from '@react-native/new-app-screen';
// import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
// import {
//   SafeAreaProvider,
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';

// function App() {
//   const isDarkMode = useColorScheme() === 'dark';

//   return (
//     <SafeAreaProvider>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <AppContent />
//     </SafeAreaProvider>
//   );
// }

// function AppContent() {
//   const safeAreaInsets = useSafeAreaInsets();

//   return (
//     <View style={styles.container}>
//       <NewAppScreen
//         templateFileName="App.tsx"
//         safeAreaInsets={safeAreaInsets}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default App;
