import * as React from "react";
import { View, Text, StyleSheet } from 'react-native';

type ActivityEntryProps = {
    monthName: string;
    year: number;
    data: any; // TODO: Decide structure.
        // maybe [{date: }, {year}, {locations}] ?
        // Plain old Javascript object
};

// we will use this to have any number of Activity Entries for a specific month and year
const MonthlyActivitySection = (props: ActivityEntryProps) => {
    const { monthName, year, data } = props;

    return (
        <View style={styles.container}>
            <Text>{monthName} {year}</Text>

            {/* TODO: Iterate through data to create all the required Activity Entries */}
            <View>
            {/* TODO: Use FlatList */}

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionTitleStyle: {
        color: '#4F37E0',
        fontSize: 20
    }
});

export default MonthlyActivitySection;