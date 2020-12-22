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
            <VictoryPie
                colorScale={["gold", "cyan", "navy" ]}
                data={[
                    { x: "Poland", y: 50 },
                    { x: "Afganistan", y: 22 },
                    { x: "Albania", y: 22 }
                ]}
            />
        );
    }
}
export default ChartPieData;