import React, {Component} from 'react';
import {
  View,
  Text
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
/*onChangeItem={item => this.setState({
                country: item.value
                })}*/

const DropDownList = (props) =>{
    console.log(props);
    return(
            <DropDownPicker
            items={[
                {label: 'USA', value: 'usa'},
                {label: 'UK', value: 'uk'},
                {label: 'France', value: 'france'},
            ]}
            defaultValue='uk'
            containerStyle={{height: 40}}
            style={{backgroundColor: '#fafafa'}}
            itemStyle={{
            justifyContent: 'flex-start'
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
                
            />
        )   
}
export default DropDownList;
/*items={this.state.countries}
                defaultValue= {this.state.country}
                containerStyle={{height: 40}}
                style={{backgroundColor: '#fafafa'}}
                itemStyle={{
                justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item => this.setState({
                    country: item.value
                    })} */