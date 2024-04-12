import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Loader = () => {
  return (
    <View style={styles.Container}>
      <LottieView source={require('../../Assets/loader.json')} autoPlay loop style={styles.loader} />
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  loader:{
    width:200,
    height:200
  }
})