import React,{Component} from 'react';
import { VictoryPie} from "victory-native";

class ChartPieData extends Component{
    _isMounted = false;
    constructor() {
        super();
        this.state = {
            data_deaths: [
            ],
            selected_countries: [],
          };
    }
    getDataForSelectedCountries = async(selected_countries) =>{
        const selected = selected_countries;
        let new_datapoint_deaths;
        let deaths =[];
        for (let country in selected){
        const url_country = `https://disease.sh/v3/covid-19/countries/${selected[country]}`;
        try {
            let response = await fetch(url_country);
            let countries_data = await response.json();
                new_datapoint_deaths = {
                    Kraj: selected[country],
                    Liczba: countries_data.deaths,
                    label: selected[country],
                }
                deaths.push(new_datapoint_deaths);
            
          } catch (error) {
            console.error(error);
          } 
        }
        this.setState({
            data_deaths: deaths
        });
        this._isMounted=true;
    }
    async componentDidMount(){
        this.getDataForSelectedCountries(this.props.selected_countries); 
    }
    componentDidUpdate(prevProps){
        if (this.props.selected_countries !== prevProps.selected_countries) {
            this.setState({selected_countries: this.props.selected_countries});
            this.getDataForSelectedCountries(this.props.selected_countries); 
        }
    }
    componentWillUnmount(){
        this._isMounted = false;
    }

    render() {
        return(
            <VictoryPie
                animate={{
                    duration: 2000
                }}
                x = "Kraj"
                y = "Liczba"
                colorScale="qualitative"
                width={300}
                data={this.state.data_deaths}
                style={{ labels: {fontSize: 15, padding: 10}}}
                labelPosition={({ index }) => index
                    ? "centroid"
                    : "startAngle"
                }
                labelPlacement={({ index }) => index
                    ? "parallel"
                    : "vertical"
                }
                labels={({ datum }) => `${datum.Kraj}\n ${datum.Liczba}`}  
                events={[{
                    target: "data",
                    eventHandlers: {
                      onClick: () => {
                        return [
                          {
                            target: "labels",
                            mutation: (props) => {
                              return props.text === "clicked" ? null : { text: "clicked" };
                            }
                          }
                        ];
                      }
                    }
                  }]}
            />
        );
    }
}
export default ChartPieData;