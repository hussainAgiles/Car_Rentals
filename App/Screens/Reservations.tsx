import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RenderVehicles from '../Components/Reservation/RenderVehicles';
import Colors from '../Constants/Colors';

const screenWidth = Dimensions.get('window').width;

const Reservations = () => {
  const navigation = useNavigation();

  const handleOnPress = () => {
    navigation.navigate('add_reservation');
  };

  const carDetails = [
    {
      id: 1,
      info: 'Created: 04.04.202414:52 test Manager: Andrew',
      Status: 'rental',
      Pickup: 'Pharpos Airport',
      drop: 'Pharpos Airport',
      Vehicle: 'TOYOTA COROLLA Compact',
      type: 'Automatic',
      client: 'Gabriella Johnson',
      Amount: 265.0,
      PickupDate:"Mar 26th",
      ReturnDate:"Apr 2nd",
      actions: 'sold',
      Vehicle_number: 'ABC128',
      image:
        'https://purepng.com/public/uploads/large/sedan-2009-toyota-corolla-trj.png',
    },
    {
      id: 2,
      info: 'Created: 04.04.202414:52 test Manager: Gray',
      Status: 'reserved',
      Pickup: 'Pharpos Airport',
      drop: 'Pharpos Airport',
      Vehicle: 'TOYOTA COROLLA Compact',
      type: 'Manual',
      client: 'Gabriella Johnson',
      Amount: 255.0,
      PickupDate:"Mar 26th",
      ReturnDate:"Apr 2nd",
      actions: 'sold',
      Vehicle_number: 'ABC1287',
      image:
        'https://w7.pngwing.com/pngs/163/599/png-transparent-2016-toyota-corolla-2015-toyota-corolla-car-2017-toyota-corolla-toyota-compact-car-sedan-headlamp.png',
    },
    {
      id: 3,
      info: 'Created: 04.04.202414:52 test Manager: John Doe',
      Status: 'done',
      Pickup: 'Pharpos Airport',
      drop: 'Pharpos Airport',
      Vehicle: 'Volkswagen Golf',
      type: 'Automatic',
      client: 'John Doe',
      PickupDate:"Mar 26th",
      ReturnDate:"Apr 2nd",
      Amount: 265.0,
      actions: 'sold',
      Vehicle_number: 'ABC126',
      image: 'https://pngimg.com/uploads/volkswagen/volkswagen_PNG1792.png',
    },
    {
      id: 4,
      info: 'Created: 04.04.202414:52 test Manager: Manish',
      Status: 'reserved',
      Pickup: 'Pharpos Airport',
      drop: 'Pharpos Airport',
      Vehicle: 'Toyota Hybrid Compact',
      type: 'Automatic',
      client: 'Evangeline',
      PickupDate:"Mar 26th",
      ReturnDate:"Apr 2nd",
      Amount: 265.0,
      actions: 'sold',
      Vehicle_number: 'ABC129',
      image:
        'https://img.freepik.com/premium-photo/white-car-minimalistic-white-scene_599391-4965.jpg?w=740',
    },
    {
      id: 5,
      info: 'Created: 04.04.202414:52 test Manager: Vivek',
      Status: 'rental',
      Pickup: 'Pharpos Airport',
      drop: 'Pharpos Airport',
      Vehicle: 'TOYOTA COROLLA Compact',
      type: 'Automatic',
      client: 'Robin Luther',
      Amount: 265.0,
      actions: 'sold',
      PickupDate:"Mar 26th",
      ReturnDate:"Apr 2nd",
      Vehicle_number: 'ABC130',
      image:
        'https://img.freepik.com/premium-photo/white-car-minimalistic-white-scene_599391-5603.jpg?w=740',
    },
    {
      id: 6,
      info: 'Created: 04.04.202414:52 test Manager: Andrew',
      Status: 'rental',
      Pickup: 'Pharpos Airport',
      drop: 'Pharpos Airport',
      Vehicle: 'TOYOTA COROLLA Compact',
      type: 'Automatic',
      client: 'Gary Thomas',
      Amount: 265.0,
      PickupDate:"Mar 26th",
      ReturnDate:"Apr 2nd",
      actions: 'sold',
      Vehicle_number: 'ABC131',
      image:
        'https://img.freepik.com/free-psd/silver-sedan-car_53876-84522.jpg?w=900&t=st=1712232286~exp=1712232886~hmac=de2cef98bf5ca9e2ba6e1d7a375aee2ab8e1f9b3c7fa3eb748e3dafe30431aa8',
    },
    {
      id: 7,
      info: 'Created: 04.04.202414:52 test Manager: Andrew',
      Status: 'reserved',
      Pickup: 'Pharpos Airport',
      drop: 'Pharpos Airport',
      Vehicle: 'TOYOTA COROLLA Compact',
      type: 'Manual',
      client: 'GABRIELLA JOHNSON',
      Amount: 265.0,
      PickupDate:"Mar 26th",
      ReturnDate:"Apr 2nd",
      actions: 'sold',
      Vehicle_number: 'ABC132',
      image:
        'https://img.freepik.com/free-psd/silver-sedan-car_53876-84522.jpg?w=900&t=st=1712232286~exp=1712232886~hmac=de2cef98bf5ca9e2ba6e1d7a375aee2ab8e1f9b3c7fa3eb748e3dafe30431aa8',
    },
    {
      id: 8,
      info: 'Créé:02.04.202414:06 test Gestionnaire: Gary',
      Status: 'reserved',
      Pickup: 'Pharpos Airport',
      drop: 'Pharpos Airport',
      Vehicle: 'TOYOTA COROLLA Compact',
      type: 'Automatic',
      client: 'Gabriella Johnson',
      Amount: 265.0,
      actions: 'sold',
      PickupDate:"Mar 26th",
      ReturnDate:"Apr 2nd",
      Vehicle_number: 'ABC133',
      image:
        'https://img.freepik.com/free-photo/view-3d-car_23-2150796894.jpg?w=740',
    },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = text => {
    setSearchQuery(text);
  };

  const filteredCarDetails = searchQuery
    ? carDetails.filter(car =>
        car.Vehicle.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : carDetails;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerContainer}>
        <Text style={{color: Colors.black, fontSize: 30, fontWeight: 'bold'}}>
          Car Rentals
        </Text>
        <TouchableOpacity onPress={handleOnPress} style={styles.addButton}>
          <Text style={styles.buttonText}>Add Reservation</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchInputContainer}>
        <TextInput
          placeholder="Search.."
          placeholderTextColor={Colors.black}
          style={{fontSize: 15, color: Colors.black, width: screenWidth * 0.75}}
          onChangeText={text => handleSearch(text)}
        />
        <Icon name="magnify" color={Colors.primary} size={30} />
      </View>

      <View style={styles.reserved}>
        <Text style={{color: Colors.black, fontSize: 18, fontWeight: 'bold'}}>
          Reserved
        </Text>
        <Text style={{color: Colors.black, fontSize: 14, fontWeight: 'bold'}}>
          View All
        </Text>
      </View>
      <View>
        {filteredCarDetails.length > 0 ? (
          filteredCarDetails.map(item => (
            <RenderVehicles
              key={item.id}
              item={{
                id: item.id || 0,
                image: item.image || '',
                info: item.info || '',
                Status: item.Status || '',
                Pickup: item.Pickup || '',
                drop: item.drop || '',
                Vehicle: item.Vehicle || '',
                client: item.client || '',
                Amount: item.Amount || 0,
                actions: item.actions || '',
                Vehicle_number: item.Vehicle_number || '',
                type: item.type || '',
                PickupDate:item.PickupDate || '',
                ReturnDate:item.ReturnDate || '',
                

              }}
            />
          ))
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={{color: Colors.black, fontSize: 18}}>
              No data found.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Reservations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding:15
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    width: 120,
    borderWidth: 2,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.Iconwhite,
    fontSize: 15,
    fontWeight: 'bold',
    padding: 5,
  },
  searchInputContainer: {
    width: screenWidth * 0.92,
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  reserved: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom:10,
  },
  noDataContainer:{
    justifyContent:'center',
    alignItems:'center'
  }
});
