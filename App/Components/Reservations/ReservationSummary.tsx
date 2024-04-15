import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../../Constants/Colors';

const ReservationSummary = ({reservation, insuranceAddon}: any) => {
  // console.log(insuranceAddon);
  const calculateSubtotal = () => {
    const rentalPrice = reservation?.rental_price || 0;
    const addonTotalPrice = reservation?.addon_total_price || 0;
    const insurancePrice = insuranceAddon?.insuranceId ? parseFloat(insuranceAddon.insuranceId) : 0;
    const addonsPrice = insuranceAddon?.addonsId ? parseFloat(insuranceAddon.addonsId) : 0;

    const vatAmount = (rentalPrice + addonTotalPrice) * (reservation?.vat / 100);
    return rentalPrice + addonTotalPrice + vatAmount + insurancePrice + addonsPrice + reservation?.vmc;
  };

  const subtotal = calculateSubtotal();
  const totalDue = subtotal - (reservation?.balance_amount || 0);

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

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          marginBottom: 20,
          fontWeight: 'bold',
          color: Colors.black,
          textAlign:'center'
        }}>
        Summary
      </Text>
      <View style={{borderRadius: 6,backgroundColor:Colors.Iconwhite,elevation:3,}}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Total</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 5,
            marginTop: 5,
          }}>
          <Text style={styles.title}>Total Rent period</Text>
          <Text style={styles.title}>
            {totalDays} {totalDays >= 1 ? 'Day' : 'Days'}
          </Text>
        </View>
        <View style={styles.section}>
          <View>
            <Text style={styles.title}>Economy Manual</Text>
            <Text style={styles.subtitle}>Toyota Yaris</Text>
          </View>
          <Text style={styles.price}>
            {reservation?.vehicle_price.toFixed(2)} AUD
          </Text>
        </View>

        {insuranceAddon.insuranceId && (
          <View style={styles.section}>
            <View>
              <Text style={styles.title}>Insurance</Text>
              <Text style={styles.subtitle}>Insurance Price</Text>
            </View>
            <Text style={styles.price}>
              {insuranceAddon?.insuranceId?.toFixed(2)} AUD
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
              {Number(reservation?.addon_total_price?.toFixed(2)) +
                Number(insuranceAddon.addonsId)}{' '}
              AUD
            </Text>
          </View>
        ) : (
          <View style={styles.section}>
            <View>
              <Text style={styles.title}>Add-on/s</Text>
              <Text style={styles.subtitle}>Addon Price</Text>
            </View>
            <Text style={styles.price}>
              {Number(reservation?.addon_total_price?.toFixed(2))} AUD
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
            <Text style={styles.price}>{reservation?.vmc.toFixed(2)} AUD</Text>
            <Text style={styles.price}>{reservation?.vat}%</Text>
          </View>
        </View>

        <View style={styles.summary}>
          <View>
            <Text style={styles.summaryTitle}>Subtotal</Text>
            <Text style={styles.summaryTitle}>Paid:</Text>
          </View>

          <View>
            <Text style={styles.summaryValue}>{subtotal.toFixed(2)} AUD</Text>

            <Text style={styles.summaryValue}>
              {reservation?.balance_amount.toFixed(2)} AUD
            </Text>
          </View>
        </View>

        <View style={styles.dueBalanceContainer}>
          <Text style={styles.dueBalanceTitle}>Due balance:</Text>
          <Text style={styles.dueBalanceValue}>{totalDue.toFixed(2)} AUD</Text>
        </View>
        <View style={styles.dueBalanceContainer}>
          <Text style={styles.summaryTitle}>Security deposit</Text>
          <Text style={styles.summaryValue}>
            {reservation?.security_deposit?.toFixed(2)} AUD
          </Text>
        </View>
        <View style={styles.dueBalanceContainer}>
          <Text style={styles.summaryTitle}>Damage excess:</Text>
          <Text style={styles.summaryValue}>
            {reservation?.insurance_price?.toFixed(2)} AUD
          </Text>
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
    justifyContent: 'space-between',
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
