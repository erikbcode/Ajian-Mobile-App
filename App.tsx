import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { FirebaseProvider } from './context/FirebaseContext';
import { FontProvider } from './context/FontContext';


export default function App() {

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } 

    return (
        <SafeAreaProvider>
          <FontProvider>
            <FirebaseProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </FirebaseProvider>
          </FontProvider>
        </SafeAreaProvider>
    );
  };
