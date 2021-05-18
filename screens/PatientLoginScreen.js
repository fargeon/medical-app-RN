import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, Button } from 'react-native';
import LoginItem from '../components/LoginItem';



import { DOCTORS, PATIENTS,APPOINTMENTS } from '../data/Data';
import { LoadData, SetUser } from '../store/action/Medic';
import AsyncStorage from '@react-native-async-storage/async-storage';


const PatientLoginScreen = props => {
    const dispatch = useDispatch();
    const availableUser = useSelector(state => state.medic.patients);





    const clearData = async () => {
       
            try {
                AsyncStorage
                await AsyncStorage.clear();
                dispatch(LoadData({ patients: PATIENTS, doctors: DOCTORS, appointments: APPOINTMENTS }));
                alert('Data Deleted');
                
            } catch (e) {
                alert('Failed to clear the data from storage')
            }
            
    };


    const login = (username, password) => {

        const user = availableUser?.find(patient => patient.username === username);

        if (user?.password === password) {

            dispatch(SetUser(user));
            props.navigation.navigate('patientTab');

        }

    };

    const signup = () =>{
        props.navigation.navigate('patSignup');
    };


    return (
        <View style={styles.screen}>
            <LoginItem titleLogin=" Patient login" titleSignUp="SignUp" onLogin={login} onSignUp={signup} clearData={clearData} />
        </View>
    );


};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    signupButton: {
        alignItems: 'center',

    },
});

export default PatientLoginScreen;