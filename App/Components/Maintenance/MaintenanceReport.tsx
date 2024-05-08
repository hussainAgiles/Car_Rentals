import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../Constants/Colors';
import {ImageBase_URL} from '../../API/Constants';
import ImageLoader from '../Loader/ImageLoader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const MaintenanceReport = ({item}: any) => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const imageUrl = item?.vehicle?.vehiclemodel?.image_url
    ? {uri: ImageBase_URL + item.vehicle?.vehiclemodel?.image_url}
    : require('../../Assets/Default_Car.png');

  const onLoading = (value: boolean) => {
    setLoading(value);
  };

  const statusColor = getStatusColor(item?.status);

  const handleClick = (item: any) => {
    navigation.navigate('MaintenanceDetails', {name: item});
  };

  return (
    <View style={styles.container}>
      {/* Image and Vehicle details */}
      <View
        style={{
          flexDirection: 'column',
          width: '30%',
          justifyContent: 'center',
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
        <Text style={styles.regNo}>{item?.vehicle?.registration_no}</Text>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          width: '55%',
        }}>
        <Text
          style={{
            color: Colors.primary,
            fontWeight: 'bold',
            fontSize: 18,
            marginVertical: 5,
            lineHeight: 24,
          }}>
          {item?.vehicle?.vehicle_variant}
        </Text>
        <Text
          style={{
            color: Colors.black,
            fontWeight: 'bold',
            fontSize: 15,
            marginVertical: 5,
            lineHeight: 20,
          }}>
          {item?.vehicle?.vin_no}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="car-select" size={25} />
          <Text
            style={{
              color: Colors.black,
              fontSize: 15,
              marginVertical: 5,
              marginLeft: 5,
              lineHeight: 20,
            }}>
            {item?.vehicle?.vehicle_type}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              color: Colors.black,
              fontSize: 15,
              fontWeight: 'bold',
              paddingVertical: 10,
            }}>
            Status :{' '}
          </Text>
          <Text
            style={{
              color: Colors.Iconwhite,
              fontSize: 15,
              borderRadius: 15,
              alignSelf: 'center',
              backgroundColor:statusColor,
              paddingVertical:5,
              paddingHorizontal:7,
              fontWeight:'bold'
            }}>
            {item?.status}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          handleClick(item);
        }}
        style={{alignItems: 'flex-end', justifyContent: 'flex-end', flex: 1}}>
        <Icon name="greater-than" size={20} />
      </TouchableOpacity>
    </View>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'in service':
      return Colors.grey;
    case 'completed':
      return Colors.primary;
    // case 'Returned':
    //   return Colors.red;
    default:
      return Colors.grey;
  }
};

export default MaintenanceReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.Iconwhite,
    borderRadius: 6,
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  regNo: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: 15,
    // Add additional styling if needed
  },
  statusView: {
    color: Colors.Iconwhite,
    fontSize: 15,
    borderRadius: 15,
    alignSelf: 'center',
    padding: 8,
    backgroundColor: Colors.primary,
  },
});
