import React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import InformationPage from "../../components/message/InformationPage";

const Stack = createStackNavigator();

const MessageStack: React.FC<any> = props => {
    return (
        <Stack.Navigator
            initialRouteName="MessagePage"
            headerMode="float"
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: 'tomato' },
            }}
        >
            <Stack.Screen
                name="InformationPage"
                component={InformationPage}
                options={{
                    title: 'Awesome app',
                    headerShown:false
                }}
            />
        </Stack.Navigator>
    );
}

export default MessageStack
