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
  import { VictoryAxis, VictoryChart, VictoryBar, VictoryTheme,VictoryGroup } from "victory-native";
import Svg from 'react-native-svg';
import { nullFormat } from 'numeral';

class ChartBarData extends Component{
    _isMounted = false;
    constructor() {
        super();
        this.state = {
            data_cases: [
            ],
            data_recovered: [
            ],
            data_deaths: [
            ],
            selected_countries: [],
          };
    }
    getDataForSelectedCountries = async(selected_countries) =>{
        const selected = selected_countries;
        let new_datapoint_cases;
        let new_datapoint_recovered;
        let new_datapoint_deaths;
        let cases =[];
        let recovered =[];
        let deaths =[];
        for (let country in selected){
        const url_country = `https://disease.sh/v3/covid-19/countries/${selected[country]}`;
        try {
            let response = await fetch(url_country);
            let countries_data = await response.json();
                new_datapoint_cases = {
                    Kraj: selected[country],
                    Liczba: countries_data.cases,
                }
                cases.push(new_datapoint_cases);
                new_datapoint_recovered = {
                    Kraj: selected[country],
                    Liczba: countries_data.recovered,
                }
                recovered.push(new_datapoint_recovered);
                new_datapoint_deaths = {
                    Kraj: selected[country],
                    Liczba: countries_data.deaths,
                }
                deaths.push(new_datapoint_deaths);
            
          } catch (error) {
            console.error(error);
          } 
        }
        this.setState({
            data_cases: cases,
            data_recovered: recovered,
            data_deaths: deaths
        });
        this._isMounted=true;
    }
    async componentDidMount(){
        //this.getDataforBasicChart(this.props.casesType, this.props.country);
        this.getDataForSelectedCountries(this.props.selected_countries); 
    }
    componentDidUpdate(prevProps){
        if (this.props.selected_countries !== prevProps.selected_countries) {
            this.setState({selected_countries: this.props.selected_countries});
            this.getDataForSelectedCountries(this.props.selected_countries); 
        }
    }
    componentWillUnmount(){
        this._isMounted = false;
    }

    render() {
        return(
            <VictoryChart theme={VictoryTheme.material}>
            <VictoryAxis
                    tickFormat={(t) => numbro(t).format({
                                                    average: true,
                                                    totalLength:3
                                                })} 
                        style={{ axis: { stroke: 'grey' },
                        axisLabel: { fontSize: 16, fill: '#E0F2F1' },
                        ticks: { stroke: '#ccc' },
                        tickLabels: { fontSize: 12, fill: 'black', fontWeight: 'bold' },
                        grid: { stroke: 'grey', strokeWidth: 0.25 },
                        }} dependentAxis/>
                        <VictoryAxis
                        style={{ axis: { stroke: 'grey' },
                        axisLabel: { fontSize: 16 },
                        ticks: { stroke: 'black' },
                        tickLabels: { fontSize: 10, fill: 'black', fontWeight: 'bold',angle: 45 }
                        }}
                        />
            <VictoryGroup offset={30}> 
           
              <VictoryBar  
              data={this.state.data_cases} x="Kraj" y="Liczba"
              />
                <VictoryBar  
              data={this.state.data_recovered} x="Kraj" y="Liczba"
              />
              <VictoryBar  
              data={this.state.data_deaths} x="Kraj" y="Liczba"
              />
            </VictoryGroup> 
            </VictoryChart>
        );
    }
}
export default ChartBarData;
/*
 <VictoryAxis
            tickFormat={(t) => numbro(t).format({
                                            average: true,
                                            totalLength:3
                                        })} 
                                        style={{ axis: { stroke: 'grey' },
                                        axisLabel: { fontSize: 16, fill: '#E0F2F1' },
                                        ticks: { stroke: '#ccc' },
                                        tickLabels: { fontSize: 12, fill: 'black', fontWeight: 'bold' },
                                        grid: { stroke: 'grey', strokeWidth: 0.25 },
                                        }} dependentAxis/>
                                        <VictoryAxis
                                        style={{ axis: { stroke: 'grey' },
                                          axisLabel: { fontSize: 16 },
                                          ticks: { stroke: 'black' },
                                          tickLabels: { fontSize: 10, fill: 'black', fontWeight: 'bold',angle: 45 }
                                        }}
                                        />
*/