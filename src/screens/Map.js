import React, {Component} from 'react';
import MapView, { PROVIDER_GOOGLE , Callout, Marker} from 'react-native-maps';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Map extends Component{ 
        state = {
            country: '-',
            countries: [
                {label: 'Search', value: '-', latitude: 0, longitude: 0},
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
                    flag: country.countryInfo.flag
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
    onRegionChange(region) {
        this.setState({ region });
    }
    async componentDidMount(){
        this.getCountries();
    }
    getColorOfMarker(population,cases){
        let how_bad='black';
        let procent = cases * 100 / population;
        if (procent<=1){
            how_bad='#bfff00';
        }
        if (procent<=2 && procent>1){
            how_bad='#ffff00';
        }
        if (procent<=3 && procent>2){
            how_bad='#ffbf00';
        }
        if (procent<=4 && procent>3){
            how_bad='#ff8000';
        }
        if (procent>4){
            how_bad='#ff4000';
        }
        return how_bad;
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
                <View style={styles.legendContainer}>
                    <Text>Cases in {'\n'}population</Text>
                    <View style={styles.legendText}>
                    <View style={styles.square_red}/><View ><Text> {'>'}4%</Text></View>
                    </View>
                    <View style={styles.legendText}>
                    <View style={styles.square_orange}/><View ><Text> 4%</Text></View>
                    </View>
                    <View style={styles.legendText}>
                    <View style={styles.square_gold}/><View ><Text> 3%</Text></View>
                    </View>
                    <View style={styles.legendText}>
                    <View style={styles.square_yellow}/><View ><Text> 2%</Text></View>
                    </View>
                    <View style={styles.legendText}>
                    <View style={styles.square_green}/><View ><Text> 1%</Text></View>
                    </View>
                </View>
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
                        opacity={0.8}
                        tracksViewChanges={false}
                        anchor= {{x:0.5,y:0.5}}
                        >
                        <MaterialCommunityIcons name="checkbox-blank-circle" color={this.getColorOfMarker(population,cases)} size={50} />
                        <Callout>
                            <View style={styles.bubble}>
                                    <Text style={styles.label}>{label}</Text>
                                    <Text style={styles.label_cases}>Cases: {cases}</Text>
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
        borderColor:'black',
        padding:15,
        width:200,
    },
    circle: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        backgroundColor: "red",
    },
    flagstyle:{
        flex: 1,
        width: null,
    },
    label: {
        fontSize: 20,
        fontWeight:'bold'
    },
    label_cases: {
        fontSize: 16,
    },
    ImageContainer :
    {
        flex:1,
        padding: 5,
    },
    legendContainer:{
        position:'absolute',
        top: 52,
        elevation:8,
        backgroundColor: 'rgba(0,0,0,0.0)',
        marginTop: 2,
        marginLeft: 7,
    },
    legendText:{
        flexDirection: 'row', 
    },
    square_red: {
        width: 15,
        height: 15,
        backgroundColor: "#ff4000",
    },
    square_orange: {
        width: 15,
        height: 15,
        backgroundColor: "#ff8000",
    },
    square_gold: {
        width: 15,
        height: 15,
        backgroundColor: "#ffbf00",
    },
    square_yellow: {
        width: 15,
        height: 15,
        backgroundColor: "#ffff00",
    },
    square_green: {
        width: 15,
        height: 15,
        backgroundColor: "#bfff00",
    },
   });
   /*
     <Text style={{ height: 150, position: "relative", bottom: 40}}>
                                        <Image style={{ width: 190, height: 100, }} source={{uri: flag}} resizeMode= 'cover'/>
                                    </Text>
   <MaterialCommunityIcons name="alert-box" color={this.getColorOfMarker(population,cases)} size={26} />
   <View style={{  width: 50,
                                        height: 50,
                                        borderRadius: 100 / 2,
                                        backgroundColor: "red",
                                        transform: [{ translateX: -50}, { translateY: -50}],
                                        }}/>
                                        <View style={{
                                    width: 100,
                                    height: 50,
                                    borderRadius:1,
                                    borderColor: 'black'  
                                }}/>
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