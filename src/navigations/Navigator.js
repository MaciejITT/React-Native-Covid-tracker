import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    Button,
    ImageBackground
  } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import 'react-native-gesture-handler';
import Home from '../screens/Home';
import Map from '../screens/Map';
import Ranks from '../screens/Ranks';
import Graphs from '../screens/Graphs';
import navigator from '../styles/navigator';
import { color } from 'react-native-reanimated';

const MaterialBottomTabs = createMaterialBottomTabNavigator();


const HomeStackNavigator = () => {
    return(
        <NavigationContainer>
            <MaterialBottomTabs.Navigator >
                <MaterialBottomTabs.Screen name="HOME" component={Home}/>
                {/*<MaterialBottomTabs.Screen name="MAP" component={Map}/>*/}
                <MaterialBottomTabs.Screen name="RANKING" component={Ranks}/>
                <MaterialBottomTabs.Screen name="GRAPHS" component={Graphs}/>
            </MaterialBottomTabs.Navigator>
        </NavigationContainer>
    )
}
export default HomeStackNavigator;