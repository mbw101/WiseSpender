import {
    enablePromise,
    openDatabase,
    SQLiteDatabase,
  } from "react-native-sqlite-storage";

import * as React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useState, useCallback, useEffect } from "react";  

enablePromise(true);


export const getDBConnection = async () => {
  return openDatabase({ name: 'test.db', location: 'default' });
};


export const createTables = async (db: SQLiteDatabase) => {
    const userPreferencesQuery = `
      CREATE TABLE IF NOT EXISTS Transactions (
          transaction_id INTEGER NOT NULL,
          colorPreference TEXT,
          languagePreference TEXT,
          PRIMARY KEY(transaction_id)
      )
    `
   
    try {
      await db.executeSql(userPreferencesQuery)
    } catch (error) {
      console.error(error)
      throw Error(`Failed to create tables`)
    }
  }
  


  const loadData = useCallback(async () => {
    try {
        const db = await getDBConnection();
        await createTables(db);
    } catch (error) {
            console.error(error);
        }
    
},[]  );

useEffect(() => {
    loadData();
  }, [loadData]);


  export default loadData;