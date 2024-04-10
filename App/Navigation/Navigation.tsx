import { createStackNavigator } from "@react-navigation/stack";
import MainNavigator from "./MainNavigation";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../Screens/Login";



export type RootStackParamList = {
    Root: any;
    Login:any,
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
    return (
      <Stack.Navigator screenOptions={{ headerShown: false}} initialRouteName="Root">
        <Stack.Screen
          name="Root"
          component={MainNavigator}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen name="add_reservation" component={StepperForm} options={{ headerShown: false }}/> */}
      </Stack.Navigator>
    );
  }