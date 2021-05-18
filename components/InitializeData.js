import React, { useEffect } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

import MedicalNavigator from '../navigator/MedicalNavigator';
import { LoadData, STORAGE_KEY_APPOINTMENTS, STORAGE_KEY_DOCTORS, STORAGE_KEY_PATIENTS, TIME_OUT, RemoveFromQueue, setTimer } from '../store/action/Medic';
import { DOCTORS, PATIENTS, APPOINTMENTS } from '../data/Data';

const InitializeData = props => {
  
  const dispatch = useDispatch();
  
  const readData = async () => {
    try {
      
      const currentTime = new Date();
      
      const _patientList = await AsyncStorage.getItem(STORAGE_KEY_PATIENTS)
      const _doctorList = await AsyncStorage.getItem(STORAGE_KEY_DOCTORS)
      const _appointmentsList = await AsyncStorage.getItem(STORAGE_KEY_APPOINTMENTS)

      const patientList = JSON.parse(_patientList);
      const doctorList = JSON.parse(_doctorList);
      const appointmentsList = JSON.parse(_appointmentsList);
      const ArrAppointmets = appointmentsList ?  Object.values(appointmentsList) : [] ;

      

      dispatch(LoadData({ patients: patientList, doctors: doctorList, appointments: appointmentsList }));
      ArrAppointmets.forEach(appointments => {
        
        const arrApointment =  Object.values(appointments);
        
        arrApointment.forEach(appointment => {
          
          const temp = new Date(appointment.timeOut)
          let calcTime = TIME_OUT - (currentTime - temp);
          
          if (calcTime > 900) {
            let timeTemp = setTimeout(() => {

              dispatch(RemoveFromQueue({ docId: appointment.docId, patIdIndex: 0, patId: appointment.id }));

            }, calcTime);
            dispatch(setTimer({patId:appointment.id, timeoutRef: timeTemp }));
          } else {
            dispatch(RemoveFromQueue({ docId: appointment.docId, patIdIndex: 0, patId: appointment.id }));

          }
        });
      });

    } catch (e) {
      alert("Faild Load Data")
    }
  }



  useEffect(() => {

    readData();

  }, [])


  return <MedicalNavigator />

};

export default InitializeData;