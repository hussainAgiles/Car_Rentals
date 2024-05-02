import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {ImageBase_URL} from '../../API/Constants';
import Colors from '../../Constants/Colors';
import {RootStackParamList} from '../../Navigation/Navigation';
import ImageLoader from '../Loader/ImageLoader';

// const width = Dimensions.get('screen').width;
// const height = Dimensions.get('screen').height;

const RenderVehicles = React.memo(({item}: any) => {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  useEffect(() => {
    let isMounted = true;

    const onChange = ({ window: { width, height } }) => {
      if (isMounted) {
        setScreenWidth(width);
      }
    };
    Dimensions.addEventListener('change', onChange);
    return () => {
      isMounted = false;
    };
  }, []);

  const statusColor = getStatusColor(item?.reservations_status);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const imageUrl = item?.fleet_master?.vehiclemodel?.image_url
    ? {uri: ImageBase_URL + item.fleet_master?.vehiclemodel?.image_url}
    : require('../../Assets/Default_Car.png');

  const handleRental = (id: string, status: string) => {
      navigation.navigate('Rental', {id});
  };

  const [loading, setLoading] = useState(false);

  const onLoading = (value: boolean) => {
    setLoading(value);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleRental(item.slug, item.reservations_status)}>
      {screenWidth > 600 ? (
        <View style={styles.container} key={item?.fleet_master?.id}>
          <View style={styles.rightContainer}>
            {loading && <ImageLoader />}
            <Image
              source={imageUrl}
              style={styles.image}
              resizeMode="contain"
              onLoadStart={() => onLoading(true)}
              onLoadEnd={() => onLoading(false)}
            />
            <Text style={styles.regNo}>
              {item?.fleet_master?.registration_no}
            </Text>
          </View>
          <View style={[styles.leftContainer, {width: '30%'}]}>
            <Text style={styles.title}>
              {item?.fleet_master?.vehicle_variant}
            </Text>
            <View
              style={[styles.statusIndicator, {backgroundColor: statusColor}]}>
              <Text style={styles.statusText}>{item.reservations_status}</Text>
            </View>
            <View style={styles.infoContainer}>
              <InfoItem icon="user" text={item?.customers?.full_name} />
            </View>
          </View>
          <View style={[styles.leftContainer, {width: '30%'}]}>
            <InfoItem
              icon="calendar"
              text={`${item.pickup_date} - ${item.dropoff_date}`}
            />
            <InfoItem icon="location-pin" text={item?.pickup_location?.name} />
            <InfoItem icon="location" text={item?.drop_off_location?.name} />
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.rightContainer}>
            {loading && <ImageLoader />}
            <Image
              source={imageUrl}
              style={styles.image}
              resizeMode="contain"
              onLoadStart={() => onLoading(true)}
              onLoadEnd={() => onLoading(false)}
            />
            <Text style={styles.regNo}>
              {item?.fleet_master?.registration_no}
            </Text>
          </View>
          <View style={[styles.leftContainer, {width: '55%'}]}>
            <Text style={styles.title}>
              {item?.fleet_master?.vehicle_variant}
            </Text>
            <View
              style={[styles.statusIndicator, {backgroundColor: statusColor}]}>
              <Text style={styles.statusText}>{item.reservations_status}</Text>
            </View>
            <View style={styles.infoContainer}>
              <InfoItem icon="user" text={item?.customers?.full_name} />
              <InfoItem
                icon="calendar"
                text={`${item.pickup_date} - ${item.dropoff_date}`}
              />
              <InfoItem
                icon="location-pin"
                text={item?.pickup_location?.name}
              />
              <InfoItem icon="location" text={item?.drop_off_location?.name} />
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
    case 'Rented':
      return Colors.green;
    case 'Reserved':
      return Colors.primary;
    case 'Returned':
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
    justifyContent: 'space-between',
    padding: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
  },
  leftContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    // Add padding or margin if needed, to space it from the rightContainer
  },
  rightContainer: {
    // padding: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    // Align items to the start if you want the content to align left
    alignItems: 'center',
    width: '30%',
  },
  regNo: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: 15,
    // Add additional styling if needed
  },
  title: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'left',
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
});

export default RenderVehicles;
