import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';


import { getCurrentDate } from "./helpers";

function InitialScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.dateStyle}>{getCurrentDate()}</Text>

            <View style={styles.addGoal}>
                <Text>Add a monthly goal to get started...</Text>
                {/* TODO: Add monthly goal button (the plus sign) */}
                {/* <Image src= */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // flexGrow: 1,
        backgroundColor: 'white'
    },
    addGoal: {
        alignContent: "center",
        alignItems: "center",
    },
    dateStyle: {
        color: "#0C9AEA",
        fontSize: 32
    },
});

export default InitialScreen;