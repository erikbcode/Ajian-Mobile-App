import { ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ref, get} from 'firebase/database';
import { database } from '../firebaseConfig';
import { Text, View } from '../components/Themed';
import { useFonts } from 'expo-font';

import { MenuEntry } from '../types';
import { styles, banner_styles } from '../styles/MenuScreenStyle'

export default function MenuScreen() {
  /*
  Function that loads fonts for the Menu page then exports the entire screen
  This covers 6 tabs of menu items with a Menu header
  */

  // Load standard Ubuntu Fonts, Ubuntu-Bold seems to have issues on Android
  const [fontsLoaded] = useFonts({
    'Ubuntu': require('../styles/fonts/Ubuntu-Regular.ttf'),
    'UbuntuBold': require('../styles/fonts/Ubuntu-Bold.ttf'),
  });

  return (
    // ScrollView necessary for page to scroll down with a variable height
    <ScrollView style={styles.scrollView}>
      {/* Menu header element */}
      <Text style={[styles.textParent, styles.headerText]}>
        Menu
      </Text>
      {/* Tabs() renders all menu items in 6 different tabs */}
      <Tabs />
    </ScrollView>
  );
}

function Tabs() {
  // These state calls are made for handling asynchronous Firebase pull
  const [activeTab, setActiveTab] = useState(0);
  const [menuEntries, setMenuEntries] = useState([[{item:'', description:'', price:''}]]);
  const [isLoading, setIsLoading] = useState(true);

  // Function for callback when a tab is clicked, changes the active display
  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  useEffect(() => {
    async function fetchMenuEntries() {
      // Below is a constant that holds the locations in the Firebase RTDB for pulling Menu Items from
      const menuLocations: Array<string> = ['youreOnARoll/rice','youreOnARoll/wrap','youreOnARoll/protein','youreOnARoll/additional','youreOnARoll/finish','suggested','sides','rice','drinks','nutrition']
      // Below pulls every Menu Item by looping over relevant locations, could be updated to dynamically load pages
      let menuEntries: Array<Array<MenuEntry>> = [] // initialize mutable array for Menu Items
      for (let menuLocation of menuLocations) {
        const val = await readMenuItems(menuLocation)
        // console.log(val)
        menuEntries.push(val)
      }
      // Update that the async call has returned
      setMenuEntries(menuEntries)
      setIsLoading(false)
    }
    fetchMenuEntries()
  }, []);

  // If the async Firebase call has not returned, display a loading screen
  if (isLoading) {
    return <View><Text style={[styles.textParent, styles.loadingText]}>Loading Data...</Text></View>
  }

  /* 
  Below renders the elements in the array of menuEntries array
  This occurs between 6 tabs
  On tab press, the current tab has a modified style to show that it is active
  First 5 items in menuEntries all go to the first tab, the remaining items in menuEntries have a tab to themselves
  This design follows the website at https://www.ajiansushi.com/menus/, could be improved
  */
  return (
    <View style={styles.tabContainer}>
      <View style={styles.tabStyle}>
        <TouchableOpacity style={styles.tabButton} key={1} onPress={() => handleTabClick(0)}><Text style={activeTab === 0 ? [styles.textParent, styles.tabTextUnselected] : [styles.textParent, styles.tabTextSelected]}>Roll Options</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} key={2} onPress={() => handleTabClick(1)}><Text style={activeTab === 1 ? [styles.textParent, styles.tabTextUnselected] : [styles.textParent, styles.tabTextSelected]}>Rolls</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} key={3} onPress={() => handleTabClick(2)}><Text style={activeTab === 2 ? [styles.textParent, styles.tabTextUnselected] : [styles.textParent, styles.tabTextSelected]}>Sides</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} key={4} onPress={() => handleTabClick(3)}><Text style={activeTab === 3 ? [styles.textParent, styles.tabTextUnselected] : [styles.textParent, styles.tabTextSelected]}>Rice</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} key={5} onPress={() => handleTabClick(4)}><Text style={activeTab === 4 ? [styles.textParent, styles.tabTextUnselected] : [styles.textParent, styles.tabTextSelected]}>Drinks</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} key={6} onPress={() => handleTabClick(5)}><Text style={activeTab === 5 ? [styles.textParent, styles.tabTextUnselected] : [styles.textParent, styles.tabTextSelected]}>Nutrition</Text></TouchableOpacity>
      </View>
      <View style={[styles.textParent, styles.tabContent]}>
        {activeTab === 0 && youreOnARollTab(menuEntries.slice(0,5))}
        {activeTab == 1 && singleItemTab('Suggested Rolls', menuEntries[5], '*Consuming raw or undercooked meats, poultry, seafood, shellfish, eggs or unpasteurized milk may increase your risk of foodborne illness')}
        {activeTab == 2 && singleItemTab('Sides', menuEntries[6], '')}
        {activeTab == 3 && singleItemTab('Fried Rice', menuEntries[7], 'All fried rice comes with carrot, jalapeno, green onion, asparagus, cabbage, edamame and egg')}
        {activeTab == 4 && singleItemTab('Drinks', menuEntries[8], '')}
        {activeTab == 5 && singleItemTab('Nutrition', menuEntries[9], 'All nutritional information is estimated based on desired portions and is subject to variation')}
    </View>
    </View>
  );
};

