import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';

// custom icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import { formateDate } from '../Helpers';

import { createTables, displayTables, insertTransaction, getDBConnection } from './mySql.tsx';
import Toast from 'react-native-root-toast';
import TransactionAction from '../Components/TransactionAction.tsx';

const NewTransactionScreen = ({ navigation }) => {
  const [desc, setDesc] = useState('');
  const [cost, setCost] = useState('');
  // const [cost, setCost] = useState<number>(0.0);
  const [date, setDate] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState(' $ ');
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(true);

  const onSelectCurrencySelect = (currencyType: string) => {
    setSelectedCurrency(currencyType);
    navigation.goBack();
  };
  console.log(date);
  return (
    <View style={styles.container}>
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather color={'#000'} size={36} name="x" />
        </TouchableOpacity>
        <Text style={styles.displayTitle}>Add Transaction</Text>
        <TouchableOpacity onPress={async () => {
          // check for invalid inputs
          if (desc === '' || date === '') {
            Toast.show('All fields must be filed', {
              duration: Toast.durations.LONG,
            });
            return;
          }

          // see if cost is not a number
          if (Number(cost) <= 0) {
            Toast.show('Cost must be greater than $0', {
              duration: Toast.durations.LONG,
            });
            return;
          }

          if (isNaN(cost)) {
            Toast.show('Cost must be a number', {
              duration: Toast.durations.LONG,
            });
            return;
          }

          // todo: insert to table
          console.log([selectedCurrency, Number(date.substring(0, 2)), Number(date.substring(4, 5)), Number(date.substring(6, 10)), cost, desc]);
          const insert = async () => {
            const db = await getDBConnection();
            await insertTransaction(db, [selectedCurrency, Number(date.substring(4, 5)), Number(date.substring(0, 2)), Number(date.substring(6, 10)), cost, desc]);
            const res = await displayTables(db, 'Transactions');
            //get last entered pk 
            const last = await db.executeSql(`SELECT last_insert_rowid();`);
            return last[0].rows.item(0)["last_insert_rowid()"];
          }
          const pk = await insert();
          console.log(`setted pk to  ${pk}`)

          console.log({
            "currency": selectedCurrency,
            "date": date,
            "dollarAmount": cost,
            "description": desc,
            "pk": pk
          })

          // Create ID for new transaction
          // NOTE: Can remove props
          navigation.navigate('Activity', {
            "currency": selectedCurrency,
            "date": date,
            "dollarAmount": cost,
            "description": desc,
            "pk": pk,
            "shown": shown
          })

        }}>
          <AntDesign color={'#000'} size={24} name="save" />
        </TouchableOpacity>
      </View>
      <View style={styles.inputSec}>
        <View style={styles.inputRow}>
          <TouchableOpacity style={styles.iconBorder}>
            <FontAwesome5 color={'#000'} size={20} name="edit" />
          </TouchableOpacity>
          <TextInput
            style={[styles.inputDesc, styles.shadowProp]}
            id="descInput"
            value={desc}
            onChangeText={input => {
              setDesc(input);
            }}
            placeholder="Description"
          />
        </View>
        <View style={styles.inputRow}>
          <TouchableOpacity style={styles.iconBorder} onPress={() => navigation.navigate('CurrencySelector', { selectCurrency: onSelectCurrencySelect })}>
            <Text style={{ fontSize: 18, color: '#000' }}>{selectedCurrency}</Text>
          </TouchableOpacity>
          <TextInput
            style={[styles.inputCost, styles.shadowProp]}
            id="costInput"
            value={cost.toString()}
            placeholder="0.00"
            onChangeText={input => {
              setCost(input);
            }}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputRow}>
          <TouchableOpacity style={styles.iconBorder} onPress={() => setOpen(true)}>
            <AntDesign color={'#000'} size={20} name="calendar" />
          </TouchableOpacity>
          <TouchableOpacity style={{ width: '100%' }} onPress={() => setOpen(true)}>
            <TextInput
              style={styles.inputDate}
              id="dateInput"
              value={date}
              onChangeText={input => {
                setDate(input);
              }}
              placeholder="DD/MM/YY"
              keyboardType="numeric"
              editable={false}
            />
          </TouchableOpacity>
        </View>
      </View>
      <DatePicker
        modal
        open={open}
        date={new Date()}
        mode="date"
        onConfirm={date => {
          setOpen(false);
          setDate(formateDate(date));
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  navHeader: {
    display: 'flex',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  displayTitle: {
    fontSize: 18,
    color: '#000',
  },
  iconBorder: {
    padding: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  saveButton: {
    fontSize: 20,
    color: '#000',
    fontWeight: '600',
  },
  inputSec: {
    width: '100%',
    flexDirection: 'column',
    paddingVertical: 50,
    marginTop: 120,
    alignItems: 'center',
  },
  inputRow: {
    width: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 35,
    marginVertical: 20,
  },
  inputDesc: {
    borderWidth: 1,
    marginLeft: 30,
    padding: 10,
    borderRadius: 18,
    width: '85%',
    fontSize: 20,
    color: '#8B8E96',
  },
  inputCost: {
    borderWidth: 1,
    marginLeft: 30,
    padding: 10,
    borderRadius: 18,
    width: '85%',
    fontSize: 20,
    color: '#8B8E96',
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

export default NewTransactionScreen;
