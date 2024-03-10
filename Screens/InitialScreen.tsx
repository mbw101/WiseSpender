import React, { Dispatch, SetStateAction } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { getCurrentDate } from '../Helpers';
import Feather from 'react-native-vector-icons/Feather';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

type InitialScreenComponentProps = {
    setAddedGoal: Dispatch<SetStateAction<boolean>>;
    navigation: any;
};

const InitialScreenComponent = (props: InitialScreenComponentProps) => {
    const { navigation, setAddedGoal } = props;

    return (
        <View style={styles.container}>
            <Text style={styles.dateStyle}>{getCurrentDate()}</Text>
            <View style={styles.addGoal}>
                <Text>Add a monthly goal to get started...</Text>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("addGoal");
                }}>
                    <Feather color="black" size={48} name="plus-square" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const InitialScreen = (props) => {
    const { navigation, setAddedGoal } = props;

    return (
        <View style={styles.container}>
            <Text style={styles.dateStyle}>{getCurrentDate()}</Text>
            <View style={styles.addGoal}>
                <Text>Add a monthly goal to get started...</Text>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("addGoal");
                }}>
                    <Feather color="black" size={48} name="plus-square" />
                </TouchableOpacity>
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
    },
    addGoal: {
        justifyContent: "center", // center vertically
        alignItems: "center", // center horizontally
        width: "100%",
        flex: 1,
        flexGrow: 1,
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