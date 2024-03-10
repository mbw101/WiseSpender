import React, { } from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ActivityEntryProps = {
    data: any; // TODO: Decide structure.
        // maybe [{date: }, {year}, {locations}] ?
        // Plain old Javascript object
};

// we will use this to have any number of Activity Entries for a specific month and year
const MonthlyActivitySection = (props: ActivityEntryProps) => {
    const { data } = props;
    const weekDay = ['Sun', 'Mon', 'Tues', 'Wed', 'Thru', 'Fri', 'Sat'];

    const renderData = () => {
        let rows: any = [];

        rows = [...rows, data.dayStatus.filter((item) => item.day.includes("Sun"))];
        rows = [...rows, data.dayStatus.filter((item) => item.day.includes("Mon"))];
        rows = [...rows, data.dayStatus.filter((item) => item.day.includes("Tues"))];
        rows = [...rows, data.dayStatus.filter((item) => item.day.includes("Wed"))];
        rows = [...rows, data.dayStatus.filter((item) => item.day.includes("Thru"))];
        rows = [...rows, data.dayStatus.filter((item) => item.day.includes("Fri"))];
        rows = [...rows, data.dayStatus.filter((item) => item.day.includes("Sat"))];
        console.log(rows);
        return rows;
        
    }

    return (
        <View style={styles.container}>
           
            <View style={styles.expenseData}>
                <View style={styles.expenseCol}>
                    <Text style={styles.label}>Monthly Expense Amount</Text>
                    <Text style={styles.value}>${data.monthlyExpense}</Text>
                </View>
                <View style={styles.expenseCol}>
                    <Text style={styles.label}>Target Expense Amount</Text>
                    <Text style={styles.value}>${data.targetPerDay}/day</Text>
                </View>
            </View>
            <View>
                <Text style={styles.label}>{data.month}</Text>
                <View style={styles.renderTable}>
                    <View style={{marginRight: 20, paddingTop: 10}}>
                        {weekDay.map((i) => (
                            <View>
                                <Text style={{color:'#000', fontSize: 12, marginBottom: 8}}>{i}</Text>
                            </View>
                        ))}
                </View> 
                <View>
                        {renderData().map((row,index) => (
                            <View style={{paddingTop: 10}}>
                                <View key={index} style={{flexDirection:'row'}}>
                                    {row.map((item)=> (
                                        <View style={[styles.square,{backgroundColor: item.status}]}></View>
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>  
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 1,
    },
    sectionTitleStyle: {
        color: '#4F37E0',
        fontSize: 20
    },
    expenseData: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    expenseCol: {
        paddingHorizontal: 12,
        alignItems: 'center',
    },
    label: {
        color: '#000',
        alignSelf: 'center',
    },
    value: {
        fontSize: 24,
        fontWeight: '600',
        color:'#f2162c',
    },
    renderTable:{
        flexDirection: 'row',
    },
    square: {
        width: 14,
        height: 14,
        marginHorizontal: 6,
    },
});

export default MonthlyActivitySection;