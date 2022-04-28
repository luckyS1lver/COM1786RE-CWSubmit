import React, { useState } from "react";
import { Text, View, Vibration, StyleSheet, Modal } from 'react-native'
import { Audio } from 'expo-av';
import CustomButton from "../Components/CustomButton";
import style from "react-native-datepicker/style";


const Notification = () => {
    const [visible, setVisible] = useState(false);

    const changeDialogboxState = () => {
        setVisible(!visible);
      };

    const playSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
        require("../assets/mixkit-musical-alert-notification-2309.wav")
        );
        await sound.playAsync();
      };

    const Vibrate = () => {
        Vibration.vibrate(500);
      };


    return (
        <View>
            <View style = {styles.clickHereButton}>
                <CustomButton title="Click Here" handlePress={changeDialogboxState}/>
            </View>
            <Modal 
            animationType="slide"
            transparent={true}
            visible={visible}>
                <View style = {styles.boxContainer}>
                <Text style={styles.boxTitle}>Notification</Text>
                    <CustomButton title = "Play Sound" handlePress ={playSound} />
                    <CustomButton title = "Vibrate" handlePress={Vibrate} />
                    <CustomButton title = "Close" handlePress={changeDialogboxState} />
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    boxTitle:{
        marginBottom: 12,
        textAlign: "center",
        fontSize:18
    },
    boxContainer:{
        marginTop: 80,
        backgroundColor: '#e5eb34',
        borderRadius: 20,
        padding: 35,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2}
    },
    clickHereButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 200,
    }
})
export default Notification;