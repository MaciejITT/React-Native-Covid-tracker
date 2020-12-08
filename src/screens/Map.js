import React, {Component} from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import Home from './Home';

export default class Map extends Component{
    state={
        region: {
            latitude: 52,
            longitude: 20,
            latitudeDelta: 19,
            longitudeDelta: 19,
          },
    }
    onRegionChange(region) {
        this.setState({ region });
    }
    render(){
        return(
            <View style={styles.container}>
                <MapView  style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    region={this.state.region}
                    maxZoomLevel={19}
                ></MapView>
            </View>
        )   
    }
}
const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: '100%',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });