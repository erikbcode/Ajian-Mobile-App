/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import NotFoundScreen from '../screens/NotFoundScreen';
import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';
import HoursScreen from '../screens/HoursScreen';
import SocialScreen from '../screens/SocialScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AccountScreen from '../screens/AccountScreen';
import UpdateAccountScreen from '../screens/UpdateAccountScreen';
import PasswordResetScreen from '../screens/PasswordResetScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DefaultTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{}} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{title: 'Create Account', headerTitleStyle: {fontFamily: 'Ubuntu'}, headerStyle: {backgroundColor: 'white'}}} />
      <Stack.Screen name="PasswordReset" component={PasswordResetScreen} options={{title: 'Reset Password', headerTitleStyle: {fontFamily: 'Ubuntu'}, headerStyle: {backgroundColor: 'white'}}} />
      <Stack.Screen name="Account" component={AccountScreen} options={{}} />
      <Stack.Screen name="UpdateAccount" component={UpdateAccountScreen} options={{title: 'Update Profile Information'}} />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();


function BottomTabNavigator() {
  const colorScheme = useColorScheme();


  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: 'rgb(135, 31, 31)',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {height: 90},
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} />,
          headerShown: false,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          title: 'Menu',
          tabBarIcon: ({ color }) => <TabBarIcon name="bars" color={color} />,
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Hours"
        component={HoursScreen}
        options={{
          title: 'Hours & Locations',
          tabBarIcon: ({ color }) => <TabBarIcon name="clock-o" color={color} />,
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <TabBarIcon name="share" color={color} />,
          headerShown: false,
        }}
      />
       <BottomTab.Screen
        name="Social"
        component={SocialScreen}
        options={{
          title: 'Twitter Feed',
          tabBarIcon: ({ color }) => <TabBarIcon name="retweet" color={color} />,
          headerShown: false,
        }}
      />

    </BottomTab.Navigator>
    
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
