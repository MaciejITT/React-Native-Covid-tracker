import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { colors } from 'react-native-elements';

export default class ChartLegend extends Component{
    state={
        selected: [],
        color: "grey",
    }

    componentDidUpdate(prevProps){
        if (this.props.selected_countries !== prevProps.selected_countries) {
            this.setState({selected: this.props.selected_countries});
        }
    }
    componentDidMount(){
        this.setState({selected: this.props.selected_countries});
    }
    legendcolors(i){
        let colorz="grey";
        switch(i){
            case 0: colorz="#2f4f5f"; break;
            case 1: colorz="#20b2aa"; break;
            case 2: colorz="#ffd700"; break;
            case 3: colorz="#ffa500"; break;
            case 4: colorz="#ff6347"; break;
            case 5: colorz="grey"; break;
            default: 
                colorz="grey";
        }
        return colorz;
        //this.setState({color: colorz});
    }
    render(){
        return(
            <View>
                {
                    this.state.selected.map((i,j) =>(
                        
                        <View key={j} style={styles.legendText}><View style={[styles.square,{backgroundColor:  this.legendcolors(j)}]}/>
                        <Text> {i}</Text></View>
                    ))
                }
            </View>
        )   
    }
}
const styles = StyleSheet.create({
    square: {
        width: 15,
        height: 15,
    },
    legendText:{
        flexDirection: 'row', 
    },
    square_orange: {
        width: 15,
        height: 15,
        backgroundColor: "#ff8000",
    },
    square_gold: {
        width: 15,
        height: 15,
        backgroundColor: "#ffbf00",
    },
    square_yellow: {
        width: 15,
        height: 15,
        backgroundColor: "#ffff00",
    },
    square_green: {
        width: 15,
        height: 15,
        backgroundColor: "#bfff00",
    },
   });