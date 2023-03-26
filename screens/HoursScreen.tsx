import {  ScrollView } from 'react-native';
import React, { useState } from 'react';
import Map from '../components/Map'
// import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import MobileOrderButton from '../components/MobileOrderButton';
import { database } from '../firebaseConfig';
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

// function SetDefaultHours() {
//   for (let day of days) {
//     update(ref(database, `hours/${day}`), {day: day, start_hour: 11, start_minute: '00', end_hour: 8, end_minute: '00'})
//   }
// };
// SetDefaultHours()

function Hours() {
  // firebase call for current hours / specific day hours here
  // let dayHours: OpenHours[] = []
  // for (let day of days) {
  //   const dbRef = ref(database, `hours/${day}`)
  //   onValue(dbRef, (snapshot) => {
  //     dayHours.push(snapshot.val());
  //     // console.log(snapshot.val())
  //   });
  // }

  const dayHours = [
    {day: 'Monday', start_hour: 11, start_minute: 0, end_hour: 8, end_minute: 0},
    {day: 'Tuesday', start_hour: 11, start_minute: 0, end_hour: 8, end_minute: 0},
    {day: 'Wednesday', start_hour: 11, start_minute: 0, end_hour: 8, end_minute: 0},
    {day: 'Thursday', start_hour: 11, start_minute: 0, end_hour: 8, end_minute: 0},
    {day: 'Friday', start_hour: 11, start_minute: 0, end_hour: 8, end_minute: 0},
    {day: 'Saturday', start_hour: 11, start_minute: 0, end_hour: 8, end_minute: 0},
    {day: 'Sunday', start_hour: 11, start_minute: 0, end_hour: 8, end_minute: 0},
  ];

  return (
    <View style={styles.hours_container}>
      {dayHours.map((item, index) => (
        <View key={index} style={styles.day_margin}>
          <Text style={styles.day_title}>{item.day}</Text>
          <Text style={styles.hours}>{`${item.start_hour}:00AM - ${item.end_hour}:00PM`}</Text>
        </View>
      ))}
    </View>
  );
}


