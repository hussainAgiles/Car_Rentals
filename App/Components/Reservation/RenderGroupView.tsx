import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Checkbox, DataTable} from 'react-native-paper';
import { Alert } from 'react-native';

const ReservationTable = () => {
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([8, 10, 20]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0],
  );
  const screenWidth = Dimensions.get('window').width;

  const [items] = useState([
    {
      key: 1,
      group: 'Convertible Automatic',
      description: 'Mercedes E class convertible',
      price: '150.00 €',
      free_vehicle: '1/1',
      total: '150.00 €',
    },
    {
      key: 2,
      group: 'Convertible Manual',
      description: 'Peugeot 308 cc or similar',
      price: '100.00 €',
      free_vehicle: '1/1',
      total: '100.00 €',
    },
    {
      key: 3,
      group: 'Compact Automatic',
      description: 'Toyota Corolla, Volkswagen Golf or similar',
      price: '80.00 €',
      free_vehicle: '1/1',
      total: '80.00 €',
    },
    {
      key: 4,
      group: 'Compact Manual',
      description: 'Toyota Corolla, Volkswagen Golf or similar',
      price: '70.00 €',
      free_vehicle: '1/1',
      total: '70.00 €',
    },
    {
      key: 5,
      group: 'Economy Automatic',
      description: 'Toyota Yaris or Volkswagen Polo or similar',
      price: '70.00 €',
      free_vehicle: '1/1',
      total: '70.00 €',
    },
    {
      key: 6,
      group: 'Economy Manual',
      description: 'Toyota Yaris or Volkswagen Polo or similar',
      price: '60.00 €',
      free_vehicle: '1/1',
      total: '60.00 €',
    },
    {
      key: 7,
      group: 'Small Automatic',
      description: 'Toyota Igo, Volkswagen Up or similar',
      price: '60.00 €',
      free_vehicle: '1/1',
      total: '60.00 €',
    },
    {
      key: 8,
      group: 'Small Manual',
      description: 'Toyota Igo, Volkswagen Up or similar',
      price: '60.00 €',
      free_vehicle: '1/1',
      total: '60.00 €',
    },
    
  ]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const calculateWidth = (percentage) => (screenWidth * percentage) / 100;

  const MyStyledCell = ({ children, widthStyle }) => (
    <View style={[styles.cell, { width: calculateWidth(widthStyle) }]}>
      {children}
    </View>
  );

  const MyStyledTitle = ({ children, widthStyle }) => (
    <View style={[styles.cell, styles.headerCell, { width: calculateWidth(widthStyle) }]}>
      {children}
    </View>
  );

  const [checked, setChecked] = useState(false);

  const handleCheckboxPress = (recordId) => {
    // Do whatever you want with the recordId here
    console.log("Checkbox pressed for record ID:", recordId);
    setChecked(!checked);
    // You can also set it to some state if you need to use it elsewhere
  };
  

  return (
    <DataTable> 
      <DataTable.Header>
        <MyStyledTitle widthStyle={20}>
          <DataTable.Title>Group</DataTable.Title>
        </MyStyledTitle>
        <MyStyledTitle widthStyle={20}>
          <DataTable.Title>Description</DataTable.Title>
        </MyStyledTitle>
        <MyStyledTitle widthStyle={20}>
          <DataTable.Title>Price per/day</DataTable.Title>
        </MyStyledTitle>
        <MyStyledTitle widthStyle={20}>
          <DataTable.Title>Free Vehicle</DataTable.Title>
        </MyStyledTitle>
        <MyStyledTitle widthStyle={15}>
          <DataTable.Title>Total Price</DataTable.Title>
        </MyStyledTitle>
      </DataTable.Header>

      {items.slice(from, to).map((item) => (
        <DataTable.Row key={item.key}>
          <MyStyledCell widthStyle={5}>
            {/* <DataTable.Cell>{item.key}</DataTable.Cell> */}
            <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={(data) => {
              handleCheckboxPress(item.key);
            }}
          />
          </MyStyledCell>
          <MyStyledCell widthStyle={20}>
            <DataTable.Cell>{item.group}</DataTable.Cell>
          </MyStyledCell>
          <MyStyledCell widthStyle={18}>
            <DataTable.Cell>{item.description}</DataTable.Cell>
          </MyStyledCell>
          <MyStyledCell widthStyle={18}>
            <DataTable.Cell>{item.price}</DataTable.Cell>
          </MyStyledCell>
          <MyStyledCell widthStyle={15}>
            <DataTable.Cell numeric>{item.free_vehicle}</DataTable.Cell>
          </MyStyledCell>
          <MyStyledCell widthStyle={15}>
            <DataTable.Cell>{item.total}</DataTable.Cell>
          </MyStyledCell>
        </DataTable.Row>
      ))}

      {/* <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      /> */}
    </DataTable>
  );
};

const styles = StyleSheet.create({
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCell: {
    backgroundColor: 'lightgray',
    fontWeight: 'bold',
  },
});

export default ReservationTable;

