import { StyleSheet, ScrollView, StatusBar } from 'react-native';
import React from 'react';
// import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function MenuScreen() {
  return (
    <ScrollView style={styles.scroll_view}>
      <Text style={styles.header_title}>Menu</Text>
      {/* <HorizontalBanner text='Menu' /> */}
      <View style={styles.container}>
        <SectionSeparator />
        {MenuItems('Start with Rice', startWithRice)}
        <SectionSeparator />
        {MenuItems('Pick your Wrap', pickYourWrap)}
        <SectionSeparator />
        {MenuItems('Pick your Protein', pickYourProtein)}
        <SectionSeparator />
        {MenuItems('Make it your Own', makeItYourOwn)}
        <SectionSeparator />
        {MenuItems('Finish It', makeItYourOwn)}
        <HorizontalBanner text='**: asterisks' />
      </View>
    </ScrollView>
  );
}

type MenuEntry = {
  item: string;
  description: string;
  price: string;
}

const startWithRice: MenuEntry[] = [
  {item: 'White', description: '', price: ''},
  {item: 'Brown', description: '', price: ''},
];
const pickYourWrap: MenuEntry[] = [
  {item: 'Seaweed', description: 'Traditional wrap with hint of ocean', price: ''},
  {item: 'Soy', description: 'Soy', price: ''},
];
const pickYourProtein: MenuEntry[] = [
  {item: 'Tuna*', description: '', price: '8.50'},
  {item: 'Salmon', description: '', price: '8.50'},
  {item: 'Smoked Salmon*', description: '', price: '8.50'},
  {item: 'Dynamite Tuna', description: '', price: '8.50'},
  {item: 'Dynamite Salmon*', description: '', price: '8.50'},
  {item: 'Grilled Chicken', description: '', price: '7.50'},
  {item: 'Grilled Steak', description: '', price: '8'},
  {item: 'Crab Stick', description: '', price: '7.50'},
  {item: 'Spicy Crab Salad', description: '', price: '7.50'},
  {item: 'Tempura Shrimp', description: '', price: '8'},
  {item: 'Poached Shrimp', description: '', price: '8'},
  {item: 'Roasted Tofu**', description: '', price: '7.50'},
  {item: 'Veggie**', description: '', price: '7'},
];
const makeItYourOwn: MenuEntry[] = [
  {item: 'Asparagus', description: '', price: ''},
  {item: 'Avocado', description: '', price: ''},
  {item: 'Carrot', description: '', price: ''},
  {item: 'Cream Cheese', description: '', price: ''},
  {item: 'Cucumber', description: '', price: ''},
  {item: 'Green Onion', description: '', price: ''},
  {item: 'Jalapeno Pepper', description: '', price: ''},
  {item: 'Selection of the Moment', description: '', price: ''},
  {item: 'Spinach', description: '', price: ''},
];
const finishIt: MenuEntry[] = [
  {item: 'Sauces', description: 'Spicy Mayo, Wasabi Mayo, Sweet Chili Mayo, Sweet Soy (Eel Sauce), Sweet Chili, Sriracha, Sweet Orange Sauce, Spicy Soy', price: ''},
  {item: 'Toppings', description: 'Sesame Seeds, Tempura Crunch, Sesame Chili Flake, Everything Bagel Spice, Wasabi Pea Crunch, Chopped Peanuts, Fried Onions, Flamin Hot Cheeto Crunch', price: ''},
  {item: 'Masago', description: '', price: '1.50'},
  {item: 'Spicy Crab Salad', description: '', price: '2'},
];

function MenuItems(section_title: string, items: Array<MenuEntry>) {
  // firebase call for current hours / specific day hours here
  return (
    <View style={styles.menu_container}>
      <View style={styles.small_separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>{section_title}</Text>
      {items.map((item, index) => (
        <View key={index} style={styles.small_margin}>        
          {item.item ? <Text style={styles.item_item}>{item.item}</Text> : null}
          {item.description ? <Text style={styles.item_description}>{item.description}</Text> : null}
          {item.price ? <Text style={styles.item_price}>{item.price}</Text> : null}
        </View>
      ))}
    </View>
  );
}

interface Props {
  text: string;
}

const HorizontalBanner: React.FC<Props> = ({ text }) => {
  return (
    <View style={banner_styles.container}>
      <Text style={banner_styles.text}>{text}</Text>
    </View>
  );
};

const SectionSeparator = () => {
  return (
    <View
      style={{
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        width: '75%',
        alignSelf: 'center',
        paddingVertical: 10,
      }}
    />
  );
};

const banner_styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: 'rgb(135, 31, 31)',

    // fontSize: 30,
    // fontWeight: 'bold',
    paddingTop: StatusBar.currentHeight + 50,
    // paddingBottom: 40,
    // textAlign: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

const styles = StyleSheet.create({
  scroll_view: {
    paddingTop: StatusBar.currentHeight,
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
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: 30,
  },
  menu_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  small_margin: {
    marginBottom: 2,
  },
  title: {
    margin: 'auto',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 10,
  },
  item_item: {
    margin: 'auto',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  item_description: {
    margin: 'auto',
    fontSize: 12,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  item_price: {
    margin: 'auto',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  small_separator: {
    marginVertical: 2,
    height: 2,
    width: '60%',
  },
});
