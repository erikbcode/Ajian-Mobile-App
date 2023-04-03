import { ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { onValue, ref, get} from 'firebase/database';
import { database } from '../firebaseConfig';
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
      <Text style={[styles.textParent, styles.headerText]}>Menu</Text>
      {/* <HorizontalBanner text='Menu' /> */}
      <Tabs />
      {/* <TabText /> */}
    </ScrollView>
  );
}

function Tabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [menuEntries, setMenuEntries] = useState([[{item:'', description:'', price:''}]]);
  const [isLoading, setIsLoading] = useState(true);

  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  useEffect(() => {
    async function fetchMenuEntries() {
      const menuLocations: Array<string> = ['youreOnARoll/rice','youreOnARoll/wrap','youreOnARoll/protein','youreOnARoll/additional','youreOnARoll/finish','suggested','sides','rice','drinks','nutrition']
      let menuEntries: Array<Array<MenuEntry>> = []
      for (let menuLocation of menuLocations) {
        const val = await readMenuItems(menuLocation)
        // console.log(val)
        menuEntries.push(val)
      }
      setMenuEntries(menuEntries)
      setIsLoading(false)
    }
    fetchMenuEntries()
  }, []);

  if (isLoading) {
    return <View><Text style={[styles.textParent, styles.loadingText]}>Loading Data...</Text></View>
  }

  return (
    <View style={styles.tabContainer}>
      <View style={styles.tabStyle}>
        <TouchableOpacity style={styles.tabButton} key={1} onPress={() => handleTabClick(0)}><Text style={activeTab === 0 ? styles.textParent : [styles.textParent, styles.tabTextSelected]}>Roll Options</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} key={2} onPress={() => handleTabClick(1)}><Text style={activeTab === 1 ? styles.textParent : [styles.textParent, styles.tabTextSelected]}>Rolls</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} key={3} onPress={() => handleTabClick(2)}><Text style={activeTab === 2 ? styles.textParent : [styles.textParent, styles.tabTextSelected]}>Sides</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} key={4} onPress={() => handleTabClick(3)}><Text style={activeTab === 3 ? styles.textParent : [styles.textParent, styles.tabTextSelected]}>Rice</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} key={5} onPress={() => handleTabClick(4)}><Text style={activeTab === 4 ? styles.textParent : [styles.textParent, styles.tabTextSelected]}>Drinks</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} key={6} onPress={() => handleTabClick(5)}><Text style={activeTab === 5 ? styles.textParent : [styles.textParent, styles.tabTextSelected]}>Nutrition</Text></TouchableOpacity>
      </View>
      <View style={[styles.textParent, styles.tabContent]}>
        {activeTab === 0 && youreOnARollTab(menuEntries.slice(0,5))}
        {activeTab === 1 && suggestedRollsTab(menuEntries[5])}
        {activeTab === 2 && sidesTab(menuEntries[6])}
        {activeTab === 3 && friedRiceTab(menuEntries[7])}
        {activeTab === 4 && drinksTab(menuEntries[8])}
        {activeTab === 5 && nutritionTab(menuEntries[9])}
    </View>
    </View>
  );
};

