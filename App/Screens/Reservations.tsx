import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RenderVehicles from '../Components/Reservation/RenderVehicles';
import Colors from '../Constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../Redux/Store';
import useIsMounted from '../Hooks/useIsMounted';
import {fetchReservation} from '../Redux/Reducers/ReservationDetailsReducer';
import {RootStackParamList} from '../Navigation/Navigation';
import {StackScreenProps} from '@react-navigation/stack';

const screenWidth = Dimensions.get('window').width;

type ResrvationProps = StackScreenProps<RootStackParamList, 'add_reservation'>;

const Reservations: React.FC<ResrvationProps> = ({navigation}) => {
  const handleOnPress = () => {
    navigation.navigate('add_reservation');
  };

  const dispatch = useDispatch<AppDispatch>();
  const isMounted = useIsMounted();
  useEffect(() => {
    if (isMounted()) {
      dispatch(fetchReservation());
    }
  }, []);

  const resrvedVehicles = useSelector(
    (state: RootState) => state.reservationDetailReducer,
  );

  console.log('Reserved Vehicle == ', resrvedVehicles.data);

  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = text => {
    setSearchQuery(text);
  };

  const filteredCarDetails = searchQuery
    ? resrvedVehicles.data.filter(reservation =>
        reservation.fleet_master?.vehicledetails?.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
      )
    : resrvedVehicles.data;

  return (
    <View style={styles.container}>
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
      {/* {resrvedVehicles.data?.length > 0 ? (
          resrvedVehicles.data?.map(item => (
            <RenderVehicles
              key={item.id}
              item={{
                id: item?.id || 0,
                image: item.fleet_master?.vehiclemodel?.image_url || '',
                // info: item.info || '',
                Status: item.reservations_status || '',
                Pickup: item.pickup_location?.name || '',
                drop: item.drop_off_location?.name || '',
                Vehicle: item.fleet_master?.vehicle_variant || '',
                client: item?.customers?.full_name || '',
                rental_price: item.rental_price || 0,
                Vehicle_number: item.fleet_master?.registration_no || '',
                type: item.fleet_master?.vehicle_type || '',
                pickup_date: item?.pickup_date || '',
                dropoff_date: item?.dropoff_date || '',
              }}
            />
          )) */}

      {filteredCarDetails?.length != 0 ? (
        <FlatList
          data={filteredCarDetails}
          renderItem={({item}) => (
            <RenderVehicles
              key={item.id}
              item={{
                id: item?.id || 0,
                image: item.fleet_master?.vehiclemodel?.image_url || '',
                // info: item.info || '',
                Status: item.reservations_status || '',
                Pickup: item.pickup_location?.name || '',
                drop: item.drop_off_location?.name || '',
                Vehicle: item.fleet_master?.vehicle_variant || '',
                client: item?.customers?.full_name || '',
                rental_price: item.rental_price || 0,
                Vehicle_number: item.fleet_master?.registration_no || '',
                type: item.fleet_master?.vehicle_type || '',
                pickup_date: item?.pickup_date || '',
                dropoff_date: item?.dropoff_date || '',
              }}
            />
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={{color: Colors.black, fontSize: 18}}>
            No data found.
          </Text>
        </View>
      )}
    </View>
  );
};

export default Reservations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 15,
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
    marginBottom: 10,
  },
  noDataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
