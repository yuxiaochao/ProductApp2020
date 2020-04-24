import React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import LoginPage from "../../components/login/LoginPage";
import {AuthContext} from "../ContextManager";
import Hello from "../../components/Hello";

type AuthStackParams = {
    LoginPage: undefined;
    Hello:undefined;
};
const Stack = createStackNavigator<AuthStackParams>();

const AuthStack: React.FC<any> = props => {

    return (
        <AuthContext.Provider value={React.useContext(AuthContext)}>
            <Stack.Navigator
                initialRouteName="LoginPage"
                headerMode="float"
                screenOptions={{
                    headerTintColor: 'white',
                    headerStyle: {backgroundColor: 'tomato'},
                }}
            >
                <Stack.Screen
                    name="LoginPage"
                    component={LoginPage}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="Hello"
                    component={Hello}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        </AuthContext.Provider>
    );
}

export default AuthStack
