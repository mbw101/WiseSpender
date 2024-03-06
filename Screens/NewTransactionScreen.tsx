import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

// custom icons
import Feather from 'react-native-vector-icons/Feather';

const NewTransactionScreen = ({navigation}) => {
  const [goalText, setGoalText] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.navButtons}>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <Feather color={'#000'} size={48} name="x" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <Feather color={'#000'} size={48} name="check" />
        </TouchableOpacity>
      </View>
      <Text>New Goal</Text>
      <TextInput
        style={styles.inputCost}
        id="goalInput"
        value={goalText}
        onChangeText={text => {
          console.log(text);
          setGoalText(text);
        }}
      />
      <Text>Transaction Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtons: {
    display: 'flex',
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 3,
  },
  inputCost: {
    borderWidth: 2,
    padding: 10,
    borderRadius: 20,
    width: '85%',
  },
});

export default NewTransactionScreen;
