import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../Constants/Colors'

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Welcome to Home, content is coming soon...</Text>
    </View>
  )
}

export default Home

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