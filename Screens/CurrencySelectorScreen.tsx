import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ListRenderItem} from 'react-native';

import currency from '../CommonCurrency.json';

// custom icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

interface ItemData {
    id: string;
    name: string;
    symbol: string;
  }
  
  interface ItemProps {
    symbol: string;
    name: string;
    selectCurrency: (symbol: string) => void;
  }

  const LoadCurrencies: React.FC<ItemProps> = ({symbol,name, selectCurrency, navigation}) => 
    (
        <View>
            <TouchableOpacity style={styles.currencyItem} onPress={() => selectCurrency(symbol)}>
                <Text style={{fontSize:18, color:'#000'}}>{name}</Text>
                <Text style={{fontSize:18, color:'#096fd6'}}>{symbol}</Text>
            </TouchableOpacity>
        </View>
    );

const CurrencySelectorScreen = ({route,navigation}) => {
    const {selectCurrency} = route.params;
    const data = Object.entries(currency).map(([key, value]) => ({
        id: key,
        ...value,
    }));
   
    const renderItem = ({ item }: { item: ItemData }) => (
        <LoadCurrencies symbol={item.symbol} name={item.name} selectCurrency={selectCurrency}/>
    );
    

    return (  
        <View style={styles.container}>
            <View style={styles.navHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                <Feather color={'#000'} size={36} name="x" />
                </TouchableOpacity>
                <Text style={styles.displayTitle}>Currency</Text>
            </View>
            <View style={styles.renderView}>
                <Text style={{fontSize:14, color:'#000', marginLeft: 5}}>All</Text>
                <FlatList
                    data={data}
                    renderItem = {renderItem}
                    keyExtractor={(item) => item.symbol}
                />
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
    navHeader: {
        display: 'flex',
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth: 1,
      },
      displayTitle: {
        marginLeft: 110,
        fontSize: 18,
        color: '#000',
      },
      renderView: {
        paddingTop: 5,
      },
      currencyItem: {
        paddingHorizontal: 18,
        paddingVertical: 5,
        marginVertical: 2,
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
      }
  });
  
export default CurrencySelectorScreen;