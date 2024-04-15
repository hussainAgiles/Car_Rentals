import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Colors from '../../Constants/Colors';
import {useSelector} from 'react-redux';
import useIsMounted from '../../Hooks/useIsMounted';
import Toast from 'react-native-toast-message';
import {
  create_Payment,
  fetchPayment,
  fetchStatus,
} from '../../Redux/Reducers/ReservationDetailsReducer';
import {RootState} from '../../Redux/Store';
import {Picker} from '@react-native-picker/picker';
import useDispatch from '../../Hooks/useDispatch';

const Payment = ({item}: any) => {
  // console.log('item == ', item.reservation);

  const [type, setType] = useState('');
  const [newdate, setNewDate] = useState('');
  const [method, setMethod] = useState('');
  const [value, setValue] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [date, setDate] = useState('');
  const [status, setSelectedStatus] = useState('Not paid');
  const statusOptions = ['Paid', 'Pending', 'Failed', 'Cancel'];

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
          text1: 'Payment Added',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: (await paymentResponse).payload.message,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return Colors.green;
      case 'Not-paid':
        return Colors.red;
      case 'Failed':
        return Colors.orange;
      case 'Cancel':
        return Colors.black;
      case 'Pending':
        return Colors.blue;
      default:
        return Colors.grey;
    }
  };

  const {paymentHistory, loading} = useSelector(
    (state: RootState) => state.fetchPaymentReducer,
  );

  // console.log(paymentHistory)

  // const statusColor = getStatusColor(
  //   paymentHistory?.reservation_payment?.status,
  // );

  
  useEffect(() => {
    if (isMounted()) {
      dispatch(fetchPayment(item?.reservation?.id));
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

  return (
    <View style={styles.container}>
      {paymentHistory?.reservation_payment?.map(
        (
          payment: {
            status: string;
            type:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined;
            date:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined;
            method:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | null
              | undefined;
            value: any;
            id: any;
          },
          index: React.Key | null | undefined,
        ) => (
          <View style={styles.paymentItem} key={payment.id}>
            <Text style={styles.paymentType}>{payment.type}</Text>
            <Text style={styles.paymentDate}>{payment.date}</Text>
            <View style={[styles.paymentMethod]}>
              <Icon
                name={payment.method === 'Card' ? 'credit-card' : 'money'}
                size={20}
                color="#000"
              />
              <Text style={styles.paymentDate}>{payment.method}</Text>
            </View>
            <Text style={styles.amount}>{`${payment.value} €`}</Text>
            <View style={{width:80}}>
              {/* <Text>Select Status:</Text> */}
              <TouchableOpacity
                onPress={() => toggleOptions(payment.id)}
                style={[styles.selectedOption,{backgroundColor: getStatusColor(payment.status)}]}>
                <Text style={{color: Colors.Iconwhite}}>{payment.status}</Text>
              </TouchableOpacity>
              {selectedRow === payment.id && showOptions === true && (
                <View style={[styles.optionsContainer]}>
                  {statusOptions.map((status, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleSelectStatus(status, payment.id)}
                      style={{padding: 10, backgroundColor: getStatusColor(status)}}>
                      <Text style={{color: Colors.Iconwhite,textAlign:'center'}}>{status}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
        ),
      )}
      <View style={styles.formContainer}>
        <TextInput
          label="Payment type"
          value={item?.reservation?.payment_method}
          onChangeText={value => {
            setType(value);
          }}
          mode="outlined"
          style={styles.input}
          textColor={Colors.black}
          right={<TextInput.Icon name="menu-down" />}
        />
        <View>
          <TouchableOpacity
            style={[
              styles.input,
              {borderWidth: 0.5, borderRadius: 3, justifyContent: 'center'},
            ]}
            onPress={() => setDatePickerVisibility(true)}>
            <Text style={{color: Colors.black, marginLeft: 15}}>
              {selectedDate ? selectedDate.toDateString() : 'Select Date'}
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          label="Payment method"
          value={item?.reservation?.payment_method}
          onChangeText={value => {
            setMethod(value);
          }}
          mode="outlined"
          style={styles.input}
          textColor={Colors.black}
          right={<TextInput.Icon name="menu-down" />}
        />
        <TextInput
          label="Amount"
          value={item?.reservation?.rental_price}
          onChangeText={text => setValue(text)}
          mode="outlined"
          style={styles.input}
          textColor={Colors.black}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={addPayment}>
          <Text style={styles.buttonText}>Add Payment</Text>
        </TouchableOpacity>
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
    justifyContent: 'space-between',
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
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop:10
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
    marginRight: 8,
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
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    marginRight: 20,
  },
  selectedOption: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'gray',
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
});
