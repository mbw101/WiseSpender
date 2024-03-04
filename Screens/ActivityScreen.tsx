import * as React from "react";
import { View, Text, StyleSheet } from 'react-native';
import NavigateComponent from "../Components/Navigator";
import ActivityEntry from "../Components/ActivityEntry";
import { ScrollView } from "react-native-gesture-handler";

const ActivityScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={{
        alignItems: 'center',
        paddingTop: 20
      }}>
        <Text>Recent Activity</Text>
      </View>

      {/* TODO: Figure out how we will dynamically create the months. Or should we have all months? */}
      <Text>March</Text>
      <ActivityEntry date={'Mar 1st'} dollarAmount={51.89} location={'Groceries'} />
      <ActivityEntry date={'Mar 3rd'} dollarAmount={30.12} location={'Uber Eats'} />


      <NavigateComponent/>
    </ScrollView>
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