import { StyleSheet, ScrollView, Button, Pressable} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View} from '../components/Themed';
import { RootTabScreenProps } from '../types';
import MobileOrderButton from '../components/MobileOrderButton';
import RedirectButton from '../components/RedirectButton';
import navButtonStyles from '../styles/NavButtonStyle';
import { usePreventRemoveContext } from '@react-navigation/native';
import { PROPERTY_TYPES } from '@babel/types';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Ajian</Text>
        <MobileOrderButton></MobileOrderButton>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Text style={styles.title}>What is Sushi?</Text>
        <Text style={styles.body}>Sushi is the Japanese preparation and serving of specially prepared vinegared rice combined with varied ingredients.</Text>
        <Text style={styles.body}>Sushi can be prepared with either brown or white rice. It is often prepared with raw seafood, but some common varieties of sushi use cooked ingredients, and many other sorts are vegetarian.</Text>
        <Text style={styles.body}>Sushi is often confused with sashimi, a related Japanese dish consisting of thinly sliced raw fish or occasionally meat, and an optional serving of rice. Sashimi is served as slices, unlike sushi, which is served as oval-shaped rolls. The Japanese word for this roll is Maki. Which is why, at Ajian, we like to say “Maki Tide”</Text> 
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Text style={styles.title}>Come Visit</Text>
        <Text style={styles.body}>Hello Tuscaloosa! We're here! Come for a fresh new take on the sushi roll!</Text>
        <RedirectButton navigation={navigation} screen="Hours" buttonText="Find Us" />
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Text style={styles.title}>Check Our Menu</Text>
        <Text style={styles.body}>You pick the rice, you pick the wrap, you pick the ingredients, the sauces and the toppings to create a roll that yours! When you're all done, “You’re on a Roll!”</Text>
        <Pressable style={({pressed}) => [
            pressed ? navButtonStyles.buttonPressed : navButtonStyles.buttonUnpressed,
          ]}
          onPress={() => navigation.navigate('Menu')}>
          {({pressed}) => (
            <Text style={navButtonStyles.text}>Menu</Text>
        )}
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'center',
    marginBottom: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },

});
