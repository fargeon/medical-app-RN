import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SignupItem from '../components/SignupItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import { SignUpPatient, SetUser } from '../store/action/Medic';
import Patient from '../models/Patient';
import { useDispatch, useSelector } from 'react-redux';



const PatientSignupScreen = props => {


        const dispatch = useDispatch();
        const patientList = useSelector(state => state.medic.patients);
        const newPatId = patientList.length + 1;
        
        const signup = (username, password, name,) => {

            if (username?.length > 0 && password?.length > 0 && name?.length > 0) {
                if (patientList.findIndex(pat => pat.username === username) === -1) {
                   
                    const user = new Patient(username, password, newPatId, name, -1);
                   
                    dispatch(SignUpPatient(user));
                    dispatch(SetUser(user));
                    props.navigation.navigate('patientTab');

                }
                else {
                    alert('User Allready Exist')
                }
            }
        };


        return (
            <View style={styles.screen}>
                <SignupItem titleSignup="SignUp" onSignUp={signup} />
            </View>
        );

    };


const styles = StyleSheet.create({

    screen: {
        flex: 1,
    },

});

PatientSignupScreen.navigationOptions = navigateData => {

    return {
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Back" iconName='arrow-back-circle-sharp' onPress={() => {
                    navigateData.navigation.navigate('loginTab');
                }} />
            </HeaderButtons>
        )
    }


};

export default PatientSignupScreen;