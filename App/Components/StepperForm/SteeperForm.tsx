import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import VehicleDetails from './VehicleDetails';
import CustomerDetails from './CustomerDetails';
import Insurance_Extras from './Insurance_Extras';
import Payment from './Payment';
import Document from './Document';
import Colors from '../../Constants/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';
 
const SteeperForm = () => {
  const navigation = useNavigation();
  const [screen, setScreen] = useState(0);
  const formTitle = [
    'Date & Vehicle',
    'Customer',
    'Insurance & Extras',
    'Payments',
    'Documents',
  ];

  const screenDisplay = () => {
    switch (screen) {
      case 0:
        return <VehicleDetails />;
      case 1:
        return <CustomerDetails />;
      case 2:
        return <Insurance_Extras />;
      case 3:
        return <Payment />;
      case 4:
        return <Document />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerConatiner}>
      <Text style={styles.title}>{formTitle[screen]}</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={24} color={Colors.primary} />
      </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {screenDisplay()}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          disabled={screen === 0}
          onPress={() => setScreen(currScreen => currScreen - 1)}
          style={[styles.button, { marginRight: 20,backgroundColor:Colors.black }]}>
          <Text style={styles.buttonText}>Prev Page</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setScreen(currScreen => currScreen + 1)}
          style={[styles.button,{backgroundColor:Colors.green}]}>
          <Text style={styles.buttonText}>Next Page</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SteeperForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  headerConatiner:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  title: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20
  },
  scrollContainer: {
    flexGrow: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    borderWidth: 0.5,
    padding: 8,
  },
  buttonText: {
    color: Colors.Iconwhite,
  },
});
