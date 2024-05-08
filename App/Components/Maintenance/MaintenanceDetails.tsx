import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../Header/Header';
import {Image} from 'react-native';
import {ImageBase_URL} from '../../API/Constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';
import Colors from '../../Constants/Colors';

const MaintenanceDetails = ({route}: any) => {
  const {name} = route.params;
  
  const imageUrl = name?.vehicle?.vehiclemodel?.image_url
    ? {uri: ImageBase_URL + name.vehicle?.vehiclemodel?.image_url}
    : require('../../Assets/Default_Car.png');
  // console.log("this is trhe name",name)

  const partnerImage = name?.vendor?.image_path
    ? {uri: ImageBase_URL + name?.vendor?.image_path}
    : require('../../Assets/Default_Car.png');

    const paymentAmount = name?.payments.reduce((total: number, payment: any) => {
        return total + parseFloat(payment.amount);
      }, 0).toFixed(2);

  return (
    <ScrollView contentContainerStyle={{marginBottom:20}}>
      <Header text={name.vehicle?.vehicle_variant} />
      <View style={styles.imageContainer}>
        <Image source={imageUrl} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={{textAlign: 'justify', fontSize: 15}}>
          {name?.vehicle?.vehiclemodel?.description}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 30,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <Text>Period</Text> */}
            <Icon
              name="calendar-clock-outline"
              size={40}
              color={Colors.primary}
            />
            <View style={styles.dateView}>
              <Text style={styles.dateText}>
                {moment(name?.date_from).format('DD-MM-YYYY')}
              </Text>
              <Text style={styles.dateText}>
                {moment(name?.date_to).format('DD-MM-YYYY')}
              </Text>
            </View>
            {/* <View style={styles.dateView}>
              <Text>To: </Text>
              
            </View> */}
          </View>

          <View style={styles.agencyView}>
            <Image source={partnerImage} style={styles.agencyImage} />
            <View style={{flexDirection: 'column', marginLeft: 10}}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                {name?.vendor?.company_name}
              </Text>
              <Text
                style={{
                  paddingVertical: 10,
                  fontSize: 15,
                  color: Colors.primary,
                  fontWeight: 'bold',
                }}>
                {name?.vendor?.group_type}
              </Text>
            </View>
          </View>
        </View>
        {/* Custom Services */}
        <View style={styles.customService}>
          {/* <Text>Period</Text> */}
          <Icon name="wrench" size={40} color={Colors.primary} />
          {name?.custom_title?.map((title: any) => (
            <Text style={{marginLeft: 5, fontWeight: 'bold'}}>{title}</Text>
          ))}
        </View>
        {/* General Services */}
        <View
          style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
          {/* <Text>Period</Text> */}
          <Icon name="car-cog" size={40} color={Colors.primary} />
          {name?.service_detail?.map((detail: any, index: any) => (
            <View key={index} style={{marginLeft: 5}}>
              <Text
                style={{fontSize: 16, fontWeight: 'bold', paddingVertical: 2,color:Colors.black}}>
                {detail.service_name}
              </Text>
              <Text style={{fontSize: 15}}>Every {detail.service_mileage}</Text>
              <Text style={{fontSize: 15}}>
                Every {detail.service_period} days
              </Text>
            </View>
          ))}
        </View>
        <View style={{flexDirection: 'row',alignItems: 'center'}}>
          <Icon2 name='payment' size={40} color={Colors.primary}/>
          <Text style={{fontSize: 15,paddingLeft: 5}}>{paymentAmount}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default MaintenanceDetails;

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  image: {
    width: 400,
    height: 300,
    borderRadius: 50,
  },
  dateView: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 5,
  },
  dateText: {
    padding: 5,
    fontSize: 15,
    color:Colors.black,
    fontWeight:'bold'
  },
  agencyView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  agencyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: 'grey',
  },
  customService: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
});
