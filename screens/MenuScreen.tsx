import { StyleSheet, ScrollView, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { onValue, ref, set, get} from 'firebase/database';
import { database } from '../firebaseConfig';
// import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useFonts } from 'expo-font';

import { MenuEntry } from '../types';
import { styles, banner_styles } from '../styles/MenuScreenStyle'

export default function MenuScreen() {
  const [fontsLoaded] = useFonts({
    'Ubuntu': require('../styles/fonts/Ubuntu-Regular.ttf'),
    'UbuntuBold': require('../styles/fonts/Ubuntu-Bold.ttf'),
  });

  return (
    <ScrollView style={styles.scroll_view}>
      <Text style={styles.header_title}>Menu</Text>
      {/* <HorizontalBanner text='Menu' /> */}
      <Tabs />
      {/* <TabText /> */}
    </ScrollView>
  );
}

function Tabs() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
  }; 

  return (
    <View style={styles.tab_container}>
      <View style={styles.tab_style}>
        <TouchableOpacity style={styles.tab_button} key={1} onPress={() => handleTabClick(0)}><Text style={activeTab === 0 ? styles.tab_text : styles.tab_text_selected}>Roll Options</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tab_button} key={2} onPress={() => handleTabClick(1)}><Text style={activeTab === 1 ? styles.tab_text : styles.tab_text_selected}>Rolls</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tab_button} key={3} onPress={() => handleTabClick(2)}><Text style={activeTab === 2 ? styles.tab_text : styles.tab_text_selected}>Sides</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tab_button} key={4} onPress={() => handleTabClick(3)}><Text style={activeTab === 3 ? styles.tab_text : styles.tab_text_selected}>Rice</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tab_button} key={5} onPress={() => handleTabClick(4)}><Text style={activeTab === 4 ? styles.tab_text : styles.tab_text_selected}>Drinks</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tab_button} key={6} onPress={() => handleTabClick(5)}><Text style={activeTab === 5 ? styles.tab_text : styles.tab_text_selected}>Nutrition</Text></TouchableOpacity>
      </View>
      <View style={styles.tab_content}>
        {activeTab === 0 && youreOnARollTab()}
        {activeTab === 1 && suggestedRollsTab()}
        {activeTab === 2 && sidesTab()}
        {activeTab === 3 && friedRiceTab()}
        {activeTab === 4 && drinksTab()}
        {activeTab === 5 && nutritionTab()}
    </View>
    </View>
  );
};

