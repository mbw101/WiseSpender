import * as React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Progress from 'react-native-progress';

type GoalEntryProps = {
    month: string; // formatted as '5:23pm'
    year: number;
    targetExpense: number;
    progress: number; // where money was spent
    status: number;
};

const GoalEntry = (props: GoalEntryProps) => {
    const { month, year,targetExpense, progress, status} = props;

    return (
     
        <TouchableOpacity style={styles.container} onPress={() => {
        }}>
            <View style={styles.row}>
                <Text style={styles.label}>{month}</Text>
                <Text style={styles.label}>${targetExpense}</Text>
            </View>
            {status == 0 && (
                <View>
                    <Progress.Bar progress={progress} width={300} height={10}/>
                </View>
            )}
            {status == 1 && (
                <View style={{width:300, height: 10}}></View>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 16,
        paddingVertical: 18,
        paddingHorizontal: 30,
    },
    row: {
        justifyContent: 'center',
        flexDirection: 'row',
        paddingBottom: 10,
    },
    label: {
        color: '#000',
        fontSize: 26,
        paddingHorizontal: 10,
    }
});

export default GoalEntry;