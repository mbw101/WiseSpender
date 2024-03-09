import React, { } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import { StyleSheet, TouchableOpacity} from 'react-native';
import NewTransactionScreen from './Screens/NewTransactionScreen.tsx';
import BottomTabNavigator from './Components/BottomTabNavigator.tsx';
import CurrencySelectorScreen from './Screens/CurrencySelectorScreen.tsx';
import MonthlyActivityScreen from './Screens/MonthlyActivityScreen.tsx';
import { RootSiblingParent } from 'react-native-root-siblings';

const StackNavigator = createStackNavigator();

function App(): React.JSX.Element {

  return (
    <RootSiblingParent>
      <NavigationContainer>
        <StackNavigator.Navigator screenOptions={{headerShown: false}}>
          <StackNavigator.Screen name='Main' component={BottomTabNavigator}/>
          <StackNavigator.Screen name='MonthlyActivity' component={MonthlyActivityScreen} options={{ presentation: 'card' }}/>
          <StackNavigator.Screen name="NewTransaction" component={NewTransactionScreen} options={{ presentation: 'modal' }}/>
          <StackNavigator.Screen name="CurrencySelector" component={CurrencySelectorScreen} options={{ presentation: 'modal' }}/>
        </StackNavigator.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
}


export default App;
