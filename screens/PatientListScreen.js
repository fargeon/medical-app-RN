import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, View, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import DoctorList from '../components/DoctorList';
import Colors from '../constants/Colors';
import { setFilters } from '../store/action/Medic';


const PatientListScreen = props => {


    const DisplayedDoctors = useSelector(state => state.medic.doctors);
    
    const isAvailable = useSelector(state => state.medic.displayOnlyAvailable);

    const dispatch = useDispatch();

    const saveFilters = (newValue) => {
        dispatch(setFilters(newValue));
    };



    return (
        <View style={styles.screen}>
            <View style={styles.filterContainer}>
                <Text>availabe Doctors</Text>
                    <Switch trackColor={{ true: Colors.primaryColor, false: 'grey' }}
                        thumbColor={Colors.primaryColor}
                        value={isAvailable}
                        onValueChange={saveFilters}
                    />

            </View>
            <DoctorList listData={DisplayedDoctors} navigation={props.navigation} />
        </View>
    );

};

PatientListScreen.navigationOptions = navigateData => {

    return {
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="LogOut" iconName='log-out-outline' onPress={() => {
                    navigateData.navigation.navigate('loginTab');
                }} />
            </HeaderButtons>
        )
    }


};

const styles = StyleSheet.create({
    screen: {
        flex: 1,

    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10,

    },
    saveButton: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
});

export default PatientListScreen;