import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';


import PatientItem from './PatientItem';



const PatientList = props => {
    
    
    const renderPatientItem = itemData => {

        return (<PatientItem
            id={itemData.item.id}
            name={itemData.item.name}
        />);
    }

    return (

        <View style={styles.list}>
            <FlatList
                data={props.listData}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={renderPatientItem}
                style={{ margin: 10 }}
            />
        </View>
    );

};


const styles = StyleSheet.create({
    list: {
        flex: 1,
    },


});

export default PatientList;