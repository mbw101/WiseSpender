import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ListRenderItem, ScrollView} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

let test = [
  {
    "month": "Jan",
    "goal": "$3200",
  },
  {
    "month": "Feb",
    "goal": "$3200",
  },
  {
    "month": "Mar",
    "goal": "$3200",
  }];
const HistoryScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.renderView}>
          <Text style={{fontSize:14, color:'#000', alignSelf: 'center'}}>Past Goals</Text>
          {test.map((item,index) => (
            <TouchableOpacity key={index} style={styles.itemBox} onPress={() => navigation.navigate('Home')}>
              <Text style={styles.itemMonth}>{item.month}</Text>
              <Text style={styles.itemGoal}>{item.goal}</Text>
              <AntDesign color={'#000'} size={12} name="right" />
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
  },
  renderView: {
    paddingTop: 5,
  },
  itemBox: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 12,
    backgroundColor: '#ABE3FB',
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 18,
    borderWidth: 1,
  },
  itemMonth: {
    fontSize: 32, 
    color:'#000',
  },
  itemGoal: {
    fontSize: 18, 
    color:'#000',
    marginHorizontal: 40,
  },
});

export default HistoryScreen;