import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Modal, Portal, TextInput} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import Colors from '../../Constants/Colors';
import useDispatch from '../../Hooks/useDispatch';
import useIsMounted from '../../Hooks/useIsMounted';
import {
  create_Payment,
  fetchPayment,
  fetchStatus,
} from '../../Redux/Reducers/ReservationDetailsReducer';
import {RootState} from '../../Redux/Store';
import {currencyFormat} from '../../API/NormalApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Payment = ({item}: any) => {
  const [type, setType] = useState('');
  const [method, setMethod] = useState('');
  const [value, setValue] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [date, setDate] = useState('');
  const [status, setSelectedStatus] = useState('Not paid');
  const statusOptions = ['Paid', 'Pending'];
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDateConfirm = (newdate: Date) => {
    // console.log("Date === ",date)
    setSelectedDate(newdate);
    setDatePickerVisibility(false);

    // Format the date as YYYY-MM-DD
    const date = newdate.toISOString().split('T')[0];
    setDate(date);
  };

  const dispatch = useDispatch();
  const isMounted = useIsMounted();

  const addPayment = async () => {
    const customer_id = item.reservation.customers.id;
    const reservation_id = item.reservation.id;
    try {
      const paymentResponse = dispatch(
        create_Payment({
          type,
          method,
          date,
          value,
          customer_id,
          reservation_id,
        }),
      );
      if ((await paymentResponse).payload.status === 'S') {
        Toast.show({
          type: 'success',
          text1: (await paymentResponse).payload.message,
          visibilityTime:2000
          
        });
      } else {
        Toast.show({
          type: 'error',
          text1: (await paymentResponse).payload.message,
          visibilityTime:2000
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        visibilityTime:2000
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return Colors.green;
      case 'Not-paid':
        return Colors.red;
      case 'Pending':
        return Colors.blue;
      default:
        return Colors.grey;
    }
  };

  const {paymentHistory, loading} = useSelector(
    (state: RootState) => state.fetchPaymentReducer,
  );

  const {defaultCurrency} = useSelector(
    (state: RootState) => state.fleetFetchDefaultCurrencyReducer,
  );

  // const statusColor = getStatusColor(
  //   paymentHistory?.reservation_payment?.status,
  // );

  useEffect(() => {
    if (isMounted()) {
      dispatch(fetchPayment(item?.reservation?.id));
      defaultCurrencyy();
    }
  }, [status, paymentHistory]);

  const [showOptions, setShowOptions] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);

  const toggleOptions = (id: any) => {
    setShowOptions(true);
    setSelectedRow(id);
  };

  const handleSelectStatus = (status: any, id: any) => {
    const reservation_id = item.reservation.id;
    setSelectedStatus(status);
    dispatch(
      fetchStatus({
        id,
        reservation_id,
        status,
      }),
    );
    setShowOptions(false); // Hide options after selecting
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const [currency, SetCurrency] = useState('');
  const defaultCurrencyy = async () => {
    try {
      const response = await AsyncStorage.getItem('currency');
      if (response) {
        SetCurrency(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatPayments = (value: string) => {
    if (paymentHistory && paymentHistory.reservation_payment) {
      const formattedValue = currencyFormat({
        value: value,
        formatType: 'prefix',
        currency: currency,
      });
      return formattedValue;
    }
  };

  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Colors.primary,
              margin: 20,
              width: 110,
            },
          ]}
          onPress={() => setIsModalVisible(true)}>
          <Text style={styles.buttonText}>Add Payment</Text>
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: 10}}>
        <View style={styles.headerRow}>
          <Text style={styles.headerCell}>Date</Text>
          <Text style={styles.headerCell}>Type</Text>
          <Text style={styles.headerCell}>Amount</Text>
          <Text style={styles.headerCell}>Status</Text>
        </View>
      </View>

      {paymentHistory?.reservation_payment.length > 0 ? (
        <>
          {paymentHistory?.reservation_payment?.map(
            (
              payment: {
                status: string;
                type: any;
                date: any;
                method: any;
                value: any;
                id: any;
              },
              index: React.Key | null | undefined,
            ) => (
              <View style={styles.row} key={payment.id}>
                <Text style={[styles.cell]}>
                  {moment(payment.date).format('DD-MM-YYYY')}
                </Text>
                <Text style={[styles.cell]}>{payment.method}</Text>
                <Text style={[styles.cell]}>
                  {' '}
                  {paymentHistory && paymentHistory.reservation_payment
                    ? formatPayments(payment.value)
                    : ''}
                </Text>

                <View style={styles.cell}>
                  {/* <Text>Select Status:</Text> */}
                  <TouchableOpacity
                    onPress={() => toggleOptions(payment.id)}
                    style={[
                      styles.selectedOption,
                      {backgroundColor: getStatusColor(payment.status)},
                    ]}>
                    <Text style={{color: Colors.Iconwhite}}>
                      {payment.status}
                    </Text>
                  </TouchableOpacity>
                  {selectedRow === payment.id && showOptions === true && (
                    <View style={[styles.optionsContainer]}>
                      {statusOptions.map((status, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => handleSelectStatus(status, payment.id)}
                          style={{
                            padding: 10,
                            backgroundColor: getStatusColor(status),
                          }}>
                          <Text
                            style={{
                              color: Colors.Iconwhite,
                              textAlign: 'center',
                            }}>
                            {status}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            ),
          )}
        </>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text style={{fontWeight: 'bold', color: Colors.black}}>
            No data found
          </Text>
        </View>
      )}
      {/* Modal Popup for Adding payment */}
      <Portal>
        <Modal
          visible={isModalVisible}
          contentContainerStyle={styles.modalContainer}>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.black,
              }}>
              Add Payment
            </Text>
            <TouchableOpacity onPress={closeModal}>
              <Icon2 name={'cancel'} size={25} color={Colors.red} />
            </TouchableOpacity>
          </View>
          <View style={styles.formContainer}>
            <TextInput
              label="Payment type"
              value={type}
              onChangeText={value => {
                setType(value);
              }}
              mode="outlined"
              style={styles.input}
              textColor={Colors.black}
              // right={<TextInput.Icon icon="menu-down" />}
            />
            <View>
              <TouchableOpacity
                style={[
                  styles.input,
                  {
                    borderWidth: 0.5,
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
                <Icon name="calendar" size={20} color={Colors.black} />
              </TouchableOpacity>
            </View>

            <TextInput
              label="Payment method"
              value={method}
              onChangeText={value => {
                setMethod(value);
              }}
              mode="outlined"
              style={styles.input}
              textColor={Colors.black}
              // right={<TextInput.Icon icon="menu-down" />}
            />
            <TextInput
              label="Amount"
              value={value}
              onChangeText={text => setValue(text)}
              mode="outlined"
              style={styles.input}
              textColor={Colors.black}
              keyboardType="numeric"
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: Colors.primary}]}
                onPress={addPayment}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: Colors.red}]}
                onPress={() => {
                  setIsModalVisible(false);
                }}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Portal>

      {/* Date Time Picker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisibility(false)}
        // minimumDate={new Date()}
      />
    </View>
  );
};

export default Payment;

// Combine and add any necessary styles from both components here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  paymentList: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
    marginBottom: 0,
  },
  header: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  paymentType: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  paymentDate: {
    fontSize: 14,
    color: '#666',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusButton: {
    borderWidth: 0.1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paid: {
    backgroundColor: 'green',
  },
  pending: {
    backgroundColor: 'orange',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
  },
  formContainer: {
    paddingHorizontal: 0,
    paddingTop: 10,
  },
  input: {
    marginBottom: 10,
    height: 40,
    backgroundColor: 'transparent', // To remove the inner background color
  },
  addButton: {
    marginTop: 10,
  },
  icon: {
    marginRight: 0,
  },
  actionButton: {
    marginVertical: 10,
  },
  actionButtonText: {
    fontWeight: 'bold',
    color: '#5B5B5B',
  },
  dropdownIcon: {
    marginRight: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginRight: 20,
  },
  selectedOption: {
    padding: 5,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  option: {
    padding: 10,
  },
  modalContainer: {
    backgroundColor: 'white',
    margin: 20,
    padding: 15, // Semi-transparent background
  },
  row: {
    flexDirection: 'row',
    padding: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 3,
  },
  cell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.black,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.Iconwhite,
  },
});
