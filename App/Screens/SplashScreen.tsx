import {Animated, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Colors from '../Constants/Colors';
import LottieView from 'lottie-react-native';
import {setClientToken} from '../API/APIClients';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/Store';

const SplashScreen = () => {
  const {userData, loading} = useSelector(
    (state: RootState) => state.loginReducer,
  );

  console.log(userData);
  useEffect(() => {
    fetchToken();
  }, [])

  const fetchToken = async () => {
    const token = await AsyncStorage.getItem('access_token');
    if(token){
      setClientToken(token);
    }
  }
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../Assets/Car.json')}
        autoPlay
        loop
        style={styles.loader}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Iconwhite,
  },
  loader: {
    width: 250,
    height: 200,
  },
});
