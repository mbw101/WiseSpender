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
  return openDatabase({ name: 'test.db', location: 'default' }, 
  () => {},
  (error: any) => {
    console.error(error)
    throw Error("Could not connect to database")
  });
};


export const createTables = async (db: SQLiteDatabase) => {
  const transactionsTable = `
      CREATE TABLE IF NOT EXISTS Transactions (
          transaction_id INTEGER NOT NULL,
          currency VARCHAR(5) NOT NULL,
          month INTEGER NOT NULL,
          day INTEGER NOT NULL,
          year INTEGER NOT NULL,
          amount FLOAT NOT NULL,
          description VARCHAR(50) NOT NULL,
          PRIMARY KEY(transaction_id)
      )
    `
  const TotalPerDayTable = `
      CREATE TABLE IF NOT EXISTS TotalPerDay (
          day_id INTEGER NOT NULL,
          month INTEGER NOT NULL,
          day INTEGER NOT NULL,
          year INTEGER NOT NULL,
          amount FLOAT NOT NULL,
          numOfTransactions INTEGER NOT NULL,
          PRIMARY KEY(day_id)
      )
    `
  const MonthlyGoalTable = `
      CREATE TABLE IF NOT EXISTS MonthlyGoal (
          goal_id INTEGER NOT NULL,
          month INTEGER NOT NULL,
          day INTEGER NOT NULL,
          year INTEGER NOT NULL,
          goal FLOAT NOT NULL,
          targetPerDay FLOAT NOT NULL,
          PRIMARY KEY(goal_id)
      )
    `
  const StreakTable = `
      CREATE TABLE IF NOT EXISTS Streak (
          streak_id INTEGER NOT NULL,
          month INTEGER NOT NULL,
          day INTEGER NOT NULL,
          year INTEGER NOT NULL,
          isActive INTEGER NOT NULL,
          PRIMARY KEY(streak_id)
      )
    `

  try {
    await db.executeSql(transactionsTable);
    await db.executeSql(TotalPerDayTable);
    await db.executeSql(MonthlyGoalTable);
    await db.executeSql(StreakTable);
    const res = await db.executeSql(`pragma table_info(Transactions);`);
    console.log(res);
  } catch (error) {
    console.error(error);
    throw Error(`Failed to create tables`);
  }
}

export const displayTables = async (db: SQLiteDatabase) => {
  const display = `SELECT * FROM Transactions;`
  await db.executeSql(display,[],(tx, results) => {
    const transactions = [];
    for (let i = 0; i < results.rows.length; i++) {
       console.log(results.rows.item(i));
    }

},
);
}

export const insertTransaction = async (db: SQLiteDatabase, params : any) => {
  const insertRow = `
      INSERT INTO Transactions (currency,month,day,year,amount,description)
      VALUES (?,?,?,?,?,?);
  `
  try {
    await db.transaction((tx) => {
    tx.executeSql(insertRow,params);
  })
  } catch (error) {
    console.error(error);
    throw Error("Failed to add Transaction!");
  }

}