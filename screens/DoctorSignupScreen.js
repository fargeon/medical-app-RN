import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SignupItem from '../components/SignupItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import { SignUpDoctor, SetUser } from '../store/action/Medic';
import Doctor from '../models/Doctor';

const SignupScreen = props => {
    const dispatch = useDispatch();
    const doctorList = useSelector(state => state.medic.doctors);
    const newDocId = doctorList.length + 1 ;
    
    const signup = (username, password, name, specialization) =>{
        
        if(username?.length > 0 && password?.length > 0 && name?.length > 0 && specialization?.length > 0){
            if(doctorList.findIndex(doc => doc.username === username) === -1){
                
                const user = new Doctor(username, password, newDocId, name, specialization, true );
                dispatch(SignUpDoctor(user));
                dispatch(SetUser(user));
                
                props.navigation.navigate('doctorTab');
            }
           else{
               alert('User Allready Exist');
            }
        }
    };


    return(
        <View style={styles.screen}>
           <SignupItem titleSignup="SignUp" onSignUp={signup} isDoctor />
        </View>
    );

};

const styles = StyleSheet.create({

    screen:{
        flex: 1,
    },

});

SignupScreen.navigationOptions = navigateData => {

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

export default SignupScreen;