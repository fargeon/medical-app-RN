import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginItem from '../components/LoginItem';
import { LoadData, SetUser } from '../store/action/Medic';
import { DOCTORS, PATIENTS,APPOINTMENTS } from '../data/Data';

const DoctorLoginScreen = props => {

    const availableUser = useSelector(state => state.medic.doctors);
    const dispatch = useDispatch();

    const clearData = async () => {
       
        try {
            await AsyncStorage.clear();
            dispatch(LoadData({ patients: PATIENTS, doctors: DOCTORS, appointments: APPOINTMENTS }));
            alert('Data Deleted');
        } catch (e) {
            alert('Failed to clear the data from storage')
        }
    
};
   
    const signup = () =>{
        
        props.navigation.navigate('docSignup');
    };

    const login = (username, password) => {


        const user = availableUser.find(doctor => doctor.username === username);
        if (user?.password === password) {
            dispatch(SetUser(user));
            props.navigation.navigate('doctorTab');

        };
    }


    return (

        <View style={styles.screen}>
            <LoginItem titleLogin="Doctor login" titleSignUp="SignUp" onLogin={login} onSignUp={signup} clearData={clearData} />
        </View>
    );

};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },

});

export default DoctorLoginScreen;