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
        borderRadius: 4,
        elevation: 3,
        borderColor: 'black',
        borderWidth: 2,
        backgroundColor: 'rgb(135, 31, 31)',
        width: 200
    },
    buttonPressed: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        borderColor: 'black',
        borderWidth: 2,
        backgroundColor: 'rgb(82, 3, 3)',
        width: 200
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        fontFamily: 'UbuntuBold'
    },
});


