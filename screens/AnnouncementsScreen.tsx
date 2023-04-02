import {useState, useEffect} from 'react';
import React from 'react';
import {View, Image, Text, ScrollView,  } from 'react-native';
import { StyleSheet } from 'react-native';
import { database } from '../firebaseConfig';
import { ref, get, onValue, push, update, remove, Query} from 'firebase/database';

const dat = ref(database, `Announcements`);

const AnnouncementsScreen = () => {

  //Variable to store announcement key/value pairs
  var [Announcements, setAnnouncements] = useState([]);

  //Maintain variable
  useEffect(() => {

    //Retrieve the data from firebase
    get (dat).then((snapshot) => {
      setAnnouncements(snapshot.val());
    })

  }, [Announcements])

  //Retuns a list of all keys pulled from Firebase as an array of strings
  if (Announcements.length != 1) {
    
    const keys: string[] = Object.keys(Announcements);

  //Convert the strings into numbers for use in indexing
    const lookup = keys.map((key) => Number(key));
   

  return (
    <View style = {styles.background}>
      <View style = {styles.topBox}>
        <Text style = {[styles.topBoxText, styles.shadow]}>Announcements</Text>
      </View>

      <ScrollView style = {styles.container}>{

        //Loop through all announcements and build a display box for each
        Array.from({ length: lookup.length - 1 }).map((_, index) => (
        <View style={styles.announceBox} key={index}>
          <Text style={[styles.text, styles.textboxShadow]}>
            {Announcements[lookup[lookup.length - index - 1]]}
          </Text>
        </View>
        ))}
      <View style = {styles.bottomView}>

      </View>
      </ScrollView>
    </View>
  )}

  else {
    return(
      <View style = {styles.background}>
      <View style = {styles.topBox}>
        <Text style = {[styles.topBoxText, styles.shadow]}>Announcements</Text>
      </View>

      <ScrollView style = {styles.container}>
      <View style={styles.announceBox}>
          <Text style={[styles.text, styles.textboxShadow]}>
           There aren't currently any announcements. Check back later!
          </Text>
        </View>
      <View style = {styles.bottomView}>
      </View>
      </ScrollView>
    </View>

    )
  }


}


const styles = StyleSheet.create({
  container: {
    borderColor: 'rgb(135, 31, 31)', 
    borderWidth: 5, 
    backgroundColor: 'rgb(135, 31, 31)'  
  },

  text: {
  fontFamily: 'Times New Roman',
  fontSize: 25, 
  textAlign: 'center',
  backgroundColor: 'white',
  borderColor: 'white',
  borderWidth: 20
  },

  topBoxText: {
    fontFamily: 'Times New Roman',
    fontSize: 30,
    backgroundColor: 'rgb(135, 31, 31)',
    color: 'white',
    paddingTop: 30,
    textAlign: 'center'
  },

  shadow: {
    shadowOffset: { width: -2, height: 5 },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    elevation: 3,
    // background color must be set
    backgroundColor : "#0000" // invisible color
  },

  textboxShadow: {
    shadowOffset: { width: -2, height: 5 },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    elevation: 3,
  },

  announceBox: {
    borderColor: 'rgb(135, 31, 31)', 
    borderWidth: 25
  },

  topBox: {
    padding: 30,
    backgroundColor: 'rgb(135, 31, 31)',

  },

  bottomView: {
    borderWidth: 250,
    borderColor: 'rgb(135, 31, 31)'
  },

  background: {
    backgroundColor: 'rgb(135, 31, 31)'
  }
});

export default AnnouncementsScreen;