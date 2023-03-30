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

function readMenuDB(db_loc : string) {
  const query = ref(database, `menu/${db_loc}`);
  let val : Array<MenuEntry> = [{item:'', description:'', price:''}];
  get(query).then((snapshot:any) => {
    if (snapshot.exists()) {
      val = snapshot.val();
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error:any) => {
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
      {MenuItems('Start with Rice', readMenuDB('youreOnARoll/rice'))} 
      <SectionSeparator />
      {MenuItems('Pick your Wrap', readMenuDB('youreOnARoll/wrap'))}
      <SectionSeparator />
      {MenuItems('Pick your Protein', readMenuDB('youreOnARoll/protein'))}
      <SectionSeparator />
      {MenuItems('Make it your Own', readMenuDB('youreOnARoll/additional'))}
      <SectionSeparator />
      {MenuItems('Finish It', readMenuDB('youreOnARoll/finish'))}
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
      {MenuItems('Suggested Rolls', readMenuDB('youreOnARoll/suggested'))}
      <SectionSeparator />
      <HorizontalBanner text='*Consuming raw or undercooked meats, poultry, seafood, shellfish, eggs or unpasteurized milk may increase your risk of foodborne illness' />
    </View>
  );
};

const sidesTab = () => {
  return (
    <View style={styles.container}>
      <SectionSeparator />
      {MenuItems('Sides', readMenuDB('youreOnARoll/sides'))}
      <SectionSeparator />
      <HorizontalBanner text='' />
    </View>
  );
};

const friedRiceTab = () => {
  return (
    <View style={styles.container}>
      <SectionSeparator />
      {MenuItems('Fried Rice', readMenuDB('youreOnARoll/rice'))}
      <SectionSeparator />
      <HorizontalBanner text='All fried rice comes with carrot, jalapeno, green onion, asparagus, cabbage, edamame and egg' />
    </View>
  );
};

const drinksTab = () => {
  return (
    <View style={styles.container}>
      <SectionSeparator />
      {MenuItems('Drinks', readMenuDB('youreOnARoll/drinks'))}
      <SectionSeparator />
      <HorizontalBanner text='' />
    </View>
  );
};

const nutritionTab = () => {
  return (
    <View style={styles.container}>
      <SectionSeparator />
      {MenuItems('Nutrition', readMenuDB('youreOnARoll/nutrition'))}
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

const rollSections: Array<string> = ['rice','wrap','protein','additional','finish']
const otherSections: Array<string> = ['suggested','sides','rice','drinks','nutrition']

