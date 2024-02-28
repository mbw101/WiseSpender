/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { getUpdateString, getCurrentDate } from './screens/helpers';
import InitialScreen from './screens/InitialScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;


function App(): React.JSX.Element {
  console.log(getUpdateString());
  console.log(getCurrentDate());

  return (
    // TODO: Check if initial goal has been set (state management)
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.white}
      />
      <InitialScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: "100%",
    width: "100%"
  },
});

export default App;
