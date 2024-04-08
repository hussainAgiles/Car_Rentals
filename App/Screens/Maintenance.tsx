import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../Constants/Colors'

const Maintenance = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Maintenance will be available soon.</Text>
    </View>
  )
}

export default Maintenance

const styles = StyleSheet.create({
  container:{
    flex:1,justifyContent:'center',alignItems:"center"
  },
  headerText:{
    fontSize:15,
    color:Colors.primary,
    fontWeight:'bold'
  }
})