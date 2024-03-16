import * as React from "react";
import { View, Text, StyleSheet } from 'react-native';
import ActivityEntry from "../Components/ActivityEntry";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";

const ActivityScreen = ({ route }) => {

  // destructure optional route params
  // if route.params is undefined, give empty values
  const { currency, date, dollarAmount, description } = (route.params !== undefined ? route.params :
    { "currency": "", "date": "", "dollarAmount": "", "description": "" });
  // because we know that the format is day/month/year, we can split the string and grab the month
  // should be a way to convert month num to month name


  const [transactions, setTransactions] = useState<any[]>([]); // list of transactions received from NewTransactionScreen
  const updatedTransactions = [...transactions, { "currency": currency, "date": date, "dollarAmount": dollarAmount, "description": description }];
  const [sortedTransactions, setSortedTransactions] = useState(new Map());
  // const [completeEntries, setCompleteEntries] = useState<Set<any>>(new Set());

  useEffect(() => {
    setTransactions(updatedTransactions);

    // sort transactions by date into a map
    for (let i = 0; i < updatedTransactions.length; i++) {
      const month = updatedTransactions[i].date.split('/')[1];
      let temp = sortedTransactions;
      if (sortedTransactions.has(month)) {
        temp.get(month).push(updatedTransactions[i]);
      } else {
        temp.set(month, [updatedTransactions[i]]);
      }
      setSortedTransactions(temp);
    }

    console.log(sortedTransactions);
  }, [dollarAmount]);

  const convertMonthNumToName = (monthNum: string) => {
    const formatter = new Intl.DateTimeFormat('en', { month: 'long' });
    return formatter.format(new Date(2024, parseInt(monthNum) - 1, 1));
  }

  return (
    <View style={styles.container}>
      <View style={{
        alignItems: 'center',
        paddingTop: 20,
      }}>
        <Text style={{
          color: 'black'
        }}>Recent Activity</Text>
      </View>

      <ScrollView>
        {       
          Array.from(sortedTransactions.keys()).filter((month) => {
            return month !== undefined;
          }).sort().map((month) => (           
              <View key={month}>
                <Text style={{
                  color: 'black',
                  fontSize: 20,
                  fontWeight: 'bold',
                  paddingLeft: 10,
                }}>{convertMonthNumToName(month)}</Text>
                {
                  sortedTransactions.get(month).map((transaction) => (
                    <ActivityEntry date={transaction.date} dollarAmount={transaction.dollarAmount} description={transaction.description} currency={transaction.currency} key={transaction.description + " " + transaction.dollarAmount} />
                  ))
                }
              </View>
          ))
        }
      </ScrollView>


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