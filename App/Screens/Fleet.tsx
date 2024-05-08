import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {AppDispatch, RootState} from '../Redux/Store';
import {useDispatch, useSelector} from 'react-redux';
import useIsMounted from '../Hooks/useIsMounted';
import {fetchFleetReports} from '../Redux/Reducers/ReservationDetailsReducer';
import Colors from '../Constants/Colors';
import { TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from '../Components/Loader/Loader';
import { FlatList } from 'react-native';
import RenderFleet from '../Components/Reservation/RenderFleet';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { RefreshControl } from 'react-native';

const Fleet = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isMounted = useIsMounted();
  useEffect(() => {
    if (isMounted()) {
      dispatch(fetchFleetReports());
    }
  }, []);

  const {fleetData, loading} = useSelector(
    (state: RootState) => state.fleetReportReducer,
  );

  // console.log("data recieved == ",fleetData)

  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false); 
		 const onRefresh = () => {
    setRefreshing(true); // Set refreshing true to show spinner
    dispatch(fetchFleetReports()).then(() => setRefreshing(false)); // Fetch data and then set refreshing false
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const filteredFleetDetails = useMemo(() => {
    if (!searchQuery) {
      return fleetData;
    }
  
    return fleetData.filter((fleet: any) => {
      const carNameMatches = fleet?.vehiclemodel?.model_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
        const carTypeMatches = fleet?.body_type
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const carNumberMatches = fleet?.registration_no
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return carNameMatches || carNumberMatches ||carTypeMatches;
    });
  }, [fleetData, searchQuery]);
  

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Fleet Details</Text>
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
        <Icon name="magnify" color={Colors.primary} size={hp('3%')} />
      </View>
      {loading === 'pending' ? (
        <Loader />
      ) : (
        <FlatList
          data={filteredFleetDetails}
          renderItem={({ item }) => <RenderFleet item={item} />}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
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

export default Fleet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('5%'),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  headerText: {
    color: Colors.black,
    fontSize: hp('3%'),
    fontWeight: 'bold',
  },
  addButton: {
    width: wp('30%'),
    borderWidth: 2,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: hp('1.5%'),
    fontWeight: 'bold',
    padding: hp('1%'),
  },
  searchInputContainer: {
    width: '100%',
    borderRadius: hp('2%'),
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    marginBottom: hp('2%'),
  },
  searchInput: {
    fontSize: hp('1.8%'),
    color: Colors.black,
    width: '75%',
  },
  noDataText: {
    color: Colors.black,
    fontSize: hp('2%'),
    textAlign: 'center',
  },
});
