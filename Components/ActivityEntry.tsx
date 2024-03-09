import * as React from "react";
import { View, Text, StyleSheet } from 'react-native';

type ActivityEntryProps = {
    date: string; // formatted as '5:23pm'
    dollarAmount: number;
    description: string; // where money was spent
};

// parent will handle which month on the activity screen this entry will be under
// for example, the 'January' header will contain all January ActivityEntries
const ActivityEntry = (props: ActivityEntryProps) => {
    const { date, dollarAmount, description: location } = props;

    return (
        <View style={styles.container}>
            <View style={{
                width: '15%'
            }}>
                <Text>{date}</Text>
            </View>

            <View style={{
                width: '80%'
            }}>
                <Text style={styles.messageStyle}>You spent ${dollarAmount} on {location}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 3
    },
    messageStyle: {
        color: '#4F37E0',
        fontSize: 20
    }
});

export default ActivityEntry;