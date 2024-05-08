import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/Store';
import Login from '../Screens/Login';
import Rental from '../Screens/Rental';
import MainNavigator from './MainNavigation';
import MaintenanceDetails from '../Components/Maintenance/MaintenanceDetails';

export type RootStackParamList = {
  Root: undefined;
  Login: undefined;
  Rental: {
    id: string;
  };
  MaintenanceDetails:undefined;
};

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { userData, error } = useSelector((state: RootState) => state.loginReducer);
  // console.log(userData);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userData && !error ? (
        // Only render these screens if there is userData and no error
        <>
          <Stack.Screen
            name="Root"
            component={MainNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Rental"
            component={Rental}
            options={{ headerShown: false }}
          />

          <Stack.Screen
          name="MaintenanceDetails"
          component={MaintenanceDetails}
        />
        </>
      ) : (
        // Fallback to the Login screen if there's no userData or there's an error
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}
