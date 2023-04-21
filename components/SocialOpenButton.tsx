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

     return( 
  <TouchableOpacity 
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
  </TouchableOpacity>
     );
      
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instagramButton: {
    padding: 0,
    backgroundColor:"#0000"
  },
  instagramIcon: {
    width: 100,
    height: 100,
  },
});


