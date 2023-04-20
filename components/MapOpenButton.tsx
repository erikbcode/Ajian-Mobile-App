import React from 'react';
import { Pressable, Alert, StyleSheet, Text, View, Linking, Platform } from 'react-native';

function getMapURL(latitude: number, longitude: number, label: string) {
    // Add the start of the Map URL depending on the OS being used
    // Android only included for debugging
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    // Custom latitude and longitude string for URL
    const latLng = `${latitude},${longitude}`;
    // Choose which platform to render based on device viewing the map
    const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
    });
    // If the URL is not created, raise an error and return empty string
    if (url === undefined) {
        console.log('Failed to create map URL');
        return '';
    }
    // Otherwise, return the new URL for loading
    return url
}

export default function MapOpenButton(latitude: number, longitude: number, label: string) {
    const mapURL = () => {
        // Load the URL for the desired platform
        const url = getMapURL(latitude, longitude, label)
        if (url) { // If the URL is not an empty string, open it in maps app
            Linking.openURL(url);
        } else { // Otherwise, display that the map failed to load
            Alert.alert('Error', 'Failed to open maps app. Please try again later.');
        }
    };

    /*
    The below code provides a button which does the following:
    - Says 'Open in Maps'
    - Displays with white background when not clicked
    - When clicked, changes to grey then pulls up a link or raises an Alert from the above mapURL function
    */
    return (
        <Pressable
            style={({pressed}) =>
            pressed
                ? [styles.generalStructure, styles.buttonPressed]
                : [styles.generalStructure, styles.buttonUnpressed]
            }
            onPress={mapURL}
        >
          <Text style={styles.text}>Open in Maps</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    generalStructure: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 32,
        borderRadius: 35,
        elevation: 3,
        borderWidth: 0,
        width: 200,
        height: 30,
        marginTop: 40,
        marginBottom: 20,
    },
    buttonUnpressed: {
        backgroundColor: 'white',
    },
    buttonPressed: {
        backgroundColor: 'rgb(145, 145, 145)',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        // fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'rgb(135, 31, 31)',
        fontFamily: 'Ubuntu',
    },
});


