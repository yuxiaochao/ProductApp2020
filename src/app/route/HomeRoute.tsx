import React from "react";
import Hello from "../../components/Hello";
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

const HomeStack: React.FC<any> = props => {
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
                component={Hello}
                options={{
                    title: 'My profile',
                }}
            />
        </Stack.Navigator>
    );
}
export default HomeStack
