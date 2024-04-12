import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../Constants/Colors';

const HeadingView = ({item}:any) => {
   
  return (
    <View style={styles.container}>
     <View style={{padding:5}}>
     <View style={styles.row}>
        <Text style={styles.cell}>Customer</Text>
        <Text style={styles.cell}>Type</Text>
        <Text style={styles.cell}>Address</Text>
        <Text style={styles.cell}>Deals</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.cell, styles.text]}>{item.reservation?.customers?.full_name}</Text>
        <Text style={[styles.cell, styles.text, {backgroundColor:Colors.green, borderRadius:15, textAlign:'center'}]}>{item.reservation?.customers?.customer_type}</Text>
        <Text style={[styles.cell, styles.text]}>{item.reservation?.customers?.address}</Text>
        <Text style={[styles.cell, styles.text]}>{item.reservation?.customers?.terms}</Text>
      </View>
     </View>
    </View>
  );
};

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
});

export default HeadingView;
