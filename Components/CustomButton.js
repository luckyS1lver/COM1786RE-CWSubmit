import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'


const CustomButton = (props) => {
  return (
    <View>
        <TouchableOpacity
            style = {styles.button}
            onPress = {props.handlePress}>
            <Text style = {styles.text}>{props.title}</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create(
    {
        text:
        {
          textTransform:"none",
          color: "white",
          fontSize: 15,
        },
        button:
        {
          width: 120,
          height: 50,
          borderWidth: 3,
          backgroundColor: "#68a832",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 5,
          marginVertical:10,
          marginHorizontal:10,
        }
    }
)

export default CustomButton