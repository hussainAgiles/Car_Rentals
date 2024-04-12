import {StyleSheet, ActivityIndicator, View} from 'react-native';
import React from 'react';
import Colors from '../../Constants/Colors';

const ImageLoader = () => {
  return (
    <View style={styles.Container}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

export default ImageLoader;

const styles = StyleSheet.create({
  Container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Iconwhite,
    zIndex: 2,
  },
});
