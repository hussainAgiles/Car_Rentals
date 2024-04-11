import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../Constants/Colors';
import Icon from 'react-native-vector-icons/Entypo';
import { ImageBase_URL } from '../../API/Constants';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

type RenderVehicleProps = {
  item: {
    id: number;
    // info: string;
    Status: string;
    Pickup: string;
    drop: string;
    Vehicle: string;
    client: string;
    rental_price: number;
    actions: string;
    Vehicle_number: string;
    image: string;
    type: string;
    pickup_date:string;
    dropoff_date:string;
    
  };
};

const RenderVehicles: React.FC<RenderVehicleProps> = ({ item }) => {
   const statusColor = item.Status === 'Rented'
    ? Colors.green
    : item.Status === 'Active'
    ? Colors.orange
    : item.Status === 'Returned'
    ? Colors.red
    : Colors.grey;


    const navigation = useNavigation();

    const handleRental = (id) => {
      navigation.navigate("Rental",{
        id:id
      });
    }
  return (
    <TouchableOpacity style={styles.card} onPress={() => handleRental(item.Vehicle_number)}> 
      <View style={styles.container}>
        <View style={{justifyContent:'center'}}>
        <Image
          source={{ uri:ImageBase_URL + item.image }}
          style={styles.image}
          resizeMode="contain"
        />
         <Text style={[styles.info,{textAlign:'center',fontWeight:'bold',marginTop:5}]}>{item.Vehicle_number}</Text>
        </View>
       
        <View style={styles.details}>
          <Text style={styles.title}>{item.Vehicle}</Text>
          <View style={styles.statusIndicator(statusColor)}>
            <Text style={styles.statusText}>{item.Status.toUpperCase()}</Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.iconText}>
              <Icon name="user" size={20} color={Colors.black} style={{marginRight:10}} />
              <Text style={styles.info}>{item?.client}</Text>
            </View>
            <View style={styles.iconText}>
              <Icon name="calendar" size={20} color={Colors.black} style={{marginRight:10}} />
              <Text style={styles.info}>{item?.pickup_date} - {item?.dropoff_date}</Text>
            </View>
            <View style={styles.iconText}>
              <Icon name="location-pin" size={20} color={Colors.black} style={{marginRight:10}}/>
              <Text style={styles.info}>{item?.Pickup}</Text>
            </View>
            <View style={styles.iconText}>
              <Icon name="location" size={20} color={Colors.black} style={{marginRight:10}} />
              <Text style={styles.info}>{item?.drop}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom:25,
  },
  statusIndicator: (backgroundColor:any) => ({
    backgroundColor,
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 6,
    alignSelf: 'flex-start',
    marginTop: 5,
  }),
  statusText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 15,
    overflow: 'hidden',
    padding:5
  },
  image: {
    width: screenWidth * 0.35,
    height: screenWidth * 0.35,
    borderRadius: 65,
    alignSelf: 'center',

  },
  details: {
    flex: 1,
    padding: 20,
  },
  title: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: 15,
  },
  infoContainer: {
    marginTop: 5,
  },
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'flex-start',
    alignSelf:'flex-start',
    marginTop: 5,
  },
  info: {
    color: Colors.black,
    fontSize: 15,
  },
});

export default RenderVehicles;
