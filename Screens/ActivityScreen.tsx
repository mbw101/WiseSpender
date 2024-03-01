import * as React from "react";
import { View, Text, StyleSheet } from 'react-native';
import NavigateComponent from "../Components/Navigator";

const ActivityScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Activity Screen</Text>
      <NavigateComponent/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ActivityScreen;