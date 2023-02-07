import { StyleSheet } from 'react-native';
import React, {createContext, useContext, useState, useEffect} from 'react';
import * as Font from 'expo-font';

interface FontContextProps {
  fontLoaded: boolean;
  setFontLoaded: (value: boolean) => void;
}

export const FontContext = React.createContext<FontContextProps>({
  fontLoaded: false,
  setFontLoaded: () => {},
});

export const FontProvider = (props) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        'Ubuntu': require('../styles/fonts/Ubuntu-Regular.ttf')
      });
      await Font.loadAsync({
        'UbuntuBold': require('../styles/fonts/Ubuntu-Bold.ttf')
      });
      await Font.loadAsync({
        'Aboreto': require('../styles/fonts/Aboreto-Regular.ttf')
      });
      setFontLoaded(true);
    };
    loadFont();
  }, []);

  return (
    <FontContext.Provider value={{ fontLoaded, setFontLoaded }}>
      {props.children}
    </FontContext.Provider>
  );
};