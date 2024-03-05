import * as React from "react";
import { View, Text, StyleSheet } from 'react-native';
import ActivityEntry from "../Components/ActivityEntry";

const ActivityScreen = () => {
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
      <ActivityEntry date={'Mar 1st'} dollarAmount={51.89} location={'Groceries'} />
      <ActivityEntry date={'Mar 3rd'} dollarAmount={30.12} location={'Uber Eats'} />

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