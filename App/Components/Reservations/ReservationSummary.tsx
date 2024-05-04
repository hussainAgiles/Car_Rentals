import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../../Constants/Colors';
import useDispatch from '../../Hooks/useDispatch';
import useIsMounted from '../../Hooks/useIsMounted';
import { fetchingCurrency } from '../../Redux/Reducers/ReservationDetailsReducer';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { currencyFormat } from '../../API/NormalApi';

const ReservationSummary = ({reservation, insuranceAddon,paymentCompleted}: any) => {
  
  // console.log(insuranceAddon);

  const dispatch = useDispatch();
  const isMounted = useIsMounted();

  const{defaultCurrency} = useSelector(
    (state: RootState) => state.fleetFetchDefaultCurrencyReducer,
  )

  useEffect(() => {
    if (isMounted()) {
      dispatch(fetchingCurrency());
      defaultCurrencyy()
    }
  }, []);
  const calculateSubtotal = () => {
    const rentalPrice = reservation?.vehicle_price || 0;
    const addonTotalPrice = reservation?.addon_total_price || 0;
    const insurancePrice = insuranceAddon?.insuranceId ? parseFloat(insuranceAddon.insuranceId) : 0;
    const addonsPrice = insuranceAddon?.addonsId ? parseFloat(insuranceAddon.addonsId) : 0;
    const vatAmount = (reservation?.vat / 100);
    const total = Number(rentalPrice) + Number(addonTotalPrice) + Number(insurancePrice) + Number(addonsPrice) + Number(reservation?.vmc);
    return total + (total * vatAmount);

  };

  const subtotal = calculateSubtotal();
  const totalDue = subtotal - (paymentCompleted || 0);

  const calculateRentPeriod = (
    pickup_date: string | number | Date,
    dropoff_date: string | number | Date,
  ) => {
    const pickupDate = new Date(pickup_date);
    const dropoffDate = new Date(dropoff_date);

    // Calculate difference in milliseconds
    const difference = dropoffDate - pickupDate;

    // Convert milliseconds to days
    const days = difference / (1000 * 60 * 60 * 24);

    return days;
  };

  const totalDays = calculateRentPeriod(
    reservation?.pickup_date,
    reservation?.dropoff_date,
  );


  const [currency,SetCurrency] = useState('')
  const defaultCurrencyy = async () => {
     try {
      const response = await AsyncStorage.getItem("currency");
      if(response){
        SetCurrency(response);
      }
     } catch (error) {
       console.log(error)
     }
  }


  const formatPayments =  (value:string) => {
    if (reservation && reservation.vehicle_price) { 
      const formattedValue =  currencyFormat({
        value: value,
        formatType: 'prefix',
        currency:currency
      });
      return formattedValue;
    }
  };




  return (
    <View style={styles.container}>
      {/* <Text
        style={{
          fontSize: 20,
          marginBottom: 20,
          fontWeight: 'bold',
          color: Colors.black,
          textAlign:'center'
        }}>
        Summary
      </Text> */}
      <View style={{borderRadius: 6,backgroundColor:Colors.Iconwhite,elevation:3,padding:5}}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Summary</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 5,
            marginTop: 5,
            padding:10
          }}>
          <Text style={styles.title}>Total Rent period</Text>
          <Text style={styles.title}>
            {totalDays} {totalDays <= 1 ? 'Day' : 'Days'}
          </Text>
        </View>
        <View style={styles.section}>
          <View>
            <Text style={styles.title}>Economy Manual</Text>
            <Text style={styles.subtitle}>{reservation?.fleet_master?.vehicledetails?.name}</Text>
          </View>
          <Text style={styles.price}>
            {formatPayments(reservation?.vehicle_price)}
            {/* {reservation?.vehicle_price.toFixed(2)} {defaultCurrency?.parameter_value} */}
          </Text>
        </View>

        {insuranceAddon.insuranceId && (
          <View style={styles.section}>
            <View>
              <Text style={styles.title}>Insurance</Text>
              <Text style={styles.subtitle}>Insurance Price</Text>
            </View>
            <Text style={styles.price}>
            {formatPayments(insuranceAddon?.insuranceId)}
              {/* {insuranceAddon?.insuranceId?.toFixed(2)} {defaultCurrency?.parameter_value} */}
            </Text>
          </View>
        )}

        {insuranceAddon.addonsId ? (
          <View style={styles.section}>
            <View>
              <Text style={styles.title}>Add-on/s</Text>
              <Text style={styles.subtitle}>Addon Price</Text>
            </View>
            <Text style={styles.price}>
            {formatPayments(reservation?.addon_total_price)} + {formatPayments(insuranceAddon.addonsId)} 
              {/* {Number(reservation?.addon_total_price?.toFixed(2)) +
                Number(insuranceAddon.addonsId)}{' '}
              {defaultCurrency?.parameter_value} */}
            </Text>
          </View>
        ) : (
          <View style={styles.section}>
            <View>
              <Text style={styles.title}>Add-on/s</Text>
              <Text style={styles.subtitle}>Addon Price</Text>
            </View>
            <Text style={styles.price}>
              {formatPayments(reservation?.addon_total_price)} 
              {/* {Number(reservation?.addon_total_price?.toFixed(2))} {defaultCurrency?.parameter_value} */}
            </Text>
          </View>
        )}

        <View style={styles.section}>
          <View>
            <Text style={styles.title}>Taxes</Text>
            <Text style={styles.subtitle}>VMC</Text>
            <Text style={styles.subtitle}>VAT</Text>
          </View>

          <View style={{alignItems: 'flex-end', justifyContent: 'center'}}>
            <Text style={styles.price}> {formatPayments(reservation?.vmc)}</Text>
            <Text style={styles.price}>{reservation?.vat}%</Text>
          </View>
        </View>

        <View style={styles.summary}>
          <View>
            <Text style={styles.summaryTitle}>Subtotal:</Text>
            <Text style={styles.summaryTitle}>Paid:</Text>
          </View>

          <View>
            <Text style={styles.summaryValue}> {formatPayments(Number(subtotal).toFixed(2))}</Text>

            <Text style={styles.summaryValue}>
              {paymentCompleted? formatPayments(paymentCompleted)  : 0}
            </Text>
          </View>
        </View>

        <View style={styles.dueBalanceContainer}>
          <Text style={styles.summaryTitle}>Security deposit</Text>
          <Text style={styles.summaryValue}>
            {formatPayments(reservation?.security_deposit)}
          </Text>
        </View>
        <View style={styles.dueBalanceContainer}>
          <Text style={styles.dueBalanceTitle}>Due balance:</Text>
          <Text style={styles.dueBalanceValue}>{formatPayments(Number(totalDue).toFixed(2))}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4a90e2', // Blue color similar to the header in the image
    padding: 8,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0faff', // Light blue background for sections
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: 12,
    padding:10
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#333333',
    fontSize: 16,
    flex: 1, // Adjust the flex as needed
  },
  sectionContent: {
    alignItems: 'flex-end',
    flex: 1, // Adjust the flex as needed
  },
  title: {
    fontWeight: 'bold',
    color: '#333333',
    fontSize: 16,
  },
  subtitle: {
    color: '#666666',
    fontSize: 14,
  },
  price: {
    fontWeight: 'bold',
    color: '#333333',
    fontSize: 16,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    padding:10
  },
  summaryTitle: {
    color: Colors.black,
    fontSize: 14,
    flex: 1,
  },
  summaryValue: {
    fontWeight: 'bold',
    color: Colors.black,
    fontSize: 16,
    flex: 1,
    textAlign: 'right',
  },
  dueBalanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    padding:10
  },
  dueBalanceTitle: {
    color: '#ff9500', // An orange color for the due balance
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  dueBalanceValue: {
    textAlign: 'right',
    fontWeight: 'bold',
    color: '#ff9500', // An orange color for the due balance
    fontSize: 16,
    flex: 1,
  },
});

export default ReservationSummary;

// Example usage:
// <ReservationSummary reservation={dataFromYourJSON.reservation} />
