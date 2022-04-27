import * as SQLite from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import CustomButton from "../Components/CustomButton";
import DatePicker from "react-native-datepicker";

const db = SQLite.openDatabase("dbName", 2.0)

const Update = () => {

    const { result } = route.params; 

    const [activityName, setActivityName] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [attendingTime, setAttendingTime] = useState("");
    const [reporter, setReporter] = useState("");

    const updateHandle = () => {
        if (activityName.length === 0) {
            Alert.alert("Please enter activity name");
          }
          else if( date.length === 0){Alert.alert("Please enter date")}
          else if( reporter.length === 0){Alert.alert("Please enter reporter name")}
          else {
            try {
              db.transaction((tx) => {
                tx.executeSql(
                    'UPDATE DATABASE SET ActivityName=?, Location=?, Date=?, AttendingTime=?, Reporter=? WHERE id= ?',
                    [activityName, location, date, attendingTime, reporter, result.Id],
                  (tx, results) => {
                    console.log(results.rowsAffected);
                  }
                );
              });
              Alert.alert("Update Completed");
              navigation.navigate("Home");
            } catch (error) {
              console.log(error);
            }
          }
    };
    
    return (         
        <View style={styles.body}>
            <Text style={styles.text}>Update Form</Text>
            <TextInput
                placeholder="Activity Name"
                style={styles.input}
                onChangeText={(value) => setActivityName(value)}
                value={activityName}
            />
            <TextInput
                placeholder="Location"
                style={styles.input}
                onChangeText={(value) => setLocation(value)}
                value={location}
            />
            <DatePicker
                style={styles.datePicker}
                date={date}
                mode="date"
                placeholder="Date(Required)"
                format="DD-MM-YYYY"
                minDate="01-01-2015"
                maxDate="01-01-2025"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateInput: {
                    marginLeft: 36,
                    fontSize: 20,
                    },
                    dateIcon: {
                    position: 'relative',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                    },
                }}
                onDateChange={(date) => {
                    setDate(date);
                }}
            />

            <TextInput
                style={styles.input}
                placeholder="Time of Attending"
                onChangeText={(value) => setAttendingTime(value)}
                value={attendingTime}
            />
            <TextInput
                style={styles.input}
                placeholder="Name of the reporter"
                onChangeText={(value) => setReporter(value)}
                value={reporter}
            />
            <CustomButton title="UPDATE" handlePress ={updateHandle} />
        </View>
        )
        }

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
      },
      text: {
        fontSize: 40,
        fontWeight: "bold",
        margin: 15,
      },
      input: {
        borderWidth: 1,
        height: 50,
        width: 300,
        borderRadius: 2,
        textAlign:"left",
        fontSize: 20,
        marginBottom: 10,
        marginTop: 10,
      },
      picker: {
        height:50,
        width: 300,
        borderWidth: 1,
        marginBottom: 10,
        marginTop: 10,
        borderColor: "#000000",
        borderRadius: 2,
      },
      datePickerStyle: {
        alignItems: "center",
        justifyContent:"center",
        height:60,
        width: 370,
        fontSize:20,
      },
})

export default Update