import React, {useEffect} from 'react';
import {ActivityIndicator, StatusBar, StyleSheet, View,} from 'react-native';

export interface AuthLoadingScreenProps {
    navigation: any;
}

const AuthLoadingScreen: React.FC<AuthLoadingScreenProps> = props => {

    useEffect(() => {
        _bootstrapAsync().then(r => {});
    });


    const _bootstrapAsync = async () => {
        const token = "123";
        let name;
        if(token){
            name = 'App';
        }else {
            name = 'Auth';
        }
        props.navigation.navigate(name);
    };

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large"/>
            <StatusBar barStyle="default" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AuthLoadingScreen;
