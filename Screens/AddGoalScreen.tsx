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
import { getCurrentDate, formateDate } from '../Helpers';
import MonthPicker from 'react-native-month-year-picker';
import {displayTables, getDBConnection, insertMonthlyGoal } from './mySql';

type AddGoalScreenComponentProps = {
  setAddedGoal: Dispatch<SetStateAction<boolean>>;
  navigation: any;
};

const AddGoalScreen = (props: AddGoalScreenComponentProps) => {
  const {navigation, setAddedGoal} = props;
  const [goalText, setGoalText] = useState('');
  const [monthlyExpenseTarget, setMonthlyExpenseTarget] = useState(0);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');
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
      const month = selectedDate.getMonth() + 1;
      const zmonth = month < 10 ? `0${month}` : month;
      const year = selectedDate.getFullYear();
      showPicker(false); 
      setDate(`${zmonth}/${year}`);
    },
    [date, showPicker],
  );
  console.log(date);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>New Goal</Text>
      </View>
      <View style={styles.addGoal}>
        <View style={styles.inputElement}>
          <Text style={styles.labels}>Add a new month and year</Text>
          <TouchableOpacity style={{ width: '100%' }} onPress={() => showPicker(true)}>
              <TextInput
                style={styles.inputDate}
                id="dateInput"
                value={date}
                placeholder={'MM/YYYY'}
                keyboardType="numeric"
                editable={false}
              />
            </TouchableOpacity>
            {show && (
            <MonthPicker
              onChange={onValueChange}
              value={new Date()}
              minimumDate={new Date()}
              maximumDate={new Date(2026, 12)}
              locale="US"
            />
            )}
        </View>
        <View style={styles.inputElement}>
          <Text style={styles.labels}>Add a Monthly Expense Target</Text>
          {/* Commas seem to get removed when parsing, so I think we're good for that */}
          <TextInput
            style={styles.inputDate}
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
        </View>
        <TouchableOpacity style={styles.arrow}
          onPress={async() => {
            if (monthlyExpenseTarget <= 0) {
                Toast.show('Please enter an expense target greater than $0.', {
                    duration: Toast.durations.LONG,
                });
                return;
            }
            if (date == '') {
              Toast.show('Please select a date.', {
                  duration: Toast.durations.LONG,
              });
              return;
            }
            const existsKey = async() => {
              let flag = false;
              const db = await getDBConnection();
              let flag1 = await db.executeSql(`SELECT EXISTS(SELECT 1 FROM MonthlyGoal WHERE month = ${parseInt(date.split('/')[0])} AND year = ${parseInt(date.split('/')[1])});`);
              let rows = flag1[0].rows;
              console.log('flags:'+rows.item)
              return flag;
            }
            if (await existsKey() === true) {
              Toast.show('Goal Entry already exists. Please select another goal.', {
                duration: Toast.durations.LONG,
            });
            }
            console.log(monthlyExpenseTarget);
            
            //todo: store to database
            const insert = async() => {
              const db = await getDBConnection();
              await insertMonthlyGoal(db,[parseInt(date.split('/')[0]),parseInt(date.split('/')[1]),1,monthlyExpenseTarget]);
              await displayTables(db,"MonthlyGoal");
            }
            insert();

            setAddedGoal(true);
            navigation.navigate('home');
          }}>
          <AntDesign color="black" size={36} name="arrowright" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  top: {
    marginTop: 10,
    marginBottom: 30,
    paddingBottom: 10,
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E6',
  },
  title: {
    color: '#000',
    fontSize: 32,
    fontWeight: '500',
  
  },
  addGoal: {
    justifyContent: 'center', // center vertically
    alignItems: 'center', // center horizontally
    flexDirection:'column',
    width: '100%',
    marginTop: 75,
    padding: 25,
  },
  inputElement : {
    width:'100%',
    marginVertical: 20,
  },
  labels: {
    alignSelf: 'center',
    fontSize: 16,
    marginBottom: 10,
    color: '#4468EC',
    fontWeight: '500',
  },
  inputDate: {
    borderWidth: 2,
    marginLeft: 30,
    padding: 10,
    borderRadius: 18,
    width: '85%',
    fontSize: 20,
    color: '#8B8E96',
  },
  arrow: {
    marginTop: 10,
    borderWidth: 2,
    paddingHorizontal: 5,
    borderRadius: 12,
  },
});

export default AddGoalScreen;
