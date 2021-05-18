import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Permissions from 'expo-notifications';
import * as Notifications from 'expo-notifications';

import InitializeData from './components/InitializeData';
import medicReducer from './store/reducers/Medic';


export default function App() {

  useEffect(() => {
    try {
      Permissions.getAsync(Permissions.NOTIFICATIONS).then((statusObj) => {
        if (statusObj.status !== 'granted') {
          Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        return statusObj;
      }).then((statusObj) => {
        if (statusObj.status !== 'granted') {
          alert("permission is Not Granted, Can't Get Send Notifications");
          return;
        }
      });
    } catch (error) {

    }
 
  });

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  })

  const rootReducer = combineReducers({
    medic: medicReducer,
  });

  const store = createStore(rootReducer);



  return (
    <Provider store={store}>
      <InitializeData />
    </Provider>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
