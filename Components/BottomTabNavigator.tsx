import React, { } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';

// custom icons
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import Feather from "react-native-vector-icons/Feather";

import { StyleSheet, TouchableOpacity} from 'react-native';
import HomeScreen from '../Screens/HomeScreen.tsx';
import ActivityScreen from '../Screens/ActivityScreen.tsx';
import HistoryScreen from '../Screens/HistoryScreen.tsx';
import ProfileScreen from '../Screens/ProfileScreen.tsx';
import NewTransactionScreen from '../Screens/NewTransactionScreen.tsx';

const TabNavigator = createBottomTabNavigator();
const BottomTabNavigator: React.FC = () => {
    return (
        <TabNavigator.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size}) => {
              let routeName = route.name;
              
              if (routeName === 'Home'){
                color =  focused ? '#4287f5' : 'white';
                return <AntDesign color={color} size={24} name="home"/>;
              }
              else if (routeName === 'Archive'){
                color =  focused ? '#4287f5' : 'white';
                return <FontAwesome5 color={color} size={22} name="history"/>;
              }
              else if (routeName === 'Transaction'){
                return <Feather color={color} size={48} name="plus-square"/>;
              }
              else if (routeName === 'Activity'){
                color =  focused ? '#4287f5' : 'white';
                return <Feather color={color} size={24} name="activity"/>;
              }
              else if (routeName === 'Profile'){
                color =  focused ? '#4287f5' : 'white';
                return <FontAwesome5 color={color} size={24} name="user-circle"/>;
              }
              else {
                return;
              }
             
            },
            tabBarActiveTintColor: "#4287f5",
            tabBarInactiveTintColor: "#fff",
            tabBarStyle: { 
              height: 55,
              backgroundColor: "#000",
              paddingTop: 6,
            },
            tabBarLabelStyle: {
              fontSize: 15,
            },
            // tabBarButton: (props) => (
            //   <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            //     <Text>Settings</Text>
            //   </TouchableOpacity>
            // ),
          })
          }
          >
            {/* show HomeScreen once they've added a goal */}
            <TabNavigator.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <TabNavigator.Screen name="Archive" component={HistoryScreen} options={{ headerShown: false }} />
            <TabNavigator.Screen name="Transaction" component={NewTransactionScreen}  options={({navigation})=> ({
              headerShown: false,
              tabBarButton: props => <TouchableOpacity {...props} onPress={()=>navigation.navigate('NewTransaction')}/>,
              tabBarLabel: () => null, 
            })} />
            <TabNavigator.Screen name="Activity" component={ActivityScreen} options={{ headerShown: false }} />
            <TabNavigator.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
          </TabNavigator.Navigator>
    );
}

  
export default BottomTabNavigator;