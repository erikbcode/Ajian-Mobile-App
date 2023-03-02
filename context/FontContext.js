import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';

export const FontContext = React.createContext(null);

export const FontProvider = ({ children }) => {
    const [loaded, setLoaded] = useState(false);

    const loadFonts = async () => {
        try {
            await Font.loadAsync({
              'Ubuntu': require('../styles/fonts/Ubuntu-Regular.ttf'),
              'UbuntuBold': require('../styles/fonts/Ubuntu-Bold.ttf'),
              'Aboreto': require('../styles/fonts/Aboreto-Regular.ttf')
            });
            setLoaded(true);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadFonts();
    }, []);

    if (!loaded) {
        return null; // or is a loading indicator
    }
    
    return (
        <FontContext.Provider value={loaded}>
          {loaded ? children : null}
        </FontContext.Provider>
    );
}