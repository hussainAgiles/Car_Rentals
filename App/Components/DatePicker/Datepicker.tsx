import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Colors from '../../Constants/Colors';

const DateRangePicker = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [isStartDatePicker, setIsStartDatePicker] = useState(true);

  const handleConfirm = (date: Date) => {
    if (isStartDatePicker) {
      setSelectedStartDate(date);
      setIsStartDatePicker(false);
    } else {
      setSelectedEndDate(date);
      setIsVisible(false);
    }
  };

  const openDatePicker = (isStart: boolean) => {
    setIsStartDatePicker(isStart);
    setIsVisible(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => openDatePicker(true)} style={styles.input}>
        <Text style={{color:Colors.black}}>{selectedStartDate ? selectedStartDate.toDateString() : 'Select From Date'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openDatePicker(true)} style={styles.input}>
        <Text style={{color:Colors.black}}>{selectedEndDate ? selectedEndDate.toDateString() : 'Select To Date'}</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setIsVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    color:Colors.black
  },
});

export default DateRangePicker;
