import React, {useEffect, useState} from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Modal, Portal, TextInput} from 'react-native-paper'; // These are assumed components
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../Constants/Colors';
import useDispatch from '../../Hooks/useDispatch';
import useAppSelector from '../../Hooks/useSelector';
import {RootState} from '../../Redux/Store';
import {WebView} from 'react-native-webview';
import Loader from '../Loader/Loader';

const Documents = ({item}: any) => {
  const dispatch = useDispatch();
  // const invoice = useAppSelector( (state: RootState) => state.invoiceReportReducer,)
  // console.log(invoice);

  // console.log('Item ====', item?.reservation?.slug);

  // const agreementUrl = useAppSelector(
  //   (state: RootState) => state.agreemnetReportReducer,
  // );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [invoiceUrl, setInvoiveUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  //  console.log("Url found",agreementUrl)

  //  useEffect(()=>{
  //    if(invoice){
  //     Linking.openURL(invoice.invoice.toString());
  //    }
  //  },[invoice])

  useEffect(() => {
    if (invoiceUrl !== '') {
      setIsModalVisible(true);
    }
  }, [invoiceUrl]);

  const handleDownload = async () => {
    setIsModalVisible(true);
    setInvoiveUrl(
      `https://agilefleets.online/#/perfoma-invoice?invoiceslug=${item?.reservation?.slug}`,
    );
  };

  // console.log('Url == ', invoiceUrl);
  const handleAgreementDownload = () => {
    setIsModalVisible(true);
    setInvoiveUrl(
      `https://agilefleets.online/#/agreement-invoice?invoiceslug=${item?.reservation?.slug}`,
    );
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}></View>

      <View style={styles.documentsContainer}>
        {/* Replace with actual Card and Button components */}
        <View style={styles.card}>
          <Icon name="insert-drive-file" color={Colors.black} size={20} />
          <Text style={{marginLeft: 5}}>Performa-Invoice</Text>
          <TouchableOpacity onPress={handleDownload}>
            <Icon
              name="download"
              color={Colors.primary}
              size={30}
              style={{marginLeft: 10}}
            />
          </TouchableOpacity>
          {/* Add your action buttons here */}
        </View>
        <View style={styles.card}>
          <Icon name="insert-drive-file" color={Colors.black} size={20} />
          <Text>Agreement</Text>
          <TouchableOpacity onPress={handleAgreementDownload}>
            <Icon
              name="download"
              color={Colors.primary}
              size={30}
              style={{marginLeft: 10}}
            />
          </TouchableOpacity>

          {/* Add your action buttons here */}
        </View>
      </View>

      <View style={styles.notesContainer}>
        <TextInput label="Notes" multiline={true} />
      </View>

      <Portal>
        <Modal
          visible={isModalVisible}
          contentContainerStyle={styles.modalContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Icon
              name="close"
              size={25}
              onPress={() => {
                setIsModalVisible(false);
              }}
            />
          </View>
          {isLoading && <Loader/>}
          <WebView source={{uri: invoiceUrl}} onLoadEnd={handleLoadEnd} />
        </Modal>
      </Portal>
    </View>
  );
};

export default Documents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  documentsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
  },
  card: {
    // Style your card with shadow, padding, etc.
    flexDirection: 'row',
    backgroundColor: Colors.lightBg,
    alignItems: 'center',
    padding: 15,
    borderRadius: 0,
  },
  alertBar: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#FFA726', // orange color for the alert bar
    borderRadius: 5,
  },
  notesContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    height: 100, // Set a fixed height for the notes TextInput
  },
  modalContainer: {
    backgroundColor: 'white',
    margin: 20,
    padding: 15,
    flex: 1, // Semi-transparent background
  },
});
