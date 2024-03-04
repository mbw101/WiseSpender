import * as React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { BarChart, XAxis } from 'react-native-svg-charts'

// there's gotta be a graph component we can use for this component
type WeeklyBreakdownProps = {
    dailyAverage: number;
    percentageDifference: number;
};

const WeeklyBreakdown = (props: WeeklyBreakdownProps) => {
    // daily average comes from HomeScreen as a prop since it remains the same throughout the lifecycle
    // until the user adds a transaction (which is done on a separate screen)
    const { dailyAverage, percentageDifference } = props;
    const data = [
        { value: 60, label: 'M' },
        { value: 50, label: 'T' },
        { value: 60, label: 'W' },
        { value: 50, label: 'T' },
        { value: 60, label: 'F' },
        { value: 50, label: 'S' },
        { value: 60, label: 'S' }
    ]
    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
            }}>
                <View style={{
                    flexDirection: 'row',
                    width: '65%'
                }}>
                    <Text style={styles.defaultTextStyle}>Daily Average</Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    width: '40%' // right now this is how I have it align to the right
                }}>
                    <Text>{percentageDifference}% from last week</Text>
                </View>
            </View>

            <Text style={styles.averageAmountStyle}>${dailyAverage}</Text>

            <View style={{ height: 200, padding: 5 }}>
                <BarChart
                    style={{ flex: 1 }}
                    data={data}
                    gridMin={0}
                    yAccessor={({ item }) => item.value}
                    svg={{ fill: '#0C9AEA' }}
                />
                {/* TODO: Fix Axis so it lines up properly */}
                <XAxis
                    data={data}
                    formatLabel={(_, index) => data[index].label}
                    style={{
                        marginHorizontal: 15,
                        marginTop: 10,
                        width: '100%'
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        padding: 15,
        borderRadius: 10,
        paddingBottom: 20
    },
    dateStyle: {
        color: "#0C9AEA",
        fontSize: 32
    },
    spentStyle: {
        color: '#4F37E0',
        fontSize: 32
    },
    averageStyle: {
        fontSize: 20,
    },
    defaultTextStyle: {
        fontSize: 16,
        color: 'black'
    },
    averageAmountStyle: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default WeeklyBreakdown;