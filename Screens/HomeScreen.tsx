import * as React from "react";
import { View, Text, StyleSheet } from 'react-native';
import NavigateComponent from "../Components/Navigator";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
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

export default HomeScreen;