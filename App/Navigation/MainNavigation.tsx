import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Platform} from 'react-native';
import Colors from '../Constants/Colors';
import TabIcon from '../Components/TabBarIcon/tabBarIcon';
import Reservations from '../Screens/Reservations';
import Fleet from '../Screens/Fleet';
import Maintenance from '../Screens/Maintenance';
import Home from '../Screens/Home';



const Tab = createBottomTabNavigator();

const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator
    initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors.black,
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarStyle: {
          padding: 2,
          height: Platform.OS === 'ios' ? 90 : 62,
          backgroundColor: Colors.Iconwhite,
          flexDirection: 'row',
        },
        headerShown: false,
        tabBarShowLabel: false,
      }}>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: props => (
                <TabIcon name="home-outline" {...props} label="Home" />
              ),
            }}
          />
          <Tab.Screen
            name="Reservation"
            component={Reservations}
            options={{
              tabBarIcon: props => (
                <TabIcon name="calendar-clock" {...props} label="Reservations" />
              ),
            }}
          />
          <Tab.Screen
            name="Fleet"
            component={Fleet}
            options={{
              tabBarIcon: props => (
                <TabIcon name="car" {...props} label="Fleet" />
              ),
            }}
          />
          <Tab.Screen
            name="Maintenance"
            component={Maintenance}
            options={{
              tabBarIcon: props => (
                <TabIcon
                  name="wrench-outline"
                  {...props}
                  label="Maintenance"
                />
              ),
            }}
          />
    </Tab.Navigator>
  );
};

export default MainNavigator;
