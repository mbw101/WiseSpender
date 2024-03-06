import * as React from "react";
import { View, Text, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={{
        paddingTop: 20,
      }}>
        <Text>Profile Screen</Text>
      </View>

      <View>
        <Text>General</Text>
      </View>

      <View>
        <Text>Appearance</Text>
        {/* TODO: Add dark mode in settings */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;