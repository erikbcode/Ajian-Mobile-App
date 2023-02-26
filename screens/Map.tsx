import { StyleSheet, ScrollView, StatusBar } from 'react-native';
import { Component } from 'react';
import { MapView, Props } from 'react-native-maps';

export default class App extends Component { 
    render() {    
    return (      
        <MapView provider={null} style={styles.map_flex} region={region} showsUserLocation={true}/>
    );
}};

const styles = StyleSheet.create({
    map_flex: {
    flex: 1,
    }
});

const region = {
    latitude: 42.882004, 
    longitude: 74.582748,          
    latitudeDelta: 0.0922,          
    longitudeDelta: 0.0421        
};
