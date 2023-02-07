import {Button, Pressable, Alert, StyleSheet, Text, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser'

export default function MobileOrderButton() {

    function handleOrderPress() {
        WebBrowser.openBrowserAsync( 
        'https://online.skytab.com/9f93befaf4dacdf386b634d4ce057ecf/order-settings'
        );
    }

    return (
        <Pressable style={({pressed}) => [
            pressed ? styles.buttonPressed : styles.buttonUnpressed,
        ]}
        onPress={handleOrderPress}>
        {({pressed}) => (
            <Text style={styles.text}>Order Now</Text>
        )}
        </Pressable>
    );

}

const styles = StyleSheet.create({
    buttonUnpressed: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 35,
        elevation: 3,
        borderWidth: 0,
        backgroundColor: 'white',
        width: 300,
        height: 60,
    },
    buttonPressed: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 35,
        elevation: 3,
        borderWidth: 0,
        backgroundColor: 'rgb(145, 145, 145)',
        width: 300,
        height: 60
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'rgb(135, 31, 31)'
    },
});


