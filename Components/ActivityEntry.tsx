import * as React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

type ActivityEntryProps = {
    date: string; // formatted as '5:23pm'
    dollarAmount: number;
    description: string; // where money was spent
    currency: string;
    editTransaction: () => void;
};

// parent will handle which month on the activity screen this entry will be under
// for example, the 'January' header will contain all January ActivityEntries
const ActivityEntry = (props: ActivityEntryProps) => {
    const { date, dollarAmount, description, currency, editTransaction } = props;
    // print the date, location, and amount spent

    return (
        // add onPress to navigate to an edit screen for the transaction
        <TouchableOpacity style={styles.container} onPress={() => {
            console.log("editTransaction");
            editTransaction()
        }}>
            <View style={{
                width: '17%'
            }}>
                <Text style={{
                    fontSize: 12
                }}>{date}</Text>
            </View>

            <View style={{
                width: '78%',
                paddingLeft: 15
            }}>
                <Text style={styles.messageStyle}>You spent {currency.trim()}{dollarAmount} on {description}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        padding: 15,
        paddingLeft: 0,
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