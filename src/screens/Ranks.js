import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView, 
  ScrollView,
  StyleSheet,
  Button,
} from 'react-native';
import Home from '../screens/Home';
import ranks from '../styles/ranks';

export default class Ranks extends Home{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={{marginLeft: 10, marginRight: 10}}>
                <SafeAreaView >
                    <ScrollView >
                    {
                        this.state.countries.map(({label,cases},i) => (
                        <View key={i} style={ranks.element_view}>
                            <Text style={ranks.text_fashion}>{i+1}. {label}</Text>
                            <Text style={ranks.text_fashion}>{cases}</Text>
                        </View>
                        
                        ))
                    }
                    <Text>Ranks - {this.state.cases}</Text>
                    </ScrollView>
                </SafeAreaView>
            </View>
        )   
    }
}