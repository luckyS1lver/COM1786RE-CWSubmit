import { View, Text, Alert, TextInput, StyleSheet, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'
import CustomButton from '../Components/CustomButton'
import * as SQlite from "expo-sqlite"
import DatePicker from 'react-native-datepicker'

const db = SQlite.openDatabase("dbName", 2.0)

const Home = ({navigation}) => {
    const [activityName, setActivityName] = useState("")
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [attendingTime, setAttendingTime] = useState("");
    const [reporter, setReporter] = useState("");

    useEffect(() =>{
        createTable();
    }, []);
    
    const submit = () => {
        if (activityName.length === 0) {
            Alert.alert("Please enter activity name.");
          }
          else if (date.length === 0){
            Alert.alert("Please enter date.")
          } 
          else if (reporter.length === 0){
            Alert.alert("Please enter reporter's name.")
          }
          else {
            try {
              db.transaction((tx) => {
                tx.executeSql(
                  "INSERT INTO DATABASE (ActivityName, Location, Date, AttendingTime, Reporter) VALUES (?,?,?,?,?);",
                  [activityName, location, date, attendingTime, reporter],
                  (tx, results) => {
                    console.log(results.rowsAffected);
                  }
                );
              });
              Alert.alert("Input Entered")
              navigation.navigate("Result");
            } catch (error) {
              console.log(error);
            }
          }
    };

    const showResult = () => {
        navigation.navigate("Result");
    };

    const search = () => {
      navigation.navigate("Search");
    }

    const createTable = () => {
        db.transaction((tx) => {
          tx.executeSql(
            "CREATE TABLE IF NOT EXISTS DATABASE(Id INTEGER PRIMARY KEY AUTOINCREMENT, ActivityName TEXT, Location TEXT, Date TEXT, AttendingTime TEXT, Reporter TEXT);"
          );
        });
      };
      return (
        <ScrollView>
            <View style={styles.body}>
            <Text style={styles.title}>Home</Text>
            <TextInput
              style={styles.input}
              placeholder="Activity Name (Required)"
              onChangeText={(value) => setActivityName(value)}
              value={activityName}
            />
            <TextInput
              style={styles.input}
              placeholder="Location"
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
              value = {attendingTime}
            />
            <TextInput
              style={styles.input}
              placeholder="Reporter Name (Required)"
              onChangeText={(value) => setReporter(value)}
              value={reporter}
            />              
            <CustomButton title="Submit" handlePress={submit}/>
            <View style = {{flexDirection:"row"}}>
              <CustomButton title="Show All" handlePress ={showResult} />
              <CustomButton title="Search" handlePress = {search} />

            </View>
          </View>
        </ScrollView>

        )
}

const styles = StyleSheet.create({
    body: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
    },
    title: {
      fontSize: 25,
      fontWeight: "bold",
      margin: 15,
    },
    input: {
      borderWidth: 1,
      height: 50,
      width: 300,
      borderRadius: 5,
      textAlign: "left",
      fontSize: 15,
      marginBottom: 10,
      marginTop: 10,
      padding: 10,
    },
    datePicker: {
      alignItems: "center",
      justifyContent:"center",
      height:60,
      width: 370,
      fontSize:20,
    },
  });

export default Home