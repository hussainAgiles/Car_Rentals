import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, LogBox} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Navigation from './App/Navigation/Navigation';
import store, {persistor} from './App/Redux/Store';
import SplashScreen from './App/Screens/SplashScreen';
import Toast from 'react-native-toast-message';
LogBox.ignoreAllLogs();


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
      <SafeAreaView style={{flex: 1}}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <PaperProvider>
              {isSplashVisible ? <SplashScreen /> : <Main />}
              <Toast />
            </PaperProvider>
          </PersistGate>
        </Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;

