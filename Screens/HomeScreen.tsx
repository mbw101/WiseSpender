import * as React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useState, useEffect, useCallback } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddGoalScreen from "./AddGoalScreen";
import InitialScreen from "./InitialScreen";
import { getCurrentDate, getMonthProgress, getNumDaysInMonth, getUpdateString } from "../Helpers";
import WeeklyBreakdown from "../Components/WeeklyBreakdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import { createTables, getDBConnection, displayTables } from "./mySql.tsx";
import { FireFilled } from "@ant-design/icons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as Progress from 'react-native-progress';

const Stack = createNativeStackNavigator();

type HomeScreenProps = {
    navigation: any;
};

const HomeScreenComponent = ({ navigation }) => {
    const [spentToday, setSpentToday] = useState(51.89); // fake for milestone 2
    const [dailyAverage, setDailyAverage] = useState(57.75);
    const [expenseTarget, setExpenseTarget] = useState(48.40);
    // props for the streaks
    const [daysInARow, setDaysInARow] = useState(3); // TODO: Load from DB
    const [monthProgress, setMonthProgress] = useState(0);
    const [daysLeft, setDaysLeft] = useState(0);

    // TODO: If there's no goal for the current month, don't show anything for this screen

    useEffect(() => {
        // perform percentage completion calculation for the month
        const progress = getMonthProgress();
        setMonthProgress(progress);
        setDaysLeft(getNumDaysInMonth() - new Date().getDate());
    }, []);

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Text style={styles.dateStyle}>{getCurrentDate()}</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 60,
                }}>
                    <FontAwesome5 name="fire" color="#ff0000" size={16} />
                    <Text>3 days</Text>
                </View>
            </View>

            <View style={{
                marginTop: 15,
            }}>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                    onPress={() => navigation.navigate('addGoal')}
                >
                    <FontAwesome5 name="arrow-left" color="#000000" size={16} />
                    <Text>View All Goals</Text>
                </TouchableOpacity>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 100
                }}>
                    <Text style={styles.defaultTextStyle}>Total Spent Today: </Text>
                    <Text style={styles.spentStyle}> ${spentToday.toFixed(2)}</Text>
                </View>

                <WeeklyBreakdown
                    dailyAverage={dailyAverage}
                    percentageDifference={-34}
                />
                <TouchableOpacity style={{
                    backgroundColor: "#E8E6E6",
                    width: "50%",
                    flexDirection: 'row',
                    marginTop: 5,
                }} onPress={() => navigation.navigate('MonthlyActivity')}>
                    <Text>See your monthly activity</Text>
                    <AntDesign color="black" size={18} name="arrowright" />

                </TouchableOpacity>

                <Text style={{
                    marginTop: 10,
                }}>{getUpdateString()}</Text>
            </View>


            <View style={{
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                width: '100%',
            }}>
                <Progress.Bar progress={monthProgress} width={300} height={12}/>
                <Text style={styles.defaultTextStyle}>Days completed: {(monthProgress * 100).toFixed(0)}%</Text>
                <Text>Ends in {daysLeft} {daysLeft > 1 ? "days" : "day"}</Text>
            </View>
        </View>
    );
}

const HomeScreen = (props: HomeScreenProps) => {
    const [addedGoal, setAddedGoal] = useState(false);
    console.log("addedGoal: ", addedGoal);

    return (
        <Stack.Navigator>
            {addedGoal ? null : <Stack.Screen name="initial" component={InitialScreen} options={{ headerShown: false }} />}

            <Stack.Screen name="home" component={HomeScreenComponent} options={{ headerShown: false }} />
            {addedGoal ? null :
                <Stack.Screen name="addGoal" options={{ headerShown: false }}>
                    {props => <AddGoalScreen navigation={props.navigation} setAddedGoal={setAddedGoal} />}
                </Stack.Screen>
            }

        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    dateStyle: {
        color: "#0C9AEA",
        fontSize: 32
    },
    spentStyle: {
        color: '#4F37E0',
        fontSize: 32,
        fontWeight: 'bold'
    },
    defaultTextStyle: {
        fontSize: 16,
        color: 'black'
    }
});

export default HomeScreen;