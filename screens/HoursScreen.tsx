import { StyleSheet, ScrollView, StatusBar } from 'react-native';
import React, { useState } from 'react';
import Map from '../components/Map'
// import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import MobileOrderButton from '../components/MobileOrderButton';
import { database } from '../firebaseConfig';
import { onValue, ref, update} from 'firebase/database';
import * as Font from 'expo-font';

const loadFont = async () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
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
// Function to add two numbers in 

const styles = StyleSheet.create({
  address: {
    // fontFamily: 'Ubuntu',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 50,
  },
  scroll_background: {
    backgroundColor: 'rgb(135, 31, 31)',
    marginBottom: 0,
  },
  header_title: {
    // fontFamily: 'georgia',
    fontFamily: 'Ubuntu',
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    paddingTop: StatusBar.currentHeight + 50,
    // paddingBottom: 40,
    textAlign: 'center',
    // borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 400,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    zIndex: 1,

  },
  hours_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 50,
  },
  title: {
    fontFamily: 'Ubuntu',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 15,
  },
  day_margin: {
    marginBottom: 2,
  },
  day_title: {
    fontFamily: 'Ubuntu',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  hours: {
    fontFamily: 'Ubuntu',
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  separator: {
    marginVertical: 5,
    height: 2,
    width: '80%',
  },
});
