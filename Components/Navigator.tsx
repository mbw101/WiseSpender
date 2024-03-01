import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// custom icons
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import Feather from "react-native-vector-icons/Feather";

import HomeScreen from "../Screens/HomeScreen";
import ActivityScreen from "../Screens/ActivityScreen";

type RootStackParamList = {
  Home: undefined;
  Details: { itemId: number };
  // ...other screens
};

type NavigationType = NavigationProp<RootStackParamList>;

interface NavigateComponentProps {
  navigation: NavigationType;
}

const NavigateComponent: React.FC<NavigateComponentProps> = ({navigation}) => {
    return (
        <View style={styles.nav}>
          <TouchableOpacity style={styles.col}>
            <AntDesign color="white" size={24} name="home"/>
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.col}>
            <FontAwesome5 color="white" size={22} name="history"/>
            <Text style={styles.navText}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather color="white" size={48} name="plus-square"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.col}>
            <Feather color="white" size={24} name="activity"/>
            <Text style={styles.navText}>Activity</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.col}>
            <FontAwesome5 color="white" size={24} name="user-circle"/>
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    nav: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      backgroundColor: '#000',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingTop: 2,
    },
    navText: {
      color: '#fff',
      fontSize: 16,
    },
    col: {
      marginHorizontal: 20,
      marginVertical: 12,
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
    },
  });

  
export default NavigateComponent;