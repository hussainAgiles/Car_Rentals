import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import ImageCropPicker from 'react-native-image-crop-picker';
import { Button, Modal, Portal, RadioButton,Tooltip } from 'react-native-paper';
import { Ellipse, Path, Svg } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ImageBase_URL } from '../../API/Constants';
import Colors from '../../Constants/Colors';
import useDispatch from '../../Hooks/useDispatch';
import useAppSelector from '../../Hooks/useSelector';
import {
  Customers, createDamagee, deleteDamagee,
  fetchSVG
} from '../../Redux/Reducers/ReservationDetailsReducer';
import DamageList from './DamageList';

const Exterior = ({ item }: any) => {
  // console.log("this is the item",item)
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshData, setRefreshData] = useState(false);

  const { svg } = useAppSelector(state => state.fetchSvgReducer);

  const [editId, setEditId] = useState('');
  const [data_id, setData_id] = useState('');
  const [damageTitle, setDamageTitle] = useState('');
  const [damageDescription, setDamageDescription] = useState('');
  const [damageSeverity, setDamageSeverity] = useState('low');
  const { customersData } = useAppSelector(state => state.fetchCustomers);
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [image, setImage] = useState('');
  const [image_url, setImageUrl] = useState('');
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [extension, setExtension] = useState('');
  const [mimetype, setMimeType] = useState('');
  const [selectedDataId, setSelectedDataId] = useState('');

  const [exteriorDmg, setExteriorDmg] = useState([])


  // Use this function to trigger a refresh
  const triggerRefresh = () => {
    setRefreshCounter(prev => prev + 1);
  };

  useEffect(() => {
    const loadData = () => {
      dispatch(fetchSVG(item?.reservation?.fleet_id));
      dispatch(Customers());

    };

    const debouncedLoadData = debounce(loadData, 300);
    debouncedLoadData();

    return () => debouncedLoadData.cancel();
  }, [editId, refreshCounter, refreshData,svg?.car_exterior_array]);


  useEffect(() => {
    // This will fetch damages whenever the svg data changes which should happen
    // after create, update, or delete operations if your state management is set up correctly.
    if (svg?.damages_details) {
      // console.log("each time this is called")
      fetchingExteriorDmg();
    }
  }, [svg?.damages_details]);

  // console.log("Damage details == ",svg?.damages_details)
  
  const fetchingExteriorDmg = () => {
    const exterior = svg?.damages_details.filter(d => d.type === "Exterior") || [];
    // console.log("Updated exterior damages:", exterior);
    setExteriorDmg(exterior);
  };

  const openModal = (id: string) => {
    if (selectedDataId === id) {
      // If part is already selected, open modal
      setData_id(id);
      setValue(item?.reservation?.customers?.id);
      setModalVisible(true);
    } else {
      // Otherwise, mark the part as selected
      setSelectedDataId(id);
    }

  };
  const closeModal = () => {
    setModalVisible(false);
    resetModalState();
  };

  const resetModalState = () => {
    setEditId('');
    setDamageTitle('');
    setDamageDescription('');
    setDamageSeverity('low');
    setImage('');
    setExtension('');
    setImageUrl('');
    setValue('');
    setSelectedDataId('');
  };

  interface Customer {
    full_name: string;
    id: string;
  }

  const customerDropdownData: { label: string; value: string }[] =
    customersData?.map((customer: Customer) => ({
      label: customer.full_name,
      value: customer.id,
    })) || [];

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
              includeBase64: true,
              compressImageQuality: 0.5,
            })
              .then(image => {
                // console.log("image");
                if (image.data) {
                  setImage(image.data);
                } else {
                  setImage('');
                  // Handle null or undefined case
                }
                setExtension(image.path);
                setMimeType(image.mime);
                // setImage(image.path); // `path` is used instead of `uri`
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
              cropping: true,
              includeBase64: true, // Enable cropping
              compressImageQuality: 0.5,
            })
              .then(image => {
                // console.log("image",image);
                if (image.data) {
                  setImage(image.data);
                } else {
                  setImage('');
                  // Handle null or undefined case
                }
                setExtension(image.path); // `path` is used instead of `uri`
                setMimeType(image.mime);
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
      { cancelable: true },
    );
  };

  const handleCreateDamage = () => {
    let object = {
      type: 'Exterior',
      title: damageTitle,
      description: damageDescription,
      damage_level: damageSeverity,
      vehicle_id: item?.reservation?.fleet_id,
      client_id: item?.reservation?.customers?.id,
      image_url: image_url,
      reservation_id: item?.reservation?.id,
      entity_id:item?.reservation?.fleet_id,
      entity_name: item.reservation.reservations_status === "Reserved" ? "Rental" : "Return",
      data_id: data_id,
      device: 'mobile',
      imagedata: {
        image: image,
        folder: 'damage',
        filename: 'damage',
        width: '320',
        height: '200',
        extension: mimetype,
      },
      ...(editId ? { id: editId } : {}),
    };
    const response = dispatch(createDamagee(object));
    // console.log("this is the edit response third == ",response)
    resetModalState();
    fetchingExteriorDmg();
    setRefreshData(!refreshData);
    setExtension('');
    setModalVisible(false);
    triggerRefresh();
  };

  const handleEdit = (id: string) => {
    const editData = svg.damages_details.find(
      (item: { id: string }) => item.id === id,
    );
    // console.log("Image url ====",editData)
    setRefreshData(!refreshData);
    setDamageTitle(editData.title);
    setDamageSeverity(editData.damage_level);
    setDamageDescription(editData.description);
    setImageUrl(editData.image_url);
    setValue(editData.client_id);
    setIsFocus(false);
    setImage('');
    setExtension('');
    setData_id(editData.data_id);
    setEditId(editData.id);
    setModalVisible(true);
    fetchingExteriorDmg();
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
      { cancelable: false },
    );
  };

  const handleDeleteDamage = () => {
    dispatch(deleteDamagee(editId));
    closeModal();
    fetchingExteriorDmg();
    setRefreshData(!refreshData); // To refresh the list
  };

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Svg height="380" width="238.4" viewBox="0 0 498.4 623">
          {svg?.car_exterior_array?.map((part: any, index: string) => {
            const isSelected = part.data_id === selectedDataId; // Check if the part is selected
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
                strokeMiterlimit={part.strokeMiterlimit}
                strokeWidth={part.strokeWidth}
                stroke={part.stroke || '#000'}
                fill={isSelected ? Colors.grey : part.fill || 'none'} // Change fill color if selected
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
              style={{ fontSize: 20, fontWeight: 'bold', color: Colors.black }}>
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
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.black }}>
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
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
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
              if (item) {
                // Check if item is not null
                setValue(item.value);
              } // set to item.value to store the selected customer's ID
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

            <View style={{ flexDirection: 'row' }}>
              {extension && (
                <Image
                  source={{ uri: extension }}
                  style={{ width: 80, height: 80, marginLeft: 20 }}
                />
              )}
              {image_url && (
                <Image
                  source={{ uri: ImageBase_URL + image_url }}
                  style={{
                    width: 80,
                    height: 80,
                    marginLeft: 20,
                    borderRadius: 40,
                  }}
                />
              )}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            {editId && (
              <Button
                mode="contained"
                buttonColor={Colors.red}
                onPress={handleConfirmDelete}
                style={{ marginRight: 10 }}>
                Remove
              </Button>
            )}
            <Button
              mode="contained"
              buttonColor={Colors.primary}
              onPress={handleCreateDamage}>
              Submit
            </Button>
          </View>
        </Modal>
      </Portal>

      <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          color: Colors.black,
          marginBottom: 10,
        }}>
        Damage Report
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 40,
          borderWidth: 0.5,
          borderColor: Colors.primary,
          backgroundColor: Colors.primary
        }}>
        <Text style={{ fontWeight: 'bold', color: Colors.Iconwhite }}>
          Vehicle Part
        </Text>
        <View style={styles.divider}></View>
        <Text style={{ fontWeight: 'bold', color: Colors.Iconwhite, }}>Condition</Text>
      </View>
      <View>
        <DamageList damages={exteriorDmg} handleEdit={handleEdit} />
      </View>
    </View>
  );
};

export default Exterior;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Iconwhite,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  divider: {
    width: 2, // Width of the divider
    backgroundColor: Colors.Iconwhite, // Color of the divider
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
    padding: Platform.OS === 'ios' ? 8 : 0,
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
