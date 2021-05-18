
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Platform } from 'react-native';
import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { Ionicons } from '@expo/vector-icons';
import PatientLogin from '../screens/PatientLoginScreen';
import DoctorLogin from '../screens/DoctorLoginScreen';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import PatientScreen from '../screens/PatientScreen';
import DoctorScreen from '../screens/DoctorScreen';
import Colors from '../constants/Colors'
import PatientListScreen from '../screens/PatientListScreen';
import PatientSignupScreen from '../screens/PatientSignupScreen';
import DoctorSignupScreen from '../screens/DoctorSignupScreen';





const defaultStackNavOpt = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android'
            ? Colors.primaryColor
            : ''
    },
    headerTintColor: Platform.OS === 'android'
        ? 'white'
        : Colors.primaryColor
};

const patientSignupScreen  = createStackNavigator({
    signup: PatientSignupScreen,

},
{
    defaultNavigationOptions: defaultStackNavOpt
});

const doctorSignupScreen  = createStackNavigator({
    signup: DoctorSignupScreen,

},
{
    defaultNavigationOptions: defaultStackNavOpt
});



const patientNavigator = createStackNavigator({
    patient: PatientScreen,
},
    {
        defaultNavigationOptions: defaultStackNavOpt
    });

const patientListNavigator = createStackNavigator({
    patient: PatientListScreen,
},
    {
        defaultNavigationOptions: defaultStackNavOpt
    });


const doctorNavigator = createStackNavigator({
    doctor: DoctorScreen,
},
    {
        defaultNavigationOptions: defaultStackNavOpt
    });

const patientLoginNavigator = createStackNavigator({
    PatientLogin: PatientLogin,
    patient: PatientScreen

},
    {
        defaultNavigationOptions: defaultStackNavOpt
    });

const doctorLoginNavigator = createStackNavigator({

    DoctorLogin: DoctorLogin,
    Doctor: DoctorScreen

},
    {
        defaultNavigationOptions: defaultStackNavOpt
    });

const tabPatientScreenConfig = {
    Patient: {
        screen: patientNavigator,
        navigationOptions: {
            tabBarLabel: 'Patient Login',
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons
                        name="ios-medkit-sharp"
                        size={25}
                        color={tabInfo.tintColor}
                    />
                );
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel: Platform.OS === 'andriod' ? <Text>Patient</Text> : 'Patient'
        }
    },
    List: {
        screen: patientListNavigator,
        navigationOptions: {
            tabBarLabel: 'Patient List',
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons
                        name='ios-list-outline'
                        size={25}
                        color={tabInfo.tintColor}
                    />
                );
            },
            tabBarColor: Colors.seconderyColor,
            tabBarLabel: Platform.OS === 'andriod' ? <Text>List</Text> : 'List'

        }
    }


};

const tabScreenConfig = {
    Patient: {
        screen: patientLoginNavigator,
        navigationOptions: {
            tabBarLabel: 'Patient Login',
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons
                        name="ios-medkit-sharp"
                        size={25}
                        color={tabInfo.tintColor}
                    />
                );
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel: Platform.OS === 'andriod' ? <Text>Patient</Text> : 'Patient'
        }
    },
    Doctor: {
        screen: doctorLoginNavigator,
        navigationOptions: {
            tabBarLabel: 'Doctor Login',
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons
                        name='ios-medical'
                        size={25}
                        color={tabInfo.tintColor}
                    />
                );
            },
            tabBarColor: Colors.seconderyColor,
            tabBarLabel: Platform.OS === 'andriod' ? <Text>Doctor</Text> : 'Doctor'

        }
    }


};



 const LoginTab = Platform.OS === 'android'
 ? createMaterialBottomTabNavigator(tabScreenConfig, {
     activeColor: 'white',
     shifting: true,
 })
 : createBottomTabNavigator(tabScreenConfig, {
     tabBarOptions: {
         activeTintColor: Colors.seconderyColor
     }
 });

 const PatientListTab = Platform.OS === 'android'
 ? createMaterialBottomTabNavigator(tabPatientScreenConfig, {
     activeColor: 'white',
     shifting: true,
 })
 : createBottomTabNavigator(tabPatientScreenConfig, {
     tabBarOptions: {
         activeTintColor: Colors.seconderyColor
     }
 });




 const mainSwitchNavigator = createSwitchNavigator({
    loginTab: LoginTab,
    patientTab: PatientListTab,
    doctorTab: doctorNavigator,
    patSignup: patientSignupScreen,
    docSignup: doctorSignupScreen,

    

},
    {
        defaultNavigationOptions: defaultStackNavOpt
    },
    {
        initialRouteName: 'loginTab'
    },


);

export default createAppContainer(mainSwitchNavigator);