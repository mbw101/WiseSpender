import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { deleteTransaction, displayTables, getDBConnection, updateTransaction } from './mySql.tsx';


const AllGoalsScreen = ({ navigation, route }) => {

return (
    <View>
    </View>
)

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

});

export default AllGoalsScreen;