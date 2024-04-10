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

const screenWidth = Dimensions.get('window').width;

type RenderVehicleProps = {
  item: {
    id: number;
    info: string;
    Status: string;
    Pickup: string;
    drop: string;
    Vehicle: string;
    client: string;
    Amount: number;
    actions: string;
    Vehicle_number: string;
    image: string;
    type: string;
  };
};

const RenderVehicles: React.FC<RenderVehicleProps> = ({ item }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.container}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.details}>
          <Text style={styles.title}>{item.Vehicle}</Text>
          <View style={styles.infoContainer}>
            <Text style={[styles.info, { backgroundColor: '#64B5F6',borderRadius:10,padding:5,textAlign:'center'}]}>
              {item.type}
            </Text>
            <View style={styles.iconText}>
              <Icon name="user" size={15} color={Colors.black} style={{marginRight:10}} />
              <Text style={styles.info}>{item.client}</Text>
            </View>
            <View style={styles.iconText}>
              <Icon name="location-pin" size={20} color={Colors.black} style={{marginRight:10}}/>
              <Text style={styles.info}>{item.Pickup}</Text>
            </View>
            <View style={styles.iconText}>
              <Icon name="location" size={20} color={Colors.black} style={{marginRight:10}} />
              <Text style={styles.info}>{item.drop}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 15,
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
    padding: 10,
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
    marginTop: 5,
  },
  info: {
    color: Colors.black,
    fontSize: 15,
  },
});

export default RenderVehicles;
