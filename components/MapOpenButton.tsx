import React from 'react';
import { Pressable, Alert, StyleSheet, Text, View, Linking, Platform } from 'react-native';

function getMapURL(latitude: number, longitude: number, label: string) {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${latitude},${longitude}`;
    const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
    });
    if (url === undefined) {
        console.log('Failed to create map URL')
        return '';
    }
    return url
}

export default function MapOpenButton(latitude: number, longitude: number, label: string) {
    const mapURL = () => {
        const url = getMapURL(latitude, longitude, label)
        if (url) {
            Linking.openURL(url);
        } else {
            Alert.alert('Error', 'Failed to open maps app. Please try again later.');
        }
    };

    return (
        <Pressable
          style={({pressed}) =>
            pressed
              ? [styles.generalStructure, styles.buttonPressed]
              : [styles.generalStructure, styles.buttonUnpressed]
          }
          onPress={mapURL}
        >
          {({pressed}) => <Text style={styles.text}>Open in Maps</Text>}
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
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'rgb(135, 31, 31)',
        fontFamily: 'UbuntuBold',
    },
});


