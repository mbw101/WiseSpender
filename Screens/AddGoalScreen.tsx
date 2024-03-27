import React, {Dispatch, SetStateAction, useState, useCallback} from 'react';
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
import { getCurrentDate } from '../Helpers';
import MonthPicker from 'react-native-month-year-picker';
import {getDBConnection, insertMonthlyGoal } from './mySql';

type AddGoalScreenComponentProps = {
  setAddedGoal: Dispatch<SetStateAction<boolean>>;
  navigation: any;
};

const AddGoalScreen = (props: AddGoalScreenComponentProps) => {
  const {navigation, setAddedGoal} = props;
  const [goalText, setGoalText] = useState('');
  const [monthlyExpenseTarget, setMonthlyExpenseTarget] = useState(0);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  // let tfdate : any = '';
  const [tfdate, setTfdate] = useState('');
  const [show, setShow] = useState(false);
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

  const showPicker = useCallback((value) => setShow(value), []);

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;
      console.log(date);
      const month = selectedDate.getMonth() + 1;
      const zmonth = month < 10 ? `0${month}` : month;
      const year = selectedDate.getFullYear();
      setTfdate(`${zmonth}/${year}`);

      showPicker(false);
      setDate(selectedDate);
    },
    [tfdate, date, showPicker],
  );

  return (
    <View style={styles.container}>
      <View style={styles.addGoal}>
        <Text>Add a new month</Text>
        <TouchableOpacity style={{ width: '100%' }} onPress={() => showPicker(true)}>
            <TextInput
              style={styles.inputDate}
              id="dateInput"
              value={tfdate}
              onChangeText={input => {
                tfdate = date;
              }}
              placeholder="MM/YYYY"
              keyboardType="numeric"
              editable={false}
            />
          </TouchableOpacity>
        {show && (
        <MonthPicker
          onChange={onValueChange}
          value={date}
          minimumDate={new Date()}
          maximumDate={new Date(2025, 5)}
          locale="US"
        />
      )}
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
            if (monthlyExpenseTarget <= 0) {
                Toast.show('Please enter an expense target greater than $0.', {
                    duration: Toast.durations.LONG,
                });
                return;
            }
            console.log(monthlyExpenseTarget);
            
            //todo: store to database
            const insert = async() => {
              const db = await getDBConnection();
              console.log('curdate:' + getCurrentDate())
              //await insertMonthlyGoal(db,[getCurrentDate(),goalText,monthlyExpenseTarget]);
            }
            insert();

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
  inputDate: {
    borderWidth: 1,
    marginLeft: 30,
    padding: 10,
    borderRadius: 18,
    width: '85%',
    fontSize: 20,
    color: '#8B8E96',
  },
});

export default AddGoalScreen;
