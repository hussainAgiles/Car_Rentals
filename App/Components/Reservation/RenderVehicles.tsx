import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { ImageBase_URL } from '../../API/Constants';
import Colors from '../../Constants/Colors';
import { RootStackParamList } from '../../Navigation/Navigation';
import ImageLoader from '../Loader/ImageLoader';


const RenderVehicles = React.memo(({item}: any) => {
  const statusColor = getStatusColor(item?.reservations_status);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const imageUrl = item?.fleet_master?.vehiclemodel?.image_url
    ? {uri: ImageBase_URL + item.fleet_master?.vehiclemodel?.image_url}
    : require('../../Assets/car.png');

  const handleRental = (id:string) => {
    navigation.navigate('Rental', {id});
  };

  const [loading, setLoading] = useState(false);

  const onLoading = (value: boolean) => {
    setLoading(value);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleRental(item.slug)}>
      <View style={styles.container}>
        {loading && <ImageLoader />}
        <View style={{justifyContent:'center',alignItems:'center'}}>
        <Image
          source={imageUrl}
          style={styles.image}
          resizeMode="contain"
          onLoadStart={() => onLoading(true)}
          onLoadEnd={() => onLoading(false)}
        />
         <Text style={styles.title}>
            {item?.fleet_master?.registration_no}
          </Text>
        </View>
       
        <View style={styles.details}>
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
            <InfoItem icon="location-pin" text={item?.pickup_location?.name} />
            <InfoItem icon="location" text={item?.drop_off_location?.name} />
          </View>
        </View>
      </View>
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
    case 'Active':
      return Colors.orange;
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
    padding: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
  },
  details: {
    flex: 1,
    padding: 20,
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
});

export default RenderVehicles;
