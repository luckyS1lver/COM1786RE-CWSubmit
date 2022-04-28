import { View, FlatList, StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import * as SQLite from "expo-sqlite"
import ResultItem from '../Components/ResultItem'

const db = SQLite.openDatabase("dbName", 2.0)

const Result = ({navigation}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getResult();
    }, [])

    const getResult = () => {
        try {
          db.transaction((tx) => {
            tx.executeSql("SELECT * FROM DATABASE", [], (tx, result) => {
              var len = result.rows.length;
              console.log(JSON.stringify(result.rows));
              for (let i = 0; i < len; i++) {
                let row = result.rows.item(i);
                setData((prevState) => [
                  ...prevState,
                  {Id: row.Id, ActivityName: row.ActivityName, Location: row.Location, Date: row.Date, AttendingTime: row.AttendingTime, Reporter: row.Reporter },
                ]);
              }
            });
          });
        } catch (error) {
          console.log(error);
        }
      };

    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.Id)}
          renderItem={({ item }) => (
            <ResultItem result={item} navigation={navigation} />
          )}
        />
      </View>
    )
}

export default Result
const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
    },
  });