import * as React from "react";
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { getCurrentDate, getUpdateString } from "../Helpers";
import AntDesign from "react-native-vector-icons/AntDesign";
import MonthlyActivitySection from "../Components/MonthlyActivitySection";

const test = {
    "monthlyExpense": 1500.34,
    "targetPerDay": 48.41,
    "month": "January",
    "year": "2024",
    "dayStatus": [
       {"id": 1,
       "day":"Sun",
       "status": "green"},
       {"id": 2,
       "day":"Sun",
       "status": "green"},
       {"id": 3,
       "day":"Sun",
       "status": "red"},
       {"id": 4,
       "day":"Sun",
       "status": "green"},
       {"id": 5,
       "day":"Fri",
       "status": "red"},
       {"id": 6,
       "day":"Fri",
       "status": "red"},
       {"id": 7,
       "day":"Fri",
       "status": "red"},
       {"id": 8,
       "day":"Fri",
       "status": "red"},
       {"id": 9,
       "day":"Mon",
       "status": "green"},
       {"id": 10,
       "day":"Mon",
       "status": "green"},
       {"id": 11,
       "day":"Mon",
       "status": "green"},
       {"id": 12,
       "day":"Mon",
       "status": "green"},
       {"id": 13,
       "day":"Tues",
       "status": "yellow"},
       {"id": 14,
       "day":"Tues",
       "status": "red"},
       {"id": 15,
       "day":"Tues",
       "status": "green"},
       {"id": 16,
       "day":"Tues",
       "status": "green"},
       {"id": 17,
       "day":"Wed",
       "status": "red"},
       {"id": 18,
       "day":"Wed",
       "status": "green"},
       {"id": 19,
       "day":"Wed",
       "status": "green"},
       {"id": 20,
       "day":"Wed",
       "status": "red"},
       {"id": 21,
       "day":"Thru",
       "status": "green"},
       {"id": 22,
       "day":"Thru",
       "status": "green"},
       {"id": 23,
       "day":"Thru",
       "status": "green"},
       {"id": 24,
       "day":"Thru",
       "status": "green"},
       {"id": 25,
       "day":"Sat",
       "status": "green"},
       {"id": 26,
       "day":"Sat",
       "status": "green"},
       {"id": 27,
       "day":"Sat",
       "status": "green"},
       {"id": 28,
       "day":"Sat",
       "status": "red"},
       ],
   };
const MonthlyActivityScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.dateStyle}>{getCurrentDate()}</Text>
        <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
            <AntDesign color="black" size={18} name="arrowleft" />
            <Text>Back</Text>
        </TouchableOpacity>
        <View style={{alignItems:'center'}}>
            <MonthlyActivitySection data={test}/>
        </View>
        <Text style={{marginLeft:16, marginTop: 5}}>{getUpdateString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    goBack: {
        flexDirection: 'row',
        borderRadius: 5,
        alignItems: 'center',
        paddingHorizontal: 4,
        backgroundColor: "#E8E6E6",
    },
    dateStyle: {
        color: "#0C9AEA",
        fontSize: 32,
    },
});

export default MonthlyActivityScreen;