import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';


const DoctorItem = props => {
    
    
    
    
    return (
        <View style={styles.DoctorItem}>
            <TouchableOpacity activeOpacity={0.7} onPress={ (event) => props.onSelectDoctor(props.id)} >
                <View>
                    <View style={{ ...styles.mealRow, ...styles.doctorHeader }}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}> {props.specialization} </Text>
                        </View>
                    </View>
                    <View style={{ ...styles.doctorRow, ...styles.doctorDetail }}>
                        <Text> Name:  {props.name}</Text>
                        { props.availability
                        ?<Text>Available</Text>
                        :<Text>Not Available</Text>
                        }
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    DoctorItem: {
        height: 200,
        width: '100%',
        backgroundColor: '#d8bfd8',
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 10,

    },


    doctorRow: {
        flexDirection: 'row',
    },
    doctorHeader: {
        height: '85%'
    },
    doctorDetail: {
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '15%'

    },
    titleContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 12,
        paddingVertical: 5,
    },
    title: {
        fontSize: 22,
        color: 'white',
        textAlign: 'center',
    },

});

export default DoctorItem;