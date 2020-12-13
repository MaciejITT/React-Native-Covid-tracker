import React, {Component} from 'react';
import MapView, { PROVIDER_GOOGLE , Callout, Marker} from 'react-native-maps';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TouchableItem } from 'react-native-tab-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Map extends Component{ 
        state = {
            country: 'pl',
            countries: [
                {label: 'Poland', value: 'pl', latitude: 52, longitude: 20,},
            ],
            region: {
                latitude: 52,
                longitude: 20,
                latitudeDelta: 19,
                longitudeDelta: 19,
            },
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
                    latitude: country.countryInfo.lat,
                    longitude: country.countryInfo.long,
                    flag:country.countryInfo.flag
                }));
            this.setState({countries: countries_data});
          } catch (error) {
            console.error(error);
          } 
    }
    handleEvent(){  
        console.log(this.props);  
    }  
    goToCountry(item){
        let data = this.state.countries;
        let coordinates = {
                latitude: 52,
                longitude: 20,
                latitudeDelta: 19,
                longitudeDelta: 19,
        };
        for (let i in data){
            if(data[i].value === item.value){
                coordinates.latitude = data[i].latitude;
                coordinates.longitude = data[i].longitude;
                this.setState({
                    region: coordinates,
                });
                break;
            }
        } 
    }
    coronavirusGeoMapInfo(){
        let data = this.state.countries;
        data.map(( label, value, cases, recovered, deaths, population, latitude, longitude) => (
            <Circle center={{
                latitude: 52,
                longitude: 20
            }}
            strokeWidth={10}
            fillColor={'#ff0000'}
            radius={500}
            />
        ));
    }
    onRegionChange(region) {
        this.setState({ region });
    }
    async componentDidMount(){
        this.getCountries();
    }
    render(){
        return(
            <SafeAreaView>
            <View style={styles.container}>
            <View>
                <DropDownPicker
                            searchable={true}
                            searchablePlaceholder="Search for an item"
                            searchableError={() => <Text>Not Found</Text>}
                            items= {this.state.countries}
                            defaultValue= {this.state.country}
                            containerStyle={{height: 50,}}
                            itemStyle={{
                            justifyContent: 'flex-start',
                            }}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            onChangeItem={item => this.goToCountry(item)}
                            />
            </View>
            <View >
                <MapView style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    region={this.state.region}
                    maxZoomLevel={19}
                >
                {
                    this.state.countries.map(( {label, value, cases, recovered, deaths, population, latitude, longitude,flag},i) => 
                    <Marker key={i} 
                        coordinate = {{ latitude: latitude, longitude: longitude,}}
                        pinColor={'wheat'}
                        opacity={0.8}
                        >
                        
                        <Callout>
                            <View style={styles.bubble}>
                                <Text>{label}</Text>
                                <Text>Cases: {cases}</Text>
                                <Text>Recovered: {recovered}</Text>
                                <Text>Deaths: {deaths}</Text>
                            </View>
                        </Callout>
                        </Marker> 
                    )
                }
                </MapView>
            </View>
            </View>
            </SafeAreaView>
        )   
    }
}
const styles = StyleSheet.create({
    container: {
      height: '100%',
    },
    map: {
      height: '100%',
    },
    bubble:{
        backgroundColor:'#fff',
        borderRadius:6,
        borderColor:'black',
        borderWidth:0.5,
        padding:15,
        width:200,
    },
    circle: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        backgroundColor: "red",
      },
   });
   /*
   <Circle key={i} center={{
                            latitude: latitude,
                            longitude: longitude
                        }}
                        strokeWidth={1}
                        strokeColor = {'rgba(153, 0, 0, 0.8)'}
                        fillColor={'rgba(204, 0, 0, 0.4)'}
                        radius={100000}
                        >
                        </Circle> 
   
   
   <Marker key={i} 
                        coordinate = {{ latitude: latitude,
                                        longitude: longitude,}}
                        >                     </Marker> */