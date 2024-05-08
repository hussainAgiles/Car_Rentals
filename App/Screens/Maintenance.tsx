import { StyleSheet, Text, View,TextInput, RefreshControl } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import Colors from '../Constants/Colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/Store';
import Loader from '../Components/Loader/Loader';
import { FlatList } from 'react-native';
import MaintenanceReport from '../Components/Maintenance/MaintenanceReport';
import useDispatch from '../Hooks/useDispatch';
import useIsMounted from '../Hooks/useIsMounted';
import { fetchingMaintenance } from '../Redux/Reducers/ReservationDetailsReducer';

const Maintenance = () => {
  
  const {maintenanceServices,loading} = useSelector(
    (state: RootState) => state.maintenanceReportReducer
  );

  // console.log("This is the maintenance data == ",maintenanceServices)

  const dispatch = useDispatch();
  const isMounted = useIsMounted();
  
  const [refreshing, setRefreshing] = useState(false); 
  const [searchQuery, setSearchQuery] = useState('');
		 const onRefresh = () => {
    setRefreshing(true); // Set refreshing true to show spinner
    dispatch(fetchingMaintenance()).then(() => setRefreshing(false)); // Fetch data and then set refreshing false
  };

  useEffect(() => {
    if (isMounted()) {
      dispatch(fetchingMaintenance());
    }
  }, [])


  const filteredMaintenance = useMemo(() => {
    if (!searchQuery) {
      return maintenanceServices?.services;
    }
  
    return maintenanceServices?.services?.filter((maintenance: any) => {
      const carNameMatches = maintenance?.vehicle?.vehicle_variant
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const carNumberMatches = maintenance?.vehicle?.registration_no
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return carNameMatches || carNumberMatches;
    });
  }, [maintenanceServices, searchQuery]);

  
  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Maintenance Report</Text>
      <View style={styles.searchInputContainer}>
        <TextInput
          placeholder="Search.."
          placeholderTextColor={Colors.black}
          style={styles.searchInput}
          onChangeText={handleSearch}
        />
        <Icon name="magnify" color={Colors.primary} size={30} />
      </View>
      {loading === 'pending' ? (
        <Loader />
      ) : (
        <FlatList
          data={filteredMaintenance}
          renderItem={({item}) => <MaintenanceReport item={item}/>}
          keyExtractor={item => item.id.toString()}
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
  )
}

export default Maintenance

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:15
  },
  headerText:{
    fontSize:28,
    color:Colors.black,
    fontWeight:'bold'
  },
  searchInputContainer: {
    width: '100%',
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  searchInput: {
    fontSize: 15,
    color: Colors.black,
    width: '75%',
  },
  noDataText: {
    color: Colors.black,
    fontSize: 18,
    textAlign: 'center',
  },
})