import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function MenuScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      {MenuItems('Start with Rice', startWithRice)}
      {MenuItems('Pick your Wrap', pickYourWrap)}
      {MenuItems('Pick your Protein', pickYourProtein)}
      {MenuItems('Make it your Own', makeItYourOwn)}
      {MenuItems('Finish It', makeItYourOwn)}
    </View>
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
    <View style={styles.container}>
      <View style={styles.small_separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>{section_title}</Text>
      {items.map((item, index) => (
        <View key={index} style={styles.small_margin}>
          <Text style={styles.item_item}>{item.item}</Text>
          <Text style={styles.item_description}>{item.description}</Text>
          <Text style={styles.item_price}>{item.price}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  small_margin: {
    marginBottom: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  item_item: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  item_description: {
    fontSize: 12,
    fontWeight: 'normal',
  },
  item_price: {
    fontSize: 12,
    fontWeight: 'bold',
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