function MenuItems(section_title: string, items: Array<MenuEntry>) {
  // firebase call for current hours / specific day hours here
  console.log('Menu Recieved')
  console.log(items)
  return (
    <View style={styles.menuContainer}>
      {/* <View style={styles.smallSeparator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      <Text style={[styles.textParent, styles.menuTitle]}>{section_title}</Text>
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

// async function readHours(day : string) {
//   const query_loc : string = `hours/${day}`
//   const query = ref(database, query_loc);
//   let val : OpenHours = {day: 'Day', start_hour: 11, start_minute: '00', end_hour: 8, end_minute: '00'};
//   val = await get(query).then((snapshot:any) => {
//     if (snapshot.exists()) {
//       val = snapshot.val();
//       console.log(snapshot.val());
//       return val;
//     } else {
//       console.log("No data available");
//       return val;
//     }
//   }).catch((error:any) => {
//     console.error(error);
//     return val;
//   });
//   return val
// }

async function readMenuItems(db_loc : string) {
  const query = ref(database, `menu/${db_loc}`);
  let val : Array<MenuEntry> = [{item:'', description:'', price:''}];
  val = await get(query).then((snapshot:any) => {
    if (snapshot.exists()) {
      val = snapshot.val();
      console.log(snapshot.val());
      return val;
    } else {
      console.log("No data available");
      return val;
    }
  }).catch((error:any) => {
    console.error(error);
    return val;
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


const youreOnARollTab = (menuEntries : Array<Array<MenuEntry>>) => {
  // const [menuEntries, setMenuEntries] = useState([[{item:'', description:'', price:''}]]);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   async function fetchMenuEntries() {
  //     const menuLocations: Array<string> = ['youreOnARoll/rice','youreOnARoll/wrap','youreOnARoll/protein','youreOnARoll/additional','youreOnARoll/finish']
  //     let menuEntries: Array<Array<MenuEntry>> = []
  //     for (let menuLocation of menuLocations) {
  //       const val = await readMenuItems(menuLocation)
  //       // console.log(val)
  //       menuEntries.push(val)
  //     }
  //     setMenuEntries(menuEntries)
  //     setIsLoading(false)
  //   }
  //   fetchMenuEntries()
  // }, []);

  // if (isLoading) {
  //   return <View><Text>Loading Data...</Text></View>
  // }
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

      <HorizontalBanner text='Double Up: +$3 | *Raw Protein | **Vegan Option'/>
    </View>
  );
};

// get(ref(database, 'menu/suggested'))
// get(ref(database, 'menu/sides'))
// get(ref(database, 'menu/rice'))
// get(ref(database, 'menu/drinks'))
// get(ref(database, 'menu/nutrition'))

const suggestedRollsTab = (suggestedMenuEntry : Array<MenuEntry>) => {
  // const [suggestedMenuEntry, setSuggestedMenuEntry] = useState([{item:'', description:'', price:''}]);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   async function fetchMenuEntry() {
  //     let suggestedMenuEntry: Array<MenuEntry> = await readMenuItems('suggested')
  //     setSuggestedMenuEntry(suggestedMenuEntry)
  //     setIsLoading(false)
  //   }
  //   fetchMenuEntry()
  // }, []);

  // console.log('Suggested')
  // console.log(suggestedMenuEntry)
  // if (isLoading) {
  //   return <View><Text>Loading Data...</Text></View>
  // }
  return (
    <View style={styles.container}>
      <SectionSeparator />
      {MenuItems('Suggested Rolls', suggestedMenuEntry)}
      <SectionSeparator />
      <HorizontalBanner text='*Consuming raw or undercooked meats, poultry, seafood, shellfish, eggs or unpasteurized milk may increase your risk of foodborne illness' />
    </View>
  );
};

const sidesTab = (sidesMenuEntry : Array<MenuEntry>) => {
  // const [sidesMenuEntry, setSidesMenuEntry] = useState([{item:'', description:'', price:''}]);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   async function fetchMenuEntry() {
  //     let sidesMenuEntry: Array<MenuEntry> = await readMenuItems('sides')
  //     setSidesMenuEntry(sidesMenuEntry)
  //     setIsLoading(false)
  //   }
  //   fetchMenuEntry()
  // }, []);

  // if (isLoading) {
  //   return <View><Text>Loading Data...</Text></View>
  // }
  return (
    <View style={styles.container}>
      <SectionSeparator />
      {MenuItems('Sides', sidesMenuEntry)}
      <SectionSeparator />
      <HorizontalBanner text='' />
    </View>
  );
};

const friedRiceTab = (riceMenuEntry : Array<MenuEntry>) => {
  // const [riceMenuEntry, setRiceMenuEntry] = useState([{item:'', description:'', price:''}]);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   async function fetchMenuEntry() {
  //     let riceMenuEntry: Array<MenuEntry> = await readMenuItems('rice')
  //     setRiceMenuEntry(riceMenuEntry)
  //     setIsLoading(false)
  //   }
  //   fetchMenuEntry()
  // }, []);

  // if (isLoading) {
  //   return <View><Text>Loading Data...</Text></View>
  // }
  return (
    <View style={styles.container}>
      <SectionSeparator />
      {MenuItems('Fried Rice', riceMenuEntry)}
      <SectionSeparator />
      <HorizontalBanner text='All fried rice comes with carrot, jalapeno, green onion, asparagus, cabbage, edamame and egg' />
    </View>
  );
};

const drinksTab = (drinksMenuEntry : Array<MenuEntry>) => {
  // const [drinksMenuEntry, setDrinksMenuEntry] = useState([{item:'', description:'', price:''}]);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   async function fetchMenuEntry() {
  //     let drinksMenuEntry: Array<MenuEntry> = await readMenuItems('drinks')
  //     setDrinksMenuEntry(drinksMenuEntry)
  //     setIsLoading(false)
  //   }
  //   fetchMenuEntry()
  // }, []);

  // if (isLoading) {
  //   return <View><Text>Loading Data...</Text></View>
  // }
  return (
    <View style={styles.container}>
      <SectionSeparator />
      {MenuItems('Drinks', drinksMenuEntry)}
      <SectionSeparator />
      <HorizontalBanner text='' />
    </View>
  );
};

const nutritionTab = (nutritionMenuEntry : Array<MenuEntry>) => {
  // const [nutritionMenuEntry, setNutritionMenuEntry] = useState([{item:'', description:'', price:''}]);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   async function fetchMenuEntry() {
  //     let nutritionMenuEntry: Array<MenuEntry> = await readMenuItems('nutrition')
  //     setNutritionMenuEntry(nutritionMenuEntry)
  //     setIsLoading(false)
  //   }
  //   fetchMenuEntry()
  // }, []);

  // if (isLoading) {
  //   return <View><Text>Loading Data...</Text></View>
  // }
  return (
    <View style={styles.container}>
      <SectionSeparator />
      {MenuItems('Nutrition', nutritionMenuEntry)}
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

