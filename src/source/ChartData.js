import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    Dimensions,
    View
  } from 'react-native';
  import charts from '../styles/charts';
  import PureChart from 'react-native-pure-chart';
  import numbro from "numbro";
  import { VictoryAxis, VictoryChart, VictoryLine, VictoryTheme } from "victory-native";
import Svg from 'react-native-svg';
import { nullFormat } from 'numeral';

class ChartData extends Component{
    _isMounted = false;
    constructor() {
        super();
        this.state = {
            labels: ["February", "March", "April", "May", "June"],
            datasets: [
                { Data: "9/25/20", Liczba: 32552391},
                { Data: "9/25/20", Liczba: 32552391},
            ],
          };
    }
    buildChartData = (data, casesType, country) =>{
        let chartData = [];
        let lastDataPoint;
        let data_cases = country ==='worldwide'? data.cases : data['timeline'].cases;
        
        for (let date in data_cases){
            if (lastDataPoint){
                let newDataPoint = {
                    Data: new Date(date),
                    Liczba:  country ==='worldwide'? data[casesType][date] - lastDataPoint :data['timeline'][casesType][date] - lastDataPoint,
                };
                chartData.push(newDataPoint);
            }
            lastDataPoint = country ==='worldwide'? data[casesType][date] : data['timeline'][casesType][date];
        }
        return chartData;
    }
    getDataforBasicChart = async (casesType='cases',country='worldwide') =>{
        let chartData =[];
        const url = country==='worldwide'? 
        'https://disease.sh/v3/covid-19/historical/all?lastdays=60':
        `https://disease.sh/v3/covid-19/historical/${country}?lastdays=60`
        ;
        await fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
                chartData = this.buildChartData(data, casesType, country);
            this.setState({datasets: chartData});
        });
    }
    async componentDidMount(){
        this.getDataforBasicChart(this.props.casesType, this.props.country);
        this._isMounted = true;
    }
    componentDidUpdate(prevProps){
        if (this.props.casesType !== prevProps.casesType || this.props.country !== prevProps.country) {
            this.getDataforBasicChart(this.props.casesType, this.props.country); 
        }
    }
    componentWillUnmount(){
        this._isMounted = false;
    }
    render() {
        return(
            <VictoryChart scale={{x: 'time'}} theme={VictoryTheme.material}>
            <VictoryAxis
            tickFormat={(t) => numbro(t).format({
                                            average: true,
                                            totalLength:3
                                        })}
            style={{ axis: { stroke: 'grey' },
            axisLabel: { fontSize: 16, fill: '#E0F2F1' },
            ticks: { stroke: '#ccc' },
            tickLabels: { fontSize: 12, fill: 'black', fontWeight: 'bold' },
            grid: { stroke: 'grey', strokeWidth: 0.25 },
            }} dependentAxis/>
            <VictoryAxis
            style={{ axis: { stroke: 'grey' },
              axisLabel: { fontSize: 16 },
              ticks: { stroke: 'black' },
              tickLabels: { fontSize: 10, fill: 'black', fontWeight: 'bold',angle: 45 }
            }}
            />
              <VictoryLine  
              data={this.state.datasets} x="Data" y="Liczba"
              style={{data: {stroke: '#c43a31', strokeWidth: 1.5}}}
              />
            </VictoryChart>
        );
    }
}

  export default ChartData;