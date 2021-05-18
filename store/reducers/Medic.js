import Immer from 'immer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SET_USER, INSERT_QUEUE, LOAD_DATA, STORAGE_KEY_PATIENTS, STORAGE_KEY_DOCTORS, STORAGE_KEY_APPOINTMENTS, REMOVE_QUEUE, SIGNUP_PATIENTS, SIGNUP_DOCTOR, SET_FILTERS, SET_TIMER } from '../action/Medic';
import { DOCTORS, PATIENTS, APPOINTMENTS, FILTEREDLIST } from '../../data/Data';
import Doctor from '../../models/Doctor';

const SaveData = (state) => {
    //.log(state);

    try {
        AsyncStorage.setItem(STORAGE_KEY_PATIENTS, JSON.stringify(state.patients));
        AsyncStorage.setItem(STORAGE_KEY_DOCTORS, JSON.stringify(state.doctors));
        AsyncStorage.setItem(STORAGE_KEY_APPOINTMENTS, JSON.stringify(state.appointments));

    } catch (e) {
        alert('Failed to save the data from storage')
    }

};

const initialState = {
    user: null,
    displayOnlyAvailable: false,
    doctors: DOCTORS,
    patients: PATIENTS,
    appointments: APPOINTMENTS,
    filteredList: DOCTORS

};


const medicReducer = Immer((state, action) => {

    //console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    //console.log("action : ");
    //console.log(action);
    const docIndex = action.data?.docId && state.doctors.findIndex(doc => doc.id === action.data.docId)
    const patIndex = action.data?.patId && state.patients.findIndex(pat => pat.id === action.data.patId);



    switch (action.type) {
        case SET_USER:
            state.user = action.data
            break;
        case INSERT_QUEUE:


            const docId = state.doctors[docIndex].id;
            
            state.doctors[docIndex].availability = false;
            state.patients[patIndex].isWaiting = docId;
            state.patients[patIndex].timeoutRef = action.data.timeoutRef;
            
            state.user = { ...state.user, isWaiting: docId, timeoutRef: action.data.timeoutRef };
            if (!state.appointments[docId]) {
                state.appointments[docId] = [];
            }
            
            state.appointments[docId].push({ id: state.user.id, name: state.user.name, docId: docId, timeOut: new Date() });
            state.appointments = { ...state.appointments };


            SaveData(state);
            break;


        case LOAD_DATA:
            state.doctors = action.data.doctors ? action.data.doctors : state.doctors;
            state.patients = action.data.patients ? action.data.patients : state.patients;
            state.appointments = action.data.appointments ? action.data.appointments : state.appointments;
            break;

        case REMOVE_QUEUE:

            if (state.appointments[action.data.docId].length === 1) {
                //console.log(state.appointments);
                state.doctors[docIndex].availability = true;
                delete state.appointments[action.data.docId];

            }
            else {

                //console.log(state.appointments);
                //console.log(" id index2 "  + action.data.patIdIndex);
                state.appointments[action.data.docId] = state.appointments[action.data.docId].filter((value, index) => index !== action.data.patIdIndex);
                ///splice(action.data.patIdIndex, 1)
            }
            if (state.user) {
                delete state.user.timeoutRef;
                state.user = { ...state.user, isWaiting: -1 };
                //console.log( " pat index "+patIndex)
            }
            delete state.patients[patIndex].timeoutRef;

            state.patients[patIndex].isWaiting = -1;
            state.appointments = { ...state.appointments };

            //console.log(state.user)

            SaveData(state);
            break;

        case SIGNUP_PATIENTS:
            state.patients.push(action.data);
            SaveData(state);
            break;

        case SIGNUP_DOCTOR:
            state.doctors.push(action.data);
            SaveData(state);
            break;

        case SET_FILTERS:
            state.displayOnlyAvailable = action.data;
            break;

        case SET_TIMER:
            state.patients[patIndex].timeoutRef = action.data.timeoutRef;
            break;
    }
}, initialState);
export default medicReducer;