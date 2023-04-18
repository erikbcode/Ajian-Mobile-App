import React from 'react';
import { Pressable, Alert, StyleSheet, Text, View, Linking, Platform, TouchableOpacity, Image } from 'react-native';

function getSocialURL(which: string) {

    if (which == "twitter") {
        const url = `https://twitter.com/ajiansushi`;

        return url
    }

    else if (which == "insta") {
        const url = `https://www.instagram.com/ajiansushi`;

        return url
    }

    return '';
}

function whichIcon(which: string) {

    if (which == "insta") {
        const icon = require("../assets/images/instagram.png");

        return icon;
    }

    else if (which == "twitter") {
        const url = require("../assets/images/twitter.png");

        return url
    }

    return '';

}

export default function SocialOpenButton(which: string) {
    const socialURL = () => {
        const url = getSocialURL(which)
        if (url) {
            Linking.openURL(url);
        } else {
            Alert.alert('Error', 'Failed to open app. Please try again later.');
        }
    };

   /* return (
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
      );*/

      const socialIcon = whichIcon(which);

     return( <TouchableOpacity 
      onPress={() => { 
        // Replace the link below with your own Instagram link
        Linking.openURL(getSocialURL(which)); 
      }}
      style={styles.instagramButton}
    >
      <Image 
        source={socialIcon} 
        style={styles.instagramIcon} 
      />
      <Text style={styles.instagramText}>Follow us on {which}</Text>
    </TouchableOpacity>);
      
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

    instagramButton: {
        backgroundColor: '#DD2A7B',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
      },
      instagramIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
      },
      instagramText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
      }
});


