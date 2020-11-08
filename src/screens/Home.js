import React, {Component,useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ImageBackground
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Buttons from '../components/Buttons';
import Cards from '../components/Cards';
import Icon from 'react-native-vector-icons/Feather';
import DropDownPicker from 'react-native-dropdown-picker';
import { getCountriesData } from '../source/dataCovid19';
import { event } from 'react-native-reanimated';
import {Picker} from '@react-native-picker/picker';
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
                }));
            this.setState({countries: countries_data});
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
            console.log(countries_data);
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
    onCountryChange = (event) =>{
        const countryCode = event.target.value;
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
                <Text>CORONAVIRUS</Text>
                <Text>Today cases: {this.state.todayCases}</Text>
                <Text>Cases: {this.state.cases}</Text>
                <Text>Today recovered: {this.state.todayRecovered}</Text>
                <Text>Recovered: {this.state.recovered}</Text>
                <Text>Today deaths: {this.state.todayDeaths}</Text>
                <Text>Deaths: {this.state.deaths}</Text>
            </View>
        )   
    }
}