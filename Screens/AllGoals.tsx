import * as React from "react";
import { useCallback, useState } from "react";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { deleteTransaction, displayTables, getAllMonthlyGoal, getDBConnection, updateTransaction } from './mySql.tsx';
import GoalEntry from '../Components/GoalEntry.tsx';
import {convertMonthNumToName} from "../Helpers.tsx";
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const AllGoalsScreen = ({ navigation, route }) => {
    const [sortedGoals, setSortedGoals] = useState(new Map());

    useFocusEffect(
        useCallback(() => {
          // console.log("ActivityScreen focused");
          const getGoals = async () => {
            console.log("Getting goals...");
            const db = await getDBConnection();
            await displayTables(db, 'MonthlyGoal');
            const goalList = await getAllMonthlyGoal(db);
    
            setSortedGoals(new Map());
            //setTransactions(transactionRows);
            console.log("goalList: ", goalList);
    
            // sort transactions by date into a map
            let temp = new Map();
            //current = 0, upcoming = 1
            temp.set(0, []);
            temp.set(1, []);
            for (let i = 0; i < goalList.length; i++) {
              const status = goalList[i].status;
              if (temp.has(status)) {
                temp.get(status).push(goalList[i]);
              }
            }
    
            setSortedGoals(temp);
          }
          getGoals();
    
          // console.log("Sorted transactions: ", sortedTransactions);
          return () => {
            sortedGoals.clear();
          };
        }, [])
    );
    console.log(sortedGoals.get(1))
return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.toprow} onPress={() => navigation.goBack()}>
            <Text style={{color:'#000', marginRight:4}}>Home</Text>
            <FontAwesome5 color="black" size={16} name="arrow-right" />
        </TouchableOpacity>
        <View style={{marginTop: 25}}>
            <Text style={styles.label}>Current Goal</Text>
            <View style={styles.currentGoal}>
                <GoalEntry month={'March'} year={2024} targetExpense={1200} progress={0.6} status={0}/>
            </View>
            <Text style={styles.label}>Upcoming Goal</Text>
            <View style={styles.upcomingGoal}>
                <ScrollView>
                    {/* <GoalEntry month={'April'} year={2024} targetExpense={2000} progress={0.1} status={1}/> */}
                    {
                     Array.from(sortedGoals.keys()).sort().map((entry) => (
                        sortedGoals.get(1).map((entry) => {
                            return (
                                <View style={{marginVertical: 10}}>
                                    <GoalEntry month={convertMonthNumToName(entry.month)} year={entry.year} targetExpense={entry.targetExpense} progress={1} status={entry.status}/>
                                </View>
                            );
                        })
                      ))

                }
                </ScrollView>
                <TouchableOpacity style={{marginTop: 10}} onPress={() => {navigation.navigate("AllGoals");}}>
                    <Feather color="black" size={32} name="plus-square" />
                </TouchableOpacity>
            </View>
        </View>
    </View>
 
)

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    currentGoal: {
        flexDirection: 'column',
        alignItems: 'center',
        width: "100%",
        marginVertical: 20,
    },
    upcomingGoal: {
        flexDirection: 'column',
        alignItems: 'center',
        width: "100%",
        marginVertical: 20,
    },
    toprow: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginVertical: 10,
        paddingRight: 10,
        alignItems: 'center',
        textAlign: 'center',
    },
    label: {
        color: '#000',
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 12,
    }
});

export default AllGoalsScreen;