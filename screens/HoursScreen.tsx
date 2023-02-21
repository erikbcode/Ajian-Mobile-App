import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import MobileOrderButton from '../components/MobileOrderButton';
export default function HoursScreen({ navigation }: RootTabScreenProps<'Hours'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hours & Location</Text>
      <Text>Testing branch functionality</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Hours />
      <MobileOrderButton />
    </View>
  );
}

function Hours() {
  // firebase call for current hours / specific day hours here
  const dayHours = [
    {title: 'Monday', text: '11:00AM - 8:00PM'},
    {title: 'Tuesday', text: '11:00AM - 8:00PM'},
    {title: 'Wednesday', text: '11:00AM - 8:00PM'},
    {title: 'Thursday', text: '11:00AM - 8:00PM'},
    {title: 'Friday', text: '11:00AM - 8:00PM'},
    {title: 'Saturday', text: '11:00AM - 8:00PM'},
    {title: 'Sunday', text: '11:00AM - 8:00PM'},
  ];

  return (
    <View style={styles.container}>
      {dayHours.map((item, index) => (
        <View key={index} style={styles.day_margin}>
          <Text style={styles.day_title}>{item.title}</Text>
          <Text style={styles.day_title}>{item.text}</Text>
        </View>
      ))}
    </View>
  );
}
// Function to add two numbers in 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  day_margin: {
    marginBottom: 2,
  },
  day_title: {
    fontSize: 12,
    fontWeight: 'normal',
  },
  hours: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 5,
    height: 1,
    width: '80%',
  },
});
