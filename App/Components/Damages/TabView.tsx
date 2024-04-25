import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Exterior from './Exterior';
import Interior from "./InteriorDamage";
import Colors from '../../Constants/Colors';

const CustomTabView = ({item}:any) => {
    
    const [activeTab, setActiveTab] = useState('first');  // Use state to track the active tab

    // Function to render tab content based on activeTab state
    const renderContent = () => {
        switch (activeTab) {
            case 'first':
                return <Exterior item={item} />;
            case 'second':
                return <Interior item={item} />;
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabBar}>
                <TouchableOpacity
                    style={[styles.tabItem, activeTab === 'first' && styles.activeTab,{  borderColor:   activeTab === 'first' ? Colors.primary : "#ddd",}]}
                    onPress={() => setActiveTab('first')}
                >
                    <Text style={styles.tabTitle}>EXTERIOR</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabItem, activeTab === 'second' && styles.activeTab,{  borderColor:   activeTab === 'second' ? Colors.primary : "#ddd",}]}
                    onPress={() => setActiveTab('second')}
                >
                    <Text style={styles.tabTitle}>INTERIOR</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                {renderContent()}
            </View>
        </View>
    );
};

export default CustomTabView;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: '#f0f0f0',
    },
    tabBar: {
        flexDirection: 'row',
        height: 50,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
      
    },
    activeTab: {
        borderBottomColor: Colors.primary,
    },
    tabTitle: {
        color: Colors.black,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
    },
});

