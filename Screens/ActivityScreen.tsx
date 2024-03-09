import * as React from "react";
import { View, Text, StyleSheet } from 'react-native';
import ActivityEntry from "../Components/ActivityEntry";
import { useEffect, useState } from "react";

const ActivityScreen = ({ route, navigation }) => {

  const { currency, date, dollarAmount, description }  = route.params;
  // const addedTransaction = route.params;
  const [transactions, setTransactions] = useState<any[]>([]);

  console.log(date);
  // console.log("Added: ", addedTransaction);
  useEffect(() => {
    setTransactions([...transactions, {"currency": currency, "date": date, "dollarAmount": dollarAmount, "description": description}]);
  }, []);

  return (
    // TODO: Change this to a FlatList later on
    <View style={styles.container}>
      <View style={{
        alignItems: 'center',
        paddingTop: 20,
      }}>
        <Text style={{
          color: 'black'
        }}>Recent Activity</Text>
      </View>

      {/* TODO: Figure out how we will dynamically create the months. Or should we have all months? */}
      <Text>March</Text>
      <ActivityEntry date={'Mar 1st'} dollarAmount={51.89} description={'Groceries'} />
      <ActivityEntry date={'Mar 3rd'} dollarAmount={30.12} description={'Uber Eats'} />
      
      {
        transactions.map((transaction) => (
          <ActivityEntry date={transaction.date} dollarAmount={transaction.dollarAmount} description={transaction.description} />
        ))
      }



    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },

});

export default ActivityScreen;