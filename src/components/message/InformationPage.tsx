import React from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from "react-native";
import {Props} from "../../../App";

let {width, height} = Dimensions.get('window');

export const InformationPage: React.FC<Props> = props => {

    return (
        <ScrollView style={{backgroundColor: '#f8f8f8'}}>
            <View style={styles.Top}>
                <Text>InformationPage</Text>
            </View>
        </ScrollView>
    );
};



const styles = StyleSheet.create({
    Top: {
        width: width,
        height: 60,
        overflow: 'hidden',
    },
    userItems: {
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f8f8f8',
    },
    userHeader: {
        width: 44,
        height: 44,
    },
    userRight: {
        flex: 1,
        alignItems: 'flex-start',
        paddingLeft: 10,
    },
    userName: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        paddingBottom: 10,
        fontFamily: "ping-fang"
    },
    dataTime: {
        flex: 1,
        fontSize: 12,
        color: '#a0a0a0',
        textAlign: 'right',
        fontFamily: "ping-fang"
    },
    dataInfo: {
        fontSize: 13,
        color: '#999',
        fontFamily: "ping-fang"
    },
});

export default InformationPage
