import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView, 
  ScrollView,
  StyleSheet,
  Button,
} from 'react-native';
import { CheckBox } from 'react-native-elements'
import Home from '../screens/Home';
import ranks from '../styles/ranks';
import {sortDataByCases,
     sortDataByRecovered,
     sortDataByDeaths,
     sortDataBytodayCases, 
     sortDataBytodayRecovered, 
     sortDataBytodayDeaths} from '../source/utils'

export default class Ranks extends Component{
        state={
            countries: [],
            order_by: 'cases',
            checked: 'all'
        }
    getCountries = async (sort='cases') =>{
        const url_countries = "https://disease.sh/v3/covid-19/countries";
        let sorted_data;
        try {
            let response = await fetch(url_countries);
            let json = await response.json();
            let countries_data = json.map((country) => (
                {
                    label: country.country,
                    value: country.countryInfo.iso2,
                    todayCases: country.todayCases,
                    cases: country.cases,
                    todayRecovered: country.todayRecovered,
                    recovered: country.recovered,
                    todayDeaths: country.todayDeaths,
                    deaths: country.deaths,
                }));
                switch(sort){
                    case 'recovered': 
                    sorted_data = sortDataByRecovered(countries_data);
                    this.setState({order_by: 'recovered', checked:'all'});
                    break;
                    case 'deaths': 
                    sorted_data = sortDataByDeaths(countries_data);
                    this.setState({order_by: 'deaths', checked:'all'});
                    break;
                    case 'todayrecovered': 
                    sorted_data = sortDataBytodayRecovered(countries_data);
                    this.setState({order_by: 'todayrecovered', checked:'today'});
                    break;
                    case 'todaydeaths': 
                    sorted_data = sortDataBytodayDeaths(countries_data);
                    this.setState({order_by: 'todaydeaths', checked:'today'});
                    break;
                    case 'todaycases': 
                    sorted_data = sortDataBytodayCases(countries_data);
                    this.setState({order_by: 'todaycases', checked:'today'});
                    break;
                    default:
                        sorted_data = sortDataByCases(countries_data);
                        this.setState({order_by: 'cases', checked:'all'});
                }
            this.setState({countries: sorted_data});
          } catch (error) {
            console.error(error);
          } 
    }
    async componentDidMount(){
        this.getCountries(this.state.order_by);    
    }
    rendarViews(cases,recovered,deaths,todayCases,todayRecovered,todayDeaths){
        if(this.state.checked==='today'){
            return(
                <View>
                    <Text style={ranks.text_fashion}>Today Cases: {todayCases}</Text>
                    <Text style={ranks.text_fashion}>Today Recovered: {todayRecovered}</Text>
                    <Text style={ranks.text_fashion}>Today Deaths: {todayDeaths}</Text>
                </View>);
        }else{
            return(
                <View>
                    <Text style={ranks.text_fashion}>Cases: {cases}</Text>
                    <Text style={ranks.text_fashion}>Recovered: {recovered}</Text>
                    <Text style={ranks.text_fashion}>Deaths: {deaths}</Text>
                </View>);
        }
        
    }
    render(){
        return(
            <View style={{marginLeft: 10, marginRight: 10}}>
                <View style={ranks.backgroun_for_view}>
                <Text style={ranks.text_fashion3}>ORDER BY</Text>
                <View style={ranks.buttons_in_row}>
                    <View style={ranks.buttons_in_row_}>
                        <Button onPress={() =>this.getCountries('cases')} title="Cases" />
                    </View>
                    <View style={ranks.buttons_in_row_}>
                        <Button onPress={() => this.getCountries('recovered')} title="Recovered"/>
                    </View>
                    <View style={ranks.buttons_in_row_}>
                        <Button onPress={() => this.getCountries('deaths')} title="Deaths"/>
                    </View>
                </View>
                <View style={ranks.buttons_in_row}>
                <View style={ranks.buttons_in_row_}>
                        <Button onPress={() =>this.getCountries('todaycases')} title={"Today \nCases"} />
                    </View>
                    <View style={ranks.buttons_in_row_}>
                        <Button onPress={() => this.getCountries('todayrecovered')} title={"Today \nRecovered"}/>
                    </View>
                    <View style={ranks.buttons_in_row_}>
                        <Button onPress={() => this.getCountries('todaydeaths')} title={"Today \nDeaths"}/>
                    </View>
                </View></View>
                <SafeAreaView >
                    <ScrollView >
                    {
                        this.state.countries.map(({label,cases,deaths,recovered,todayCases,todayRecovered,todayDeaths},i) => (
                        <View key={i} style={ranks.element_view}>
                            <Text style={ranks.text_fashion_country}>{i+1}. {label}</Text>
                            {this.rendarViews(cases,recovered,deaths,todayCases,todayRecovered,todayDeaths)}
                        </View>
                        
                        ))
                    }
                    </ScrollView>
                </SafeAreaView>
            </View>
        )   
    }
}