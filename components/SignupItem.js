import React, { useState } from 'react';
import { StyleSheet, Button, View, TextInput } from 'react-native';


const SignupItem = props => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [specialization, setspecialization] = useState('');
    


    return (
        <View style={styles.screen}>
            <TextInput
                placeholder='username'
                onChangeText={setUsername}
                value={username}
            />
            <TextInput
                placeholder='password'
                onChangeText={setPassword}
                value={password}
            />
            <TextInput
                placeholder='name'
                onChangeText={setName}
                value={name}
            />
            
            {props.isDoctor &&
            <TextInput
                placeholder='specialization'
                onChangeText={setspecialization}
                value={specialization}
            />
             }
            <View style={styles.buttons}>
                <Button title={props.titleSignup} onPress={() =>  props.onSignUp(username, password, name, specialization)}  />
            </View>

        </View>

    );

};


const styles = StyleSheet.create({

    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons: {
        marginVertical: 5,
    },
});

export default SignupItem;