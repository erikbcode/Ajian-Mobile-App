import { StyleSheet, ScrollView, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';
// import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useFonts } from 'expo-font';

export default function MenuScreen() {
  // const [fontsLoaded, setFontsLoaded] = useState(false);
  // const loadFont = async () => {
  //   try {
  //     await Font.loadAsync({
  //       'Ubuntu': require('../styles/fonts/Ubuntu-Regular.ttf'),
  //       'UbuntuBold': require('../styles/fonts/Ubuntu-Bold.ttf'),
  //       'Aboreto': require('../styles/fonts/Aboreto-Regular.ttf')
  //     });
  //     setFontsLoaded(true);
  //   }
  //   catch (error) {
  //     console.error(error);
  //   }
  // };
  // loadFont();
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

type MenuEntry = {
  item: string;
  description: string;
  price: string;
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

interface Props {
  text: string;
}

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

const banner_styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 110,
    maxHeight: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgb(135, 31, 31)',
    marginTop: 34,
    paddingTop: 10,
    zIndex: 2,
  },
  text: {
    fontFamily: 'Ubuntu',
    fontSize: 16,
    fontWeight: 'normal',
    color: 'white',
    zIndex: 1,
    marginLeft: 10,
  },
});

const styles = StyleSheet.create({
  tab_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    columnGap: 20,
  },
  tab_style: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    borderRadius: 1,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'rgb(135, 31, 31)',
    borderColor: 'black',
    marginTop: 30,
    marginBottom: 0,
  },
  tab_button: {
    flexBasis: '32%',
    alignItems: 'center',
    paddingTop: 2,
    paddingBottom: 2,
  },
  tab_text: {
    fontFamily: 'Ubuntu',
    fontWeight: 'normal',
    color: 'white',
    fontSize: 18,
  },
  tab_text_selected: {
    fontFamily: 'Ubuntu',
    fontWeight: 'normal',
    color: '#a7aaad',
    fontSize: 18,
  },
  tab_content: {
    margin: 'auto',
    fontFamily: 'Ubuntu',
    fontSize: 12,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  scroll_view: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'rgb(135, 31, 31)',
  },
  header_title: {
    fontFamily: 'UbuntuBold',
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    paddingTop: StatusBar.currentHeight + 20,
    paddingBottom: 20,
    textAlign: 'center',
    backgroundColor: 'rgb(135, 31, 31)',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: 30,
    width: Dimensions.get('window').width,
  },
  menu_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontFamily: 'UbuntuBold',
    margin: 'auto',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 10,
  },
  item_item: {
    fontFamily: 'Ubuntu',
    margin: 'auto',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  item_description: {
    fontFamily: 'Ubuntu',
    margin: 'auto',
    fontSize: 12,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  item_price: {
    fontFamily: 'Ubuntu',
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

// You're on a roll
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


// Suggested Rolls
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

// Fried Rice
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
