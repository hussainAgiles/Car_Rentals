import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SplashScreen from './App/Screens/SplashScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './App/Navigation/Navigation';
import {PaperProvider} from 'react-native-paper';
import {Provider, useSelector} from 'react-redux';
import store, {persistor} from './App/Redux/Store';
import {PersistGate} from 'redux-persist/integration/react';

const Main = () => {
  return (
    <>
      <Navigation />
      <StatusBar />
    </>
  );
};

const App = () => {
  const [isSplashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      setSplashVisible(false);
    }, 3000);

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(splashTimeout);
  }, []);
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider>
            {isSplashVisible ? <SplashScreen /> : <Main />}
          </PaperProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
