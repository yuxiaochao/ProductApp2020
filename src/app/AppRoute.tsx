import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import ActivityStack from "./route/ActivityRoute";
import HomeStack from "./route/HomeRoute";
import ContactsStack from "./route/ContactsRoute";
import UserStack from "./route/UserRoute";
import MessageStack from "./route/MessageRoute";

const Tab = createBottomTabNavigator();

const AppStack: React.FC<any> = props => {
    return (
        <Tab.Navigator
            initialRouteName="MessageStack"
            tabBarOptions={{
                activeTintColor: '#e91e63',
            }}
            //tabBar={props => <MyTabBar {...props} />}
        >
            <Tab.Screen
                name="MessageStack"
                component={MessageStack}
                options={{
                    tabBarLabel: '消息',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name={'ios-arrow-forward'} size={size}
                                  color={'#999'}/>
                    ),
                }}
            />
            <Tab.Screen
                name="ActivityStack"
                component={ActivityStack}
                options={{
                    tabBarLabel: '活动',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name={'ios-arrow-forward'} size={size}
                                  color={'#999'}/>
                    ),
                }}
            />
            <Tab.Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                    tabBarLabel: '任务中心',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name={'ios-arrow-forward'} size={size}
                                  color={'#999'}/>
                    ),
                }}
            />
            <Tab.Screen
                name="ContactsStack"
                component={ContactsStack}
                options={{
                    tabBarLabel: '通讯录',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name={'ios-arrow-forward'} size={size}
                                  color={'#999'}/>
                    ),
                }}
            />
            <Tab.Screen
                name="UserStack"
                component={UserStack}
                options={{
                    tabBarLabel: '我的',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name={'ios-arrow-forward'} size={size}
                                  color={'#999'}/>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}


export const MyTabBar: React.FC<any> = ({ state, descriptors, navigation })  => {
    return (
        <View style={{ flexDirection: 'row' }}>
            {state.routes.map((route: { key: React.ReactText; name: any; }, index: any) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <View style={{width:50,height:50}}>
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityStates={isFocused ? ['selected'] : []}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{ flex: 1,width:50}}
                        >
                            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>{label}</Text>
                        </TouchableOpacity>
                    </View>
                );
            })}
        </View>
    );
}
export default AppStack
