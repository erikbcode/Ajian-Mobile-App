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
      <MobileOrderButton />
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
