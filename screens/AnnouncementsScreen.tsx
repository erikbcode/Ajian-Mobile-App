import {useState, useEffect} from 'react';
import React from 'react';
import {View, Image, Text, ScrollView,  } from 'react-native';
import { StyleSheet } from 'react-native';
import { database } from '../firebaseConfig';
import { ref, get, onValue, push, update, remove, Query} from 'firebase/database';

const dat = ref(database, `Announcements`);
const first = ref(database, `Announcements/1st`);
const second = ref(database, `Announcements/2nd`);
const third = ref(database, `Announcements/3rd`);
const fourth = ref(database, `Announcements/4th`);
const fifth = ref(database, `Announcements/5th`);


const AnnouncementsScreen = () => {

  var [Announcements, setAnnouncements] = useState([]);

  useEffect(() => {

  get (dat).then((snapshot) => {setAnnouncements(snapshot.val());})

  }, [Announcements])

  const keys: string[] = Object.keys(Announcements);
  const lookup = keys.map((key) => Number(key));

  return (
    <View>
      <View style = {styles.topBox}>
        <Text style = {[styles.topBoxText, styles.shadow]}>Current Announcements:</Text>
      </View>

      <ScrollView style = {styles.container}>
        {Array.from({ length: lookup.length }).map((_, index) => (
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
  )

}


const styles = StyleSheet.create({
  container: {
    borderColor: 'rgb(135, 31, 31)', 
    borderWidth: 5, 
    //borderTopWidth: 20,
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
    borderWidth: 50,
    borderColor: 'rgb(135, 31, 31)'
  }
});

export default AnnouncementsScreen;