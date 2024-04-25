import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { ImageBase_URL } from '../../API/Constants';
import { Avatar } from 'react-native-paper';

// New component for each damage item
const DamageItem = ({ item, handleEdit }:any) => {
    // console.log("item === ",item.image_url)
    return (
        <TouchableOpacity onPress={() => handleEdit(item.id)}>
            <View style={styles.itemContainer}>
                <Avatar.Image
                    size={30}
                    source={{ uri: ImageBase_URL + item.image_url }}
                />
                <Text>{item.title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const DamageList = ({ damages, handleEdit }:any) => {
    return (
        <View>
            {damages?.map((item:any) => (
                <DamageItem key={item.id} item={item} handleEdit={handleEdit} />
            ))}
        </View>
    );
};

export default DamageList;

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 40,
        paddingRight: 40,
        marginTop: 10,
        paddingBottom: 10,
    }
});
