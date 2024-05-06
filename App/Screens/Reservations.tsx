import React, { useEffect, useMemo, useState } from 'react';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader/Loader';
import RenderVehicles from '../Components/Reservation/RenderVehicles';
import Colors from '../Constants/Colors';
import useIsMounted from '../Hooks/useIsMounted';
import { fetchReservation } from '../Redux/Reducers/ReservationDetailsReducer';
import { AppDispatch, RootState } from '../Redux/Store';
import { useFocusEffect } from '@react-navigation/native';

const Reservations = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isMounted = useIsMounted();

  const {data, loading} = useSelector(
    (state: RootState) => state.reservationDetailReducer,
  );

  useEffect(() => {
    if (isMounted()) {
      dispatch(fetchReservation());
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchReservation());
    }, [])
  );

 

  

  // console.log("Data fetched == ",data)
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };
  const filteredCarDetails = useMemo(() => {
    if (!searchQuery) {
      return data;
    }
  
    return data.filter((reservation: any) => {
      const carNameMatches = reservation.fleet_master?.vehicledetails?.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const carNumberMatches = reservation.fleet_master?.registration_no
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return carNameMatches || carNumberMatches;
    });
  }, [data, searchQuery]);

  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [refreshing, setRefreshing] = useState(false); 
  useEffect(() => {
    let isMounted = true;

    const onChange = ({ window: { width, height } }:any) => {
      if (isMounted) {
        setScreenWidth(width);
      }
    };
    Dimensions.addEventListener('change', onChange);
    return () => {
      isMounted = false;
    };
  }, []);

  const onRefresh = () => {
    setRefreshing(true); // Set refreshing true to show spinner
    dispatch(fetchReservation()).then(() => setRefreshing(false)); // Fetch data and then set refreshing false
  };
  
  

  return (
    <View style={styles.container}>
      <View style={[styles.headerContainer,screenWidth>600 ?{marginBottom: 10}:{marginBottom: 20}]}>
        <Text style={styles.headerText}>Car Rentals</Text>
        {/* <TouchableOpacity style={styles.addButton}>
          <Text style={styles.buttonText}>Add Reservation</Text>
        </TouchableOpacity> */}
      </View>

      <View style={styles.searchInputContainer}>
        <TextInput
          placeholder="Search.."
          placeholderTextColor={Colors.black}
          style={styles.searchInput}
          onChangeText={handleSearch}
        />
        <Icon name="magnify" color={Colors.primary} size={30} />
      </View>

      <View style={styles.reserved}>
        <Text style={styles.reservedText}>Reserved</Text>
        {/* <Text style={styles.viewAllText}>View All</Text> */}
      </View>

      {loading === 'pending' ? (
        <Loader />
      ) : (
        <FlatList
          data={filteredCarDetails}
          renderItem={({item}) => <RenderVehicles item={item}/>}
          keyExtractor={item => item?.id.toString()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10} // Adjust numbers based on your list size and performance
          maxToRenderPerBatch={5}
          windowSize={5} 
          ListEmptyComponent={
            <Text style={styles.noDataText}>No data found.</Text>
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Colors.primary]} // Optional: Customize the color
            />
          }
        />
      )}
    </View>
  );
};

export default Reservations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: Colors.black,
    fontSize: 30,
    fontWeight: 'bold',
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
    width: '100%',
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInput: {
    fontSize: 15,
    color: Colors.black,
    width: '75%',
  },
  reserved: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  reservedText: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAllText: {
    color: Colors.black,
    fontSize: 14,
    fontWeight: 'bold',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    color: Colors.black,
    fontSize: 18,
    textAlign: 'center',
  },
});
