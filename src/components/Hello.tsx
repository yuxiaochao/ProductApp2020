import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {AuthContext} from "../app/ContextManager";

export interface Props {
    name: string;
    enthusiasmLevel?: number;
}

//const {signIn} = React.useContext(AuthContext);
//const navigation = useNavigation();

const Hello: React.FC<Props> = props => {
    const [enthusiasmLevel, setEnthusiasmLevel] = React.useState(props.enthusiasmLevel);
    const {signIn,signOut} = React.useContext(AuthContext);
    const navigation = useNavigation();
    const onIncrement = () => {
        signOut();
    }
    const onDecrement = () => {
        navigation.navigate('App')
    }

    const getExclamationMarks = (numChars: number) => Array(numChars + 1).join('!');
    return (
        <View style={styles.root}>
            <Text style={styles.greeting}>
                Hello {props.name + getExclamationMarks(enthusiasmLevel || 0)}
            </Text>

            <View style={styles.buttons}>
                <View style={styles.button}>
                    <Button title="navigation.navigate('App')" onPress={onDecrement} accessibilityLabel="decrement" color="red" />
                </View>

                <View style={styles.button}>
                    <Button title="signIn()" onPress={onIncrement} accessibilityLabel="increment" color="blue" />
                </View>
            </View>
        </View>
    );
};

// styles
const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttons: {
        flexDirection: 'row',
        minHeight: 70,
        alignItems: 'stretch',
        alignSelf: 'center',
        borderWidth: 5,
    },
    button: {
        flex: 1,
        paddingVertical: 0,
    },
    greeting: {
        color: '#999',
        fontWeight: 'bold',
    },
});

export default Hello;
