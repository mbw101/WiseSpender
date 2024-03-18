import * as React from "react";
import { useEffect } from "react";
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
    const [hasData, setHasData] = React.useState(true);

    // TODO: Load in this data as a prop for Milestone 3
    const data = [
        { value: 60, label: 'M' },
        { value: 50, label: 'T' },
        { value: 60, label: 'W' },
        { value: 50, label: 'T' },
        { value: 60, label: 'F' },
        { value: 50, label: 'S' },
        { value: 60, label: 'S' }
    ]

    useEffect(() => {
        // TODO: Load weekly data from the database, otherwise show placeholder text

        // if there is data, set hasData to true
    }, []);

    return (
        <View style={styles.container}>
            {
                hasData ?
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
                    :
                    null
            }

            {
                hasData ?
                    <Text style={styles.averageAmountStyle}>${dailyAverage.toFixed(2)}</Text>
                    :
                    null
            }

            {/* TODO: Also, more than likely there will never be 7 bars on the graph, only a subset of them will be shown. */}

            {
                hasData ?
                    <View style={{ height: 200 }}>
                        {/* TODO: Set the middle of the bar chart as their daily expense target */}
                        <BarChart
                            style={{ flex: 1 }}
                            data={data}
                            gridMin={0}
                            yAccessor={({ item }) => item.value}
                            svg={{ fill: '#0C9AEA' }}
                        />
                        <XAxis
                            data={data}
                            formatLabel={(_, index) => data[index].label}
                            style={{
                                marginTop: 5,
                                marginHorizontal: 0,
                            }}
                            // This seems to get the XAxis properly aligned with the BarChart
                            contentInset={{
                                left: 25,
                                right: 25
                            }}
                        />
                    </View>
                    :
                    <View style={{
                        // we could either have the height match whether there is data (so graph is present) or not. Or we could have it take less whitespace
                        height: 200,
                        justifyContent: 'center',
                    }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                marginTop: 20,
                                fontSize: 20
                            }}>
                            No data to display for this week
                        </Text>
                    </View>
            }
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