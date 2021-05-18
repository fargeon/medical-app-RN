import React, { useState } from 'react';
import { StyleSheet, Button, View, TextInput } from 'react-native';


const LoginItem = props => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


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
            <View style={styles.buttons}>
                <Button title={props.titleLogin} onPress={() => { props.onLogin(username, password) }} />
            </View>
            <View style={styles.buttons}>
                <Button title={props.titleSignUp} onPress={ props.onSignUp } />
               <View style={styles.clearButton}>
                <Button title='CLEAR DATA' color='red' onPress={props.clearData} />
                </View>
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
    clearButton:{ 
        marginTop: 100,
        
    },
});

export default LoginItem;