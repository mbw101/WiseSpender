import * as React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddGoalScreen from "./AddGoalScreen";
import InitialScreen from "./InitialScreen";

const Stack = createNativeStackNavigator();

const HomeScreenComponent = (props) => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
}

const HomeScreen = (props) => {
  const [addedGoal, setAddedGoal] = useState(false);

  return (
    <Stack.Navigator>
      <Stack.Screen name="initial" component={InitialScreen} options={{ headerShown: false }} />
      <Stack.Screen name="home" component={HomeScreenComponent} options={{ headerShown: false }} />
      <Stack.Screen name="addGoal" options={{ headerShown: false }}>
        {props => <AddGoalScreen navigation={props.navigation} setAddedGoal={setAddedGoal} /> } 
      </Stack.Screen>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;