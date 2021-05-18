import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {useSelector} from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import PatientList from '../components/PatientList';

const DoctorScreen = props => {

    const user = useSelector(state => state.medic.user);
    const DisplayPatients = useSelector(state => state.medic.appointments);
    

    return (
        <View style={styles.screen}>
            <PatientList listData={DisplayPatients[user.id]} navigation={props.navigation} />
        </View>
    );

};

DoctorScreen.navigationOptions = navigateData => {

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
    screen:{
        flex: 1,
    },

});

export default DoctorScreen;