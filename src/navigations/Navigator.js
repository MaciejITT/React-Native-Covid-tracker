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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from 'react-native-reanimated';

const MaterialBottomTabs = createMaterialBottomTabNavigator();


const HomeStackNavigator = () => {
    return(
        <NavigationContainer>
            <MaterialBottomTabs.Navigator >
                <MaterialBottomTabs.Screen name="HOME" component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                  }}
                />
                <MaterialBottomTabs.Screen name="GRAPHS" component={Graphs}
                options={{
                    tabBarLabel: 'Graphs',
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="chart-bar" color={color} size={26} />
                    ),
                  }}
                />
                <MaterialBottomTabs.Screen name="MAP" component={Map}
                options={{
                    tabBarLabel: 'Map',
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="map" color={color} size={26} />
                    ),
                  }}
                />
                <MaterialBottomTabs.Screen name="RANKING" component={Ranks}
                options={{
                    tabBarLabel: 'Ranking',
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="book" color={color} size={26} />
                    ),
                  }}
                />
            </MaterialBottomTabs.Navigator>
        </NavigationContainer>
    )
}
export default HomeStackNavigator;