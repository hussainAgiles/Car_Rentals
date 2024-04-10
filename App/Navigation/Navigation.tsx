import {createStackNavigator} from '@react-navigation/stack';
import MainNavigator from './MainNavigation';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../Screens/Login';
import {useEffect, useState} from 'react';
import useIsMounted from '../Hooks/useIsMounted';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../Redux/Store';

export type RootStackParamList = {
  Root: any;
  Login: any;
};

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userData = useSelector((state: RootState) => state.loginReducer);
  // console.log("UserData====", userData);
  useEffect(() => {
    // For demonstration, setting isLoggedIn to true directly
    if (userData) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();
function RootNavigator() {
  const userData = useSelector((state: RootState) => state.loginReducer);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <>
        {userData.userData ? (
          <Stack.Screen
            name="Root"
            component={MainNavigator}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
        )}
      </>

      {/* <Stack.Screen name="add_reservation" component={StepperForm} options={{ headerShown: false }}/> */}
    </Stack.Navigator>
  );
}
