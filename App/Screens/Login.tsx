import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../Constants/Colors';
import {ActivityIndicator, TextInput} from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import Toast from 'react-native-toast-message';
import useDispatch from '../Hooks/useDispatch';
import { login } from '../Redux/Reducers/loginReducer';
import useAppSelector from '../Hooks/useSelector';

const Login = ({ navigation }: any) => {
  const [email, setText] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [password,setPassword] = React.useState('')
  const dispatch = useDispatch();
  const loginLoading = useAppSelector(
    state => state.loginReducer.loading,
  );

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry); 
  };

  const handleLogin = async () => {
    try {
        const loginResponse = await dispatch(
          login({
            email,
            password,
            usertype:"CMSAdmin",
          })
        );
        if (loginResponse.payload.status === 'S') {
          Toast.show({
            type: 'success',
            text1: "Login Success",
          });
          navigation.navigate('Root');
        } else {
          Toast.show({
            type: 'error',
            text1: loginResponse.payload.message,
          });
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
        });
      }
  }
  return (
    <View style={styles.Container}>
      <View style={styles.imageContainer}>
        <Animatable.Image   animation={'fadeInLeft'} source={require('../Assets/car.png')} style={styles.logo} />
      </View>
      {/* Login form */}
      <View>
        <Text style={styles.Headings}>HELLO THERE,</Text>
        <Text style={styles.Headings}>WELCOME BACK</Text>
      </View>
      <View style={{marginTop: 20, marginBottom: 20}}>
        <Text style={{fontSize: 16}}>Sign in to continue</Text>
      </View>

      <View style={{marginBottom: 15}}>
        <TextInput
          label="Email"
          value={email}
          mode="outlined"
          outlineStyle={{
            borderColor: Colors.black,
            backgroundColor: Colors.Iconwhite,
          }}
          placeholderTextColor={Colors.primary}
          onChangeText={text => setText(text)}
          theme={{colors: {text: Colors.primary, placeholder: Colors.primary}}}
        />
      </View>
      <View>
        <TextInput
          label="Password"
          value={password}
          mode="outlined"
          outlineStyle={{
            borderColor: Colors.black,
            backgroundColor: Colors.Iconwhite,
          }}
          placeholderTextColor={Colors.primary}
          onChangeText={text => setPassword(text)}
          secureTextEntry={secureTextEntry}
          right={<TextInput.Icon icon={secureTextEntry ? 'eye-off' : 'eye'} onPress={togglePasswordVisibility} /> }
          // Add eye icon and onPress event to toggle password visibility
          theme={{colors: {text: Colors.primary, placeholder: Colors.primary}}}
        />
        <Text style={{textAlign:'right',marginTop:10,color:Colors.black,fontFamily:'Bungee-Regular'}}>Forget Password?</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
      {loginLoading === "pending" ? 
            
            <ActivityIndicator size={'small'}  color={'white'} /> 
        : 
        <Text style={{color:Colors.Iconwhite,fontSize:15}}>LOGIN</Text>}
       
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.Iconwhite,
    paddingLeft: 15,
    paddingRight:15
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  logo: {
    height: 160,
    width: 160,
    marginLeft:-10
    // resizeMode: 'contain',
  },
  Headings: {
    fontSize: 40,
    color: Colors.black,
    lineHeight:39.6,
    fontFamily:"Bungee-Regular"
  },
  button:{
    width:"100%",
    padding:15,
    alignItems:'center',
    backgroundColor:Colors.black,
    marginTop:10
  }
});