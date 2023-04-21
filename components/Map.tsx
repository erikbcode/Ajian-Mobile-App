import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, ScrollView, StatusBar } from 'react-native';

// https://github.com/react-native-maps/react-native-maps#my-map-is-blank

// type coordinate = {
//   latitude: number,
//   longitude: number,
// };

export default function Map(latitude: number, longitude: number) {
  /*
  The below renders a map in a fixed position on the screen.
  - This can have a predefined size but must stay fixed
  - The scale of the map is determined by the latitude/longitude Delta attributes
  - The focus of the map is on a specified coordinate for Ajian
  - A marker is added to the center of the screen at the specified latitude/longitude for Ajian
  */    
  return (
    <View style={styles.container}>
      <MapView 
        style={{width: '100%', height: '50%'}} 
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        showsUserLocation={true}
      >
        <Marker 
          coordinate={{
            latitude: latitude, 
            longitude: longitude,
          }} />
      </MapView>
    </View>
  );
}
  
const styles = StyleSheet.create({
    // Note that this map displays in a fixed window, everything else is designed around it.
    // Failure to follow this styling convention will stop the map from rendering without an error being raised.
    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 300,
      paddingTop: 60,
    },
    map: {
      width: '100%',
      height: '100%',      
    },
});