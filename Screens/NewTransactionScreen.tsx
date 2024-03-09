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

//define navigation type
// type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

// interface Props {
//   navigation: MainScreenNavigationProp;
// }

const NewTransactionScreen = ({ navigation }) => {
  const [desc, setDesc] = useState('');
  const [cost, setCost] = useState('');
  const [date, setDate] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState(' $ ');
  const [open, setOpen] = useState(false);

  const formateDate = (rawDate: Date) => {
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    const zmonth = month < 10 ? `0${month}` : month;
    const zday = day < 10 ? `0${day}` : day;
    return `${zday}/${zmonth}/${year}`;
  };

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
        <TouchableOpacity onPress={() => {
          console.log({
            "currency": selectedCurrency,
            "date": date,
            "dollarAmount": cost,
            "description": desc
          })

          navigation.navigate('Activity', {
            "currency": selectedCurrency,
            "date": date,
            "dollarAmount": cost,
            "description": desc
          })

        }}>
          <Text style={styles.saveButton}>Save</Text>
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
            value={cost}
            onChangeText={input => {
              setCost(input);
            }}
            placeholder="0.00"
            keyboardType="numeric"
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
              setDate(input);
            }}
            placeholder="DD/MM/YY"
            keyboardType="numeric"
            editable={false}
          />
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
