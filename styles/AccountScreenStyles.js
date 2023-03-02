import { StyleSheet} from 'react-native';
import { useContext } from 'react';
import { FontContext } from '../context/FontContext';

export const useAccountStyles = () => {
    const fontsLoaded = useContext(FontContext);

    return StyleSheet.create({
        container: {
            flex: 1,
            flexBasis: 'auto',
            backgroundColor: 'rgb(135, 31, 31)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        logInContainer: {
            backgroundColor: 'rgb(135, 31, 31)',
            flexDirection: 'column',
            alignItems: 'center',
            width: '80%',
            marginBottom: 80,
        },
        signUpContainer: {
            backgroundColor: 'rgb(135, 31, 31)',
            flexDirection: 'column',
            alignItems: 'center',
            width: '80%',
            marginBottom: 20,
        },
        input: {
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            width: '100%',
            backgroundColor: 'white',
        },
        button: {
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
            marginBottom: 20,
        },
        buttonUnpressed: {
            backgroundColor: 'white',
        },
        buttonPressed: {
            backgroundColor: 'rgb(145, 145, 145)',
        },
        titleText: {
            fontSize: 30,
            fontWeight: 'bold',
            marginBottom: 30,
            fontFamily: fontsLoaded ? 'Ubuntu' : 'System',
            color: 'white'
        },
        bodyText: {
            fontSize: 24,
            fontFamily: fontsLoaded ? 'Ubuntu' : 'System',
            marginBottom: 30,
            color: 'white',
            textAlign: 'center',
            width: '90%'
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 16,
        },
        text: {
            fontSize: 16,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: 'rgb(135, 31, 31)',
            fontFamily: fontsLoaded ? 'UbuntuBold' : 'System'
        },
        shadow: {
            shadowOffset: { width: -2, height: 5 },
            shadowColor: 'black',
            shadowOpacity: 0.5,
            elevation: 3,
            // background color must be set
            backgroundColor : "#0000" // invisible color
        },
        altButton: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 35,
            elevation: 3,
            borderWidth: 0,
            width: 200,
            height: 40,
            marginBottom: 20,
        },
        altButtonText: {
            fontSize: 13,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: 'rgb(135, 31, 31)',
            fontFamily: fontsLoaded ? 'UbuntuBold' : 'System'
        },
        shortInput: {
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            width: '49%',
            backgroundColor: 'white',
        },
        longInput: {
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            width: '100%',
            backgroundColor: 'white',
        },
        resetContainer: {
            backgroundColor: 'rgb(135, 31, 31)',
            flexDirection: 'column',
            alignItems: 'center',
            width: '80%',
            marginBottom: 20,
        },
        sideBySide: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
        },
    });
}