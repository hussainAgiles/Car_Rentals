import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../Constants/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface DropdownProps {
  options: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const selectOption = (option: string) => {
    setSelectedOption(option);
    setShowOptions(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdownHeader} onPress={toggleOptions}>
        <Text style={{color:Colors.black}}>{selectedOption || 'Select'}</Text>
        <Icon name='apple-keyboard-control' size={10} color={Colors.black}/>
      </TouchableOpacity>
      {showOptions && (
        <View style={styles.optionsContainer}>
          {options.map(option => (
            <TouchableOpacity
              key={option}
              style={styles.option}
              onPress={() => selectOption(option)}>
              <Text style={{color:Colors.black}}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )} 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
  },
  dropdownHeader: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: 5,
    width:100,
    marginRight:15,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  optionsContainer: {
    position: 'absolute',
    top: 40,
    right: 0,
    left: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    zIndex: 2,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Dropdown;
