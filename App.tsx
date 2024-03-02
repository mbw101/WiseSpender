import React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';


import Icon from 'react-native-vector-icons/FontAwesome';

import NavigateComponent from './Components/Navigator.tsx';

import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View,} from 'react-native';
import HomeScreen from './Screens/HomeScreen.tsx';
import ActivityScreen from './Screens/ActivityScreen.tsx';
import HistoryScreen from './Screens/HistoryScreen.tsx';
import ProfileScreen from './Screens/ProfileScreen.tsx';

const TabNavigator = createBottomTabNavigator();
const Stack = createStackNavigator();

function App(): React.JSX.Element {

  return (
    <NavigationContainer>
      <TabNavigator.Navigator screenOptions={{
        tabBarActiveTintColor:"blue",
        tabBarInactiveTintColor:"#fff",
        tabBarStyle:{backgroundColor:"#000"},
        tabBarLabelStyle: {
          fontSize: 15},
        }}>
        <TabNavigator.Screen name="Home" component={HomeScreen}/>
        <TabNavigator.Screen name="Archive" component={HistoryScreen}/>
        <TabNavigator.Screen name="Activity" component={ActivityScreen}/>
        <TabNavigator.Screen name="Profile" component={ProfileScreen}/>
      </TabNavigator.Navigator>
    </NavigationContainer> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default App;
