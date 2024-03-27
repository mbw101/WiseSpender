import React, { useEffect, useState } from 'react';
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
import Toast from 'react-native-root-toast';
import { deleteTransaction, displayTables, getDBConnection, updateTransaction } from './mySql.tsx';

const EditTransactionScreen = ({ navigation, route }) => {
  const { ogCurrency, ogDate, ogDollarAmount, ogDescription, ogPk } = route.params;
  // print out all the original values
  const [cost, setCost] = useState(ogDollarAmount);
  const [date, setDate] = useState(ogDate);
  const [description, setDescription] = useState(ogDescription);
  const [selectedCurrency, setSelectedCurrency] = useState(ogCurrency);
  const pk = ogPk;
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  // let day = 0, month = 0, year = 0;

  const onSelectCurrencySelect = (currencyType: string) => {
    setSelectedCurrency(currencyType);
    navigation.goBack();
  };

  useEffect(() => {
    console.log("EditTransactionScreen");
    console.log(ogCurrency, ogDate, ogDollarAmount, ogDescription, ogPk);
    setMonth(parseInt(ogDate.split('/')[1]));
    setDay(parseInt(ogDate.split('/')[0]));
    setYear(parseInt(ogDate.split('/')[2]));

    console.log(month, day, year);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather color={'#000'} size={36} name="x" />
        </TouchableOpacity>
        <Text style={styles.displayTitle}>Edit Transaction</Text>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: 60,
        }}>

          <TouchableOpacity onPress={async () => {
            const performDelete = async () => {
              const db = await getDBConnection();
              await deleteTransaction(db, pk);
              const res = await displayTables(db,"Transactions");
            }
            performDelete();

            navigation.navigate('Activity', {
              "currency": '',
              "date": '',
              "dollarAmount": '',
              "description": '',
              "pk": pk
            })
          }}>
            <AntDesign color={'#000'} size={24} name="delete" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            // ensure no fields are empty
            if (description === '') {
              setDescription(ogDescription);
            }
            if (cost === '') {
              setCost(ogDollarAmount);
            }

            if (isNaN(cost)) {
              Toast.show('Cost must be a number', {
                duration: Toast.durations.LONG,
              });
              return;
            }
            if (date === '') {
              setDate(ogDate);
            }

            const update = async () => {
              const db = await getDBConnection();
              await updateTransaction(db, [selectedCurrency, Number(date.substring(4, 5)), Number(date.substring(0, 2)), Number(date.substring(6, 10)), cost, description], pk);
              await displayTables(db, "Transactions");
            }
            update();

            console.log({
              "currency": selectedCurrency,
              "date": date,
              "dollarAmount": cost,
              "location": description,
              "pk": pk
            })

            navigation.navigate('Activity', {
              "currency": selectedCurrency,
              "date": date,
              "dollarAmount": cost,
              "description": description,
              "pk": pk
            })

          }}>
            <AntDesign color={'#000'} size={24} name="save" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputSec}>
        <View style={styles.inputRow}>
          <TouchableOpacity style={styles.iconBorder}>
            <FontAwesome5 color={'#000'} size={20} name="edit" />
          </TouchableOpacity>
          <TextInput
            style={[styles.inputDesc, styles.shadowProp]}
            id="descInput"
            value={description}
            onChangeText={input => {
              // if the input is empty, set it back to the original description
              if (input == '') {
                setDescription(ogDescription);
                return;
              }

              setDescription(input);
            }}
            placeholder={ogDescription}
          />
        </View>
        <View style={styles.inputRow}>
          <TouchableOpacity style={styles.iconBorder} onPress={() => navigation.navigate('CurrencySelector', { selectCurrency: onSelectCurrencySelect })}>
            <Text style={{ fontSize: 18, color: '#000' }}>{ogCurrency}</Text>
          </TouchableOpacity>
          <TextInput
            style={[styles.inputCost, styles.shadowProp]}
            id="costInput"
            value={cost.toString()}
            onChangeText={input => {
              setCost(input);
            }}
            placeholder={ogDollarAmount}
            keyboardType="numeric"
            onEndEditing={() => {
              // if the input is empty, set it back to the original cost
              console.log("onEndEditing");

              // if the input is empty, set it back to the original cost
              if (cost == '') {
                setCost(ogDollarAmount);
                return;
              }
            }}
          />
        </View>
        <View style={styles.inputRow}>
          <TouchableOpacity style={styles.iconBorder} onPress={() => setOpen(true)}>
            <AntDesign color={'#000'} size={20} name="calendar" />
          </TouchableOpacity>
          <TextInput
            style={styles.inputDate}
            id="dateInput"
            value={date}
            onChangeText={input => {
              // if the input is empty, set it back to the original date
              if (input == '') {
                setDate(ogDate);
                return;
              }

              setDate(input);
            }}
            placeholder={ogDate}
            keyboardType="numeric"
            editable={false}
          />
        </View>
      </View>
      {/* Convert ogDate (sting) to the Date object for DatePicker 
      */}
      <DatePicker
        modal
        open={open}
        date={new Date(year, month - 1, day)}
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

export default EditTransactionScreen;