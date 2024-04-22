import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {TextInput} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {deletePenalty} from '../../API/NormalApi';
import Colors from '../../Constants/Colors';
import useDispatch from '../../Hooks/useDispatch';
import useIsMounted from '../../Hooks/useIsMounted';
import {
  PenaltyTypes,
  create_Penalty,
  delete_Penalties,
  fetchingPenalties,
} from '../../Redux/Reducers/ReservationDetailsReducer';
import {RootState} from '../../Redux/Store';

const RenderPenalties = ({reservation}: any) => {
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  // error state
  const [typeError, setTypeError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [priceError, setPriceError] = useState('');

  // setting focus
  const [typeFocused, setTypeFocused] = useState(false);
  const [descriptionFocused, setDescriptionFocused] = useState(false);
  const [priceFocused, setPriceFocused] = useState(false);

  const {penaltyTypesData} = useSelector(
    (state: RootState) => state.fleetPenaltyTypeReducer,
  );

  const {penaltyData} = useSelector(
    (state: RootState) => state.fleetPenaltyCreationReducer,
  );

  const {penaltiesHistory} = useSelector(
    (state: RootState) => state.fleetPenaltyHistoryReducer,
  );

  const dispatch = useDispatch();
  const isMounted = useIsMounted();
  useEffect(() => {
    if (isMounted()) {
      dispatch(PenaltyTypes());
      dispatch(fetchingPenalties(reservation?.reservation?.id));
    }
  }, [penaltyData]);

  // Penalty Creation
  const handlePenalty = async () => {
    const reservation_id = reservation.reservation.id;
    // const {type, description, price} = penaltyState;
    let isValid = true;

    if (!type) {
      setTypeError('Penalty Type is required.');
      isValid = false;
    } else {
      setTypeError('');
    }

    if (!description) {
      setDescriptionError('Penalty Description is required.');
      isValid = false;
    } else {
      setDescriptionError('');
    }

    if (!price) {
      setPriceError('Price is required.');
      isValid = false;
    } else {
      setPriceError('');
    }
    if (isValid) {
      try {
        const penaltyResponse = await dispatch(
          create_Penalty({
            type,
            description,
            // over_limit,
            // under_filling,
            price,
            reservation_id,
          }),
        );
        if (penaltyResponse?.payload?.status === 'S') {
          Toast.show({
            type: 'success',
            text1: 'Penalties Added',
          });
          setType('');
          setPrice('');
          setDescription('');
          // setRenderPenalties(false);
        } else {
          Toast.show({
            type: 'error',
            text1: penaltyResponse.payload,
          });
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
        });
      }
    }
  };

  //   Penalty Deletion
  const handleDeletePenalty = async (penaltyId: string) => {
    // console.log("Id ===== ",violationId)
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this Penalty?',
      [
        {
          text: 'Cancel',
          // onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              const Response = await dispatch(delete_Penalties(penaltyId));
              if (Response?.payload?.status === 'S') {
                Toast.show({
                  type: 'success',
                  text1: 'Deleted Successfully',
                });
                dispatch(fetchingPenalties(reservation?.reservation?.id));
              } else {
                Toast.show({
                  type: 'error',
                  text1: Response.payload.message,
                });
              }
            } catch (error) {
              Toast.show({
                type: 'error',
                text1: 'Something went wrong',
              });
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View>
      <View style={styles.tableHeader}>
        <Text style={[styles.headerText, {flex: 0.30}]}>Type</Text>
        <Text style={[styles.headerText, {flex: 0.30}]}>Description</Text>
        <Text style={[styles.headerText, {flex: 0.25}]}>Price</Text>
        <Text style={[styles.headerText, {flex: 0.10}]}>Action</Text>
      </View>
      <View style={styles.modalView}>
        {penaltiesHistory?.penalties?.map(
          (
            penalty_data: {
              status: string;
              type: any;
              description: any;
              price: any;
              id: any;
            },
            index: React.Key | null | undefined,
          ) => (
            <View style={styles.paymentItem} key={penalty_data.id}>
              <Text style={{color: Colors.black, flex: 0.25}}>
                {penalty_data?.type}
              </Text>
              <Text style={{color: Colors.black, flex: 0.25}}>
                {penalty_data?.description}
              </Text>
              <Text
                style={{
                  color: Colors.black,
                  flex: 0.23
                }}>{`${penalty_data.price} AUD`}</Text>
              {/* <View> */}
                <TouchableOpacity
                  onPress={() => handleDeletePenalty(penalty_data.id)} 
                  style={{flex: 0.13, alignItems: 'center'}}>
                  <Icon name="delete" size={20} color={Colors.red} />
                </TouchableOpacity>
              {/* </View> */}
            </View>
          ),
        )}

        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          {/* <Text
              style={{color: Colors.black, fontWeight: 'bold', fontSize: 18}}>
              Add Penalty
            </Text> */}

          <View style={styles.formContainer}>
            {penaltyTypesData && penaltyTypesData?.length > 0 && (
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={penaltyTypesData}
                search
                maxHeight={200}
                labelField="longname"
                valueField="id"
                placeholder="Penalty Type"
                searchPlaceholder="Search..."
                value={penaltyTypesData?.longname}
                itemTextStyle={styles.itemStyle}
                onChange={item => {
                  setType(item?.longname);
                }}
                onFocus={() => setTypeFocused(true)}
                onBlur={() => setTypeFocused(false)}
              />
            )}
            {!typeFocused && typeError ? (
              <Text style={styles.errorText}>{typeError}</Text>
            ) : null}
            <TextInput
              label="Penalty Description"
              mode="outlined"
              value={description}
              style={styles.input}
              textColor={Colors.black}
              onChangeText={text => setDescription(text)}
              onFocus={() => setDescriptionFocused(true)}
              onBlur={() => setDescriptionFocused(false)}
            />
            {!descriptionFocused && descriptionError ? (
              <Text style={styles.errorText}>{descriptionError}</Text>
            ) : null}
            <TextInput
              label="Price in AUD"
              mode="outlined"
              value={price}
              style={styles.input}
              textColor={Colors.black}
              onChangeText={text => setPrice(text)}
              keyboardType="numeric"
              onFocus={() => setPriceFocused(true)}
              onBlur={() => setPriceFocused(false)}
            />
            {!priceFocused && priceError ? (
              <Text style={styles.errorText}>{priceError}</Text>
            ) : null}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handlePenalty}>
              <Text style={{color: Colors.Iconwhite, fontWeight: 'bold'}}>
                Add Penalty
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RenderPenalties;

const styles = StyleSheet.create({
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    padding: 5,
    marginTop: 20,
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    flex: 1,
    // textAlign: 'center',
  },
  modalView: {
    // backgroundColor: 'white',
    // elevation: 5,
    // width: '100%',
    paddingVertical: 15,
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  dropdown: {
    height: 42,
    borderWidth: 0.7,
    borderRadius: 5,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    paddingHorizontal: 15,
  },
  placeholderStyle: {
    fontSize: 16,
    color: Colors.black,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Colors.black,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: Colors.black,
  },
  itemStyle: {
    color: Colors.black,
  },
  input: {
    marginTop: 20,
    marginBottom: 10,
    height: 40,
    backgroundColor: 'transparent', // To remove the inner background color
  },
  formContainer: {
    // paddingHorizontal: 10,
    paddingTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  errorText: {
    color: 'red',
  },
});
