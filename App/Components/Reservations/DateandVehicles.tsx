import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Colors from '../../Constants/Colors';
import {Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

const DateandVehicles = () => {
  return (
    <ScrollView style={styles.Container}>
      <View style={styles.vehicleDetails}>
        <View style={styles.carInfo}>
          <Avatar.Text size={40} label="AD" />
          <View style={styles.carText}>
            <Text>Audi Q3</Text>
            <Text>Convertible Manual</Text>
          </View>
        </View>
        <View style={[styles.carInfo, {justifyContent: 'space-between'}]}>
          <View style={styles.carInfo}>
            <Icon name={'location-on'} color={Colors.black} size={28} />
            <View style={styles.carText}>
              <Text>Current Location</Text>
              <Text>Bangalore</Text>
            </View>
          </View>
          <View style={styles.carInfo}>
            <Icon
              name={'check-circle-outline'}
              color={Colors.black}
              size={28}
            />
            <View style={styles.carText}>
              <Text>Manually Updated</Text>
              <Text>4 hours ago</Text>
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
              {borderColor: Colors.orange, borderWidth: 1},
            ]}>
            <TouchableOpacity style={styles.category}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name={'check'} color={Colors.orange} size={24} />
                <Text style={[styles.checksText, {color: Colors.orange}]}>
                  Checks
                </Text>
              </View>
              <Icon
                name={'add-circle-outline'}
                color={Colors.orange}
                size={24}
              />
            </TouchableOpacity>
          </View>
          {/* Damages */}
          <View
            style={[
              styles.checksView,
              {borderColor: Colors.green, borderWidth: 1},
            ]}>
            <TouchableOpacity style={styles.category}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name={'build'} color={Colors.green} size={24} />
                <Text style={[styles.checksText, {color: Colors.green}]}>
                  Damages
                </Text>
              </View>
              <Icon
                name={'add-circle-outline'}
                color={Colors.green}
                size={24}
              />
            </TouchableOpacity>
          </View>
          {/* Violations */}
          <View
            style={[
              styles.checksView,
              {borderColor: Colors.red, borderWidth: 1},
            ]}>
            <TouchableOpacity style={styles.category}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name={'error'} color={Colors.red} size={24} />
                <Text style={[styles.checksText, {color: Colors.red}]}>
                  Violations
                </Text>
              </View>
              <Icon name={'add-circle-outline'} color={Colors.red} size={24} />
            </TouchableOpacity>
          </View>
          {/* Penalties */}
          <View
            style={[
              styles.checksView,
              {borderColor: Colors.purple, borderWidth: 1},
            ]}>
            <TouchableOpacity style={styles.category}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  name={'monetization-on'}
                  color={Colors.purple}
                  size={24}
                />
                <Text style={[styles.checksText, {color: Colors.purple}]}>
                  Penalties
                </Text>
              </View>
              <Icon
                name={'add-circle-outline'}
                color={Colors.purple}
                size={24}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View>
            <Text>Mileage limit:</Text>
            <Text style={styles.subText}>Unlimited Km / Day</Text>
          </View>
          <View>
            <Text>Fuel Policy:</Text>
            <Text style={styles.subText}>Full to Full</Text>
          </View>
          <View style={{marginTop: 20}}>
            <View>
              <Text>Odometer:</Text>
              <View style={{flexDirection: 'row'}}>
                <Icon name={'speed'} color={Colors.black} size={24} />
                <Text style={styles.subText}>10</Text>
              </View>
            </View>
            <View>
              <Text>Fuel Level:</Text>
              <View style={{flexDirection: 'row'}}>
                <Icon2 name={'fuel'} color={Colors.black} size={24} />
                <Text style={styles.subText}>60</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
  },
});
