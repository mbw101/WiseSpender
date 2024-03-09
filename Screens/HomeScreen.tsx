import * as React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddGoalScreen from "./AddGoalScreen";
import InitialScreen from "./InitialScreen";
import { getCurrentDate, getUpdateString } from "../Helpers";
import WeeklyBreakdown from "../Components/WeeklyBreakdown";
import AntDesign from "react-native-vector-icons/AntDesign";

const Stack = createNativeStackNavigator();

type HomeScreenComponentProps = {
};

type HomeScreenProps = {
    navigation: any;
};

const HomeScreenComponent = ({navigation}) => {
    const [spentToday, setSpentToday] = useState(51.89); // fake for milestone 2
    const [dailyAverage, setDailyAverage] = useState(57.75);
    // props for the streaks
    const [daysInARow, setDaysInARow] = useState(3); // TODO: Change defaults for milestone 3
    const [streakMessage, setStreakMessage] = useState("You're on fire! Keep up the great habits!");

    return (
        <View style={styles.container}>
            <Text style={styles.dateStyle}>{getCurrentDate()}</Text>

            <TouchableOpacity style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '35%',
                borderWidth: 1,
                marginTop: 15,
                borderRadius: 5,
            }}>
                <AntDesign color="black" size={18} name="arrowleft" />
                <Text>View Month Goals</Text>
            </TouchableOpacity>

            <View style={{
                marginTop: 15,
            }}>
                <WeeklyBreakdown
                    dailyAverage={dailyAverage}
                    percentageDifference={-34}
                />
                <TouchableOpacity style={{
                    backgroundColor: "#E8E6E6",
                    width: "50%",
                    flexDirection: 'row',
                    marginTop: 5,
                }} onPress={()=> navigation.navigate('MonthlyActivity')}>
                    <Text>See your monthly activity</Text>
                    <AntDesign color="black" size={18} name="arrowright" />
                    {/* TODO: add arrow icon from react library */}

                </TouchableOpacity>

                <Text style={{
                    marginTop: 5,
                }}>{getUpdateString()}</Text>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={styles.defaultTextStyle}>Total Spent Today: </Text>
                    <Text style={styles.spentStyle}> ${spentToday}</Text>
                </View>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 60
                }}>
                    {/* TODO: Add streak info here! */}
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 24
                    }}>{daysInARow} day streak!</Text>
                    <Text style={{
                        fontSize: 18
                    }}>{streakMessage}</Text>
                </View>

            </View>
        </View >
    );
}

const HomeScreen = (props: HomeScreenProps) => {
    const [addedGoal, setAddedGoal] = useState(false);

    return (
        <Stack.Navigator>
            <Stack.Screen name="initial" component={InitialScreen} options={{ headerShown: false }} />
            <Stack.Screen name="home" component={HomeScreenComponent} options={{ headerShown: false }} />
            <Stack.Screen name="addGoal" options={{ headerShown: false }}>
                {props => <AddGoalScreen navigation={props.navigation} setAddedGoal={setAddedGoal} />}
            </Stack.Screen>
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