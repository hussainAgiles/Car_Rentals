import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DataTable} from 'react-native-paper';

const ReservationTable = () => {
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([10, 20, 30]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0],
  );
  const screenWidth = Dimensions.get('window').width;

  const [items] = useState([
    {
      key: 1,
      info: 'Créé:02.04.202414:06 test Gestionnaire: Gary',
      statut: 'reserve',
      ramaser: 'Pharpos Airport',
      retourner: 'Pharpos Airport',
      véhicule: 'TOYOTA COROLLA Compact Automatic ABC128',
      client: 'GABRIELLA JOHNSON',
      montant: 265.0,
      actions: 'sold',
    },
    {
      key: 2,
      info: 'Créé:02.04.202414:06 test Gestionnaire: Gary',
      statut: 'reserve',
      ramaser: 'Pharpos Airport',
      retourner: 'Pharpos Airport',
      véhicule: 'TOYOTA COROLLA Compact Automatic ABC128',
      client: 'GABRIELLA JOHNSON',
      montant: 455.0,
      actions: 'Pending',
    },
    {
      key: 3,
      info: 'Créé:02.04.202414:06 test Gestionnaire: Gary',
      statut: 'reserve',
      ramaser: 'Pharpos Airport',
      retourner: 'Pharpos Airport',
      véhicule: 'TOYOTA COROLLA Compact Automatic ABC128',
      client: 'GABRIELLA JOHNSON',
      montant: 265.0,
      actions: 'Sold',
    },
    {
      key: 4,
      info: 'Créé:02.04.202414:06 test Gestionnaire: Gary',
      statut: 'reserve',
      ramaser: 'Pharpos Airport',
      retourner: 'Pharpos Airport',
      véhicule: 'TOYOTA COROLLA Compact Automatic ABC128',
      client: 'GABRIELLA JOHNSON',
      montant: 555.0,
      actions: 'Pending',
    },
    {
      key: 5,
      info: 'Créé:02.04.202414:06 test Gestionnaire: Gary',
      statut: 'reserve',
      ramaser: 'Pharpos Airport',
      retourner: 'Pharpos Airport',
      véhicule: 'TOYOTA COROLLA Compact Automatic ABC128',
      client: 'GABRIELLA JOHNSON',
      montant: 265.0,
      actions: 'sold',
    },
    {
      key: 6,
      info: 'Créé:02.04.202414:06 test Gestionnaire: Gary',
      statut: 'reserve',
      ramaser: 'Pharpos Airport',
      retourner: 'Pharpos Airport',
      véhicule: 'TOYOTA COROLLA Compact Automatic ABC128',
      client: 'GABRIELLA JOHNSON',
      montant: 455.0,
      actions: 'Pending',
    },
    {
      key: 7,
      info: 'Créé:02.04.202414:06 test Gestionnaire: Gary',
      statut: 'reserve',
      ramaser: 'Pharpos Airport',
      retourner: 'Pharpos Airport',
      véhicule: 'TOYOTA COROLLA Compact Automatic ABC128',
      client: 'GABRIELLA JOHNSON',
      montant: 265.0,
      actions: 'Sold',
    },
    {
      key: 8,
      info: 'Créé:02.04.202414:06 test Gestionnaire: Gary',
      statut: 'reserve',
      ramaser: 'Pharpos Airport',
      retourner: 'Pharpos Airport',
      véhicule: 'TOYOTA COROLLA Compact Automatic ABC128',
      client: 'GABRIELLA JOHNSON',
      montant: 555.0,
      actions: 'Pending',
    },
    {
      key: 9,
      info: 'Créé:02.04.202414:06 test Gestionnaire: Gary',
      statut: 'reserve',
      ramaser: 'Pharpos Airport',
      retourner: 'Pharpos Airport',
      véhicule: 'TOYOTA COROLLA Compact Automatic ABC128',
      client: 'GABRIELLA JOHNSON',
      montant: 265.0,
      actions: 'sold',
    },
    {
      key: 10,
      info: 'Créé:02.04.202414:06 test Gestionnaire: Gary',
      statut: 'reserve',
      ramaser: 'Pharpos Airport',
      retourner: 'Pharpos Airport',
      véhicule: 'TOYOTA COROLLA Compact Automatic ABC128',
      client: 'GABRIELLA JOHNSON',
      montant: 455.0,
      actions: 'Pending',
    },
    {
      key: 11,
      info: 'Créé:02.04.202414:06 test Gestionnaire: Gary',
      statut: 'reserve',
      ramaser: 'Pharpos Airport',
      retourner: 'Pharpos Airport',
      véhicule: 'TOYOTA COROLLA Compact Automatic ABC128',
      client: 'GABRIELLA JOHNSON',
      montant: 265.0,
      actions: 'Sold',
    },
    {
      key: 12,
      info: 'Créé:02.04.202414:06 test Gestionnaire: Gary',
      statut: 'reserve',
      ramaser: 'Pharpos Airport',
      retourner: 'Pharpos Airport',
      véhicule: 'TOYOTA COROLLA Compact Automatic ABC128',
      client: 'GABRIELLA JOHNSON',
      montant: 555.0,
      actions: 'Pending',
    },
    {
      key: 13,
      info: 'Créé:02.04.202414:06 test Gestionnaire: Gary',
      statut: 'reserve',
      ramaser: 'Pharpos Airport',
      retourner: 'Pharpos Airport',
      véhicule: 'TOYOTA COROLLA Compact Automatic ABC128',
      client: 'GABRIELLA JOHNSON',
      montant: 265.0,
      actions: 'sold',
    },
    {
      key: 14,
      info: 'Créé:02.04.202414:06 test Gestionnaire: Gary',
      statut: 'reserve',
      ramaser: 'Pharpos Airport',
      retourner: 'Pharpos Airport',
      véhicule: 'TOYOTA COROLLA Compact Automatic ABC128',
      client: 'GABRIELLA JOHNSON',
      montant: 455.0,
      actions: 'Pending',
    },
    {
      key: 15,
      info: 'Créé:02.04.202414:06 test Gestionnaire: Gary',
      statut: 'reserve',
      ramaser: 'Pharpos Airport',
      retourner: 'Pharpos Airport',
      véhicule: 'TOYOTA COROLLA Compact Automatic ABC128',
      client: 'GABRIELLA JOHNSON',
      montant: 265.0,
      actions: 'Sold',
    },
    {
      key: 16,
      info: 'Créé:02.04.202414:06 test Gestionnaire: Gary',
      statut: 'reserve',
      ramaser: 'Pharpos Airport',
      retourner: 'Pharpos Airport',
      véhicule: 'TOYOTA COROLLA Compact Automatic ABC128',
      client: 'GABRIELLA JOHNSON',
      montant: 555.0,
      actions: 'Pending',
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

  return (
    <DataTable>
      <DataTable.Header>
        <MyStyledTitle widthStyle={5}>
          <DataTable.Title>ID</DataTable.Title>
        </MyStyledTitle>
        <MyStyledTitle widthStyle={20}>
          <DataTable.Title>Info</DataTable.Title>
        </MyStyledTitle>
        <MyStyledTitle widthStyle={15}>
          <DataTable.Title>Vehicle</DataTable.Title>
        </MyStyledTitle>
        <MyStyledTitle widthStyle={20}>
          <DataTable.Title>Customer</DataTable.Title>
        </MyStyledTitle>
        <MyStyledTitle widthStyle={15}>
          <DataTable.Title>Amount</DataTable.Title>
        </MyStyledTitle>
        <MyStyledTitle widthStyle={15}>
          <DataTable.Title>Actions</DataTable.Title>
        </MyStyledTitle>
      </DataTable.Header>

      {items.slice(from, to).map((item) => (
        <DataTable.Row key={item.key}>
          <MyStyledCell widthStyle={5}>
            <DataTable.Cell>{item.key}</DataTable.Cell>
          </MyStyledCell>
          <MyStyledCell widthStyle={20}>
            <DataTable.Cell>{item.info}</DataTable.Cell>
          </MyStyledCell>
          <MyStyledCell widthStyle={18}>
            <DataTable.Cell>{item.véhicule}</DataTable.Cell>
          </MyStyledCell>
          <MyStyledCell widthStyle={20}>
            <DataTable.Cell>{item.client}</DataTable.Cell>
          </MyStyledCell>
          <MyStyledCell widthStyle={15}>
            <DataTable.Cell numeric>{item.montant}</DataTable.Cell>
          </MyStyledCell>
          <MyStyledCell widthStyle={15}>
            <DataTable.Cell>{item.actions}</DataTable.Cell>
          </MyStyledCell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      />
    </DataTable>
  );
};

const styles = StyleSheet.create({
  cell: {
    // justifyContent: 'center',
    alignItems: 'center',
  },
  headerCell: {
    backgroundColor: 'lightgray',
    fontWeight: 'bold',
  },
});

export default ReservationTable;

