import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../Constants/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Header = ({text}: any) => {
  const navigation = useNavigation();
  return (
    <View style={styles.Container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name={'arrow-left'} color={Colors.black} size={28} />
      </TouchableOpacity>
      <Text style={styles.Heading}>{text}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: Colors.Iconwhite,
    padding: 10,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  Heading:{
    fontSize:18,
    marginLeft:5,
    color:Colors.black,
    fontFamily:'Bungee-Regular'
  }
});
