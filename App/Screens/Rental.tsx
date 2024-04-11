import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Avatar, Checkbox} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../Constants/Colors';
import Header from '../Components/Header/Header';
import DateandVehicles from '../Components/Reservations/DateandVehicles';
import Customers from '../Components/Reservations/Customers';
import Insurance from '../Components/Reservations/Insurance';
import Payment from '../Components/Reservations/Payment';
import Documents from '../Components/Reservations/Documents';

const Rental = () => {
  const [vehicleChecked, setVehicleChecked] = useState(false);
  const [customerChecked, setCustomerChecked] = useState(false);
  const [insuranceChecked, setInsuranceChecked] = useState(false);
  const [paymentChecked, setPaymentChecked] = useState(false);
  const [documentsChecked, setDocumentsChecked] = useState(false);
  const [showDetails, setShowDetails] = useState({
    vehicle: false,
    customer: false,
    insurance: false,
    payment: false,
    documents: false,
  });

  const toggleAccordion = (accordion: any) => {
    setShowDetails(prevState => ({
      ...prevState,
      [accordion]: !prevState[accordion],
    }));
  };

  return (
    <View style={styles.container}>
      <Header text="Rental" />
      <View style={styles.headingView}>
        <Text style={styles.headingText}>Check Reservations before</Text>
        <Text style={styles.headingText}>ID 5 (#MBCXF1)</Text>
      </View>
      <View style={styles.subHeadingView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Checkbox
            status={vehicleChecked ? 'checked' : 'unchecked'}
            onPress={() => setVehicleChecked(!vehicleChecked)}
            uncheckedColor="black"
            color="green"
          />
          <TouchableOpacity onPress={() => toggleAccordion('vehicle')}>
            <Text style={styles.headingText}>Date & Vehicles</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => toggleAccordion('vehicle')}>
          <View style={{alignItems: 'center', alignSelf: 'center'}}>
            {showDetails.vehicle ? (
              <Icon name="keyboard-arrow-up" size={30} color={Colors.black} />
            ) : (
              <Icon name="keyboard-arrow-down" size={30} color={Colors.black} />
            )}
          </View>
        </TouchableOpacity>
      </View>
      {showDetails.vehicle && <DateandVehicles />}
      {/* Similarly, render other accordions */}
      {/* Customer */}
      <View style={styles.subHeadingView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Checkbox
            status={customerChecked ? 'checked' : 'unchecked'}
            onPress={() => setCustomerChecked(!customerChecked)}
            uncheckedColor="black"
            color="green"
          />
          <TouchableOpacity onPress={() => toggleAccordion('customer')}>
            <Text style={styles.headingText}>Customer</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => toggleAccordion('customer')}>
          <View style={{alignItems: 'center', alignSelf: 'center'}}>
            {showDetails.customer ? (
              <Icon name="keyboard-arrow-up" size={30} color={Colors.black} />
            ) : (
              <Icon name="keyboard-arrow-down" size={30} color={Colors.black} />
            )}
          </View>
        </TouchableOpacity>
      </View>
      {showDetails.customer && <Customers />}
      {/* Insurance */}
      <View style={styles.subHeadingView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Checkbox
            status={insuranceChecked ? 'checked' : 'unchecked'}
            onPress={() => setInsuranceChecked(!insuranceChecked)}
            uncheckedColor="black"
            color="green"
          />
          <TouchableOpacity onPress={() => toggleAccordion('insurance')}>
            <Text style={styles.headingText}>Insurance</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => toggleAccordion('insurance')}>
          <View style={{alignItems: 'center', alignSelf: 'center'}}>
            {showDetails.insurance ? (
              <Icon name="keyboard-arrow-up" size={30} color={Colors.black} />
            ) : (
              <Icon name="keyboard-arrow-down" size={30} color={Colors.black} />
            )}
          </View>
        </TouchableOpacity>
      </View>
      {showDetails.insurance && <Insurance />}
      {/* Payment */}
      <View style={styles.subHeadingView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Checkbox
            status={paymentChecked ? 'checked' : 'unchecked'}
            onPress={() => setPaymentChecked(!paymentChecked)}
            uncheckedColor="black"
            color="green"
          />
          <TouchableOpacity onPress={() => toggleAccordion('payment')}>
            <Text style={styles.headingText}>Payment</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => toggleAccordion('payment')}>
          <View style={{alignItems: 'center', alignSelf: 'center'}}>
            {showDetails.payment ? (
              <Icon name="keyboard-arrow-up" size={30} color={Colors.black} />
            ) : (
              <Icon name="keyboard-arrow-down" size={30} color={Colors.black} />
            )}
          </View>
        </TouchableOpacity>
      </View>
      {showDetails.payment && <Payment />}
      {/* Documents */}
      <View style={styles.subHeadingView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Checkbox
            status={documentsChecked ? 'checked' : 'unchecked'}
            onPress={() => setDocumentsChecked(!documentsChecked)}
            uncheckedColor="black"
            color="green"
          />
          <TouchableOpacity onPress={() => toggleAccordion('documents')}>
            <Text style={styles.headingText}>Document</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => toggleAccordion('documents')}>
          <View style={{alignItems: 'center', alignSelf: 'center'}}>
            {showDetails.documents ? (
              <Icon name="keyboard-arrow-up" size={30} color={Colors.black} />
            ) : (
              <Icon name="keyboard-arrow-down" size={30} color={Colors.black} />
            )}
          </View>
        </TouchableOpacity>
      </View>
      {showDetails.documents && <Documents />}
    </View>
  );
};

export default Rental;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  subHeadingView: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  details: {
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
});
