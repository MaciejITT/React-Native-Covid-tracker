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
import ChartContinentsData from '../source/ChartContinentsData';
import { ScrollPager } from 'react-native-tab-view';
import { ScrollView } from 'react-native-gesture-handler';

export default class Graphs extends Component{
    _isMounted = false;
    state = {
            country: '-',
            countries: [
                {label: 'Search', value: '-'},
            ],
            selected_countries: [],
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
                    }));
                this.setState({countries: countries_data});
              } catch (error) {
                console.error(error);
              } finally {
                this._isMounted = true;
              }
        }
        async componentDidMount(){
            this.getCountries();
        }
    getDataSelectedCountries(item){
        this.setState({
            selected_countries: item
        });
        if(item ===[]){
            this.setState({
                selected_countries: []
            });
        }
    }

    render(){
        let cards;
        if(this._isMounted && this.state.selected_countries != []){
            cards =<View>
                    <Card containerStyle={home.chartContainer}>
                        <Text style={home.chartTitle}>new cases {"&"} recovered</Text>
                        <ChartBarData selected_countries={this.state.selected_countries}/>
                    </Card>
                    <Card containerStyle={home.chartContainer2}>
                        <Text style={home.chartTitle}>DEATHS</Text>
                        <ChartPieData selected_countries={this.state.selected_countries}/>
                    </Card>
                    </View>
        }
        else{
           cards = <Card containerStyle={home.chartContainer2}><Text>Select countries</Text></Card>
        }
        return(
            <SafeAreaView>
                 <DropDownPicker
                    multiple={true}
                    multipleText="%d items have been selected."
                    min={0}
                    max={10}
                    searchable={true}
                    searchablePlaceholder="Search for an item"
                    searchableError={() => <Text>Not Found</Text>}
                    items= {this.state.countries}
                    defaultValue= {this.state.country}
                    containerStyle={{height: 50}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownMaxHeight={500}
                    dropDownStyle={{backgroundColor: '#fafafa',zIndex:6}}
                    onChangeItem={item => this.getDataSelectedCountries(item)}
                    />
            <View>
                <ScrollView style={{marginBottom:55}}>
                    {cards}
                    <Card containerStyle={home.chartContainer2}>
                        <Text style={home.chartTitle}>CONTINENTS</Text>
                        <ChartContinentsData/>
                    </Card>
                    <View style={{height:55}}></View>
                </ScrollView>
            </View>
            </SafeAreaView>
        )   
    }
}
/*<Card containerStyle={home.chartContainer}>
                        <Text style={home.chartTitle}>new cases {"&"} recovered</Text>
                        <ChartBarData selected_countries={this.state.selected_countries}/>
                    </Card>
                    <Card containerStyle={home.chartContainer2}>
                        <Text style={home.chartTitle}>DEATHS</Text>
                        <ChartPieData selected_countries={this.state.selected_countries}/>
                    </Card> */