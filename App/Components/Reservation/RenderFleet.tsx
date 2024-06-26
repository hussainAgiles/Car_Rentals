import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import {ImageBase_URL} from '../../API/Constants';
import Colors from '../../Constants/Colors';
import {RootStackParamList} from '../../Navigation/Navigation';
import ImageLoader from '../Loader/ImageLoader';

const RenderFleet = React.memo(({item}: any) => {
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width,
  );

  useEffect(() => {
    let isMounted = true;

    const onChange = ({window: {width, height}}) => {
      if (isMounted) {
        setScreenWidth(width);
      }
    };

    Dimensions.addEventListener('change', onChange);

    return () => {
      isMounted = false;
    };
  }, []);
  const statusColor = getStatusColor(item?.status);
  // const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const imageUrl = item?.vehiclemodel?.image_url
    ? {uri: ImageBase_URL + item.vehiclemodel?.image_url}
    : require('../../Assets/Default_Car.png');
  const [loading, setLoading] = useState(false);

  const onLoading = (value: boolean) => {
    setLoading(value);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      //   onPress={() => handleRental(item.slug,item.reservations_status)}
    >
      {screenWidth > 600 ? (
        <View style={[styles.container]}>
          <View
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              alignContent: 'center',
              width: '30%',
              alignItems: 'center',
            }}>
            {loading && <ImageLoader />}
            <Image
              source={imageUrl}
              style={styles.image}
              resizeMode="contain"
              onLoadStart={() => onLoading(true)}
              onLoadEnd={() => onLoading(false)}
            />
            <Text style={styles.title}>{item?.registration_no}</Text>
          </View>

          <View style={styles.details}>
            <Text style={styles.title}>{item?.vehicle_variant}</Text>
            <View
              style={[styles.statusIndicator, {backgroundColor: statusColor}]}>
              <Text style={styles.statusText}>
                {item.status === 'Y' ? 'Active' : 'Inactive'}
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <Icon2 name={'speed'} color={Colors.black} size={24} />
              <Text style={styles.subText}>{item?.speedometer}</Text>
            </View>

            <View>
              <Text style={{color:Colors.black}}>Fuel Level:</Text>
              <View style={{flexDirection: 'row'}}>
                <Icon3 name={'fuel'} color={Colors.black} size={24} />
                <Text style={styles.subText}>{item?.fuel_level}</Text>
              </View>
            </View>
          </View>

          <View style={styles.locationDetails}>
            <FlatList
              data={item?.locations}
              renderItem={({item}) => (
                <View
                  style={{
                    padding: 7,
                    borderWidth: 1,
                    borderRadius: 15,
                    backgroundColor: Colors.primary,
                    borderColor:Colors.primary,
                    margin: 5,
                    flexDirection: 'row',
                    // flexWrap:'wrap',
                    alignItems:'center'
                  }}>
                  <Icon2 name="location-pin" size={12} color={Colors.Iconwhite} />
                  <Text
                    style={{
                      color: Colors.Iconwhite,
                      fontWeight: 'bold',
                      fontSize: 15,
                    }}>
                    {item?.vehicle_counter?.name}
                  </Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              // numColumns={2}
            />
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '40%',
            }}>
            {loading && <ImageLoader />}
            <Image
              source={imageUrl}
              style={styles.image}
              resizeMode="contain"
              onLoadStart={() => onLoading(true)}
              onLoadEnd={() => onLoading(false)}
            />
            <Text style={styles.title}>{item?.registration_no}</Text>
          </View>

          <View style={styles.details}>
            <Text style={styles.title}>{item?.vehicle_variant}</Text>
            <View
              style={[styles.statusIndicator, {backgroundColor: statusColor}]}>
              <Text style={styles.statusText}>
                {item.status === 'Y' ? 'Active' : 'Inactive'}
              </Text>
            </View>
            
            <Text style={{color:Colors.black}}>Odometer:</Text>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <Icon2 name={'speed'} color={Colors.black} size={24} />
              <Text style={styles.subText}>{item?.speedometer}</Text>
            </View>

            <View>
              <Text style={{color:Colors.black}}>Fuel Level:</Text>
              <View style={{flexDirection: 'row'}}>
                <Icon3 name={'fuel'} color={Colors.black} size={24} />
                <Text style={styles.subText}>{item?.fuel_level}</Text>
              </View>
            </View>
            <View style={{width: screenWidth * 0.3}}>
              <FlatList
                data={item?.locations}
                renderItem={({item}) => (
                  <View
                    style={{
                      padding: 7,
                      borderWidth: 1,
                      borderRadius: 15,
                      backgroundColor: Colors.primary,
                      marginVertical: 5,
                      marginHorizontal: 5,
                      borderColor:Colors.primary,
                      justifyContent: 'center',
                      flexDirection:'row',
                      alignItems:'center'
                    }}>
                    <Icon2 name="location-pin" size={12} color={Colors.Iconwhite}/>
                    <Text
                      style={{
                        color: Colors.Iconwhite,
                        fontWeight: 'bold',
                        fontSize: 12,
                      }}>
                      {item?.vehicle_counter?.name}
                    </Text>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
              />
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
});

const InfoItem: React.FC<{icon: string; text: string}> = ({icon, text}) => (
  <View style={styles.iconText}>
    <Icon name={icon} size={20} color={Colors.black} style={styles.icon} />
    <Text style={styles.info}>{text}</Text>
  </View>
);

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Y':
      return Colors.green;
    case 'N':
      return Colors.red;
    default:
      return Colors.grey;
  }
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 25,
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 15,
    overflow: 'hidden',
    padding: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  details: {
    flex: 1,
    width: '20%',
  },
  locationDetails: {
    width: '50%',
    display: 'flex',
  },
  title: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: 15,
  },
  statusIndicator: {
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 6,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  statusText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  infoContainer: {
    marginTop: 5,
  },
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  icon: {
    marginRight: 10,
  },
  info: {
    color: Colors.black,
    fontSize: 15,
  },
  subText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
  },
});

export default RenderFleet;
