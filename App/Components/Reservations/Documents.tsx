import React,{useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Card, Menu, TextInput,  } from 'react-native-paper'; // These are assumed components
import Colors from '../../Constants/Colors';

const Documents = () => {
  // You will have to manage state and handle selections, this is just static for layout.
  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
      </View>

      <View style={styles.documentsContainer}>
        {/* Replace with actual Card and Button components */}
        <Card style={styles.card}>
          <Text>Invoice - Invoice-3</Text>
          {/* Add your action buttons here */}
        </Card>
        <Card style={styles.card}>
          <Text>Agreement - Agreement-3</Text>
          {/* Add your action buttons here */}
        </Card>
      </View>

     

      <View style={styles.notesContainer}>
        <TextInput label="Notes" multiline={true} />
      </View>
    </View>
  );
};

export default Documents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  documentsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    // Style your card with shadow, padding, etc.
    backgroundColor:Colors.lightBg,
    padding:10,
    borderRadius:0
  },
  alertBar: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#FFA726', // orange color for the alert bar
    borderRadius: 5,
  },
  notesContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    height: 100, // Set a fixed height for the notes TextInput
  },
});
