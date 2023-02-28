import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, ScrollView, StatusBar } from 'react-native';

// https://github.com/react-native-maps/react-native-maps#my-map-is-blank

type coordinate = {
  latitude: number,
  longitude: number,
};

export default function Map() {
    return (
      <View style={styles.container}>
        <MapView 
          style={{width: '100%', height: '50%'}} 
          initialRegion={{
            latitude: 33.21195,
            longitude: -87.56226,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          showsUserLocation={true}
        >
          <Marker 
            coordinate={{
              latitude: 33.21195, 
              longitude: -87.56226,
            }} />
        </MapView>
      </View>
    );
  }
  
const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: '#fff',
    },
    map: {
      // ...StyleSheet.absoluteFillObject,
      width: '100%',
      height: '100%',      
    },
});