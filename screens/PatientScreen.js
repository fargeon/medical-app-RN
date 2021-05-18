import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';


import { LoadData, RemoveFromQueue, SignUpDoctor,TIME_OUT  } from '../store/action/Medic';
import HeaderButton from '../components/HeaderButton';


const PatientScreen = props => {


    const user = useSelector(state => state.medic.user)
    const appointmetnList = useSelector(state => state.medic.appointments)
    const doctorKeyArray = Object.keys(appointmetnList);
    
    const doctorKeyIndex = doctorKeyArray.findIndex(index => index == user.isWaiting);
    
    const patientIdIndex =user.isWaiting !== -1 ? appointmetnList[user.isWaiting]?.findIndex(pat => pat.id === user.id) : null ;


    const dispatch = useDispatch();


    const CancelAppointment = () => {
        const currentTime = new Date();
        const calcTime = TIME_OUT -(currentTime - appointmetnList[user.isWaiting][patientIdIndex].timeOut);
        if(calcTime >= 10000){
        if (user.timeoutRef) {
            clearTimeout(user.timeoutRef);
        }

        dispatch(RemoveFromQueue({ docId: user.isWaiting, patIdIndex: patientIdIndex, patId: user.id }));
        }else {
            
            alert(`You Cannot Cancel Your Appointment, Time Remaining is : ${calcTime/1000} sec `);
        }
    };



    return (
        <View style={styles.screen} >
            <View style={styles.userDetails}>
            <Text style={styles.text} > {user.name}</Text>
            </View>
            <View>
                {user.isWaiting !== -1 &&
                    <Button title='Cancel' onPress={CancelAppointment} />
                }
            </View>
        </View>
    );

};

PatientScreen.navigationOptions = navigateData => {

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
    userDetails: {
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        fontSize: 25,
        
    },
});

export default PatientScreen;