import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    Dimensions,
    View
  } from 'react-native';
  import charts from '../styles/charts';
  import PureChart from 'react-native-pure-chart';

class ChartData extends Component{
    constructor() {
        super();
        this.state = {
            labels: ["February", "March", "April", "May", "June"],
            datasets: [
                    {x: "7/27/20", y: 0}, 
            ]
          };
    }
    buildChartData = (data, casesType) =>{
        let chartData = [];
        let lastDataPoint;
    
        for (let date in data.cases){
            if (lastDataPoint){
                let newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint,
                };
                chartData.push(newDataPoint);
            }
            lastDataPoint = data[casesType][date];
        }
        return chartData;
    }
    getDataforBasicChart = async () =>{
        let chartData =[];
        await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            chartData = this.buildChartData(data, 'cases');
            this.setState({datasets: chartData});
        });
    }
    async UNSAFE_componentDidMount(){
        this.getDataforBasicChart();
    }
    render() {
        return(
            <View style={Dimensions.get("window").width}>
            <Text style={charts.chartTitle}>Worldwide</Text>
            <PureChart data={this.state.datasets}
            height={300} type='line'/>
            </View>
        );
    }
}
/* <LineChart
                    data={this.state}
                    width={Dimensions.get("window").width} // from react-native
                    height={300}
                    yAxisLabel="$"
                    yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                    backgroundColor: "#0095DF",
                    backgroundGradientFrom: "#0094DE",
                    backgroundGradientTo: "#91DF00",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style:{
                        
                    },
                    propsForDots: {
                        r: "5",
                        strokeWidth: "2",
                        stroke: "#0094DE"
                    }
                    }}
                    bezier
                    style={{
                    marginVertical: 8,
                    borderRadius: 5,
                    }}
                />*/
/*
const buildChartData = (data, casesType) =>{
    let chartData = [];
    let lastDataPoint;

    for (let date in data.cases){
        if (lastDataPoint){
            let newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint,
            };
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
    }
    return chartData;
};

const getDataforBasicChart = async () =>{
    let chartData =[];
    await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        chartData = buildChartData(data, 'cases');
    });
    return chartData; 
};  */

  export default ChartData;