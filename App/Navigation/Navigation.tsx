import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/Store';
import Login from '../Screens/Login';
import Rental from '../Screens/Rental';
import MainNavigator from './MainNavigation';

export type RootStackParamList = {
  Root: any;
  Login: any;
  Rental: {
    id: string;
  };
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
  const userData = useSelector((state: RootState) => state.loginReducer);
  // console.log("this is",userData);
  // if(userData){
  //   setClientToken(userData.userData.access_token);
  // }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <>
        {userData.userData ? (
          <>
            <Stack.Screen
              name="Root"
              component={MainNavigator}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Rental"
              component={Rental}
              options={{headerShown: false}}
            />
          </>
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
