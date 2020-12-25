import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    Dimensions,
    View,
    Array
  } from 'react-native';
  import charts from '../styles/charts';
  import PureChart from 'react-native-pure-chart';
  import numbro from "numbro";
  import { VictoryAxis, VictoryChart,  VictoryTheme, VictoryPie } from "victory-native";
import Svg from 'react-native-svg';
import { nullFormat } from 'numeral';
import { SafeAreaView } from 'react-native';

class ChartPieData extends Component{
    _isMounted = false;
    constructor() {
        super();
        this.state = {
            continents: [
            ],
          };
    }
    getDataForContinents= async() =>{
        let new_datapoint;
        let urls = {
        "North America" : 'https://disease.sh/v3/covid-19/continents/North%20America',
        "South America" : 'https://disease.sh/v3/covid-19/continents/South%20America',
        "Africa" : 'https://disease.sh/v3/covid-19/continents/africa',
        "Europe" : 'https://disease.sh/v3/covid-19/continents/europe',
        "Asia" : 'https://disease.sh/v3/covid-19/continents/asia',
        "Australia/Oceania" : 'https://disease.sh/v3/covid-19/continents/Australia%2FOceania'
        };
        let continents_data =[];
        for (let continent in urls){
        try {
            let response = await fetch(urls[continent]);
            let continent_data = await response.json();
                new_datapoint = {
                    Kontynent: continent_data.continent,
                    Liczba: continent_data.cases,
                }
                continents_data.push(new_datapoint);
            
          } catch (error) {
            console.error(error);
          } 
        }
        this.setState({
            continents: continents_data
        });
        this._isMounted=true;
    }
    async componentDidMount(){
        this.getDataForContinents(); 
    }
    componentWillUnmount(){
        this._isMounted = false;
    }

    render() {
        return(
            <VictoryPie
                x = "Kontynent"
                y = "Liczba"
                colorScale="qualitative"
                labelRadius={({ innerRadius }) => innerRadius + 50}
                data={this.state.continents}
                innerRadius={20}
                width={300}
                height={300}
                labels={({ datum }) => `${datum.Kontynent}\n ${datum.Liczba}`}  
            />
        );
    }
}
export default ChartPieData;