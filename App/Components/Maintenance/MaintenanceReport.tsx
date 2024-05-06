import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../Constants/Colors';
import {ImageBase_URL} from '../../API/Constants';
import ImageLoader from '../Loader/ImageLoader';

const MaintenanceReport = ({item}: any) => {
  const [loading, setLoading] = useState(false);
  const imageUrl = item?.vehicle?.vehiclemodel?.image_url
    ? {uri: ImageBase_URL + item.vehicle?.vehiclemodel?.image_url}
    : require('../../Assets/Default_Car.png');

  const onLoading = (value: boolean) => {
    setLoading(value);
  };

  return (
    <View style={styles.container}>
      {/* Image and Vehicle details */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '70%',
        }}>
        <View style={{flexDirection: 'column'}}>
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
            marginLeft: 10,
            justifyContent: 'space-between',
          }}>
          <Text style={{color: Colors.black, fontWeight: 'bold', fontSize: 18,marginBottom:5}}>
            {item?.vehicle?.vehicle_variant}
          </Text>
          <Text style={{color: Colors.black, fontSize: 16,marginBottom:5}}>
            {item?.vehicle?.vehicle_type}
          </Text>
          <Text style={{color: Colors.black, fontWeight: 'bold', fontSize: 15,marginBottom:5}}>
            {item?.vehicle?.vin_no}
          </Text>
          <View style={{flexDirection: 'row',marginBottom:5}}>
            <Text
              style={{color: Colors.black,fontSize: 16}}>
              Status :{' '}
            </Text>
            <Text
              style={{color: Colors.black, fontWeight: 'bold', fontSize: 16}}>
              {item?.status}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          width: '30%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom:5
          }}>
          <Text style={{color: Colors.black, fontSize: 15}}>Partner: </Text>
          <Text style={{color: Colors.black, fontSize: 15,fontWeight:'bold'}}>{item?.vendor?.company_name}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom:5
          }}>
          <Text style={{color: Colors.black, fontSize: 15}}>Period : </Text>
          <View
            style={{
              flexDirection: 'column',
              marginBottom:5
            }}>
            <Text style={{color: Colors.black, fontSize: 14}}>{item?.date_from}</Text>
            <Text style={{color: Colors.black, fontSize: 14}}>{item?.date_to}</Text>
          </View>
        </View>
        <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{color: Colors.black, fontSize: 15}}>Amount: </Text>
            <Text style={{color: Colors.black, fontSize: 15,fontWeight:'bold'}}>500 AUD</Text>
          </View>
      </View>
    </View>
  );
};

export default MaintenanceReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:Colors.Iconwhite,
    borderRadius:6
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  regNo: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: 15,
    // Add additional styling if needed
  },
});
