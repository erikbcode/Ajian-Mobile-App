import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text, Button, Alert, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { auth } from '../firebaseConfig';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import * as Font from 'expo-font';

const AccountScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null)
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const isFocused = useIsFocused();

  const navigation = useNavigation();

  const loadFont = async () => {
    try {
      await Font.loadAsync({
        'Ubuntu': require('../styles/fonts/Ubuntu-Regular.ttf'),
        'UbuntuBold': require('../styles/fonts/Ubuntu-Bold.ttf'),
        'Aboreto': require('../styles/fonts/Aboreto-Regular.ttf')
      });
      setFontsLoaded(true);
    }
    catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadFont();
    // Load the current Firebase auth user when the screen comes into focus
    if (isFocused) {
      const currentUser = auth.currentUser
      setUser(currentUser)
    }
  }, [isFocused]);

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => {
        if (error.code == 'auth/user-not-found') {
          Alert.alert('Log in Failed', 'Please enter valid credentials or create an account.')
        } else if (error.code == 'auth/wrong-password') {
          Alert.alert('Invalid Password', 'Please enter the correct password associated with your account') 
        } else if (error.code == 'auth/invalid-email') {
          Alert.alert('Invalid Email', 'Please enter a valid email associated with an Ajian account.')
        }
        console.log(error);
      });
  };

  const handleSignOut = async () => {
        // Sign out with Firebase Authentication
        signOut(auth)
          .then(() => {
            setUser(null)
            setEmail('')
            setPassword('')
          })
          .catch((error) => {
            console.log(error)
          });
  }

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };


  if (user) {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Hello, {user.displayName?.split(' ')[0]}!</Text>
        <Pressable style={({pressed}) => [
              pressed ? [styles.shadow, styles.buttonPressed] : [styles.shadow, styles.buttonUnpressed],
          ]}
          onPress={handleSignOut}>
          {({pressed}) => (
              <Text style={styles.text}>Log Out</Text>
          )}
          </Pressable>
      </View>
    );
  } else {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={[styles.titleText, styles.shadow]}>Welcome to Ajian</Text>
          <View style={styles.logInContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="grey"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="grey"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Pressable style={({pressed}) => [
                pressed ? [styles.shadow, styles.buttonPressed] : [styles.shadow, styles.buttonUnpressed],
            ]}
            onPress={handleSignIn}>
            {({pressed}) => (
                <Text style={styles.text}>Log In</Text>
            )}
            </Pressable>
          </View>
          <View style={styles.signUpContainer}>
            <Text style={[styles.shadow, styles.bodyText]}>First Time?</Text>
            <Pressable style={({pressed}) => [
                pressed ? [styles.shadow, styles.buttonPressed] : [styles.shadow, styles.buttonUnpressed],
            ]}
            onPress={handleSignUp}>
            {({pressed}) => (
                <Text style={styles.text}>Create an Account</Text>
            )}
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexBasis: 'auto',
    backgroundColor: 'rgb(135, 31, 31)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logInContainer: {
    backgroundColor: 'rgb(135, 31, 31)',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
    marginBottom: 80,
  },
  signUpContainer: {
    backgroundColor: 'rgb(135, 31, 31)',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    backgroundColor: 'white',
  },
  buttonUnpressed: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 35,
    elevation: 3,
    borderWidth: 0,
    backgroundColor: 'white',
    width: 300,
    height: 60,
    marginBottom: 20,
  },
buttonPressed: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 35,
    elevation: 3,
    borderWidth: 0,
    backgroundColor: 'rgb(145, 145, 145)',
    width: 300,
    height: 60,
    marginBottom: 20
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    fontFamily: 'Ubuntu',
  },
  bodyText: {
    fontSize: 24,
    fontFamily: 'Ubuntu',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'rgb(135, 31, 31)',
    fontFamily: 'UbuntuBold'
  },
  shadow: {
    shadowOffset: { width: -2, height: 5 },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    elevation: 3,
    // background color must be set
    backgroundColor : "#0000" // invisible color
  },
});

export default AccountScreen;