import React, { } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';

import { StyleSheet, } from 'react-native';
import HomeScreen from './Screens/HomeScreen.tsx';
import ActivityScreen from './Screens/ActivityScreen.tsx';
import HistoryScreen from './Screens/HistoryScreen.tsx';
import ProfileScreen from './Screens/ProfileScreen.tsx';
import { RootSiblingParent } from 'react-native-root-siblings';

const TabNavigator = createBottomTabNavigator();

function App(): React.JSX.Element {

  return (
    <RootSiblingParent>
      <NavigationContainer>
        <TabNavigator.Navigator screenOptions={{
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "#fff",
          tabBarStyle: { backgroundColor: "#000" },
          tabBarLabelStyle: {
            fontSize: 15
          },
        }}>
          {/* show HomeScreen once they've added a goal */}
          <TabNavigator.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <TabNavigator.Screen name="Archive" component={HistoryScreen} />
          <TabNavigator.Screen name="Activity" component={ActivityScreen} />
          <TabNavigator.Screen name="Profile" component={ProfileScreen} />
        </TabNavigator.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
}


export default App;
