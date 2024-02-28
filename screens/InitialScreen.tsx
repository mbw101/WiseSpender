import React from 'react';
import {
    Image,
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
                <Image
                    source={require("./../assets/add.png")}
                    style={styles.imageStyle} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // alignItems: "center",
        padding: 5,
        flex: 1,
        flexGrow: 1,
        backgroundColor: "red"
    },
    addGoal: {
        justifyContent: "center", // center vertically
        alignItems: "center", // center horizontally
        width: "100%",
        flex: 1,
        flexGrow: 1,
        backgroundColor: "green"
    },
    dateStyle: {
        color: "#0C9AEA",
        fontSize: 32
    },
    imageStyle: {
        width: '20%',
        margin: 20,
        resizeMode: 'contain', // this looks better than stretch
        backgroundColor: "yellow"
    }
});

export default InitialScreen;