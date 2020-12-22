import React, {Component} from 'react';
import {
  View,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import home from '../styles/home';
import { Card } from 'react-native-elements';
import ChartBarData from '../source/ChartBarData';
import ChartPieData from '../source/ChartPieData';
import { ScrollPager } from 'react-native-tab-view';
import { ScrollView } from 'react-native-gesture-handler';

export default class Graphs extends Component{
    state = {
            country: '-',
            countries: [
                {label: 'Search', value: '-', latitude: 0, longitude: 0},
            ],
            selected_countries: ["Poland","Afghanistan","Albania"],
        }
        getCountries = async () =>{
            const url_countries = "https://disease.sh/v3/covid-19/countries";
            try {
                let response = await fetch(url_countries);
                let json = await response.json();
                let countries_data = json.map((country) => (
                    {
                        label: country.country,
                        value: country.countryInfo.iso2,
                        cases: country.cases,
                        recovered: country.recovered,
                        deaths: country.deaths,
                        population: country.population,
                    }));
                this.setState({countries: countries_data});
              } catch (error) {
                console.error(error);
              } 
        }
    render(){
        return(
            <SafeAreaView>
                 <DropDownPicker
                            searchable={true}
                            searchablePlaceholder="Search for an item"
                            searchableError={() => <Text>Not Found</Text>}
                            items= {this.state.countries}
                            defaultValue= {this.state.country}
                            containerStyle={{height: 50}}
                            itemStyle={{
                            justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{backgroundColor: '#fafafa',zIndex:6}}
                            />
            <View>
                <ScrollView style={{marginBottom:55}}>
                    <Card containerStyle={home.chartContainer}>
                        <Text style={home.chartTitle}>new cases</Text>
                        <ChartBarData selected_countries={this.state.selected_countries}/>
                    </Card>
                    <Card containerStyle={home.chartContainer}>
                        <Text style={home.chartTitle}>new cases</Text>
                        <ChartPieData/>
                    </Card>
                    <View style={{height:55}}></View>
                </ScrollView>
            </View>
            </SafeAreaView>
        )   
    }
}