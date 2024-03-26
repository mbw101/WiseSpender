import * as React from "react";
import { View, Text, StyleSheet } from 'react-native';
import ActivityEntry from "../Components/ActivityEntry";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import TransactionAction from "../Components/TransactionAction";

const ActivityScreen = ({ route, navigation }) => {

  // destructure optional route params
  // if route.params is undefined, give empty values
  const { currency, date, dollarAmount, description, action, id } = (route.params !== undefined ? route.params :
    { "currency": "", "date": "", "dollarAmount": "", "description": "", action: TransactionAction.Create, id: "" });
  // because we know that the format is day/month/year, we can split the string and grab the month
  // should be a way to convert month num to month name


  const [transactions, setTransactions] = useState<any[]>([]); // list of transactions received from NewTransactionScreen
  let updatedTransactions = [...transactions];
  const [sortedTransactions, setSortedTransactions] = useState(new Map());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // default only show current year 
  const isFocused = useIsFocused();

  useEffect(() => {
    console.log("UseEffect in ActivityScreen");
    console.log(date, description, dollarAmount, currency, action, id);

    // add to updated transactions if Create
    if (action === TransactionAction.Create) {
      updatedTransactions.push({ "currency": currency, "date": date, "dollarAmount": dollarAmount, "description": description, "id": id });
    }
    else if (action === TransactionAction.Update) {
      // console.log("Updating transaction", { "currency": currency, "date": date, "dollarAmount": dollarAmount, "description": description, "id": id});

      // update transaction if Update
      for (let i = 0; i < updatedTransactions.length; i++) {
        if (updatedTransactions[i].id === id) {
          console.log("Found transaction to update");
          updatedTransactions[i].currency = currency;
          updatedTransactions[i].date = date;
          updatedTransactions[i].dollarAmount = dollarAmount;
          updatedTransactions[i].description = description;
          break;
        }
      }
    }
    else if (action === TransactionAction.Delete) {
      console.log("Deleting transaction with id = ", id);
      updatedTransactions = updatedTransactions.filter((transaction) => {
        return transaction.id !== id;
      });
    }

    // console.log("Updated transactions = ", updatedTransactions);
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

    // console.log("Sorted transactions: ", sortedTransactions);
  }, [id, action, currency, date, description, dollarAmount]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // Clean up transactions since screen is unfocused
        sortedTransactions.clear();
      };
    }, [])
  );

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
                          "ogDollarAmount": transaction.dollarAmount,
                          "ogDescription": transaction.description,
                          "id": transaction.id
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