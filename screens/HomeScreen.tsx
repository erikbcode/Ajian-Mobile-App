import {useState} from 'react';
import React from 'react';
import { View, Image, Text } from 'react-native';
import MobileOrderButton from '../components/MobileOrderButton';
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'


const HomePage = () => {
  const [fontLoaded, setFontLoaded] = useState(false)

  async function loadFont() {
    try {
      await Font.loadAsync({
        'Ubuntu': require('../styles/fonts/Ubuntu-Regular.ttf'),
        'UbuntuBold': require('../styles/fonts/Ubuntu-Bold.ttf'),
        'Aboreto': require('../styles/fonts/Aboreto-Regular.ttf')
      });
      setFontLoaded(true);
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    loadFont();
  }, []);

  return (
    <View style={{ flex: 1, height: '100%', width: '100%', backgroundColor: 'white'}}>
      <Image
        source={require('../images/marble-background.jpg')}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          resizeMode: 'cover',
        }}
      />
      <View style={{ aspectRatio: 1280/854 }}>
        <Image
          style={{ flex: 1, alignSelf: 'center' }}
          source={
            require('../images/sushi2.jpg')}
          resizeMode='contain'
        />
      </View>
      <View style={{ flex: 1, padding: 16, alignContent: 'center', alignItems: 'center', }}>
        <Text style={{ fontSize: 36, fontWeight: 'bold', color: 'rgb(135, 31, 31)', fontFamily: 'Aboreto' }}>
          Welcome to Ajian
        </Text>
        <Text style={{ fontSize: 16, fontFamily: 'Ubuntu', textAlign: 'center', marginTop: 20}}>
        You pick the rice, you pick the wrap, you pick the ingredients, the sauces and the toppings to create a roll that yours! When you're all done, “You’re on a Roll!”
        </Text>
      </View>
      <View style={{ flex: 1, padding: 16, alignContent: 'center', alignItems: 'center'}}>
        <MobileOrderButton />
      </View>
    </View>
  );
};

export default HomePage;