import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar, Checkbox} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ImageBase_URL} from '../API/Constants';
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
import {
  fetchPayment,
  fetchRentalDetail,
} from '../Redux/Reducers/ReservationDetailsReducer';
import {RootState} from '../Redux/Store';
import {updateRentals} from '../API/NormalApi';

const sections = ['vehicle', 'customer', 'insurance', 'payment', 'documents'];

const Rental = ({route}: any) => {
  const dispatch = useDispatch();
  const isMounted = useIsMounted();
  const navigation = useNavigation();

  const {rentalDetail, loading} = useAppSelector(
    (state: RootState) => state.rentalDetailReducer,
  );

  // console.log("Rental Details === ",rentalDetail)
  const [insuranceOptions, setInsuranceOptions] = useState({
    baseCost: null,
    selectedInsurance: null, // Selected insurance plan
    addOnsCost: 0, // Additional cost from add-ons
  });
  const [paymentCompleted, setPaymentCompleted] = useState(0);

  const scrollViewRef = useRef(null);
  const {paymentHistory} = useAppSelector(
    (state: RootState) => state.fetchPaymentReducer,
  );

  useEffect(() => {
    if (rentalDetail) {
      setInsuranceOptions(prev => ({...prev, baseCost: rentalDetail.baseCost}));
    }
  }, [rentalDetail]);

  useEffect(() => {}, [rentalDetail?.reservation?.id]);

  useEffect(() => {}, [paymentHistory]);

  useEffect(() => {
    // Then fetch new data
    if (isMounted() && rentalDetail?.reservation?.id) {
      setPaymentCompleted(0);
      dispatch(fetchPayment(rentalDetail.reservation.id));
    }
  }, [rentalDetail?.reservation?.id]);

  useEffect(() => {
    if (paymentHistory?.reservation_payment) {
      let totalPaid = 0;
      paymentHistory.reservation_payment.forEach(
        (payment: {status: string; value: string}) => {
          if (payment.status === 'Paid') {
            totalPaid += parseFloat(payment.value);
          }
        },
      );
      setPaymentCompleted(totalPaid);
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
  const [currentOpenSection, setCurrentOpenSection] = useState('vehicle');

  const handleCheck = (section: string | number) => {
    setCheckedItems(prev => ({...prev, [section]: !prev[section]}));
  };

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const handleNextStep = (currentSection: any) => {
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex < sections.length - 1) {
      const nextSection = sections[currentIndex + 1];
      setCurrentOpenSection(nextSection);
      // Scroll to next section
      scrollViewRef.current?.scrollTo({
        x: screenWidth * (currentIndex + 1),
        animated: true,
      });
    }
  };

  const handleInsuranceUpdate = (
    insuranceId: number | null,
    addonsId: number | null,
  ) => {
    // console.log(`Selected Insurance ID: ${insuranceId}, Addons ID: ${addonsId}`);
    setInsuranceOptions(prev => ({
      ...prev,
      insuranceId,
      addonsId,
    }));
  };

  const renderAccordion = (section: any, key: any) => {
    const Component = {
      vehicle: DateandVehicles,
      customer: Customers,
      insurance: Insurance,
      payment: Payment,
      documents: Documents,
    }[section];

    const componentProps = {
      item: rentalDetail,
      ...(section === 'insurance' && {
        onInsuranceUpdate: handleInsuranceUpdate,
      }),
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
      case 'Reserved':
        return Colors.primary;
      case 'Returned':
        return Colors.red;
      default:
        return Colors.grey;
    }
  };

  const statusColor = getStatusColor(
    rentalDetail?.reservation?.reservations_status,
  );

  const handleRentals = async () => {
    console.log("Entered")
    const checkedStatus = allItemsChecked();
    let object = {
      id: rentalDetail?.reservation?.id,
      reservations_status:
        rentalDetail?.reservation?.reservations_status === 'Reserved'
          ? 'Rented'
          : 'Returned',
      payment_notes: rentalDetail?.reservation?.payment_notes,
      signature_type: rentalDetail?.reservation?.signature_type,
    };
    if (checkedStatus === true) {
      const response = await updateRentals({body: object});
      dispatch(fetchRentalDetail(route.params.id));
      setCurrentOpenSection('vehicle');
      scrollViewRef.current?.scrollTo({
        x: 0,
        animated: true,
      });
    }
  };

  const isRented = rentalDetail?.reservation?.reservations_status === 'Rented';

  const screenWidth = Dimensions.get('screen').width;

  const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {sections.map((section, index) => (
          <TouchableOpacity
            key={section}
            style={[
              styles.pageNumber,
              currentOpenSection === section ? styles.pageNumberActive : null,
            ]}
            onPress={() => {
              setCurrentOpenSection(section);
              scrollViewRef.current?.scrollTo({
                x: screenWidth * index,
                animated: true,
              });
            }}>
            <Text style={styles.pageNumberText}>{index + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const onScrollEnd = (e: any) => {
    const contentOffset = e.nativeEvent.contentOffset.x;
    const viewIndex = Math.round(contentOffset / screenWidth);
    setCurrentSectionIndex(viewIndex);
    setCurrentOpenSection(sections[viewIndex]);
  };

  const renderSections = () => {
    return sections.map((section, index) => (
      <View key={section} style={{width: screenWidth, minHeight: 520}}>
        {renderAccordion(section, section)}
      </View>
    ));
  };

  return (
    <View style={{flex: 1}}>
      <Header text="Rental" />
      <ScrollView style={styles.container}>
        {loading === 'pending' ? (
          <Loader />
        ) : (
          <>
            {/* Your existing code to render rental details */}
            <Text
              style={{
                paddingLeft: 20,
                fontWeight: 'bold',
                color: Colors.black,
                textAlign: 'center',
                fontSize: 18,
                marginTop: 10,
              }}>
              Check Reservations Before
            </Text>
            <View
              style={{
                flexDirection: 'row',
                padding: 25,
                paddingBottom: 0,
                justifyContent: 'space-between',
              }}>
              <View style={styles.carInfo}>
                <Avatar.Image
                  size={60}
                  source={{
                    uri:
                      ImageBase_URL +
                      rentalDetail?.reservation?.fleet_master?.vehiclemodel
                        ?.image_url,
                  }}
                />
                <View style={styles.carText}>
                  <Text style={{fontWeight: 'bold', color: Colors.black}}>
                    {rentalDetail?.reservation?.fleet_master?.vehicle_variant}
                  </Text>
                  <View
                    style={{
                      backgroundColor: Colors.primary,
                      width: '100%',
                      padding: 5,
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        color: Colors.Iconwhite,
                        fontSize: 12,
                        fontWeight: 'bold',
                      }}>
                      Reg No :{' '}
                      {rentalDetail?.reservation?.fleet_master?.registration_no}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 12, color: Colors.black}}>
                      VIN No:
                    </Text>
                    <Text
                      style={{
                        marginLeft: 2,
                        fontSize: 12,
                        color: Colors.black,
                      }}>
                      {rentalDetail?.reservation?.fleet_master?.vin_no}
                    </Text>
                  </View>
                </View>
              </View>
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

            <ScrollView
              ref={scrollViewRef}
              horizontal={true} // Enable horizontal scrolling
              pagingEnabled={true} // Enable paging
              showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicators
              style={styles.container}
              onMomentumScrollEnd={onScrollEnd}>
              {renderSections()}
            </ScrollView>

            {renderPagination()}

            <ReservationSummary
              reservation={rentalDetail?.reservation}
              insuranceAddon={insuranceOptions}
              paymentCompleted={paymentCompleted}
            />
            <View style={styles.buttonRow}>
              {rentalDetail?.reservation?.reservations_status !==
                'Returned' && rentalDetail?.reservation?.reservations_status !==  'Draft' ? (
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    {
                      backgroundColor: allItemsChecked()
                        ? Colors.primary
                        : '#ccc',
                    },
                  ]}
                  disabled={!allItemsChecked()}
                  onPress={handleRentals}>
                  <Text style={styles.buttonText}>
                    {rentalDetail?.reservation?.reservations_status === 'Rented'
                      ? 'Return'
                      : 'Rental'}
                  </Text>
                </TouchableOpacity>
              ):null}

              <TouchableOpacity
                style={[styles.actionButton, {backgroundColor: Colors.primary}]}
                onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>

              {rentalDetail?.reservation?.reservations_status !==
                'Returned'  && rentalDetail?.reservation?.reservations_status !==  'Draft' ?(
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    {backgroundColor: Colors.primary},
                  ]}>
                  <Text style={styles.buttonText}>Reject</Text>
                </TouchableOpacity>
              ):null}
             
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
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  dotActive: {
    backgroundColor: Colors.primary,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  pageNumber: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 15,
    backgroundColor: '#ccc',
  },
  pageNumberActive: {
    backgroundColor: Colors.primary,
  },
  pageNumberText: {
    color: 'white',
    fontWeight: 'bold',
  },
  carInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  carText: {
    marginLeft: 5,
  },
});

export default Rental;
