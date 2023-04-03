import {  ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import Map from '../components/Map'
// import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import MobileOrderButton from '../components/MobileOrderButton';
import { database } from '../firebaseConfig';
import { onValue, ref, get } from 'firebase/database';
import { styles } from '../styles/HoursScreenStyle';

import { OpenHours } from '../types';

async function readHours(day : string) {
  const query = ref(database, `hours/${day}`);
  let val : OpenHours = {day: 'Day', start_hour: 11, start_minute: '00', end_hour: 8, end_minute: '00'};
  val = await get(query).then((snapshot:any) => {
    if (snapshot.exists()) {
      val = snapshot.val();
      console.log(snapshot.val());
      return val;
    } else {
      console.log("No data available");
      return val;
    }
  }).catch((error:any) => {
    console.error(error);
    return val;
  });
  return val
}

export default function HoursScreen({ navigation }: RootTabScreenProps<'Hours'>) {
  const [dayHours, setDayHours] = useState([{day: 'Day', start_hour: 11, start_minute: '00', end_hour: 8, end_minute: '00'}]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDayHours() {
      const days: Array<string> = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
      let dayHours: Array<OpenHours> = []
      for (let day of days) {
        const val = await readHours(day)
        // console.log(val)
        dayHours.push(val)
      }
      setDayHours(dayHours)
      setIsLoading(false)
    }
    fetchDayHours()
  }, []);

  if (isLoading) {
    return <View><Text>Loading Data...</Text></View>
  }
  // const dayHours = [ // for debugging
  //   {day: 'Monday', start_hour: 11, start_minute: '00', end_hour: 8, end_minute: '00'},
  //   {day: 'Tuesday', start_hour: 11, start_minute: '00', end_hour: 8, end_minute: '00'},
  //   {day: 'Wednesday', start_hour: 11, start_minute: '00', end_hour: 8, end_minute: '00'},
  //   {day: 'Thursday', start_hour: 11, start_minute: '00', end_hour: 8, end_minute: '00'},
  //   {day: 'Friday', start_hour: 11, start_minute: '00', end_hour: 8, end_minute: '00'},
  //   {day: 'Saturday', start_hour: 11, start_minute: '00', end_hour: 8, end_minute: '00'},
  //   {day: 'Sunday', start_hour: 11, start_minute: '00', end_hour: 8, end_minute: '00'},
  // ];
  return (
    <ScrollView style={styles.scrollContainer}>
      <Map />
      <Text style={[styles.parentText, styles.headerText]}>
        Hours & Location {'\n'} {'\n'}
        <Text style={[styles.parentText, styles.addressText]}>
          1914 University Blvd, {'\n'}
          Tuscaloosa, AL 35401 {'\n'}
          205-331-4542
        </Text>  
      </Text>
      
      <View style={[styles.containerParent, styles.dayContainer]}>
        {Hours(dayHours)}
        <View style={{marginBottom: 50}}>
          <MobileOrderButton />
        </View>
      </View>
    </ScrollView>
  );
}

function Hours(dayHours : Array<OpenHours>) {
  // console.log('Entered Hours')
  // console.log(dayHours[0].day)
  return (
    // <View style={[styles.containerParent, styles.hoursContainer]}>
    <View style={styles.containerParent}>
      {dayHours.map(item => (
        <View key={item.day} style={styles.dayMargin}>
          <Text style={[styles.parentText, styles.dayText]}>{item.day}</Text>
          <Text style={[styles.parentText, styles.hoursText]}>{`${item.start_hour}:${item.start_minute}AM - ${item.end_hour}:${item.end_minute}PM`}</Text>
        </View>
      ))}
    </View>
  );
}



