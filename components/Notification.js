import * as Notifications from 'expo-notifications';
 
 export const triggerNotificationHandler = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Your Appointment To The Doctor Office is now!',
        body: 'Please Enter The Doctor Office',
      },
      trigger: {
        seconds: 5,
      },
    });
  };
