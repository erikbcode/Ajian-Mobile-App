import {useState, useEffect} from 'react';
import React from 'react';
import {View, Image, Text, ScrollView,  } from 'react-native';
import { StyleSheet } from 'react-native';
import { database } from '../firebaseConfig';
import { ref, get, onValue, push, update, remove, Query} from 'firebase/database';


const first = ref(database, `Announcements/1st`);
const second = ref(database, `Announcements/2nd`);
const third = ref(database, `Announcements/3rd`);
const fourth = ref(database, `Announcements/4th`);
const fifth = ref(database, `Announcements/5th`);


const SocialScreen = () => {

  var [Announcements, setAnnouncements] = useState<String[]>([]);

  useEffect(() => {
  
    function pushRows(which: Query) {

      get(which).then((snapshot) => {
        Announcements.push(snapshot.val());
        setAnnouncements(Announcements);
      })
    }

    if (Announcements.length < 5) 
    {
      pushRows(first);
      pushRows(second);
      pushRows(third);
      pushRows(fourth);
      pushRows(fifth);
    }


  })

  console.log(Announcements);


  return (
    <ScrollView style = {styles.container}>

      <View style = {styles.tweetBox}>
        <Text style = {styles.text}>
          {Announcements[0]}
        </Text>
      </View>

      <View style = {styles.tweetBox}>
        <Text style = {styles.text}>
          {Announcements[1]}
        </Text>
      </View>

      <View style = {styles.tweetBox}>
        <Text style = {styles.text}>
          {Announcements[2]}
        </Text>
      </View>

      <View style = {styles.tweetBox}>
        <Text style = {styles.text}>
          {Announcements[3]}
        </Text>
      </View>

      <View style = {styles.tweetBox}>
        <Text style = {styles.text}>
          {Announcements[4]}
        </Text>
      </View>






    </ScrollView>


)}


const styles = StyleSheet.create({
  container: {
    borderColor: 'rgb(135, 31, 31)', 
    borderWidth: 5, 
    backgroundColor: 'rgb(135, 31, 31)'  
  },

  text: {
  fontFamily: 'Aboreto',
  fontSize: 20, 
  textAlign: 'center',
  backgroundColor: 'rgb(254, 251, 234)'
  },

  title: {
    fontFamily: 'Times New Roman',
    fontSize: 12, 
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgb(254, 251, 234)'
    },

  tweetBox: {
    borderColor: 'rgb(135, 31, 31)', 
    borderWidth: 25
  }
});

export default SocialScreen;