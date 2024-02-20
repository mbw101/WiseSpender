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

function getCurrentDate(): string {
    let date: Date = new Date();
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDay();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
}

function HomeScreen() {
    return (
        <View>
            <Text>{getCurrentDate()}</Text>
        </View>
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