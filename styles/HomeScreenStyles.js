import { StyleSheet} from 'react-native';
import { useContext } from 'react';
import { FontContext } from '../context/FontContext';

export const useHomeStyles = () => {
    const fontsLoaded = useContext(FontContext);

    return StyleSheet.create({
        container: {
          flex: 1,
          flexBasis: 'auto',
          backgroundColor: 'rgb(135, 31, 31)',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'column',
          spaceEvenly: 'true'
        },
        logoStyle: {
          width: 175,
          height: 175,
          backgroundColor: 'white',
        },
        logoSymbol: {
          top: 50,
          width: 225,
          height: 225,
          borderRadius: 225/2,
          overflow: 'hidden',
          backgroundColor: 'white',
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        },
        shadow: {
          shadowOffset: { width: -2, height: 5 },
          shadowColor: 'black',
          shadowOpacity: 0.5,
          elevation: 3,
          // background color must be set
          backgroundColor : "#0000" // invisible color
        },
        welcomeText: {
          fontFamily: fontsLoaded ? 'Aboreto' : 'System',
          fontSize: 60,

        },

        socialButtonContainer: {
          width: 150,
          height: 60,
          flexDirection: 'row', 
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 10,
        }
      });
}