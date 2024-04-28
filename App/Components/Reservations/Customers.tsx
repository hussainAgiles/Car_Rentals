import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../Constants/Colors';

const HeadingView = ({ item }: any) => {
  console.log("item", item);

  return (
    <View style={styles.container}>
      <View style={{ padding: 5 }}>
        <View style={styles.row}>
          <Text style={styles.cell}>Customer</Text>
          <Text style={styles.cell}>Type</Text>
          <Text style={styles.cell}>Number</Text>
          <Text style={styles.cell}>Deals</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.cell, styles.text]}>{item.reservation?.customers?.full_name}</Text>
          <View style={[styles.cell,{justifyContent:'center',alignItems:'center',alignSelf:'center'}]}>
            <View style={[ styles.type]}>
            <Text  style={{textAlign:'center',fontSize:12,marginTop:1,color:Colors.Iconwhite}}>{item.reservation?.customers?.customer_type}</Text>
            </View>
         
          </View>
         
          <Text style={[styles.cell, styles.text]}>{item.reservation?.customers?.mobile}</Text>
          <Text style={[styles.cell, styles.text]}>{item.reservation?.customers?.terms}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Iconwhite,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    alignItems: 'center',
    alignSelf: 'center',
  },
  cell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    paddingVertical: 5,
  },
  type: {
    backgroundColor: Colors.green,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 12, // Adjust font size to reduce button width
    width:90, 
    height:20// Adjust padding to reduce button width
  },
});

export default HeadingView;
