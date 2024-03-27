import * as React from "react";
import { View, Text, StyleSheet } from 'react-native';
import ActivityEntry from "../Components/ActivityEntry";
import { useCallback, useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { displayTables, getAllTransactions, getDBConnection } from "./mySql";

const ActivityScreen = ({ route, navigation }) => {

  // destructure optional route params
  // if route.params is undefined, give empty values
  const { currency, date, dollarAmount, description, pk } = (route.params !== undefined ? route.params :
    { "currency": "", "date": "", "dollarAmount": "", "description": "", "pk": "", });
  // because we know that the format is day/month/year, we can split the string and grab the month
  // should be a way to convert month num to month name

  const [transactions, setTransactions] = useState<any[]>([]); // list of transactions received from NewTransactionScreen
  const [sortedTransactions, setSortedTransactions] = useState(new Map());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // default only show current year 

  useFocusEffect(
    useCallback(() => {
      // console.log("ActivityScreen focused");
      const getTransactions = async () => {
        console.log("Getting transactions...");
        const db = await getDBConnection();
        await displayTables(db, 'Transactions');
        const transactionRows = await getAllTransactions(db);

        setSortedTransactions(new Map());
        setTransactions(transactionRows);
        // console.log("Transactions: ", transactionRows);

        // sort transactions by date into a map
        let temp = new Map();
        for (let i = 0; i < transactionRows.length; i++) {
          const month = transactionRows[i].date.split('/')[1];
          if (temp.has(month)) {
            temp.get(month).push(transactionRows[i]);
          } else {
            temp.set(month, [transactionRows[i]]);
          }
        }

        setSortedTransactions(temp);
      }
      getTransactions();

      // console.log("Sorted transactions: ", sortedTransactions);
      return () => {
        // console.log("ActivityScreen unfocused");
        // Clean up transactions since screen is unfocused
        sortedTransactions.clear();
      };
    }, [])
  );

  console.log("sortedTransactions: ", sortedTransactions);


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
                sortedTransactions.get(month).map((transaction) => {
                  return transaction.date.split('/')[2] === selectedYear.toString() ?
                    <ActivityEntry
                      date={transaction.date}
                      dollarAmount={transaction.dollarAmount}
                      description={transaction.description}
                      currency={transaction.currency}
                      key={Math.random()}
                      editTransaction={() => {
                        console.log("transaction to edit:");
                        console.log(transaction);

                        // navigate to EditTransactionScreen
                        navigation.navigate('EditTransaction', {
                          "ogCurrency": transaction.currency,
                          "ogDate": transaction.date,
                          "ogDollarAmount": transaction.dollarAmount.toString(),
                          "ogDescription": transaction.description,
                          "ogPk": transaction.pk
                        });
                      }}
                    />
                    :
                    null;
                })
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