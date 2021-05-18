export const INSERT_QUEUE = 'INSERT_QUEUE';
export const REMOVE_QUEUE = 'REMOVE_QUEUE';
export const SET_USER = 'SET_USER';
export const LOAD_DATA  = 'LOAD_DATA'
export const SAVE_DATA  = 'SAVE_DATA'
export const SIGNUP_DOCTOR = 'SIGNUP_DOCTOR'
export const SIGNUP_PATIENTS = 'SIGNUP_PATIENTS'
export const SET_FILTERS = 'SET_FILTERS';
export const SET_TIMER = 'SET_TIMER';

export const STORAGE_KEY_PATIENTS = '@save_patients';
export const STORAGE_KEY_DOCTORS = '@save_doctors';
export const STORAGE_KEY_APPOINTMENTS = '@save_appointments';

export const TIME_OUT = 20000;


export const InsertToQueue = (data) => {
    
    return{ type: INSERT_QUEUE, data: data};
};

export const RemoveFromQueue = (data) => {
     return { type: REMOVE_QUEUE , data: data  }
};

export const SetUser = (data) =>{
    return { type: SET_USER , data: data }
};

export const SaveData = (data) => {
    return { type: SAVE_DATA , data: data };

};

export const LoadData = (data) => {
    return { type: LOAD_DATA , data: data };

};

export const SignUpDoctor = (data) =>{
    return { type: SIGNUP_DOCTOR , data: data };
};
export const SignUpPatient = (data) =>{
    return { type: SIGNUP_PATIENTS , data: data };
};
export const  setFilters= (data) =>{
    return { type: SET_FILTERS , data: data };
};

export const setTimer =(data) => {
    return { type: SET_TIMER, data: data };
};