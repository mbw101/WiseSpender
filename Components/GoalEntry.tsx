import * as React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

type GoalEntryProps = {
    Month: string; // formatted as '5:23pm'
    targetExpense: number;
    progress: number; // where money was spent
    status: number;
};

const GoalEntry = (props: GoalEntryProps) => {
    const { Month, targetExpense, progress, status} = props;

    return (
     
        <TouchableOpacity style={styles.container} onPress={() => {
        }}>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
       
    },
});

export default GoalEntry;