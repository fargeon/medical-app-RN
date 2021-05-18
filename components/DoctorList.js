import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import DoctorItem from './DoctorItem';
import { InsertToQueue, RemoveFromQueue, TIME_OUT } from '../store/action/Medic';
import { triggerNotificationHandler } from './Notification';



const DoctorList = props => {
    const { listData } = props;
    const user = useSelector(state => state.medic.user);
    const showOnlyAvailable = useSelector(state => state.medic.displayOnlyAvailable);
    const appointments = useSelector(state => state.medic.appointments);


    const dispatch = useDispatch();


    const addToQueueHandler = (id) => {
        if (user.isWaiting === -1) {

            const length = appointments[id] ? appointments[id].length : 0;
            //const currentTime = new Date();
            const calcTime = TIME_OUT - 5000;


            const timeTemp = setTimeout(() => {

                dispatch(RemoveFromQueue({ docId: id, patIdIndex: 0, patId: user.id }));

            }, TIME_OUT * (length + 1));

            dispatch(InsertToQueue({ docId: id, patId: user.id, timeoutRef: timeTemp }));

           const notificationRef =  setTimeout(() => {
                triggerNotificationHandler();

            }, TIME_OUT - 15000);

        }
        else {
            alert('Cancel Your Appointment 1st');
        }

    };
    const renderDoctorItem = itemData => {

        return ((!showOnlyAvailable) || (showOnlyAvailable && itemData.item.availability)) ? (<DoctorItem
            availability={itemData.item.availability}
            id={itemData.item.id}
            name={itemData.item.name}
            specialization={itemData.item.specialization}
            onSelectDoctor={addToQueueHandler}
        />
        ) : null
    }

    return (

        <View style={styles.list}>
            <FlatList
                data={listData}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={renderDoctorItem}
                style={{ margin: 10 }}

            />
        </View>
    );

};


const styles = StyleSheet.create({
    list: {
        flex: 1,
    },


});

export default DoctorList;