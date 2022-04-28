import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const ResultItem = ({result, navigation }) => {

  const detailResult = () => {
    navigation.navigate("Detail", {result})
  }
  const updateResult = () => {
    navigation.navigate("Update", {result})
  }
  
  return (
    <View style= {styles.container}>
      <View>
        <Text style={styles.Id}>Id: {result.Id}</Text>
        <Text style={styles.text}>Activity Name: {result.ActivityName} </Text>
        <Text style={styles.text}>Location: {result.Location}</Text>
        <Text style={styles.text}>Date: {result.Date}</Text>
        <Text style={styles.text}>Time of attending: {result.AttendingTime}</Text>
        <Text style={styles.text}>Name of reporter: {result.Reporter}</Text>
      </View>
      <View style={{flexDirection: "row"}}>
        <TouchableOpacity onPress = {detailResult} style = {styles.button}>
          <Text style = {styles.buttonText}>Detail</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {updateResult} style = {styles.button}>
          <Text style = {styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ResultItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        padding: "2%",
        backgroundColor: "#eee",
        borderRadius: 5,
        marginBottom: "5%",
      },
      text: {
        fontSize: 15,
        marginHorizontal: 12
      },
      Id:{
        fontSize: 15,
        fontWeight: "bold",
        color:"green",
        marginHorizontal: 5
      },
      button: {
        paddingLeft: 2,
        width: 100,
        height: 50,
        borderWidth: 3,
        backgroundColor: "#68a832",
        fontSize: 250,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        marginTop:20,
        marginHorizontal:5,
      },
      buttonText:{
        alignItems:"center",
        justifyContent:"center",
        paddingHorizontal:10,
        fontSize:12,
        color:"white"
      },
})