function MenuItems(section_title: string, items: Array<MenuEntry>) {
  // firebase call for current hours / specific day hours here
  return (
    <View style={styles.menu_container}>
      {/* <View style={styles.small_separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
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

// function readMenuDB(db_loc: string) {
//   const query = ref(database, `menu/${db_loc}`)
//   let val : MenuEntry
//   onValue(query, (snapshot) => {
//     val = snapshot.val()
//   })
//   console.log(val)
//   return val
// }

function readMenuDB(db_loc : string) {
  const query = ref(database, `menu/${db_loc}`);
  let val : Array<MenuEntry> | null=null;
  get(query).then((snapshot) => {
    if (snapshot.exists()) {
      val = snapshot.val();
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
  return val;
}

interface Props {
  text: string;
}

// get(ref(database, 'menu/youreOnARoll/rice'))
// get(ref(database, 'menu/youreOnARoll/wrap'))
// get(ref(database, 'menu/youreOnARoll/protein'))
// get(ref(database, 'menu/youreOnARoll/additional'))
// get(ref(database, 'menu/youreOnARoll/finish'))

const youreOnARollTab = () => {
  return (
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
      {MenuItems('Finish It', finishIt)}
      <SectionSeparator />
      <HorizontalBanner text='Double Up: +$3 | *Raw Protein | **Vegan Option'/>
    </View>
  );
};

// get(ref(database, 'menu/suggested'))
// get(ref(database, 'menu/sides'))
// get(ref(database, 'menu/rice'))
// get(ref(database, 'menu/drinks'))
// get(ref(database, 'menu/nutrition'))

const suggestedRollsTab = () => {
  return (
    <View style={styles.container}>
      <SectionSeparator />
      {MenuItems('Suggested Rolls', suggestedRolls)}
      <SectionSeparator />
      <HorizontalBanner text='*Consuming raw or undercooked meats, poultry, seafood, shellfish, eggs or unpasteurized milk may increase your risk of foodborne illness' />
    </View>
  );
};

const sidesTab = () => {
  return (
    <View style={styles.container}>
      <SectionSeparator />
      {MenuItems('Sides', sides)}
      <SectionSeparator />
      <HorizontalBanner text='' />
    </View>
  );
};

const friedRiceTab = () => {
  return (
    <View style={styles.container}>
      <SectionSeparator />
      {MenuItems('Fried Rice', friedRice)}
      <SectionSeparator />
      <HorizontalBanner text='All fried rice comes with carrot, jalapeno, green onion, asparagus, cabbage, edamame and egg' />
    </View>
  );
};

const drinksTab = () => {
  return (
    <View style={styles.container}>
      <SectionSeparator />
      {MenuItems('Drinks', drinks)}
      <SectionSeparator />
      <HorizontalBanner text='' />
    </View>
  );
};

const nutritionTab = () => {
  return (
    <View style={styles.container}>
      <SectionSeparator />
      {MenuItems('Nutrition', nutrition)}
      <SectionSeparator />
      <HorizontalBanner text='All nutritional information is estimated based on desired portions and is subject to variation' />
    </View>
  );
};

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
        // paddingVertical: 10,
      }}
    />
  );
};

// You're on a Roll
// rice
const startWithRice: MenuEntry[] = [
  {item: 'White', description: '', price: ''},
  {item: 'Brown', description: '', price: ''},
];
// wrap
const pickYourWrap: MenuEntry[] = [
  {item: 'Seaweed', description: 'Traditional wrap with hint of ocean', price: ''},
  {item: 'Soy', description: 'Soy', price: ''},
];
// protein
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
// additional
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
// finish
const finishIt: MenuEntry[] = [
  {item: 'Sauces', description: 'Spicy Mayo, Wasabi Mayo, Sweet Chili Mayo, Sweet Soy (Eel Sauce), Sweet Chili, Sriracha, Sweet Orange Sauce, Spicy Soy', price: ''},
  {item: 'Toppings', description: 'Sesame Seeds, Tempura Crunch, Sesame Chili Flake, Everything Bagel Spice, Wasabi Pea Crunch, Chopped Peanuts, Fried Onions, Flamin Hot Cheeto Crunch', price: ''},
  {item: 'Masago', description: '', price: '1.50'},
  {item: 'Spicy Crab Salad', description: '', price: '2'},
];

// Suggested
const suggestedRolls: MenuEntry[] = [
  {item: 'California Roll', description: 'Your choice of rice, seaweed wrap, crab stick, avocado, cucumber with sweet soy sauce and sesame seed', price: '7.50'},
  {item: 'Boston Roll', description: 'Your choice of rice, seaweed wrap, poached shrimp, avocado, cucumber with spicy mayonnaise and sesame seed', price: '8'},
  {item: 'Philadelphia Roll', description: 'Your choice of rice, seaweed wrap, smoked salmon, cream cheese, green onion with spicy mayonnaise and everything bagel spice', price: '8.50'},
  {item: 'Shrimp Tempura', description: 'Your choice of rice, seaweed wrap, tempura shrimp, avocado, asparagus, with spicy mayonnaise and tempura crunch', price: '8'},
  {item: 'Spicy Tuna Roll', description: 'Your choice of rice, seaweed wrap, dynamite tuna, cucumber, avocado, jalapeno pepper with sweet soy sauce, sesame chili flake and sesame seed', price: '8.50'},
  {item: 'Spicy Salmon Roll', description: 'Your choice of rice, seaweed wrap, dynamite salmon, carrot, cream cheese, green onion with sweet soy sauce, sesame chili flake and sesame seed', price: '8.50'},
  {item: 'Chicken', description: 'Your choice of rice, soy warp, grilled chicken, cucumber, cream cheese, green onion with orange sauce and sesame seed', price: '8.50'},
  {item: 'Steak', description: 'Your choice of rice, soy wrap, grilled steak, avocado, asparagus, jalapeno with wasabi mayonnaise, sweet soy sauce and everything bagel spice', price: '9'},
  {item: "A.J.'s Choice", description: 'Your choice of rice, seaweed wrap, grilled steak, avocado, asparagus, jalapeno, topped with wasabi mayo, sweet chili, sriracha and fried onions', price: '10'},
];

// Sides
const sides: MenuEntry[] = [
  {item: 'Miso Soup', description: 'With tofu and green onion', price: '3'},
  {item: 'Korean Spicy Miso Soup', description: 'With zucchini, tofu, mushroom, green onion', price: '3'},
  {item: 'Edamame', description: '', price: '2.50'},
  {item: 'Spicy Edamame', description: '', price: '2.75'},
  {item: 'Ajian Salad', description: 'With carrots, edamame and carrot ginger dressing', price: '3'},
  {item: 'Cucumber Salad', description: '', price: '2.25'},
  {item: 'Ajian Noodle Salad', description: 'Sweet sesame dressing, carrots, edamame, green onion, bell pepper and peanuts', price: '3'},
  {item: 'Seaweed Salad', description: '', price: '3'},
  {item: 'Steamed Dumplings', description: 'Pork and chicken with dipping sauce', price: '3.50'},
];

// Fried Rice
const friedRice: MenuEntry[] = [
  {item: '', description: 'Fried rice mixed with carrot, jalapeno, green onion, asparagus, cabbage, edamame and egg', price: ''},
  {item: 'Vegetable Fried Rice', description: '', price: '7'},
  {item: 'Add Chicken', description: '', price: '1'},
  {item: 'Add Steak', description: '', price: '1'},
  {item: 'Add Roasted Tofu', description: '', price: '1'},
  {item: 'Add Shrimp', description: '', price: '2'},
  {item: 'Add Pineapples and Peanuts', description: '', price: '1'},
  {item: 'Make it Spicy', description: '', price: ''},
];

// Drinks
const drinks: MenuEntry[] = [
  {item: 'Fountain', description: '', price: '1.95'},
  {item: 'Bottled', description: '', price: '2.50'},
];

// Nutrition
const nutrition: MenuEntry[] = [
  {item: 'White Rice-Seaweed', description: 'Calories - 313\nTotal Fat - 0g\nSaturated Fat - 0g\nSodium - 881.7mg\nCarbs - 69.3g\nFiber - 1g\nSugar - 6.7g\nProtein - 6.1g', price: ''},
  {item: 'White Rice-Soy Wrap', description: 'Calories - 322\nTotal Fat - 1g\nSaturated Fat - 0g\nSodium - 881.7mg\nCarbs - 69.3g\nFiber - 0g\nSugar - 6.7g\nProtein - 7.1g', price: ''},
  {item: 'Brown Rice-Seaweed', description: 'Calories - 262\nTotal Fat - 2.4g\nSaturated Fat - 0g\nSodium - 737.2mg\nCarbs - 55.1g\nFiber - 2.4g\nSugar - 5.6g\nProtein - 5.3g', price: ''},
  {item: 'Brown Rice-Soy', description: 'Calories - 272\nTotal Fat - 3.1g\nSaturated Fat - 0g\nSodium - 747.2mg\nCarbs - 55.1g\nFiber - 1.4g\nSugar - 5.6g\nProtein - 6.3g', price: ''},
  {item: 'Tuna', description: 'Calories - 47\nTotal Fat - 0g\nSaturated Fat - 0g\nSodium - 15mg\nCarbs - 0g\nFiber - 0g\nSugar - 0g\nProtein - 10.5g', price: ''},
  {item: 'Chicken', description: 'Calories - 110\nTotal Fat - 1.5g\nSaturated Fat - 1g\nSodium - 135mg\nCarbs - 1g\nFiber - 0g\nSugar - 0g\nProtein - 9g', price: ''},
  {item: 'Shrimp Tempura', description: 'Calories - 120\nTotal Fat - 4.5g\nSaturated Fat - 1g\nSodium - 104mg\nCarbs - 4g\nFiber - .5g\nSugar - 0g\nProtein - 6.5g', price: ''},
  {item: 'Salmon', description: 'Calories - 87\nTotal Fat - 6g\nSaturated Fat - 1.5g\nSodium - 25.5mg\nCarbs - 0g\nFiber - 0g\nSugar - 0g\nProtein - 9g', price: ''},
  {item: 'Spicy Crab Salad', description: 'Calories - 60\nTotal Fat - .5g\nSaturated Fat - 0g\nSodium - 335mg\nCarbs - 8g\nFiber - 0g\nSugar - 3g\nProtein - 6g', price: ''},
  {item: 'Steak', description: 'Calories - 69\nTotal Fat - 1.5g\nSaturated Fat - 0g\nSodium - 15mg\nCarbs - 0g\nFiber - 0g\nSugar - 3g\nProtein - 12g', price: ''},
  {item: 'Smoked Salmon', description: 'Calories - 49.5\nTotal Fat - 1.5g\nSaturated Fat - 0g\nSodium - 840mg\nCarbs - 0g\nFiber - 0g\nSugar - 0g\nProtein - 7.5g', price: ''},
  {item: 'Crabstick', description: 'Calories - 30\nTotal Fat - .3g\nSaturated Fat - 0g\nSodium - 243mg\nCarbs - 4g\nFiber - 0g\nSugar - 1.5g\nProtein - 3g', price: ''},
  {item: 'Dynamite Tuna', description: 'Calories - 76.5\nTotal Fat - .2g\nSaturated Fat - 0g\nSodium - 107mg\nCarbs - 4g\nFiber - 0g\nSugar - 3g\nProtein - 13.5g', price: ''},
  {item: 'Dynamite Salmon', description: 'Calories - 117\nTotal Fat - 6.2g\nSaturated Fat - 1.5g\nSodium - 117.5mg\nCarbs - 4g\nFiber - 0g\nSugar - 3g\nProtein - 12g', price: ''},
  {item: 'Tofu', description: 'Calories - 68\nTotal Fat - 1g\nSaturated Fat - 0g\nSodium - 15mg\nCarbs - 1g\nFiber - 0g\nSugar - 2g\nProtein - 3.5g', price: ''},
  {item: 'Asparagus', description: 'Calories - 6.5\nTotal Fat - 0g\nSaturated Fat - 0g\nSodium - 4mg\nCarbs - 1g\nFiber - .5g\nSugar - .5g\nProtein - .5g', price: ''},
  {item: 'Avocado', description: 'Calories - 36\nTotal Fat - 3.3g\nSaturated Fat - .8g\nSodium - 1.6mg\nCarbs - 1.6g\nFiber - 1.6g\nSugar - 0g\nProtein - .8g', price: ''},
  {item: 'Carrot', description: 'Calories - 4\nTotal Fat - 0g\nSaturated Fat - 0g\nSodium - 8.8mg\nCarbs - 8g\nFiber - 4g\nSugar - 4g\nProtein - 0g', price: ''},
  {item: 'Green Onion', description: 'Calories - 2.1\nTotal Fat - 0g\nSaturated Fat - 0g\nSodium - 0mg\nCarbs - .6g\nFiber - .3g\nSugar - .3g\nProtein - .3g', price: ''},
  {item: 'Jalapeno', description: 'Calories - 3.2\nTotal Fat - 0g\nSaturated Fat - 0g\nSodium - 0mg\nCarbs - .8g\nFiber - .4g\nSugar - .4g\nProtein - 0g', price: ''},
  {item: 'Cucumber', description: 'Calories - 6.8\nTotal Fat - .7g\nSaturated Fat - .3g\nSodium - 63mg\nCarbs - 0g\nFiber - 0g\nSugar - 0g\nProtein - 0g', price: ''},
  {item: 'Cream Cheese', description: 'Calories - 68\nTotal Fat - 7g\nSaturated Fat - 3.5g\nSodium - 63mg\nCarbs - .7g\nFiber - 0g\nSugar - .7g\nProtein - 1.4g', price: ''},
  {item: 'Spicy Mayo', description: 'Calories - 60\nTotal Fat - 4.4g\nSaturated Fat - 1g\nSodium - 47mg\nCarbs - 3.6g\nFiber - 0g\nSugar - 0g\nProtein - 0g', price: ''},
  {item: 'Wasabi Mayo', description: 'Calories - 40\nTotal Fat - 4g\nSaturated Fat - 1g\nSodium - 40mg\nCarbs - 1g\nFiber - 0g\nSugar - 1.5g\nProtein - 0g', price: ''},
  {item: 'Sriracha', description: 'Calories - 10\nTotal Fat - 0g\nSaturated Fat - 0g\nSodium - 200mg\nCarbs - 2g\nFiber - 0g\nSugar - 2g\nProtein - 0g', price: ''},
  {item: 'Sweet Chili', description: 'Calories - 35\nTotal Fat - 0g\nSaturated Fat - 0g\nSodium - 200mg\nCarbs - 8.5g\nFiber - .5g\nSugar - 7g\nProtein - 0g', price: ''},
  {item: 'Sweet Soy', description: 'Calories - 22\nTotal Fat - 0g\nSaturated Fat - 0g\nSodium - 233mg\nCarbs - 5g\nFiber - 0g\nSugar - 4.4g\nProtein - .5g', price: ''},
  {item: 'Sesame Seed', description: 'Calories - 5\nTotal Fat - .1g\nSaturated Fat - 0g\nSodium - .6mg\nCarbs - 0g\nFiber - .8g\nSugar - 0g\nProtein - 1g', price: ''},
  {item: 'Masago', description: 'Calories - 10\nTotal Fat - 0g\nSaturated Fat - 0g\nSodium - 100mg\nCarbs - .5g\nFiber - 0g\nSugar - .5g\nProtein - 0g', price: ''},
  {item: 'Tempura Crunch', description: 'Calories - 100\nTotal Fat - 5g\nSaturated Fat - 2g\nSodium - 100mg\nCarbs - 25g\nFiber - 1g\nSugar - 1g\nProtein - 3g', price: ''},
];

const rollSections: Array<string> = ['rice','wrap','protein','additional','finish']
const rollSectionItems: Array<MenuEntry[]> = [startWithRice, pickYourWrap, pickYourProtein, makeItYourOwn, finishIt]

const otherSections: Array<string> = ['suggested','sides','rice','drinks','nutrition']
const otherSectionItems: Array<MenuEntry[]> = [suggestedRolls, sides, friedRice, drinks, nutrition]


function SetDefaultMenu() {
  for (let i=0; i < rollSections.length; i++) {
    const section = rollSections[i]
    const item = rollSectionItems[i]
    set(ref(database, `menu/youreOnARoll/${section}`), item)
  }
  for (let i=0; i < otherSections.length; i++) {
    const section = otherSections[i]
    const item = otherSectionItems[i]
    set(ref(database, `menu/${section}`), item)
  }
};
// SetDefaultHours()