import {useState, useEffect } from 'react';
import React from 'react';
import { View, Image, Text, Animated } from 'react-native';
import { StyleSheet } from 'react-native';
import MobileOrderButton from '../components/MobileOrderButton';
import * as Font from 'expo-font';

const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Home')
  const [fontsLoaded, setFontsLoaded] = useState(false)

  const loadFont = async () => {

    try {
      await Font.loadAsync({
        'Ubuntu': require('../styles/fonts/Ubuntu-Regular.ttf'),
        'UbuntuBold': require('../styles/fonts/Ubuntu-Bold.ttf'),
        'Aboreto': require('../styles/fonts/Aboreto-Regular.ttf')
      });
      setFontsLoaded(true);
    }
    catch (error) {
      console.error(error);
    }
  };


  const [fadeAnim] = useState(new Animated.Value(0));  // Initial value for opacity: 0


  useEffect(() => {
    loadFont();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true
    }).start();
  }, []);


  if (fontsLoaded) {
    return (
      <View style={styles.container}>
        <Animated.View 
          style={{
            opacity: fadeAnim,
          }}
        >
          <View style={styles.shadow}>
            <View style={styles.logoSymbol}>
              <Image
                source={require('../images/ajian-logo-small.jpg')}
                style={styles.logoStyle}
              />
            </View>
          </View>
        </Animated.View>
        <Text style={styles.welcomeText}>Ajian</Text>
        <Animated.View 
          style={{
            opacity: fadeAnim,
          }}
        >
          <View style={styles.shadow}>
            <MobileOrderButton />
          </View>
        </Animated.View>
      </View>
    );
  }

  return (
    <View>
      <Text>Test</Text>
    </View>

  )

};

const styles = StyleSheet.create({
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
    fontFamily: 'Aboreto',
    fontSize: 60,
  },
});

export default HomeScreen;