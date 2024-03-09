import * as React from "react";
import { View, Text, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import Dialog from "react-native-dialog";
import { useState } from "react";

type PreferenceSectionProps = {
  title: string;
  onClick: () => void;
};

const PreferenceSection = (props: PreferenceSectionProps) => {

  return (
    <TouchableOpacity style={{
      backgroundColor: '#D9D9D9',
      padding: 10
    }} onPress={() => props.onClick()}>
      <Text style={styles.preferenceSection}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const ProfileScreen = () => {
  const [showExpenseDialog, setShowExpenseDialog] = useState(false);
  const [expense, setExpense] = useState(0);

  const handleCancel = () => {
    setShowExpenseDialog(false);
  };

  const handleSave = () => {
    // TODO: update the current monthly expenses in DB/state
    setShowExpenseDialog(false);
  };

  const handleUpdate = (input: string) => {
    setExpense(Number.parseFloat(input));
    console.log(Number.parseFloat(input));
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text>Profile Screen</Text>
      </View>

      <View>
        <Text style={styles.preferenceTitle}>General</Text>

        <PreferenceSection title="Edit monthly expenses" onClick={() => {
          // TODO: Show a dialog where they can edit the monthly expenses
          console.log("Clicked");
          setShowExpenseDialog(true);
          console.log(expense);
        }
        } />
      </View>

      <View>
        <Text style={styles.preferenceTitle}>Appearance</Text>
        <PreferenceSection title="Change Theme" onClick={() => {
          {/* TODO: Flip the current theme to the opposite */ }
          console.log("Clicked");
        }
        } />
      </View>

      <View>
        <Dialog.Container visible={showExpenseDialog}>
          <Dialog.Title>Edit Monthly Expenses</Dialog.Title>
          <Dialog.Input keyboardType="numeric" onChangeText={(input: string) => {
            handleUpdate(input);
          }
          } />
          <Dialog.Button label="Cancel" onPress={handleCancel} />
          <Dialog.Button label="Save" onPress={handleSave} />
        </Dialog.Container>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  preferenceTitle: {
    fontSize: 18
  },
  preferenceSection: {
    fontSize: 16,
    backgroundColor: '#D9D9D9',
  }
});

export default ProfileScreen;