import {useState, useEffect, useContext } from 'react';
import React from 'react';
import { View, Image, Text, Animated } from 'react-native';
import MobileOrderButton from '../components/MobileOrderButton';
import SocialOpenButton from '../components/SocialOpenButton';

import { useHomeStyles } from '../styles/HomeScreenStyles';

const HomeScreen = () => {
  const styles = useHomeStyles();
  const [fadeAnim] = useState(new Animated.Value(0));  // Initial value for opacity: 0

  // Load in fonts and fade in content when page renders
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true
    }).start();
  }, []);

  // If fonts are loaded properly, display the home screen 
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
              source={require('../assets/images/ajian-logo-small.jpg')}
              style={styles.logoStyle}
            />
          </View>
        </View>
      </Animated.View>
      <Animated.View 
        style={{
          opacity: fadeAnim,
        }}
      >
        <View style={styles.shadow}>
          <Text style={styles.welcomeText}>Ajian</Text>
        </View>

      </Animated.View>
      <View style = {styles.socialButtonContainer}>
        {SocialOpenButton("twitter")}
        {SocialOpenButton("insta")}

        </View>
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
};

export default HomeScreen;