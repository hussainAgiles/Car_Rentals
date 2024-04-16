import {Animated, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Colors from '../Constants/Colors';
import LottieView from 'lottie-react-native';
import {setClientToken} from '../API/APIClients';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/Store';


const SplashScreen = () => {
  const {userData} = useSelector(
    (state: RootState) => state.loginReducer,
  );

  useEffect(() => {
    fetchToken();
  }, [])

  const fetchToken = async () => {
    if(userData){
      setClientToken(userData.access_token);
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
