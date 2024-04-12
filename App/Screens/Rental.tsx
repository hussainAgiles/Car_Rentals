import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {Checkbox} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../Constants/Colors';
import Loader from '../Components/Loader/Loader';
import DateandVehicles from '../Components/Reservations/DateandVehicles';
import Customers from '../Components/Reservations/Customers';
import Insurance from '../Components/Reservations/Insurance';
import Payment from '../Components/Reservations/Payment';
import Documents from '../Components/Reservations/Documents';
import ReservationSummary from '../Components/Reservations/ReservationSummary';
import Header from '../Components/Header/Header';
import useDispatch from '../Hooks/useDispatch';
import useIsMounted from '../Hooks/useIsMounted';
import {fetchRentalDetail} from '../Redux/Reducers/ReservationDetailsReducer';
import useAppSelector from '../Hooks/useSelector';
import {RootState} from '../Redux/Store';
import {useNavigation} from '@react-navigation/native';

const sections = ['vehicle', 'customer', 'insurance', 'payment', 'documents'];

const Rental = ({route}: any) => {
  const dispatch = useDispatch();
  const isMounted = useIsMounted();
  const navigation = useNavigation();
  const {rentalDetail, loading} = useAppSelector(
    (state: RootState) => state.rentalDetailReducer,
  );

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

  const handleCheck = section => {
    setCheckedItems(prev => ({...prev, [section]: !prev[section]}));
  };

  const handleNextStep = currentSection => {
    const currentIndex = sections.indexOf(currentSection);
    const nextSection = sections[currentIndex + 1];
    setCurrentOpenSection(nextSection);
  };

  const renderAccordion = section => {
    const Component = {
      vehicle: DateandVehicles,
      customer: Customers,
      insurance: Insurance,
      payment: Payment,
      documents: Documents,
    }[section];

    return (
      <>
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
        {currentOpenSection === section && <Component item={rentalDetail} />}
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
      </>
    );
  };

  const allItemsChecked = () => {
    return Object.values(checkedItems).every(status => status === true);
  };

  return (
    <ScrollView style={styles.container}>
      <Header text="Rental" />
      {loading === 'pending' ? (
        <Loader />
      ) : (
        <>
          {/* Your existing code to render rental details */}
          {sections.map(section => renderAccordion(section))}
          <ReservationSummary reservation={rentalDetail?.reservation} />
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                {backgroundColor: allItemsChecked() ? Colors.primary : '#ccc'},
              ]}
              disabled={!allItemsChecked()}>
              <Text style={styles.buttonText}>Rental</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, {backgroundColor: Colors.primary}]}
              onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, {backgroundColor: Colors.primary}]}>
              <Text style={styles.buttonText}>Reject</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
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
});

export default Rental;
