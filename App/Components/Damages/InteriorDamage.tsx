import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  LogBox,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import ImageCropPicker from 'react-native-image-crop-picker';
import {Button, Modal, Portal, RadioButton} from 'react-native-paper';
import {Ellipse, G, Path, Svg} from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ImageBase_URL} from '../../API/Constants';
import Colors from '../../Constants/Colors';
import useDispatch from '../../Hooks/useDispatch';
import useAppSelector from '../../Hooks/useSelector';
import {
  Customers,
  createDamagee,
  deleteDamagee,
  fetchSVG,
} from '../../Redux/Reducers/ReservationDetailsReducer';
import DamageList from './DamageList';
import {debounce} from 'lodash';

const Interior = ({item}: any) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const {svg, dmgError} = useAppSelector(state => state.fetchSvgReducer);
  const [editId, setEditId] = useState('');
  const [damageTitle, setDamageTitle] = useState('');
  const [damageDescription, setDamageDescription] = useState('');
  const [damageSeverity, setDamageSeverity] = useState('low');
  const {customersData} = useAppSelector(state => state.fetchCustomers);
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [image, setImage] = useState('');
  const [data_id, setData_id] = useState('');
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [extension, setExtension] = useState('');
  const [mimetype, setMimeType] = useState('');
  const [selectedDataId, setSelectedDataId] = useState('');
  const [interiorDmg, setInteriorDmg] = useState([]);

  // Use this function to trigger a refresh
  const triggerRefresh = () => {
    setRefreshCounter(prev => prev + 1);
  };

  const [image_url, setImageUrl] = useState('');
  useEffect(() => {
    const loadData = () => {
      dispatch(fetchSVG(item?.reservation?.fleet_master?.id));
      dispatch(Customers());
    };

    const debouncedLoadData = debounce(loadData, 300);
    debouncedLoadData();

    return () => debouncedLoadData.cancel();
  }, [refreshCounter, editId, refreshData, svg?.car_interior_array]);

  useEffect(() => {
    // This will fetch damages whenever the svg data changes which should happen
    if (svg?.damages_details) {
      fetchingExteriorDmg();
    }
  }, [svg?.damages_details]);

  const fetchingExteriorDmg = () => {
    const interior =
      svg?.damages_details.filter(
        (d: {type: string}) => d.type === 'Interior',
      ) || [];
    setInteriorDmg(interior);
  };

  // Example customers

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

  const customerDropdownData: {label: string; value: string}[] =
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
              includeBase64: true,
              cropping: true, // Enable cropping
              compressImageQuality: 0.5,
            })
              .then(image => {
                if (image.data) {
                  setImage(image.data);
                } else {
                  setImage('');
                  // Handle null or undefined case
                }
                setExtension(image.path);
                setMimeType(image.mime); // `path` is used instead of `uri`
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
              includeBase64: true,
              cropping: true, // Enable cropping
              compressImageQuality: 0.5,
            })
              .then(image => {
                if (image.data) {
                  setImage(image.data);
                } else {
                  setImage('');
                  // Handle null or undefined case
                }
                setExtension(image.path);
                setMimeType(image.mime); // `path` is used instead of `uri`
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
      {cancelable: true},
    );
  };

  const handleCreateDamage = () => {
    let object = {
      type: 'Interior',
      title: damageTitle,
      description: damageDescription,
      damage_level: damageSeverity,
      vehicle_id: item?.reservation?.fleet_master?.vehicledetails?.id,
      client_id: item?.reservation?.customers?.id,
      image_url: image_url,
      reservation_id: item?.reservation?.fleet_id,
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
      ...(editId ? {id: editId} : {}),
    };
    // console.log("edit object === ",object)
    try {
      const response = dispatch(createDamagee(object));
      console.log(dmgError);
    } catch (error) {
      console.log(
        'Response fetch error reducers',
        error || 'An error occurred',
      );
    }
    resetModalState();
    setRefreshData(!refreshData);
    setModalVisible(false);
    triggerRefresh();
  };

  const handleEdit = (id: string) => {
    // console.log("Interior")
    const editData = svg.damages_details.find(
      (item: {id: string}) => item.id === id,
    );
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

  const renderElement = (element: any, index: string) => {
    const {
      type,
      d,
      strokeMiterlimit,
      strokeWidth,
      stroke,
      fill,
      cx,
      cy,
      rx,
      ry,
      data_id,
    } = element;
    const isSelected = data_id === selectedDataId;
    switch (type) {
      case 'Path':
        return (
          <Path
            key={`path-${index}`}
            d={d}
            data_id={data_id || ''}
            onPress={() => openModal(data_id)}
            strokeMiterlimit={strokeMiterlimit}
            strokeWidth={strokeWidth}
            stroke={stroke || '#000'}
            fill={isSelected ? Colors.grey : fill || 'none'} // Default stroke color if none provided    // Default fill if none provided
          />
        );
      case 'Ellipse':
        return (
          <Ellipse
            key={`ellipse-${index}`}
            cx={cx}
            cy={cy}
            rx={rx}
            ry={ry}
            data_id={data_id || ''}
            onPress={() => openModal(data_id)}
            strokeMiterlimit={strokeMiterlimit}
            strokeWidth={strokeWidth}
            stroke={stroke || '#000'} // Default stroke color
            fill={isSelected ? Colors.grey : fill || 'none'}
            // Default fill
          />
        );
      default:
        return null; // Properly handle unrecognized types
    }
  };

  const groups = [];
  let currentGroup:
    | (number & any[])
    | (false & any[])
    | (true & any[])
    | (React.ReactElement<any, string | React.JSXElementConstructor<any>> &
        any[])
    | (Iterable<React.ReactNode> & any[])
    | (React.JSX.Element | null)[] = [];

  svg?.car_interior_array.forEach((element: any, index: string) => {
    if (element.type === 'G-1' || element.type === 'G-2') {
      if (currentGroup.length > 0) {
        groups.push(<G key={`group-${groups.length}`}>{currentGroup}</G>);
        currentGroup = [];
      }
    } else {
      currentGroup.push(renderElement(element, index));
    }
  });

  // Add the last group if it exists
  if (currentGroup.length > 0) {
    groups.push(<G key={`group-${groups.length}`}>{currentGroup}</G>);
  }

  const renderPathElements = seq => {
    return svg?.car_interior_array
      .filter(item => item.type === 'path' && item.seq === seq)
      .map((item, index) => (
        <Path
          key={index}
          data-id={item.data_id}
          fill={item.fill}
          stroke={item.stroke}
          strokeWidth={item.stroke_width}
          strokeLinecap={item.stroke_linecap}
          strokeLinejoin={item.stroke_linejoin}
          strokeMiterlimit={item.stroke_miterlimit}
          className={item.class}
          d={item.d}
          onPress={() => openModal(data_id)}
        />
      ));
  };

  const renderEllipseElements = seq => {
    return svg?.car_interior_array
      .filter(item => item.type === 'ellipse' && item.seq === seq)
      .map((item, index) => (
        <Ellipse
          key={index}
          data-id={item.data_id}
          fill={item.fill}
          className={item.class}
          cx={item.cx}
          cy={item.cy}
          rx={item.rx}
          ry={item.ry}
          onPress={() => openModal(data_id)}
        />
      ));
  };

  const renderGElements = seq => {
    return svg?.car_interior_array
      .filter(item => item.type === 'g' && item.seq === seq)
      .map((item, index) => (
        <G key={index} className={item.class}>
          {/* Add other SVG elements inside the <G> element if needed */}
        </G>
      ));
  };

  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Svg height="380" width="238.4" viewBox="0 0 380 474.8">
          {renderPathElements(1)}
          {renderPathElements(2)}
          {renderPathElements(3)}
          {renderPathElements(4)}
          {renderPathElements(5)}
          {renderPathElements(6)}
          {renderPathElements(7)}
          {renderPathElements(8)}
          {renderPathElements(9)}
          {renderPathElements(10)}
          {renderPathElements(11)}
          {renderPathElements(12)}
          {renderPathElements(13)}
          {renderPathElements(14)}
          {renderPathElements(15)}
          {renderPathElements(16)}
          {renderPathElements(17)}
          {renderPathElements(18)}
          {renderGElements(19)}
          {renderPathElements(20)}
          {renderPathElements(21)}
          {renderPathElements(22)}
          {renderPathElements(23)}
          {renderPathElements(24)}
          {renderGElements(25)}
          {renderPathElements(26)}
          {renderPathElements(27)}
          {renderPathElements(28)}
          {renderGElements(29)}
          {renderPathElements(30)}
          {renderPathElements(31)}
          {renderPathElements(32)}
          {renderGElements(33)}
          {renderPathElements(34)}
          {renderEllipseElements(35)}
          {renderPathElements(36)}
          {renderGElements(37)}
          {renderPathElements(38)}
          {renderPathElements(39)}
          {renderPathElements(40)}
          {renderGElements(41)}
          {renderPathElements(42)}
          {/* {renderPathElements(13)}
          {renderEllipseElements(14)}
          {renderGElements(4)}
          {renderGElements(9)} */}
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
              if (item) {
                setValue(item.value);
              }
              // set to item.value to store the selected customer's ID
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

            <View style={{flexDirection: 'row'}}>
              {extension && (
                <Image
                  source={{uri: extension}}
                  style={{width: 80, height: 80, marginLeft: 20}}
                />
              )}
              {image_url && (
                <Image
                  source={{uri: ImageBase_URL + image_url}}
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
                style={{marginRight: 10}}>
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

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 40,
          borderWidth: 0.5,
          borderColor: Colors.primary,
          backgroundColor: Colors.primary,
        }}>
        <Text style={{fontWeight: 'bold', color: Colors.Iconwhite}}>
          Vehicle Part
        </Text>
        <View style={styles.divider}></View>
        <Text style={{fontWeight: 'bold', color: Colors.Iconwhite}}>
          Condition
        </Text>
      </View>
      <View>
        <DamageList damages={interiorDmg} handleEdit={handleEdit} />
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
