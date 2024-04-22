import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../Constants/Colors';
import useDispatch from '../../Hooks/useDispatch';
import useIsMounted from '../../Hooks/useIsMounted';
import useAppSelector from '../../Hooks/useSelector';
import {
  fetchAddons,
  fetchInsuranceDetails,
} from '../../Redux/Reducers/ReservationDetailsReducer';
import { RootState } from '../../Redux/Store';

interface InsuranceProps {
  item: any; // You can specify a more specific type based on your usage
  onInsuranceUpdate: (selectedInsurance: number | null, selectedAddons: number | null) => void;
}

const Insurance = ({item,onInsuranceUpdate}: InsuranceProps) => {
 
  const dispatch = useDispatch();
  const isMounted = useIsMounted();
  const [selectedInsurance, setSelectedInsurance] = useState<number | null>(
    null,
  );
  const [selectedAddons, setSelectedAddons] = useState<number | null>(null);

  useEffect(() => {
    if (isMounted()) {
      dispatch(
        fetchInsuranceDetails(item?.reservation?.fleet_master?.vehicle_type),
      );
      dispatch(
        fetchAddons({
          model_id: item?.reservation?.fleet_master?.model_id,
          frequency: item?.reservation?.frequency,
        }),
      );
    }
  }, []);

  const {insuranceDetail, loading} = useAppSelector(
    (state: RootState) => state.rentailInsuranceReducer,
  );

    // This useEffect sets the default selected insurance after fetching details
    useEffect(() => {
      if (insuranceDetail?.insurance_details && item?.reservation?.insurance) {
        const matchedInsurance = insuranceDetail.insurance_details.find((insurance: { insurance_name: any; }) =>
          insurance.insurance_name === item.reservation.insurance
        );
        if (matchedInsurance) {
          setSelectedInsurance(matchedInsurance.price_by_day);
          onInsuranceUpdate(matchedInsurance.price_by_day, selectedInsurance);
        }
      }
    }, [insuranceDetail, item]);

  
  const {addOns} = useAppSelector(
    (state: RootState) => state.addOnsReducer,
  );

  if (loading === 'pending') {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <ActivityIndicator color={Colors.primary} size={'small'} />
      </View>
    ); // Show a loading text or a spinner
  }

  if (!insuranceDetail?.insurance_details.length) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Text style={{fontWeight: 'bold'}}>No insurance found.</Text>
      </View>
    );
  }

  if (!addOns?.vehicleaddons.length) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Text style={{fontWeight: 'bold'}}>No insurance found.</Text>
      </View>
    );
  }

  const handleSelectInsurance = (id: number) => {
    setSelectedInsurance(id);
    onInsuranceUpdate(id, selectedInsurance); // Pass current selection up
  };
  
  const handleSelectAddons = (id: number) => {
    setSelectedAddons(id);
    onInsuranceUpdate(selectedAddons, id); // Pass current selection up
  };

  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold', color: Colors.black, fontSize: 20}}>
        Insurance
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {insuranceDetail.insurance_details.map((insurance: any) => (
          <TouchableOpacity
            key={insurance.id}
            style={styles.radioContainer}
            onPress={() => handleSelectInsurance(insurance.price_by_day)}>
            <Icon
              name={
                selectedInsurance === insurance.price_by_day
                  ? 'radio-button-checked'
                  : 'radio-button-unchecked'
              }
              size={24}
              color={Colors.primary}
            />
            <Icon
              name={'shield'} // Default to 'home' if no icon provided
              size={20}
              color={Colors.black}
              style={styles.insuranceIcon}
            />
            <Text style={styles.radioText}>{insurance.insurance_name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text style={{fontWeight: 'bold', color: Colors.black, fontSize: 20,marginTop:20}}>
        Add ons
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {addOns.vehicleaddons.map((addons: any) => (
          <TouchableOpacity
            key={addons.id}
            style={styles.radioContainer}
            onPress={() => handleSelectAddons(addons.price)}>
            <Icon
              name={
                selectedAddons === addons.price
                  ? 'radio-button-checked'
                  : 'radio-button-unchecked'
              }
              size={24}
              color={Colors.primary}
            />
           
            <Text style={styles.radioText}>{addons?.addonmaster?.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Insurance;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Iconwhite,
    borderRadius: 5,
    padding: 20,
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 20,
  },
  radioText: {
    marginLeft: 10,
  },
  insuranceIcon: {
    marginLeft: 5,
  },
});
