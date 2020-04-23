import React from "react";
import Hello from "../../components/Hello";
import {createStackNavigator} from '@react-navigation/stack';
import LoginPage from "../../components/login/LoginPage";
import App from "../../../App";
const Stack = createStackNavigator();

const AuthStack: React.FC<any> = props => {
    return (
        <Stack.Navigator
            initialRouteName="Hello"
            headerMode="float"
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: 'tomato' },
            }}
        >
            <Stack.Screen
                name="Hello"
                component={LoginPage}
                options={{
                    headerShown:false
                }}
            />
        </Stack.Navigator>
    );
}

export default AuthStack
