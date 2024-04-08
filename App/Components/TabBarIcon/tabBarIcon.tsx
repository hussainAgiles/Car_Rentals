import React from 'react';
import {View} from 'react-native';
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

const TabIcon: React.FC<TabIconProps> = ({
  name,
  color,
  size,
  focused,
  label,
}) => {
  return (
    <View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name={name} color={focused ? Colors.primary : color } size={size} />
      </View>
      <Text
        size={10}
        style={{color: focused ? Colors.primary : color ,  fontWeight: focused ? 'bold' : 'normal', marginBottom: 5, marginTop: 1, fontSize: 12,textAlign:'center'}}>
        {label}
      </Text>
    </View>
  );
};

export default TabIcon;
