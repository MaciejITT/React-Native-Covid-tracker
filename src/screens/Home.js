import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { Card } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import ChartData from '../source/ChartData';
import home from '../styles/home';
import { SafeAreaView } from 'react-native-safe-area-context';
import numbro from "numbro";

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
        casesType: 'cases',
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
                
                countries_data.push({label: 'Worldwide', value: 'worldwide'}) ;
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
                country: 'worldwide'
            });
          } catch (error) {
            console.error(error);
          } 
    }
    getDataAboutCountry = async (item) => {
        if(item.value==='worldwide'){
            this.getWorldwideData();
        }else{
        const url_country = `https://disease.sh/v3/covid-19/countries/${item.value}`;
        try {
            let response = await fetch(url_country);
            let countries_data = await response.json();
            this.setState({
                country: item.label,
                todayCases: countries_data.todayCases,
                cases: countries_data.cases,
                todayRecovered: countries_data.todayRecovered,
                recovered: countries_data.recovered,
                todayDeaths: countries_data.todayDeaths,
                deaths: countries_data.deaths,
            });
          } catch (error) {
            console.error(error);
          } }
    }
    async componentDidMount(){
        this.getWorldwideData(); 
        this.getCountries(); 
    }


    render(){
        return(
            <SafeAreaView>
                        <DropDownPicker
                        
                        searchable={true}
                        searchablePlaceholder="Search for an item"
                        searchableError={() => <Text>Not Found</Text>}
                        items={this.state.countries}
                        defaultValue= 'worldwide'
                        containerStyle={{height: 50}}
                        itemStyle={{
                        justifyContent: 'flex-start',
                        }}
                        dropDownStyle={{backgroundColor: '#fafafa',zIndex:6}}
                        onChangeItem={(item) => this.getDataAboutCountry(item)}
                        />
                <View style={home.list_flex}>
                    <SafeAreaView>
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
                        <TouchableWithoutFeedback onPress={()=>this.setState({casesType: item.key})} accessibilityRole='button'> 
                        <Card
                        containerStyle={{
                            elevation:4, 
                            borderTopWidth:10,
                            borderRadius:5,
                            borderTopColor: item.key === this.state.casesType ? "yellowgreen" : "#1A86DC"}}
                            >
                            <Card.Title>{item.title}</Card.Title> 
                            <Text>Today: {numbro(parseInt(item.today)).format({thousandSeparated: true})}</Text>
                            <Text>All: {numbro(parseInt(item.all)).format({thousandSeparated: true})}</Text>
                        </Card>
                        </TouchableWithoutFeedback>
                        )}
                    ></FlatList>
                    </SafeAreaView>
                </View>
                    <ScrollView style={{marginTop: 10, paddingBottom:20}}>
                    <Card containerStyle={home.chartContainer}>
                        <Text style={home.chartTitle}>{this.state.country} cases</Text>
                        <ChartData casesType={this.state.casesType} country={this.state.country} />
                    </Card>

                    <View style={{marginBottom:60}}></View>
                    </ScrollView>
            </SafeAreaView>
        )   
    }
}