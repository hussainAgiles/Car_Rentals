import React, { useState } from 'react';
import { Modal, Button, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

interface CalendarModalProps {
  visible: boolean;
  onCancel: () => void;
  onApply: (startDate: Date, endDate: Date) => void;
}

const CalendarModal: React.FC<CalendarModalProps> = ({ visible, onCancel, onApply }) => {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  const handleDayPress = (day: any) => {
    if (!selectedStartDate || selectedEndDate) {
      setSelectedStartDate(new Date(day.timestamp));
      setSelectedEndDate(null);
    } else {
      setSelectedEndDate(new Date(day.timestamp));
    }
  };

  const handleApply = () => {
    if (selectedStartDate && selectedEndDate) {
      onApply(selectedStartDate, selectedEndDate);
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View>
        <Calendar
          current={new Date()}
          minDate={new Date()}
          onDayPress={handleDayPress}
          markedDates={{
            [selectedStartDate?.toISOString().split('T')[0]]: { selected: true, startingDay: true, color: 'blue' },
            [selectedEndDate?.toISOString().split('T')[0]]: { selected: true, endingDay: true, color: 'blue' },
          }}
        />
        <Button title="Cancel" onPress={onCancel} />
        <Button title="Apply" onPress={handleApply} />
      </View>
    </Modal>
  );
};

export default CalendarModal;
