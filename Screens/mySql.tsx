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
    () => { },
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
          month INTEGER NOT NULL,
          year INTEGER NOT NULL,
          status INTEGER NOT NULL,
          targetPerDay FLOAT NOT NULL,
          PRIMARY KEY(month,year)
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
    //Drop table
    //await db.executeSql(`Drop table MonthlyGoal;`);
  } catch (error) {
    console.error(error);
    throw Error(`Failed to create tables`);
  }
}

export const displayTables = async (db: SQLiteDatabase, table: String) => {
  try{
    const  res = await db.executeSql(`SELECT * FROM ${table};`);
    let rows = res[0].rows;
    for (let i = 0; i < rows.length; i++) {
      console.log(rows.item(i));
    }

  } catch (error) {
    console.error(error);
    throw Error(`Failed to display ${table}!`);
  }


}

export const getAllTransactions = async (db: SQLiteDatabase) => {
  try {
    const res = await db.executeSql(`SELECT * FROM Transactions;`);
    let rows = res[0].rows;

    let transactions = [];
    let item;
    for (let i = 0; i < rows.length; i++) {
      item = rows.item(i);
      const month = item.month;
      const day = item.day;
      const zmonth = month < 10 ? `0${month}` : month;
      const zday = day < 10 ? `0${day}` : day;

      transactions.push({
        "currency": item.currency,
        "date": zday + '/' + zmonth + '/' + item.year,
        "dollarAmount": item.amount,
        "description": item.description,
        "pk": item.transaction_id
      });

      console.log({
        "currency": item.currency,
        "date": zday + '/' + zmonth + '/' + item.year,
        "dollarAmount": item.amount,
        "description": item.description,
        "pk": item.transaction_id
      });
      
    }

    return transactions;

  } catch (error) {
    console.error(error);
    throw Error("Failed to display Transaction!");
  }
}

export const insertTransaction = async (db: SQLiteDatabase, params: any) => {
  const insertRow = `
      INSERT INTO Transactions (currency,month,day,year,amount,description)
      VALUES (?,?,?,?,?,?);
  `
  try {
    console.log(`params = ${params}`);
    await db.transaction(async (tx) => {
      await tx.executeSql(insertRow, params);
      console.log("Added transaction to database!")
    })
  } catch (error) {
    console.error(error);
    throw Error("Failed to add Transaction!");
  }

}

export const updateTransaction = async (db: SQLiteDatabase, params: any, pk: Number) => {
  console.log(`pk ${pk}`)
  const updateRow = `
      UPDATE Transactions SET currency = ?, month = ?, day = ?, year = ?, amount = ?, description = ? WHERE transaction_id = ${pk}
  `
  try {
    console.log(`params = ${params}`);
    await db.transaction(async (tx) => {
      await tx.executeSql(updateRow, params);
      console.log("Updated transaction to database!")
    })
  } catch (error) {
    console.error(error);
    throw Error("Failed to updated Transaction!");
  }

}

export const deleteTransaction = async (db: SQLiteDatabase, pk: Number) => {
  const deleteRow = `
      DELETE FROM Transactions WHERE transaction_id = ${pk}
  `
  try {
    await db.transaction(async (tx) => {
      await tx.executeSql(deleteRow);
      console.log("Deleted transaction from database!")
    })
  } catch (error) {
    console.error(error);
    throw Error("Failed to Deleted Transaction!");
  }

}

export const insertMonthlyGoal = async (db: SQLiteDatabase, params : any) => {
  const insertMonth = `
    INSERT INTO MonthlyGoal (month,year,status,targetPerDay)
    VALUES (?,?,?,?);
  `;
  try {
    await db.transaction(async (tx) => {
      await tx.executeSql(insertMonth, params);
      console.log("Added MonthlyGoals to database!!")
    })
  } catch (error) {
    console.error(error);
    throw Error("Failed to add MonthlyGoals!");
  }
}

// TODO: Implement streak query