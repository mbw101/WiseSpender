import React from 'react';
import type { PropsWithChildren } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

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