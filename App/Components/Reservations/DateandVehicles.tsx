import React, {useState,useEffect} from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ImageBase_URL} from '../../API/Constants';
import Colors from '../../Constants/Colors';
import RenderPenalties from '../Penalties/RenderPenalties';
import RenderViolation from '../Violations/RenderViolation';
import TabViews from '../Damages/TabView';
import useAppSelector from '../../Hooks/useSelector';
import { RootState } from '../../Redux/Store';
import useDispatch from '../../Hooks/useDispatch';
import useIsMounted from '../../Hooks/useIsMounted';
import { fetchSVG, fetchingPenalties, fetchingViolations } from '../../Redux/Reducers/ReservationDetailsReducer';

const DateandVehicles = ({item}: any) => {
  const ContentTypes = {
    NONE: 'NONE',
    TABS: 'TABS',
    PENALTIES: 'PENALTIES',
    VIOLATIONS: 'VIOLATIONS',
  };

  const [activeContent, setActiveContent] = useState(ContentTypes.NONE);
  const {penaltiesHistory} = useAppSelector(
    (state: RootState) => state.fleetPenaltyHistoryReducer,
  );
  const {violation} = useAppSelector(
    (state: RootState) => state.fleetVoilationReducer,
  );
  const {svg} = useAppSelector(state => state.fetchSvgReducer);
  const dispatch = useDispatch();
  const isMounted = useIsMounted();

  console.log(violation);
  console.log(penaltiesHistory);

  useEffect(() => {
    if (isMounted()) {
      dispatch(fetchingPenalties(item?.reservation?.reservation?.id));
      dispatch(fetchingViolations(item?.reservation?.reservation?.id));
      dispatch(fetchSVG(item?.reservation?.fleet_master?.id));
    }
  }, []);

  function formatTimeDifference(value: any) {
    const currentDate = new Date();
    const updatedDate = new Date(value);

    // Calculate the time difference in milliseconds
    const timeDiff = currentDate - updatedDate;

    // Convert milliseconds to hours and days
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
    const daysDiff = Math.floor(hoursDiff / 24);

    // Format the output based on the time difference
    if (hoursDiff < 24) {
      if (hoursDiff === 0) {
        return 'Updated less than an hour ago';
      } else if (hoursDiff === 1) {
        return 'Updated 1 hr ago';
      } else {
        return `Updated ${hoursDiff} hrs ago`;
      }
    } else {
      if (daysDiff === 1) {
        return 'Updated 1 day ago';
      } else {
        return `Updated ${daysDiff} days ago`;
      }
    }
  }
  
  function showContent(contentType: string) {
    setActiveContent(
      activeContent === contentType ? ContentTypes.NONE : contentType,
    );
  }

  return (
    <ScrollView style={styles.Container}>
      <View style={styles.vehicleDetails}>
        <View style={styles.carInfo}>
          <Avatar.Image
            size={60}
            source={{
              uri:
                ImageBase_URL +
                item?.reservation?.fleet_master?.vehiclemodel?.image_url,
            }}
          />
          <View style={styles.carText}>
            <Text style={{fontWeight: 'bold', color: Colors.black}}>
              {item?.reservation?.fleet_master?.vehicle_variant}
            </Text>
            <Text style={{color: Colors.black}}>
              {item?.reservation?.fleet_master?.vehicle_type}
            </Text>
            <Text>{item?.reservation?.fleet_master?.vehicle_type}</Text>
          </View>
        </View>
        <View style={[styles.carInfo, {justifyContent: 'space-between'}]}>
          <View style={styles.carInfo}>
            <Icon name={'location-on'} color={Colors.black} size={28} />
            <View style={styles.carText}>
              <Text style={{color: Colors.black}}>Current Location</Text>
              <Text style={{color: Colors.black}}>
                {item?.reservation?.pickup_location?.name}
              </Text>
            </View>
          </View>
          <View style={styles.carInfo}>
            <Icon
              name={'check-circle-outline'}
              color={Colors.black}
              size={28}
            />
            <View style={styles.carText}>
              <Text style={{color: Colors.black}}>Manually Updated</Text>
              <Text style={{color: Colors.black}}>
                {formatTimeDifference(item?.reservation?.updated_at)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={[styles.carInfo, {justifyContent: 'space-between'}]}>
        <View>
          {/* Checks */}
          <View
            style={[
              styles.checksView,
              {backgroundColor:"#efdebd"},
            ]}>
            <TouchableOpacity style={styles.category}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name={'check'} color={"#6f6249"} size={24} />
                <Text style={[styles.checksText, {color: "#6f6249"}]}>
                 0 Checks
                </Text>
              </View>
              <Icon
                name={'add-circle-outline'}
                color={"#6f6249"}
                size={24}
              />
            </TouchableOpacity>
          </View>
          {/* Damages */}
          <View
            style={[
              styles.checksView,
              {backgroundColor:"#ebfbf4"},
            ]}>
            <TouchableOpacity
              style={styles.category}
              onPress={() => showContent(ContentTypes.TABS)}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="build" color={Colors.green} size={24} />
                <Text style={[styles.checksText, {color: Colors.green}]}>
                 {svg?.damages_details.length} Damages
                </Text>
              </View>
              <Icon name={activeContent === ContentTypes.TABS ?"remove-circle-outline" : "add-circle-outline"} color={Colors.green} size={24} />
            </TouchableOpacity>
          </View>
          {/* Violations */}
          <View
            style={[
              styles.checksView,
              {backgroundColor:'#f5eac1'},
            ]}>
            <TouchableOpacity
              style={styles.category}
              onPress={() => showContent(ContentTypes.VIOLATIONS)}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name={'error'} color={"#B99200"} size={24} />
                <Text style={[styles.checksText, {color: "#B99200"}]}>
                 {violation?.violations?.length} Violations
                </Text>
              </View>
              <Icon name={activeContent === ContentTypes.VIOLATIONS ?"remove-circle-outline" : "add-circle-outline"} color={"#B99200"} size={24} />
            </TouchableOpacity>
          </View>
          {/* Penalties */}
          <View
            style={[
              styles.checksView,
              {backgroundColor:"#ffc3c3"},
            ]}>
            <TouchableOpacity
              style={styles.category}
              onPress={() => showContent(ContentTypes.PENALTIES)}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  name={'monetization-on'}
                  color={"#8C4C4C"}
                  size={24}
                />
                <Text style={[styles.checksText, {color: "#8C4C4C"}]}>
                 {penaltiesHistory?.penalties.length} Penalties
                </Text>
              </View>
              <Icon
                name={activeContent === ContentTypes.PENALTIES ?"remove-circle-outline" : "add-circle-outline"}
                color={"#8C4C4C"}
                size={24}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* limit, fuel , speedometer , fuel percentage */}
        <View style={{justifyContent:'space-between'}}>
          <View>
            <Text>Mileage limit:</Text>
            <Text style={styles.subText}>{item?.reservation?.priceperday?.mileage} Km / DAILY</Text>
          </View>
          <View style={{marginTop: 10}}>
            <Text>Fuel Policy:</Text>
            <Text style={styles.subText}>Fuel Limit : {item?.reservation?.fleet_master?.fuel_level}</Text>
          </View>
          <View style={{marginTop: 10}}>
            <View>
              <Text>Odometer:</Text>
              <View style={{flexDirection: 'row'}}>
                <Icon name={'speed'} color={Colors.black} size={24} />
                <Text style={styles.subText}>
                  {item?.reservation?.fleet_master?.speedometer}
                </Text>
              </View>
            </View>
            <View style={{marginTop: 10}}>
              <Text>Fuel Level:</Text>
              <View style={{flexDirection: 'row'}}>
                <Icon2 name={'fuel'} color={Colors.black} size={24} />
                <Text style={styles.subText}>
                  {item?.reservation?.fleet_master?.fuel_level}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      {activeContent === ContentTypes.TABS && <TabViews item={item} />}
      {activeContent === ContentTypes.PENALTIES && (
        <RenderPenalties reservation={item} />
      )}
      {activeContent === ContentTypes.VIOLATIONS && (
        <RenderViolation reservation={item} />
      )}
    </ScrollView>
  );
};

export default DateandVehicles;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 20,
  },
  headingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  headingText: {
    fontSize: 16,
    fontFamily: 'Bungee-Regular',
    color: Colors.black,
  },
  subHeadingView: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
  },
  vehicleDetails: {
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  carInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  carText: {
    marginLeft: 5,
  },
  checksView: {
    backgroundColor: Colors.Iconwhite,
    padding: 7,
    marginVertical: 5,
    borderRadius: 5,
    width: 200,
  },
  category: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checksText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  subText: {
    fontSize: Platform.OS === 'ios' ? 15 : 20,
    fontWeight: 'bold',
    color: Colors.black,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    height: 250,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  sceneContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
