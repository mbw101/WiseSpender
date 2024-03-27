import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import { StyleSheet, TouchableOpacity } from 'react-native';
import NewTransactionScreen from './Screens/NewTransactionScreen.tsx';
import BottomTabNavigator from './Components/BottomTabNavigator.tsx';
import CurrencySelectorScreen from './Screens/CurrencySelectorScreen.tsx';
import MonthlyActivityScreen from './Screens/MonthlyActivityScreen.tsx';
import { RootSiblingParent } from 'react-native-root-siblings';
import EditTransactionScreen from './Screens/EditTransactionScreen.tsx';
import AllGoalsScreen from './Screens/AllGoals.tsx';
import { createTables, displayTables, getDBConnection } from './Screens/mySql.tsx';

const StackNavigator = createStackNavigator();

function App(): React.JSX.Element {

  const loadData = useCallback(async () => {
    try {
      const db = await getDBConnection();
      await createTables(db);
      console.log('Tables created');
      // await db.executeSql(`delete from Transactions;`);
    } catch (error) {
      console.error(error)
    }
  }, [])
  
  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <RootSiblingParent>
      <NavigationContainer>
        <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
          <StackNavigator.Screen name='Main' component={BottomTabNavigator} />

          <StackNavigator.Screen name='MonthlyActivity' component={MonthlyActivityScreen} options={{ presentation: 'card' }} />
          <StackNavigator.Screen name="NewTransaction" component={NewTransactionScreen} options={{ presentation: 'modal' }} />
          <StackNavigator.Screen name="CurrencySelector" component={CurrencySelectorScreen} options={{ presentation: 'modal' }} />
          <StackNavigator.Screen name="EditTransaction" component={EditTransactionScreen} options={{ presentation: 'modal' }} />
          <StackNavigator.Screen name="AllGoals" component={AllGoalsScreen} options={{ presentation: 'modal' }} />
        </StackNavigator.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
}


export default App;