function MenuItems(sectionTitle: string, items: Array<MenuEntry>) {
  /*
  This function renders a set of menu items into a container that displays
  both a header and a list of all passed items

  section_title : string
  - Header for the container

  items : Array<MenuEntry>
  - Array of menu items for dispalying
  - Empty strings in each MenuEntry item will be skipped
  */
  return (
    <View style={styles.menuContainer}>
      <Text style={[styles.textParent, styles.menuTitle]}>{sectionTitle}</Text>
      {items.map((item, index) => (
        <View key={index} style={styles.smallMargin}>        
          {item.item ? <Text style={[styles.textParent, styles.itemItemText]}>{item.item}</Text> : null}
          {item.description ? <Text style={[styles.textParent, styles.itemDescriptionText]}>{item.description}</Text> : null}
          {item.price ? <Text style={[styles.textParent, styles.itemPriceText]}>{item.price}</Text> : null}
        </View>
      ))}
    </View>
  );
}

async function readMenuItems(db_loc : string) {
  /*
  This function is the asynchronous Firebase realtime database (RTDB) getter for
  the Menu component. All calls are intended to be routed through here for MenuItems
  exclusively.

  db_loc : string
  - Exact location in the database of the desired element
  */

  // Make the query to Firebase
  const query = ref(database, `menu/${db_loc}`);
  // Provide a default value to be returned if the query is unsuccessful
  let val : Array<MenuEntry> = [{item:'', description:'', price:''}];
  val = await get(query).then((snapshot:any) => {
    // if the item is found in the database..
    if (snapshot.exists()) {
      // Update the return val with the value found in the database
      val = snapshot.val();
      // console.log(snapshot.val()); # statement for seeing database pulls in console
      return val;
    } else { // if the location but not item is found in the database..
      console.log(`No data available @ menu/${db_loc}`); // Log missing data, return the default val
      return val;
    }
  // Otherwise, if an error is thrown during the call
  }).catch((error:any) => {
    console.error(error); // Log the error, return the default val
    return val;
  });
  // Returns either the retrieved value (success) or the default value (failure)
  return val;
}

// get(ref(database, 'menu/youreOnARoll/rice'))
// get(ref(database, 'menu/youreOnARoll/wrap'))
// get(ref(database, 'menu/youreOnARoll/protein'))
// get(ref(database, 'menu/youreOnARoll/additional'))
// get(ref(database, 'menu/youreOnARoll/finish'))

const youreOnARollTab = (menuEntries : Array<Array<MenuEntry>>) => {
  /*
  This function renders all the sections of the primary menu tab.
  This is the only function that renders multiple subsections of the Menu in such a
  fashion, following what is present in Ajian's website

  menuEntries : Array<Array<MenuEntry>>
  - 2D array of menu items to display
  - Results in multiple section headers with separators over a regular MenuItems call
  */
  return (
    <View style={styles.container}>
      <SectionSeparator />
      
      {MenuItems('Start with Rice', menuEntries[0])} 
      <SectionSeparator />
      {MenuItems('Pick your Wrap', menuEntries[1])}
      <SectionSeparator />
      {MenuItems('Pick your Protein', menuEntries[2])}
      <SectionSeparator />
      {MenuItems('Make it your Own', menuEntries[3])}
      <SectionSeparator />
      {MenuItems('Finish It', menuEntries[4])}
      <SectionSeparator />

      {/* Display lower banner to end the page */}
      <HorizontalBanner text='Double Up: +$3 | *Raw Protein | **Vegan Option'/>
    </View>
  );
};

// get(ref(database, 'menu/suggested'))
// get(ref(database, 'menu/sides'))
// get(ref(database, 'menu/rice'))
// get(ref(database, 'menu/drinks'))
// get(ref(database, 'menu/nutrition'))

const singleItemTab = (sectionTitle : string, suggestedMenuEntry : Array<MenuEntry>, bannerText : string) => {
  /*
  This function renders a single item designed for a single tab

  sectionTitle : string
  - Header for the top of the item display within the tab
  - Passed directly to MenuItems call

  suggestedMenuEntry : Array<MenuEntry>
  - Vector of menu items to display under the header

  bannerText : string
  - Text to be displayed in the banner at the bottom of the page
  */
  return (
    <View style={styles.container}>
      <SectionSeparator />
      {MenuItems(sectionTitle, suggestedMenuEntry)}
      <SectionSeparator />
      <HorizontalBanner text={bannerText} />
    </View>
  );
};

interface Props {
  text: string;
}

const HorizontalBanner: React.FC<Props> = ({ text }) => {
  // Simple banner for ending the page and optionally displaying text
  return (
    <View style={banner_styles.container}>
      <Text style={banner_styles.text}>{text}</Text>
    </View>
  );
};

const SectionSeparator = () => {
  // Simple component for a separator that fills 3/4 of the screen
  // Meant for separating menu items
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