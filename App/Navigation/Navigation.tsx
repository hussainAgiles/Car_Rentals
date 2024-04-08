import { createStackNavigator } from "@react-navigation/stack";
import MainNavigator from "./MainNavigation";
import { NavigationContainer } from "@react-navigation/native";
import StepperForm from "../Components/StepperForm/SteeperForm";
import Step1Screen from "../Components/StepperForm/StepOne";


export type RootStackParamList = {
    Root: any;
    add_reservation:any,

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
      <Stack.Navigator screenOptions={{ headerShown: false}}>
        <Stack.Screen
          name="Root"
          component={MainNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="add_reservation" component={StepperForm} options={{ headerShown: false }}/>
      </Stack.Navigator>
    );
  }