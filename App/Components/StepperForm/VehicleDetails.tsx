import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../Constants/Colors';
import RNPickerSelect from 'react-native-picker-select';
import DropdownComponent from '../DropDown/Dropdown';
import {Checkbox, Searchbar, Switch} from 'react-native-paper';
import RenderGroup from '../../Components/Reservation/RenderGroupView';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import SearchDropdown from

const screenWidth = Dimensions.get('screen').width;

interface componentProps {
  title: string | null;
  
}

const VehicleDetails:React.FC<componentProps> = ({title}) => {



  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const [checked, setChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [enabledView, setEnabledView] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handlePress = () => {
    setEnabledView('Group');
  };

  const handleCustomVehicle = () => {
    setEnabledView('Custom Vehicles');
  };

  const handleDateConfirm = (date: Date) => {
    setSelectedDate(date);
    setDatePickerVisibility(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>{title}</Text>
      {/* Tariff and switch */}
      <View style={styles.dateContainer}>
        <View style={{flexDirection: 'column'}}>
          <Text style={[styles.text, {paddingBottom: 5}]}>Tariff</Text>
          <DropdownComponent options={['Day', 'Weekly', 'Month']} />
        </View>

        <View style={[styles.dateContainer, {marginTop: 15}]}>
          <Text style={{color: Colors.black}}>System Location</Text>
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
          <Text style={{color: Colors.black}}>Custom Location</Text>
        </View>
      </View>
      {/* Start and end date Picker */}
      <View style={[styles.dateContainer, {marginTop: 10}]}>
        <View style={{flexDirection: 'column', marginHorizontal: 10}}>
          <Text style={[styles.text, {paddingBottom: 10}]}>Start Date</Text>
          <TouchableOpacity
            onPress={() => setDatePickerVisibility(true)}
            style={{width: screenWidth * 0.38, borderWidth: 0.5, padding: 12}}>
            <Text style={{color: Colors.black}}>
              {selectedDate ? selectedDate.toDateString() : 'Select Date'}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={() => setDatePickerVisibility(false)}
            minimumDate={new Date()}
          />
        </View>
        <View style={{flexDirection: 'column', marginHorizontal: 10}}>
          <Text style={[styles.text, {paddingBottom: 10}]}>End Date</Text>
          <TouchableOpacity
            onPress={() => setDatePickerVisibility(true)}
            style={{width: screenWidth * 0.42, borderWidth: 0.5, padding: 12}}>
            <Text style={{color: Colors.black}}>
              {selectedDate ? selectedDate.toDateString() : 'Select Date'}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={() => setDatePickerVisibility(false)}
            minimumDate={new Date()}
          />
        </View>
      </View>
      {/* pickup and Drop location */}
      <View style={[styles.dateContainer, {marginTop: 10}]}>
        <View
          style={{flexDirection: 'column', justifyContent: 'space-between',marginHorizontal: 10}}>
          <Text style={[styles.text, {paddingBottom: 10}]}>
            Pickup Location
          </Text>
          <DropdownComponent options={['Bengaluru', 'Koramangla', 'Marathahalli']} />
        </View>
        <View
          style={{flexDirection: 'column', justifyContent: 'space-between',marginHorizontal: 10}}>
          <Text style={[styles.text, {paddingBottom: 10}]}>
            Drop Location
          </Text>
          <DropdownComponent options={['Bengaluru', 'Koramangla', 'Marathahalli']} />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 10,
          marginVertical: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Text style={{color: Colors.black}}>Return to another Location</Text>
        </View>
        {checked && (
          <View
            style={{flexDirection: 'column', marginLeft: screenWidth * 0.04}}>
            <Text style={[styles.text, {paddingBottom: 10}]}>
              Return Location
            </Text>
            <TextInput
              style={{borderWidth: 0.5, width: screenWidth * 0.4, height: 40}}
            />
          </View>
        )}
      </View>
      <View>
        <Searchbar
          placeholder="What car are you searching ?"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <Text
        style={{
          color: Colors.black,
          marginTop: 20,
          fontWeight: 'bold',
          fontSize: 18,
        }}>
        Found Vehicles
      </Text>
      <View style={{flexDirection: 'row', margin: 15}}>
        <TouchableOpacity
          style={[
            styles.tabs,
            enabledView === 'Group' && {borderBottomWidth: 1},
            {marginRight: 20},
          ]}
          onPress={handlePress}>
          <Text style={{color: Colors.black}}>Group</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabs,
            enabledView === 'Custom Vehicles' && {borderBottomWidth: 1},
          ]}
          onPress={handleCustomVehicle}>
          <Text style={{color: Colors.black}}>Custom Vehicles</Text>
        </TouchableOpacity>
      </View>
      <RenderGroup />
    </ScrollView>
  );
};

export default VehicleDetails;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.black,
    fontSize: 15,
    fontWeight: '500',
  },
  tabs: {
    borderBottomWidth: 1,
  },
});
