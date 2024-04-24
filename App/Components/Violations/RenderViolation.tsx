import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../Constants/Colors';
import {useSelector} from 'react-redux';
import useDispatch from '../../Hooks/useDispatch';
import useIsMounted from '../../Hooks/useIsMounted';
import {RootState} from '../../Redux/Store';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Customers,
  VioltaionTypes,
  create_Violation,
  delete_Violation,
  fetchingViolations,
} from '../../Redux/Reducers/ReservationDetailsReducer';
import {deleteViolations} from '../../API/NormalApi';
import Toast from 'react-native-toast-message';
import {Dropdown} from 'react-native-element-dropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {TextInput, Modal, Portal} from 'react-native-paper';
import Loader from '../Loader/Loader';
import ViolationFormModal from './ViolationFormModal';

const RenderViolation = ({reservation}: any) => {
  // console.log('Id related to reservation', reservation.reservation?.id);

  const dispatch = useDispatch();
  const isMounted = useIsMounted();
  const [isLoading, setIsLoading] = useState(true);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [date, setDate] = useState('');
  const [customer_id, setCustomer] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Voilation related state
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  // Error msgs
  const [customerError, setCustomerError] = useState('');
  const [typeError, setTypeError] = useState('');
  const [dateError, setDateError] = useState('');
  const [amountError, setAmountError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  // focused

  const [customerFocused, setCustomerFocused] = useState(false);
  const [typeFocused, setTypeFocused] = useState(false);
  const [descriptionFocused, setDescriptionFocused] = useState(false);
  const [dateFocused, setDateFocused] = useState(false);
  const [amountFocused, setAmountFocused] = useState(false);

  const {violation} = useSelector(
    (state: RootState) => state.fleetVoilationReducer,
  );
  const {violationData} = useSelector(
    (state: RootState) => state.fleetViolationCreationReducer,
  );

  useEffect(() => {
    if (isMounted()) {
      dispatch(VioltaionTypes());
      dispatch(Customers());
      dispatch(fetchingViolations(reservation?.reservation?.id));
    }
  }, [violationData]);

  const {customersData, customerLoading} = useSelector(
    (state: RootState) => state.fleetCustomersReducer,
  );

  const {violationTypes, loading} = useSelector(
    (state: RootState) => state.fleetViolationTypesReducer,
  );

  const handleDeleteViolation = async (violationId: string) => {
    // console.log("Id ===== ",violationId)
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this violation?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              const violationResponse = await dispatch(
                delete_Violation(violationId),
              );
              if (violationResponse.payload.status === 'S') {
                Toast.show({
                  type: 'success',
                  text1: 'Deleted Successfully',
                });
                dispatch(fetchingViolations(reservation?.reservation?.id));
              } else {
                Toast.show({
                  type: 'error',
                  text1: violationResponse.payload.message,
                });
              }
            } catch (error) {
              // console.log('render Violation === ', error);
              Toast.show({
                type: 'error',
                text1: 'Something went wrong',
              });
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleDateConfirm = (newdate: Date) => {
    // console.log('Date === ', newdate);
    setSelectedDate(newdate);
    setDatePickerVisibility(false);

    // Format the date as YYYY-MM-DD
    const date = newdate.toISOString().split('T')[0];
    setDate(date);
  };

  const handleVoilations = async () => {
    const reservation_id = reservation.reservation.id;
    let isValid = true;
    if (!customer_id) {
      setCustomerError('Customer is required.');
      isValid = false;
    } else {
      setCustomerError('');
    }

    if (!type) {
      setTypeError('Violation Type is required.');
      isValid = false;
    } else {
      setTypeError('');
    }

    if (!selectedDate) {
      setDateError('Date is required.');
      isValid = false;
    } else {
      setDateError('');
    }

    if (!amount) {
      setAmountError('Amount is required.');
      isValid = false;
    } else {
      setAmountError('');
    }

    if (!description) {
      setDescriptionError('Comments are required.');
      isValid = false;
    } else {
      setDescriptionError('');
    }
    if (isValid) {
      try {
        const violationResponse = await dispatch(
          create_Violation({
            type,
            reservation_id,
            customer_id,
            amount,
            description,
          }),
        );
        if (violationResponse?.payload?.status === 'S') {
          Toast.show({
            type: 'success',
            text1: 'Voilation Added',
          });
          setType('');
          setAmount('');
          setDescription('');
          setCustomer('');
          setDate('');
          setIsModalVisible(false);
          dispatch(fetchingViolations(reservation?.reservation?.id));
        } else {
          Toast.show({
            type: 'error',
            text1: violationResponse?.payload?.message as string,
          });
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
        });
      }
    }
  };

  return (
    <View>
      {violation?.violations.length > 0 ? (
        <View style={styles.tableHeader}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={[styles.headerText, {flex: 0.25}]}>Name</Text>
            <Text style={[styles.headerText, {flex: 0.25}]}>Date</Text>
            <Text style={[styles.headerText, {flex: 0.15}]}>Amount</Text>
            <Text style={[styles.headerText, {flex: 0.22}]}>Description</Text>
            <Text style={[styles.headerText, {flex: 0.1}]}>Action</Text>
          </View>
        </View>
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 18, color: Colors.grey}}>No Data Found</Text>
        </View>
      )}
      <View style={styles.modalView}>
        {violation?.violations?.map(
          (
            violation_data: {
              status: string;
              type: any;
              description: any;
              amount: any;
              full_name: any;
              created_at: any;
              id: any;
              customer: object;
            },
            index: React.Key | null | undefined,
          ) => (
            <View
              style={[styles.paymentItem, {flexDirection: 'row'}]}
              key={violation_data.id}>
              <Text style={{color: Colors.black, flex: 0.25}}>
                {violation_data?.customer?.full_name}
              </Text>
              <Text style={{color: Colors.black, flex: 0.25}}>
                {moment(violation_data.created_at).format('DD-MM-YYYY')}
              </Text>
              <Text
                style={{
                  color: Colors.black,
                  flex: 0.15,
                }}>{`${violation_data.amount} AUD`}</Text>
              <Text style={{color: Colors.black, flex: 0.22}}>
                {violation_data.description}
              </Text>
              <TouchableOpacity
                style={{flex: 0.13, alignItems: 'center'}}
                onPress={() => handleDeleteViolation(violation_data.id)}>
                <Icon name="delete" size={20} color={Colors.red} />
              </TouchableOpacity>
            </View>
          ),
        )}

        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={[styles.button]}>
          <Text
            style={{
              color: Colors.Iconwhite,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Add Violations
          </Text>
        </TouchableOpacity>

        <Portal>
          <Modal
            visible={isModalVisible}
            contentContainerStyle={styles.modalContainer}>
            <View style={{justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontSize:18,fontWeight:'bold',color:Colors.black}}>Add Violations</Text>
            </View>
            {customersData && customersData.length > 0 && (
              <Dropdown
                style={[styles.dropdown]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={customersData}
                search
                maxHeight={200}
                labelField="full_name"
                valueField="id"
                placeholder="Select Customer"
                searchPlaceholder="Search..."
                value={customersData?.id}
                itemTextStyle={styles.itemStyle}
                onChange={item => setCustomer(item?.id)}
                onFocus={() => setCustomerFocused(true)}
                onBlur={() => setCustomerFocused(false)}
              />
            )}
            {!customerFocused && customerError ? (
              <Text style={styles.errorText}>{customerError}</Text>
            ) : null}

            {violationTypes && violationTypes.length > 0 && (
              <Dropdown
                style={[styles.dropdown]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={violationTypes}
                search
                maxHeight={300}
                labelField="longname"
                valueField="id"
                placeholder="Select Violation"
                searchPlaceholder="Search..."
                value={violationTypes?.id}
                itemTextStyle={styles.itemStyle}
                onChange={item => setType(item?.longname)}
                onFocus={() => setTypeFocused(true)}
                onBlur={() => setTypeFocused(false)}
              />
            )}
            {!typeFocused && typeError ? (
              <Text style={styles.errorText}>{typeError}</Text>
            ) : null}

            <View>
              <TouchableOpacity
                style={[
                  styles.input,
                  {
                    borderWidth: 0.7,
                    borderRadius: 3,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 15,
                  },
                ]}
                onPress={() => setDatePickerVisibility(true)}>
                <Text style={{color: Colors.black}}>
                  {selectedDate ? selectedDate.toDateString() : 'Select Date'}
                </Text>
                <Icon name="calendar-month" size={20} color={Colors.black} />
              </TouchableOpacity>
              {dateError ? (
                <Text style={styles.errorText}>{dateError}</Text>
              ) : null}
            </View>

            <TextInput
              label="Amount"
              mode="outlined"
              value={amount}
              style={[styles.input]}
              textColor={Colors.black}
              onChangeText={text => setAmount(text)}
              keyboardType="numeric"
              onFocus={() => setAmountFocused(true)}
              onBlur={() => setAmountFocused(false)}
            />
            {!amountFocused && amountError ? (
              <Text style={styles.errorText}>{amountError}</Text>
            ) : null}
            <TextInput
              label="Comments"
              mode="outlined"
              value={description}
              style={[styles.input]}
              textColor={Colors.black}
              onChangeText={text => setDescription(text)}
              onFocus={() => setDescriptionFocused(true)}
              onBlur={() => setDescriptionFocused(false)}
            />
            {!descriptionFocused && descriptionError ? (
              <Text style={styles.errorText}>{descriptionError}</Text>
            ) : null}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={[styles.buttonContainer]}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleVoilations}>
                  <Text style={{color: Colors.Iconwhite, fontWeight: 'bold'}}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.buttonContainer]}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setIsModalVisible(false)}>
                  <Text style={{color: Colors.Iconwhite, fontWeight: 'bold'}}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </Portal>

      </View>
      {/* Date Time Picker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisibility(false)}
        minimumDate={new Date()}
      />
    </View>
  );
};

export default RenderViolation;

const styles = StyleSheet.create({
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    padding: 5,
    marginTop: 20,
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    flex: 1,
    // textAlign: 'center',
  },
  modalView: {
    paddingVertical: 10,
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  dropdown: {
    marginVertical: 15,
    height: 45,
    borderWidth: 0.5,
    borderRadius: 5,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    paddingHorizontal: 15,
  },
  placeholderStyle: {
    fontSize: 16,
    color: Colors.black,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Colors.black,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: Colors.black,
  },
  itemStyle: {
    color: Colors.black,
  },
  input: {
    marginTop: 20,
    marginBottom: 10,
    height: 40,
    backgroundColor: 'transparent', // To remove the inner background color
  },
  formContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  errorText: {
    color: 'red',
  },
  // modalContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  // },
  modalContainer: {
    backgroundColor: 'white',
    margin: 20,
    padding: 15,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    height: '55%', // Adjust the width as needed
  },
});
