import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../Constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Insurance = ({item}:any) => {
  return (
    <View style={styles.container}>
      <View style={{padding:10,flexDirection:'row'}}>
      <Icon name="shield" size={30} color={Colors.black} />
      <View style={{marginLeft:10}}>
        <Text>{item?.reservation?.insurance}</Text>
        <Text>Insurance</Text>
      </View>
      </View>
   </View>
  )
}

export default Insurance

const styles = StyleSheet.create({
    container: {
        backgroundColor:Colors.Iconwhite,
         borderRadius: 5,
         padding: 10,
         marginBottom: 10,
       },
       row: {
         flexDirection: 'row',
         justifyContent: 'space-between',
         marginBottom: 5,
         alignItems:'center',
         alignSelf:'center'
       },
       cell: {
         flex: 1,
         fontWeight: 'bold',
         textAlign: 'center',
       },
       text: {
         paddingVertical: 5,
       },
})