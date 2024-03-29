import React, {Dispatch, SetStateAction, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-root-toast';
import DropDownPicker from 'react-native-dropdown-picker';

type AddGoalScreenComponentProps = {
  setAddedGoal: Dispatch<SetStateAction<boolean>>;
  navigation: any;
};

const AddGoalScreen = (props: AddGoalScreenComponentProps) => {
  const {navigation, setAddedGoal} = props;
  const [goalText, setGoalText] = useState('');
  const [monthlyExpenseTarget, setMonthlyExpenseTarget] = useState(0);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('January');
  const [items, setItems] = useState([
    {label: 'January', value: 'January'},
    {label: 'February', value: 'February'},
    {label: 'March', value: 'March'},
    {label: 'April', value: 'April'},
    {label: 'May', value: 'May'},
    {label: 'June', value: 'June'},
    {label: 'July', value: 'July'},
    {label: 'August', value: 'August'},
    {label: 'September', value: 'September'},
    {label: 'October', value: 'October'},
    {label: 'November', value: 'November'},
    {label: 'December', value: 'December'},
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.addGoal}>
        <Text>Add a new month</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />

        <Text>New Goal</Text>
        <TextInput
          style={styles.input}
          id="goalInput"
          value={goalText}
          onChangeText={text => {
            console.log(text);
            setGoalText(text);
          }}
        />

        {/* TODO: Add Monthly expense target */}
        <Text>Monthly Expense Target</Text>
        {/* Commas seem to get removed when parsing, so I think we're good for that */}
        <TextInput
          style={styles.input}
          id="expenseTargetInput"
          value={monthlyExpenseTarget.toString()}
          keyboardType="number-pad"
          onChangeText={text => {
            console.log(text);
            let monthlyExpense = 0;
            // only parse if text is not empty
            if (text !== '') {
              monthlyExpense = Number.parseInt(text);
            }
            setMonthlyExpenseTarget(monthlyExpense);
          }}
        />
        {/* From that amount, we can calculate the daily amount (based on which month it currently is) */}

        <TouchableOpacity
          onPress={() => {
            // Ensure they don't add an empty goal
            // if (goalText === '') {
            //     Toast.show('Please enter a goal.', {
            //         duration: Toast.durations.LONG,
            //     });
            //     return;
            // }
            // if (monthlyExpenseTarget === 0) {
            //     Toast.show('Please enter an expense target greater than $0.', {
            //         duration: Toast.durations.LONG,
            //     });
            //     return;
            // }
            // console.log(monthlyExpenseTarget);

            setAddedGoal(true);
            navigation.navigate('home');
          }}>
          <AntDesign color="black" size={48} name="arrowright" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    padding: 5,
    flex: 1,
    flexGrow: 1,
  },
  addGoal: {
    justifyContent: 'center', // center vertically
    alignItems: 'center', // center horizontally
    width: '100%',
    flex: 1,
    flexGrow: 1,
    padding: 25,
  },
  dateStyle: {
    color: '#0C9AEA',
    fontSize: 32,
  },
  imageStyle: {
    width: '20%',
    margin: 20,
    resizeMode: 'contain', // this looks better than stretch
    backgroundColor: 'yellow',
  },
  input: {
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    width: '80%',
  },
});

export default AddGoalScreen;
