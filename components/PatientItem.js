import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';


const PatientItem = props => {




    return (
        <View style={styles.PatientItem}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{props.name}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    PatientItem: {
        height: 40,
        width: '100%',
        backgroundColor: '#d8bfd8',
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 10,

    },

    titleContainer: {
        justifyContent:'center',
        alignItems: 'center',
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

export default PatientItem;