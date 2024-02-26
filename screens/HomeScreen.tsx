import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';


import { getCurrentDate } from "./helpers";
import { NavigationContainer } from '@react-navigation/native';

function HomeScreen() {
    return (
        <NavigationContainer>
            {/* <Stack.Navigator> */}
            <View>
                <Text>{getCurrentDate()}</Text>
            </View>
            {/* </Stack.Navigator> */}
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: 'white'
    },
    dateStyle: {
        color: "#0C9AEA"
    }
});

export default HomeScreen;