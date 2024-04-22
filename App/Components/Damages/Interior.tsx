import React, {useEffect, useState} from 'react';
import {Modal, Portal, Button, RadioButton, Avatar} from 'react-native-paper';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Image,
  LogBox,
  Platform,
} from 'react-native';
import {Svg, Path, Ellipse} from 'react-native-svg';
import Colors from '../../Constants/Colors';
import useDispatch from '../../Hooks/useDispatch';
import useAppSelector from '../../Hooks/useSelector';
import {
  createDamagee,
  deleteDamagee,
  fetchCustomers,
  fetchSVG,
} from '../../Redux/Reducers/ReservationDetailsReducer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Dropdown} from 'react-native-element-dropdown';
import ImageCropPicker from 'react-native-image-crop-picker';
import {ImageBase_URL} from '../../API/Constants';

const Interior = ({item}: any) => {
  LogBox.ignoreAllLogs();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const {svg} = useAppSelector(state => state.fetchSvgReducer);
  const [editId, setEditId] = useState('');
  useEffect(() => {
    dispatch(fetchSVG(item?.reservation?.fleet_master?.id));
    dispatch(fetchCustomers());
  }, [refreshData,editId]);

  const [damageTitle, setDamageTitle] = useState('');
  const [damageDescription, setDamageDescription] = useState('');
  const [damageSeverity, setDamageSeverity] = useState('low');
  const {customers} = useAppSelector(state => state.fetchCustomers);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [image, setImage] = useState(null);
  const [data_id, setData_id] = useState('');

  const [image_url,setImageUrl] = useState('')

  // Example customers

  const openModal = (id: string) => {
    setData_id(id);
    setValue(item?.reservation?.customers?.id);
    setModalVisible(true);
  };
  const closeModal = () => setModalVisible(false);
  const customerDropdownData = customers?.customers?.map(
    (customer: {full_name: any; id: any}) => ({
      label: customer.full_name, // Adjust 'full_name' if the field has a different name
      value: customer.id, // Adjust 'id' if your customer identifier has a different field name
    }),
  );

  const selectImage = async () => {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'App needs access to your camera',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );

            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Camera permission denied');
                return;
            }
        } catch (err) {
            console.warn(err);
            return;
        }
    }

    // Common alert for both Android and iOS
    Alert.alert(
        'Select Image',
        'Choose an option',
        [
            {
                text: 'Take Photo',
                onPress: () => {
                    ImageCropPicker.openCamera({
                        mediaType: 'photo',
                        cropping: true, // Enable cropping
                        compressImageQuality: 0.5,
                    })
                    .then(image => {
                        setImage(image.path); // `path` is used instead of `uri`
                    })
                    .catch(e => {
                        if (e.code !== 'E_PICKER_CANCELLED') {
                            Alert.alert('Error', 'Taking photo was cancelled.');
                        }
                    });
                },
            },
            {
                text: 'Choose from Gallery',
                onPress: () => {
                    ImageCropPicker.openPicker({
                        mediaType: 'photo',
                        cropping: true, // Enable cropping
                        compressImageQuality: 0.5,
                    })
                    .then(image => {
                        setImage(image.path); // `path` is used instead of `uri`
                    })
                    .catch(e => {
                        if (e.code !== 'E_PICKER_CANCELLED') {
                            Alert.alert('Error', 'Image selection was cancelled.');
                        }
                    });
                },
            },
            {
                text: 'Cancel',
                style: 'cancel',
            },
        ],
        { cancelable: true }
    );
};

  const handleCreateDamage = () => {
    let object = {
      type: 'Exterior',
      title: damageTitle,
      description: damageDescription,
      damage_level: damageSeverity,
      vehicle_id: item?.reservation?.fleet_master?.vehicledetails?.id,
      client_id: item?.reservation?.customers?.id,
      image_url: image,
      reservation_id: item?.reservation?.fleet_id,
      data_id: data_id,
      ...(editId ? {id: editId} : {}),
    };
    const response = dispatch(createDamagee(object));
    setDamageTitle('');
    setDamageDescription('');
    setDamageSeverity('low'); // or another default value
    setImage(null);
    setValue(null); // Reset dropdown
    setIsFocus(false); // Reset dropdown focus
    setData_id('');
    setRefreshData(!refreshData);
    setEditId('');
    setModalVisible(false);
  };

  const handleEdit = (id: string) => {
    const editData = svg.damages_details.find(
      (item: {id: string}) => item.id === id,
    );
    setDamageTitle(editData.title);
    setDamageSeverity(editData.damage_level);
    setDamageDescription(editData.description);
    setImageUrl(editData.image_url);
    setValue(editData.client_id);
    setIsFocus(false);
    setData_id(editData.reservation_id);
    setEditId(editData.id);
    setModalVisible(true);
  };

  const handleConfirmDelete = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this damage record?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => handleDeleteDamage(),
        },
      ],
      {cancelable: false},
    );
  };

  const handleDeleteDamage = () => {
    // Assuming you have a deleteDamage action similar to createDamagee
    dispatch(deleteDamagee(editId));
    closeModal();
    setRefreshData(!refreshData); // To refresh the list
  };

  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Svg height="380" width="238.4" viewBox="0 0 498.4 623">
          {svg?.car_exterior_array?.map((part, index) => {
            const Element =
              part.type === 'path'
                ? Path
                : part.type === 'ellipse'
                ? Ellipse
                : null;
            return Element ? (
              <Element
                key={`${part.type}_${index}`}
                {...part}
                onPress={() => openModal(part.data_id)}
              />
            ) : null;
          })}
        </Svg>
      </View>

      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={closeModal}
          contentContainerStyle={styles.modalContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 5,
              paddingTop: 0,
              paddingBottom: 10,
            }}>
            <Text
              style={{fontSize: 20, fontWeight: 'bold', color: Colors.black}}>
              Add new damage
            </Text>
            <TouchableOpacity onPress={closeModal}>
              <Icon name={'cancel'} size={25} color={Colors.red} />
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="Damage Title"
            value={damageTitle}
            onChangeText={setDamageTitle}
            style={styles.input}
          />
          <TextInput
            placeholder="Damage Description"
            value={damageDescription}
            onChangeText={setDamageDescription}
            multiline
            style={styles.input}
          />
          <Text style={{fontSize: 20, fontWeight: 'bold', color: Colors.black}}>
            Choose damage level:
          </Text>
          <RadioButton.Group
            onValueChange={value => setDamageSeverity(value)}
            value={damageSeverity}>
            <View style={styles.radioButtonRow}>
              <Text>Low</Text>
              <RadioButton value="low" />
              <Text>Medium</Text>
              <RadioButton value="medium" />
              <Text>High</Text>
              <RadioButton value="high" />
              <Text>Very High</Text>
              <RadioButton value="very_high" />
            </View>
          </RadioButton.Group>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={customerDropdownData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select item' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value); // set to item.value to store the selected customer's ID
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              <Icon
                style={styles.icon}
                color={isFocus ? 'blue' : 'black'}
                name="person"
                size={20}
              />
            )}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: Colors.black,
              marginTop: 10,
            }}>
            Damage photos:
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginTop: 5,
            }}>
            <TouchableOpacity
              onPress={selectImage}
              style={{
                borderWidth: 1,
                borderColor: 'black',
                height: 100,
                width: 100,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}>
              <Text>Drop the photos</Text>
            </TouchableOpacity>

            <View style={{flexDirection:'row'}}>
            {image && (
              <Image
                source={{uri: image}}
                style={{width: 80, height: 80, marginLeft: 20}}
              />
            )}
             {image_url && (
              <Image
                source={{uri: ImageBase_URL+image_url}}
                style={{width: 80, height: 80, marginLeft: 20,borderRadius:40}}
              />
            )}
            </View>
          

          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center',marginTop:20}}>
            {editId && (
              <Button
                mode="contained"
                buttonColor={Colors.red}
                onPress={handleConfirmDelete}
                style={{marginRight: 10}}>
                Remove
              </Button>
            )}
            <Button mode="contained" buttonColor={Colors.primary} onPress={handleCreateDamage}>
              Submit
            </Button>
          </View>
        </Modal>
      </Portal>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: 40,
          paddingRight: 40,
        }}>
        <Text style={{fontWeight: 'bold', color: Colors.black}}>
          Vehicle Part
        </Text>
        <Text style={{fontWeight: 'bold', color: Colors.black}}>Condition</Text>
      </View>
      <View>
        {svg?.damages_details?.map((item: any) => (
          <TouchableOpacity onPress={() => handleEdit(item.id)}>
            <View
              key={item.id}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 40,
                paddingRight: 40,
                marginTop: 10,
                paddingBottom: 10,
              }}>
              <Avatar.Image
                size={30}
                source={{
                  uri: ImageBase_URL + item.image_url,
                }}
              />
              <Text>{item.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Interior;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Iconwhite,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
  },
  input: {
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: Colors.black,
    borderRadius: 6,
    padding:Platform.OS === 'ios' ? 8 : 0
  },
  radioButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    color: Colors.primary,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
