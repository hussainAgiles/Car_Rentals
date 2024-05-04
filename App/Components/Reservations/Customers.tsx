import moment from 'moment';
import React, {useEffect, useState} from 'react';
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
import {Dropdown} from 'react-native-element-dropdown';
import ImageCropPicker from 'react-native-image-crop-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Button, Modal, Portal, RadioButton} from 'react-native-paper';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  fetchCountries,
  fetchDocument,
  fetchDocumentType,
  uploadDocuments,
} from '../../API/NormalApi';
import Colors from '../../Constants/Colors';
import useIsMounted from '../../Hooks/useIsMounted';
import {fetchKycDocuments} from '../../Redux/Reducers/ReservationDetailsReducer';
import useDispatch from '../../Hooks/useDispatch';
import useAppSelector from '../../Hooks/useSelector';
import Toast from 'react-native-toast-message';
import {ImageBase_URL} from '../../API/Constants';

const HeadingView = ({item}: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [documentType, setDocumentType] = useState('');
  const [documentName, setDocumentName] = useState('');
  const [dateOfIssue, setDateOfIssue] = useState('');
  const [dateOfExpiry, setDateOfExpiry] = useState('');
  const [citizenType, setCitizenType] = useState('resident');
  const [citizenYear, setCitizenYear] = useState('gt_12_months');
  const [extension, setExtension] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDatePickerVisiblee, setDatePickerVisibilityy] = useState(false);
  const [selectedDatee, setSelectedDatee] = useState<Date | null>(null);
  const [image, setImage] = useState([]);
  const [mimetype, setMimeType] = useState('');
  const [image_urls, setImageUrl] = useState([]);
  const [countries, setCountries] = useState([]);
  const [country, setCpuntry] = useState('');
  const [countryFocus, setCountryFocus] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [document, setDocument] = useState('');
  const [documentFocus, setDocumentFocus] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageModalVisible, setImageModalVisible] = useState(false);

  let isMounted = useIsMounted();
  const dispatch = useDispatch();

  const {kycDocuments} = useAppSelector(state => state.documentReducer);

  // console.log('Documents fetched', kycDocuments?.kyc[0]?.kyc?.length);

  useEffect(() => {
    if (isMounted()) {
      fetchingCountries();
      fetchingDocumentType();
      dispatch(fetchKycDocuments(item?.reservation?.customers?.slug));
    }
  }, [citizenType, citizenYear]);

  const fetchingCountries = async () => {
    const response = await fetchCountries();
    const mappedCountries = response.map((country: any) => ({
      label: country.name,
      value: country.id,
    }));
    setCountries(mappedCountries);
  };

  const fetchingDocumentType = async () => {
    try {
      if (citizenType === 'tourist') {
        let Lookup_name = 'TOURIST';
        const response = await fetchDocumentType(Lookup_name);
        const mappedDocuments = response.map((document: any) => ({
          label: document.shortname,
          value: document.id,
        }));
        setDocuments(mappedDocuments);
      } else {
        let Lookup_name;
        if (citizenYear == 'gt_12_months') {
          Lookup_name = '> 12 MONTHS';
        } else {
          Lookup_name = '< 12 MONTHS';
        }
        const response = await fetchDocumentType(Lookup_name);
        const mappedDocuments = response.map((document: any) => ({
          label: document.shortname,
          value: document.id,
        }));
        setDocuments(mappedDocuments);
      }
    } catch (error) {
      console.error('Error fetching document types:', error);
      // Handle error here, such as displaying an error message to the user
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    resetModalState();
  };

  const handleDateConfirm = (newDate: Date) => {
    setSelectedDate(newDate);
    setDatePickerVisibility(false);
    setDateOfIssue(newDate.toISOString().split('T')[0]);
  };

  const handleDateConfirmm = (newDate: Date) => {
    setSelectedDatee(newDate);
    setDatePickerVisibilityy(false);
    setDateOfExpiry(newDate.toISOString().split('T')[0]);
  };

  const resetModalState = () => {
    setDocumentType('');
    setDocumentName('');
    setDateOfIssue('');
    setDateOfExpiry('');
    setExtension('');
    setImage([]);
    setImageUrl([]);
    setMimeType('');
    setSelectedDate(null);
    setSelectedDatee(null);
  };

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
          text: 'Take a Picture',
          onPress: () => {
            ImageCropPicker.openCamera({
              cropping: true,
              includeBase64: true,
              compressImageQuality: 0.5,
            })
              .then(image => {
                setImage([image.data]);
                setImageUrls([image]); // Store image path in state
              })
              .catch(e => {
                if (e.code !== 'E_PICKER_CANCELLED') {
                  Alert.alert('Error', 'Image capture was cancelled.');
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
              includeBase64: true,
              compressImageQuality: 0.5,
              multiple: true, // Allow multiple image selection
            })
              .then(images => {
                // Handle multiple image selection
                if (Array.isArray(images)) {
                  // If multiple images are selected
                  let arrayImages = [];
                  for (let i = 0; i < images.length; i++) {
                    let imagedata = {
                      width: images[i].width,
                      height: images[i].height,
                    };
                    arrayImages.push(images[i].data);
                  }

                  setImage(arrayImages);
                  // const imagePaths = images.map(image => image.data);

                  setImageUrl(images); // Store image paths in state
                  // setExtension()
                } else {
                  // If a single image is selected
                  setImage([images.data]);
                  setImageUrl([images]); // Store image path in state
                }
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

  const handleUploadDocument = async () => {
    let object = {
      id: 0,
      citizen_type: citizenType,
      customer_id: item.reservation?.customers?.id,
      monthtype: citizenYear,
      country_id: country,
      document_type: document,
      document_name: documentName,
      image_url: '',
      status: 0,
      issue_date: moment(selectedDate).format('YYYY-MM-DD'),
      expiry_date: moment(selectedDatee).format('YYYY-MM-DD'),
      uploaded_by: 'cmsadmin',
      fileList: image_urls,
      device: 'mobile',
      folder: 'damage',
      filename: 'damage',
    };
    // console.log("Object received ==== ",object.image_url)
    try {
      const response = await uploadDocuments({body: object});
      // console.log("this is the response",response);
      if (response.status === 'S') {
        Toast.show({
          type: 'success',
          text1: 'Document Uploaded Successfully',
        });
        resetModalState();
        setModalVisible(false);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error uploading',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    }
  };

  const handleImagePress = image => {
    setSelectedImage(image);
    setImageModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={{padding: 5}}>
        <View style={styles.row}>
          <Text style={styles.cell}>Customer</Text>
          <Text style={styles.cell}>Type</Text>
          <Text style={styles.cell}>Number</Text>
          <Text style={styles.cell}>Documents</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.cell, styles.text]}>
            {item.reservation?.customers?.full_name}
          </Text>
          <View
            style={[
              styles.cell,
              {
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              },
            ]}>
            <View style={[styles.type]}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 12,
                  marginTop: 1,
                  color: Colors.Iconwhite,
                }}>
                {item.reservation?.customers?.customer_type}
              </Text>
            </View>
          </View>
          <Text style={[styles.cell, styles.text]}>
            {item.reservation?.customers?.mobile}
          </Text>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={[
              styles.cell,
              {
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              },
            ]}>
            <Icon
              name={'add-circle-outline'}
              size={25}
              color={Colors.primary}
            />
            {kycDocuments?.kyc[0]?.kyc?.length > 0 ? (
              <Text style={{marginLeft: 5, fontWeight: 'bold'}}>
                {kycDocuments?.kyc[0]?.kyc?.length} Document
              </Text>
            ) : null}
          </TouchableOpacity>
        </View>
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
              Upload Documents
            </Text>
            <TouchableOpacity onPress={closeModal}>
              <Icon name={'cancel'} size={25} color={Colors.red} />
            </TouchableOpacity>
          </View>
          <RadioButton.Group
            onValueChange={value => setCitizenType(value)}
            value={citizenType}>
            <View style={styles.radioButtonRow}>
              <Text>Residents and citizens</Text>
              <RadioButton value="resident" />
              <Text>Tourist</Text>
              <RadioButton value="tourist" />
            </View>
          </RadioButton.Group>
          {citizenType === 'resident' && (
            <RadioButton.Group
              onValueChange={value => setCitizenYear(value)}
              value={citizenYear}>
              <View style={styles.radioButtonRow}>
                <Text>Greater than 12 months</Text>
                <RadioButton value="gt_12_months" />
                <Text>Less than 12 months</Text>
                <RadioButton value="ls_12_months" />
              </View>
            </RadioButton.Group>
          )}
          {citizenType === 'tourist' && (
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Dropdown
                style={[
                  styles.dropdown,
                  countryFocus && {borderColor: Colors.primary},
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={countries}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!countryFocus ? 'Select country' : '...'}
                searchPlaceholder="Search..."
                value={country}
                onFocus={() => setCountryFocus(true)}
                onBlur={() => setCountryFocus(false)}
                onChange={item => {
                  if (item) {
                    // Check if item is not null
                    setCpuntry(item.value);
                  } // set to item.value to store the selected customer's ID
                  setCountryFocus(false);
                }}
                renderLeftIcon={() => (
                  <Icon
                    style={styles.icon}
                    color={countryFocus ? Colors.primary : 'black'}
                    name="person"
                    size={20}
                  />
                )}
              />
              <TextInput
                placeholder="Country Type"
                value={dateOfIssue}
                onChangeText={setDateOfIssue}
                multiline
                style={styles.input}
              />
            </View>
          )}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Dropdown
              style={[
                styles.dropdown,
                documentFocus && {borderColor: Colors.primary},
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={documents}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!documentFocus ? 'Select Document Type' : '...'}
              searchPlaceholder="Search..."
              value={document}
              onFocus={() => setDocumentFocus(true)}
              onBlur={() => setDocumentFocus(false)}
              onChange={item => {
                if (item) {
                  // Check if item is not null
                  setDocument(item.value);
                } // set to item.value to store the selected customer's ID
                setDocumentFocus(false);
              }}
              renderLeftIcon={() => (
                <Icon
                  style={styles.icon}
                  color={documentFocus ? Colors.primary : 'black'}
                  name="person"
                  size={20}
                />
              )}
            />
            <TextInput
              placeholder="Document Name"
              value={documentName}
              onChangeText={setDocumentName}
              multiline
              style={styles.input}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setDatePickerVisibility(true)}>
              <Text style={{color: Colors.black}}>
                {selectedDate ? selectedDate.toDateString() : 'Date of Issue'}
              </Text>
              <Icon2 name="calendar" size={20} color={Colors.black} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setDatePickerVisibilityy(true)}>
              <Text style={{color: Colors.black}}>
                {selectedDatee
                  ? selectedDatee.toDateString()
                  : 'Date of Expiry'}
              </Text>
              <Icon2 name="calendar" size={20} color={Colors.black} />
            </TouchableOpacity>
          </View>
          {/* Remaining code for image upload */}
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: Colors.black,
              marginTop: 10,
            }}>
            Upload Images:
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
              <Text>Kyc Documents</Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              {image_urls.map((image, index) => (
                <Image
                  key={index}
                  source={{uri: image.path}}
                  style={{
                    width: 80,
                    height: 80,
                    marginLeft: 20,
                    borderRadius: 5,
                  }}
                />
              ))}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Button
              mode="contained"
              onPress={handleUploadDocument}
              buttonColor={Colors.primary}>
              Submit
            </Button>
          </View>

          <View style={{marginTop: 20}}>
            <View
              style={[
                styles.row,
                {backgroundColor: Colors.primary, paddingVertical: 10},
              ]}>
              <Text style={[styles.cell, {color: Colors.Iconwhite}]}>
                Document Name
              </Text>
              <Text style={[styles.cell, {color: Colors.Iconwhite}]}>
                Date of Issue
              </Text>
              <Text style={[styles.cell, {color: Colors.Iconwhite}]}>
                Date of expiry
              </Text>
              <Text style={[styles.cell, {color: Colors.Iconwhite}]}>
                Image
              </Text>
              {/* <Text style={styles.cell}>Action</Text> */}
            </View>

            {kycDocuments?.kyc[0]?.kyc?.map((item: any, index: any) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{flex: 1.5, fontSize: 13, color: Colors.black}}>
                  {item.document_name}
                </Text>
                <Text style={{flex: 1.1, fontSize: 13, color: Colors.black}}>
                  {moment(item.issue_date).format('DD-MM-YYYY')}
                </Text>
                <Text style={{flex: 1, fontSize: 13, color: Colors.black}}>
                  {moment(item.expiry_date).format('DD-MM-YYYY')}
                </Text>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() =>
                    handleImagePress(
                      item.kycimages?.multipleimages[0]?.image_url,
                    )
                  }>
                  {item.kycimages?.multipleimages?.map((image, index) => (
                    <Image
                      key={index}
                      source={{uri: ImageBase_URL + image.image_url}}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 5,
                        marginRight: 5,
                      }}
                      resizeMode="contain"
                    />
                  ))}
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </Modal>
      </Portal>

      {/* Date Time Picker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisibility(false)}
        minimumDate={new Date()}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisiblee}
        mode="date"
        onConfirm={handleDateConfirmm}
        onCancel={() => setDatePickerVisibilityy(false)}
        minimumDate={new Date()}
      />

      {/* Image modal */}
      <Portal>
        <Modal
          visible={imageModalVisible}
          onDismiss={() => {
            setImageModalVisible(false);
          }}
          contentContainerStyle={styles.imageModalContainer}>
          <View style={styles.imageModalContainer}>
            <Image
              source={{uri: ImageBase_URL + selectedImage}}
              style={{flex: 1, width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Iconwhite,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    alignItems: 'center',
    alignSelf: 'center',
  },
  cell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    paddingVertical: 5,
  },
  type: {
    backgroundColor: Colors.green,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 12,
    width: 90,
    height: 20,
  },
  input: {
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: Colors.black,
    borderRadius: 6,
    padding: Platform.OS === 'ios' ? 8 : 4,
    width: '45%',
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 35,
    borderWidth: 0.5,
    borderColor: Colors.black,
    borderRadius: 6,
    padding: Platform.OS === 'ios' ? 8 : 4,
    width: '45%',
  },
  radioButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    color: Colors.primary,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
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
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '45%',
  },
  icon: {
    marginRight: 5,
  },
  imageModalContainer:{
    height:300,
    width:'90%',
    justifyContent:'center',
    alignItems:'center'
  }
});

export default HeadingView;
