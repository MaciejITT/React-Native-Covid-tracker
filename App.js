/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { Alert, NativeModules } from 'react-native';
import HomeStackNavigator from './src/navigations/Navigator';

const unsubscribe = NetInfo.addEventListener(state => {
  if(!state.isConnected){
    Alert.alert("Connection lost","Please check your connection with internet!",
    [
      {
        text: 'Try again',
        onPress: () => NativeModules.DevSettings.reload()
      }
    ]
    );
  }
});
export default class App extends Component {
  
  render(){
    return(
      <HomeStackNavigator/>
    )
  }  
}

