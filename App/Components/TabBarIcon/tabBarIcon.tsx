import React from 'react';
import {View,StyleSheet,Dimensions,Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from '../Text/Text';
import Colors from '../../Constants/Colors';
import { Title } from '../Text';

interface TabIconProps {
  name: string;
  color: string;
  size: number;
  focused: boolean;
  label: string;
}

// Helper function to determine if the device is an iPad
const isIpad = () => {
  const { width, height } = Dimensions.get('window');
  const aspectRatio = height / width;
  return Platform.OS === 'ios' && (aspectRatio < 1.6); // Adjust ratio as needed for iPads
};

const TabIcon: React.FC<TabIconProps> = ({ name, color, size, focused, label }) => {
  return (
    <View style={styles.iconContainer}>
      <Icon name={name} color={focused ? Colors.primary : color} size={isIpad() ? 30 : size} />
      <Text style={[
        styles.iconText,
        { color: focused ? Colors.primary : color, fontWeight: focused ? 'bold' : 'normal' }
      ]}>
        {label}
      </Text>
    </View>
  );
};

export default TabIcon;

// Styles for the TabIcon component
const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width:100,
  },
  iconText: {
    fontSize: isIpad() ? 15 : 12, // Choose a size that fits well
    textAlign: 'center',
    marginTop: 2, // Adjust margin to align text below the icon
  },
});
