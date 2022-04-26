import { View, Text, Alert, TextInput, StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import CustomButton from '../Components/CustomButton'
import * as SQlite from "expo-sqlite"

const database = SQlite.openDatabase("dbName", 1.0)

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
        if (activityName.length === 0 || location.length === 0 || date.length === 0 
            || attendingTime.length === 0|| reporter.length === 0) {
            Alert.alert("Warning !!! Please enter inputs !!!");
          } else {
            try {
              database.transaction((tx) => {
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

    const showResult = () =>{
        navigation.navigate("Result");
    };
    const createTable = () => {
        database.transaction((tx) => {
          tx.executeSql(
            "CREATE TABLE IF NOT EXISTS DATABASE(Id INTEGER PRIMARY KEY AUTOINCREMENT, ActivityName TEXT, Location TEXT, Date TEXT, AttendingTime TEXT, Reporter TEXT);"
          );
        });
      };
      return (
        <View style={styles.body}>
          <Text style={styles.text}>Home</Text>
          <TextInput
            style={styles.input}
            placeholder="Activity Name"
            onChangeText={(value) => setActivityName(value)}
            value={activityName}
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            onChangeText={(value) => setLocation(value)}
            value={location}
          />
           <TextInput
            style={styles.input}
            placeholder="Date"
            onChangeText={(value) => setDate(value)}
            value={date}
          />
           <TextInput
            style={styles.input}
            placeholder="Time of attending"
            onChangeText={(value) => setAttendingTime(value)}
            value={attendingTime}
          />
           <TextInput
            style={styles.input}
            placeholder="Name of Reporter"
            onChangeText={(value) => setReporter(value)}
            value={reporter}
          />
          <View style = {{flexDirection:"row"}}>
          <CustomButton title="Show All" handlePress ={showResult} />
          <CustomButton title="Search" />
          <CustomButton title="Submit" handlePress={submit}/>
          </View>
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
      borderRadius: 5,
      textAlign: "center",
      fontSize: 20,
      marginBottom: 10,
      marginTop: 10,
    },
  });

export default Home