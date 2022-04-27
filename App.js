import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './Screens/Home';
import Result from './Screens/Result';
import Detail from './Screens/Detail';
import Search from './Screens/Search';
import Update from './Screens/Update';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        options={{
          title: "Home",
        }}
        name = "Home"
        component = {Home} />
        <Stack.Screen
        options={{
          title: "Result",
        }}
        name = "Result"
        component={Result}
        />
        <Stack.Screen
        options={{
          title: "Detail",
        }}
        name = "Detail"
        component={Detail}
        />
        <Stack.Screen
        options={{
          title: "Search",
        }}
        name = "Search"
        component={Search}
        />
        <Stack.Screen options={{
          title: "Update"
        }}
        name = "Update"
        component={Update} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
