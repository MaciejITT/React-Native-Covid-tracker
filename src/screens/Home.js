import React, {Component,useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Button,
  ImageBackground
} from 'react-native';
import { Card } from 'react-native-elements'
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import {sortDataByCases} from '../source/utils'
//import '../styles/home.css';
//import { getCountriesData } from '../source/dataCovid19';

export default class Home extends Component{
    state = {
        country: 'worldwide',
        countries: [
            {label: 'Worldwide', value: 'worldwide'},
        ],
        todayCases: null,
        cases: null,
        todayRecovered: null,
        recovered: null,
        todayDeaths: null,
        deaths: null,
    };
    getCountries = async () =>{
        const url_countries = "https://disease.sh/v3/covid-19/countries";
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
            let sorted_data = sortDataByCases(countries_data);
            this.setState({countries: sorted_data});
          } catch (error) {
            console.error(error);
          } 
    }
    getWorldwideData = async () => {
        const url_country = `https://disease.sh/v3/covid-19/all`;
        try {
            let response = await fetch(url_country);
            let countries_data = await response.json();
            this.setState({
                todayCases: countries_data.todayCases,
                cases: countries_data.cases,
                todayRecovered: countries_data.todayRecovered,
                recovered: countries_data.recovered,
                todayDeaths: countries_data.todayDeaths,
                deaths: countries_data.deaths,
            });
          } catch (error) {
            console.error(error);
          } 
    }
    getDataAboutCountry = async (item) => {
        const url_country = `https://disease.sh/v3/covid-19/countries/${item.value}`;
        try {
            let response = await fetch(url_country);
            let countries_data = await response.json();
            this.setState({
                todayCases: countries_data.todayCases,
                cases: countries_data.cases,
                todayRecovered: countries_data.todayRecovered,
                recovered: countries_data.recovered,
                todayDeaths: countries_data.todayDeaths,
                deaths: countries_data.deaths,
            });
          } catch (error) {
            console.error(error);
          } 
    }
    async componentDidMount(){
        this.getCountries();
        this.getWorldwideData();
          
    }

    render(){
        return(
            
            <View>
                <DropDownPicker
                searchable={true}
                searchablePlaceholder="Search for an item"
                searchableError={() => <Text>Not Found</Text>}
                items={this.state.countries}
                defaultValue= {this.state.country}
                containerStyle={{height: 50}}
                style={{backgroundColor: '#fafafa'}}
                itemStyle={{
                justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item => this.getDataAboutCountry(item)}
                />
                <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                contentContainerStyle={{alignItems: 'center'}}
                data={[
                   {title:"CASES", today: this.state.todayCases, all:this.state.cases, key: "cases"},
                   {title:"RECOVERED", today: this.state.todayRecovered, all: this.state.recovered, key: "recovered"},
                   {title:"DEATHS", today: this.state.todayDeaths,all: this.state.deaths, key: "deaths"} 
                ]}
                renderItem={({item}) => (
                <Card>
                    <Card.Title>{item.title}</Card.Title> 
                    <Text>Today: {item.today}</Text>
                    <Text>All: {item.all}</Text>
                </Card>
                )}
                >
                </FlatList>
            </View>
        )   
    }
}