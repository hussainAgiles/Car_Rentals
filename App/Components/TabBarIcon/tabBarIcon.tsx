import React from 'react';
import {View,StyleSheet} from 'react-native';
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

const TabIcon: React.FC<TabIconProps> = ({ name, color, size, focused, label }) => {
  return (
    <View style={styles.iconContainer}>
      <Icon name={name} color={focused ? Colors.primary : color} size={30} />
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
    fontSize: 15, // Choose a size that fits well
    textAlign: 'center',
    marginTop: 2, // Adjust margin to align text below the icon
  },
});
