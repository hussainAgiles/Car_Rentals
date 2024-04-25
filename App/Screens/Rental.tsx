import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Checkbox} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../Components/Header/Header';
import Loader from '../Components/Loader/Loader';
import Customers from '../Components/Reservations/Customers';
import DateandVehicles from '../Components/Reservations/DateandVehicles';
import Documents from '../Components/Reservations/Documents';
import Insurance from '../Components/Reservations/Insurance';
import Payment from '../Components/Reservations/Payment';
import ReservationSummary from '../Components/Reservations/ReservationSummary';
import Colors from '../Constants/Colors';
import useDispatch from '../Hooks/useDispatch';
import useIsMounted from '../Hooks/useIsMounted';
import useAppSelector from '../Hooks/useSelector';
import {fetchPayment, fetchRentalDetail, fetchingCurrency} from '../Redux/Reducers/ReservationDetailsReducer';
import {RootState} from '../Redux/Store';
import { useSelector } from 'react-redux';

const sections = ['vehicle', 'customer', 'insurance', 'payment', 'documents'];

const Rental = ({route}: any) => {
  const dispatch = useDispatch();
  const isMounted = useIsMounted();
  const navigation = useNavigation();
  const {rentalDetail, loading} = useAppSelector(
    (state: RootState) => state.rentalDetailReducer,
  );
  const [insuranceOptions, setInsuranceOptions] = useState({
    baseCost:null,
    selectedInsurance: null, // Selected insurance plan
    addOnsCost: 0, // Additional cost from add-ons
  });
  const [paymentCompleted, setPaymentCompleted] = useState(0);

 

  const {paymentHistory,} = useAppSelector(
    (state: RootState) => state.fetchPaymentReducer,
  );

  useEffect(() => {
    if (rentalDetail) {
      setInsuranceOptions(prev => ({...prev, baseCost: rentalDetail.baseCost}));
      // console.log(insuranceOptions);
    }
  }, [rentalDetail]);

  useEffect(() => {
    console.log("Fetching payment for ID:", rentalDetail?.reservation?.id);
    // Fetch logic here
  }, [rentalDetail?.reservation?.id]);
  
  useEffect(() => {
    // console.log("Updating payment completed state:", paymentHistory);
    // Calculation and state update logic here
  }, [paymentHistory]);

  useEffect(() => {

    // Then fetch new data
    if (isMounted() && rentalDetail?.reservation?.id) {
      // console.log(rentalDetail?.reservation?.id);
      setPaymentCompleted(0); 
      dispatch(fetchPayment(rentalDetail.reservation.id));
    }
  }, [rentalDetail?.reservation?.id])

  useEffect(() => {
    // Assuming 'paymentStatus' is part of 'rentalDetail' and it's a string
    if (paymentHistory?.reservation_payment) {
      let totalPaid = 0; // Initialize a variable to hold the sum of all paid payments.
      paymentHistory.reservation_payment.forEach((payment: { status: string; value: string; }) => {
          if (payment.status === 'Paid') {
              // Assuming payment.value is a string that needs to be converted to a number.
              totalPaid += parseFloat(payment.value);
          }
      });
      setPaymentCompleted(totalPaid); // Set the total paid amount to the state.
  }
  }, [paymentHistory]);


  useEffect(() => {
    if (isMounted()) {
      dispatch(fetchRentalDetail(route.params.id));
    }
  }, [route.params.id]);

  const [checkedItems, setCheckedItems] = useState({
    vehicle: false,
    customer: false,
    insurance: false,
    payment: false,
    documents: false,
  });
  const [currentOpenSection, setCurrentOpenSection] = useState('');

  const handleCheck = (section: string | number) => {
    setCheckedItems(prev => ({...prev, [section]: !prev[section]}));
  };

  const handleNextStep = (currentSection: string) => {
    const currentIndex = sections.indexOf(currentSection);
    const nextSection = sections[currentIndex + 1];
    setCurrentOpenSection(nextSection);
  };

  const handleInsuranceUpdate = (insuranceId: number | null, addonsId: number | null) => {
    // console.log(`Selected Insurance ID: ${insuranceId}, Addons ID: ${addonsId}`);
    setInsuranceOptions(prev => ({
      ...prev,
      insuranceId,
      addonsId,
    }));
  };
  

  const renderAccordion = (section, key) => {
  const Component = {
    vehicle: DateandVehicles,
    customer: Customers,
    insurance: Insurance,
    payment: Payment,
    documents: Documents,
  }[section];

  const componentProps = {
    item: rentalDetail,
    ...(section === 'insurance' && { onInsuranceUpdate: handleInsuranceUpdate })
  };

  return (
    <React.Fragment key={key}>
      <View style={styles.subHeadingView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Checkbox
            status={checkedItems[section] ? 'checked' : 'unchecked'}
            onPress={() => handleCheck(section)}
            uncheckedColor="black"
            color="green"
          />
          <TouchableOpacity
            onPress={() =>
              setCurrentOpenSection(
                section === currentOpenSection ? '' : section,
              )
            }>
            <Text style={styles.headingText}>
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() =>
            setCurrentOpenSection(
              section === currentOpenSection ? '' : section,
            )
          }>
          <View style={{alignItems: 'center', alignSelf: 'center'}}>
            <Icon
              name={
                currentOpenSection === section
                  ? 'keyboard-arrow-up'
                  : 'keyboard-arrow-down'
              }
              size={30}
              color={Colors.black}
            />
          </View>
        </TouchableOpacity>
      </View>
      {currentOpenSection === section && <Component {...componentProps} />}
      {currentOpenSection === section && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleCheck(section)}>
            <Text style={styles.buttonText}>Check</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNextStep(section)}>
            <Text style={styles.buttonText}>Next Step</Text>
          </TouchableOpacity>
        </View>
      )}
    </React.Fragment>
  );
};


  const allItemsChecked = () => {
    return Object.values(checkedItems).every(status => status === true);
  };

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

  const statusColor = getStatusColor(
    rentalDetail?.reservation?.reservations_status,
  );

  const isRented = rentalDetail?.reservation?.reservations_status === 'Rented';

  return (
 
    <View style={{flex:1}}>
      <Header text="Rental" />
      <ScrollView style={styles.container}>
        
        {loading === 'pending' ? (
          <Loader />
        ) : (
          <>
            {/* Your existing code to render rental details */}
            <View
              style={{
                flexDirection: 'row',
                padding: 25,
                paddingBottom: 0,
                justifyContent: 'space-between',
              }}>
              <Text style={styles.headingText}>Check Reservations before</Text>
              <View
                style={[
                  styles.statusIndicator,
                  {
                    backgroundColor: statusColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                <Text style={styles.statusText}>
                  {rentalDetail?.reservation?.reservations_status}
                </Text>
              </View>
            </View>
            {sections.map(section => renderAccordion(section,section))}
            <ReservationSummary reservation={rentalDetail?.reservation} insuranceAddon={insuranceOptions} paymentCompleted={paymentCompleted} />
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  {
                    backgroundColor: allItemsChecked()
                      ? Colors.primary
                      : '#ccc',
                  },
                ]}
                disabled={!allItemsChecked()}>
                 <Text style={styles.buttonText}>{isRented ? "Return" : "Rental"}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, {backgroundColor: Colors.primary}]}
                onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  {backgroundColor: Colors.primary},
                ]}>
                <Text style={styles.buttonText}>Reject</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </View>
     
  );
};

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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    marginBottom: 20,
  },
  actionButton: {
    padding: 10,
    borderRadius: 5,
    minWidth: 100, // Adjust the width as needed
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default Rental;
