import { StyleSheet, ScrollView, StatusBar } from 'react-native';
import React, { useState } from 'react';
import Map from '../components/Map'
// import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import MobileOrderButton from '../components/MobileOrderButton';
import { database } from '../firebaseConfig';
import { onValue, ref, update} from 'firebase/database';

export default function HoursScreen({ navigation }: RootTabScreenProps<'Hours'>) {
  return (
    <ScrollView style={styles.scroll_background}>
      <Map />
      <Text style={styles.header_title}>Hours & Location</Text>
      <View style={styles.container}>
        <Hours />
        <View style={{paddingBottom: 50}}>
          <MobileOrderButton />
        </View>
      </View>
    </ScrollView>
  );
}

const days: Array<string> = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'] 

type OpenHours = {
  day: string;
  start_hour: number;
  start_minute: string;
  end_hour: number;
  end_minute: string;
  // include AM/PM bool
};

function SetDefaultHours() {
  for (let day of days) {
    update(ref(database, `hours/${day}`), {day: day, start_hour: 11, start_minute: '00', end_hour: 8, end_minute: '00'})
  }
};

function Hours() {
  // firebase call for current hours / specific day hours here
  SetDefaultHours()
  let dayHours: OpenHours[] = []
  for (let day of days) {
    const dbRef = ref(database, `hours/${day}`)
    onValue(dbRef, (snapshot) => {
      dayHours.push(snapshot.val());
      // console.log(snapshot.val())
    });
  }

  // const dayHours = [
  //   {title: 'Monday', text: '11:00AM - 8:00PM'},
  //   {title: 'Tuesday', text: '11:00AM - 8:00PM'},
  //   {title: 'Wednesday', text: '11:00AM - 8:00PM'},
  //   {title: 'Thursday', text: '11:00AM - 8:00PM'},
  //   {title: 'Friday', text: '11:00AM - 8:00PM'},
  //   {title: 'Saturday', text: '11:00AM - 8:00PM'},
  //   {title: 'Sunday', text: '11:00AM - 8:00PM'},
  // ];

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
// Function to add two numbers in 

const styles = StyleSheet.create({
  scroll_background: {
    backgroundColor: 'rgb(135, 31, 31)',
    marginBottom: 0,
  },
  header_title: {
    // fontFamily: 'georgia',
    fontSize: 40,
    fontWeight: 'bold',
    paddingTop: StatusBar.currentHeight + 50,
    paddingBottom: 40,
    textAlign: 'center',
    backgroundColor: 'rgb(135, 31, 31)',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    marginBottom: 400,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hours_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 15,
  },
  day_margin: {
    marginBottom: 2,
  },
  day_title: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  hours: {
    fontSize: 10,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  separator: {
    marginVertical: 5,
    height: 2,
    width: '80%',
  },
});
