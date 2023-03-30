import {  ScrollView } from 'react-native';
import React, { useState } from 'react';
import Map from '../components/Map'
// import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import MobileOrderButton from '../components/MobileOrderButton';
import { database, get } from '../firebaseConfig';
import { onValue, ref, update} from 'firebase/database';
import { styles } from '../styles/HoursScreenStyle';

import { OpenHours } from '../types';

const days: Array<string> = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'] 

export default function HoursScreen({ navigation }: RootTabScreenProps<'Hours'>) {
  return (
    <ScrollView style={styles.scroll_background}>
      <Map />
      <Text style={styles.header_title}>
        Hours & Location {'\n'} {'\n'}
        <Text style={styles.address}>
          1914 University Blvd, {'\n'}
          Tuscaloosa, AL 35401 {'\n'}
          205-331-4542
        </Text>  
      </Text>
      
      <View style={styles.container}>
        <Hours />
        <View style={{paddingBottom: 50}}>
          <MobileOrderButton />
        </View>
      </View>
    </ScrollView>
  );
}

function readHours(day : string) {
  const query = ref(database, `hours/${day}`);
  let val : OpenHours = {day: 'Day', start_hour: 11, start_minute: '00', end_hour: 8, end_minute: '00'};
  get(query).then((snapshot:any) => {
    if (snapshot.exists()) {
      val = snapshot.val();
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error:any) => {
    console.error(error);
  });
  return val;
}

function Hours() {
// firebase call for current hours / specific day hours here
  let dayHours: Array<OpenHours> = []
  for (let day of days) {
    dayHours.push(readHours(day));
  }

  // const dayHours = [
  //   {day: 'Monday', start_hour: 11, start_minute: 0, end_hour: 8, end_minute: 0},
  //   {day: 'Tuesday', start_hour: 11, start_minute: 0, end_hour: 8, end_minute: 0},
  //   {day: 'Wednesday', start_hour: 11, start_minute: 0, end_hour: 8, end_minute: 0},
  //   {day: 'Thursday', start_hour: 11, start_minute: 0, end_hour: 8, end_minute: 0},
  //   {day: 'Friday', start_hour: 11, start_minute: 0, end_hour: 8, end_minute: 0},
  //   {day: 'Saturday', start_hour: 11, start_minute: 0, end_hour: 8, end_minute: 0},
  //   {day: 'Sunday', start_hour: 11, start_minute: 0, end_hour: 8, end_minute: 0},
  // ];

  return (
    <View style={styles.hours_container}>
      {dayHours.map((item, index) => (
        <View key={index} style={styles.day_margin}>
          <Text style={styles.day_title}>{item.day}</Text>
          <Text style={styles.hours}>{`${item.start_hour}:${item.start_minute}AM - ${item.end_hour}:${item.end_minute}PM`}</Text>
        </View>
      ))}
    </View>
  );
}


