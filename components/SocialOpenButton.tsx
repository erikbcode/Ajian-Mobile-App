import React from 'react';
import { Pressable, Alert, StyleSheet, Text, View, Linking, Platform } from 'react-native';

function getSocialURL(which: string) {

    if (which == "twitter") {
        const url = `https://twitter.com/ajiansushi`;

        return url
    }

    else if (which == "insta") {
        const url = `https://www.instagram.com/ajiansushi`;

        return url
    }

    return null;
}

export default function SocialOpenButton(which: string) {
    const socialURL = () => {
        const url = getSocialURL(which)
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
          onPress={socialURL}
        >
          {({pressed}) => <Text style={styles.text}>Follow us on {which}!</Text>}
        </Pressable>
      );
}

const styles = StyleSheet.create({
    generalStructure: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 2,
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
        fontSize: 10,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'rgb(135, 31, 31)',
        fontFamily: 'UbuntuBold',
    },
});


