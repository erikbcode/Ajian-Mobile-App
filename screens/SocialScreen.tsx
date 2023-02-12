import {useState} from 'react';
import React from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
import MobileOrderButton from '../components/MobileOrderButton';
import { StyleSheet } from 'react-native';

const SocialScreen = () => {
  return (
    <ScrollView style = {styles.container}>

    <View>
      <Text>
        {'\n'}
        {'\n'}
        {'\n'}
        {'\n'}
      </Text>
      <Text style = {styles.words}> Testing</Text>
    </View>
 
    <View>
      {

        <MobileOrderButton />

      }
    </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(135, 31, 31)',
  },

  words: {
  fontFamily: 'Aboreto',
  fontSize: 60, 
  textAlign: 'center',
  },
});

export default SocialScreen;