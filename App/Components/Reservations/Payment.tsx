import React, {useState} from 'react';
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

const paymentsData = [
  {
    id: '1',
    type: 'Payment',
    date: '01.04.2024 10:00',
    method: 'Card',
    amount: '480.00',
    status: 'Paid',
  },
  {
    id: '2',
    type: 'Deposit',
    date: '01.04.2024 10:00',
    method: 'Cash',
    amount: '800.00',
    status: 'Paid',
  },
];

const Payment = () => {
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [method, setMethod] = useState('');
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={paymentsData}
          keyExtractor={item => item.id}
          renderItem={({item}) => <PaymentItem {...item} />}
          style={styles.paymentList}
        />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          label="Payment type"
          value={type}
          onChangeText={setType}
          mode="outlined"
          style={styles.input}
          right={<TextInput.Icon name="menu-down" />}
        />
        <TextInput
          label=""
          value={date}
          onChangeText={setDate}
          mode="outlined"
          style={styles.input}
          right={<TextInput.Icon name="calendar" />}
          placeholder="Date"
        />
        <TextInput
          label="Payment method"
          value={method}
          onChangeText={setMethod}
          mode="outlined"
          style={styles.input}
          right={<TextInput.Icon name="menu-down" />}
        />
        <TextInput
          label="Value"
          value={value}
          onChangeText={setValue}
          mode="outlined"
          style={styles.input}
          keyboardType="numeric"
        />
        <Button
          icon="plus"
          mode="contained"
          onPress={() => console.log('Add payment')}
          style={styles.addButton}>
          Add payment
        </Button>
      </View>
    </View>
  );
};

const PaymentItem = ({type, date, method, amount, status}) => {
  const statusStyles = status === 'Paid' ? styles.paid : styles.pending;
  return (
    <View style={styles.paymentItem}>
      <Text style={styles.paymentType}>{type}</Text>
      <Text style={styles.paymentDate}>{date}</Text>
      <View style={styles.paymentMethod}>
        <Icon
          name={method === 'Card' ? 'credit-card' : 'money'}
          size={20}
          color="#000"
        />
        <Text>{method}</Text>
      </View>
      <TouchableOpacity style={[styles.statusButton, statusStyles]}>
        <Text style={styles.statusText}>{status}</Text>
      </TouchableOpacity>
      <Text style={styles.amount}>{`${amount} €`}</Text>
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
});
