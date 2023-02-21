import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Text, Alert, Pressable, TouchableWithoutFeedback, Keyboard, Button, Modal } from 'react-native';
import { auth } from '../firebaseConfig';
import { database } from '../firebaseConfig';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { ref, get, update } from 'firebase/database';
import * as Font from 'expo-font';

const AccountScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState<User | null>(null) // User variable from Auth 
  const [userPoints, setUserPoints] = useState(0); // User's rewards points to be displayed when logged in
  const [hasSignUpReward, setHasSignUpReward] = useState(false); // State for whether the user has redeemed their one-time sign-up reward
  const [showConfirmation, setShowConfirmation] = useState(false); // State for whether the user is trying to redeem their one-time reward, and a confirmation should therefore be dispalyed
  const [fontsLoaded, setFontsLoaded] = useState(false); // Unused rn

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  // Load in fonts to be used throughout the page 
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

  // Will trigger when screen comes into focus, setting the current user, and grabbing their data from the Realtime Database
  useEffect(() => {
    loadFont();
    // Load the current Firebase auth user when the screen comes into focus
    if (isFocused) {
      const currentUser = auth.currentUser
      setUser(currentUser)

      get(ref(database, `users/${currentUser?.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUserPoints(userData.rewardsPoints);
          if (userData.signUpRewardUsed == false) {
            setHasSignUpReward(true)
          } else {
            setHasSignUpReward(false)
          }
        }
      })
    }
  }, [isFocused]);

  // Function for handling user sign-in with Firebase Authentication
  const handleSignIn = () => {

    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        setEmail('')
        setPassword('')
      })
      .catch((error) => {
        if (error.code == 'auth/user-not-found') {
          Alert.alert('Log in Failed', 'Please enter valid credentials or create an account.')
        } else if (error.code == 'auth/invalid-email') {
            Alert.alert('Invalid Email', 'Please enter a valid email associated with an Ajian account.') 
        } else if (error.code == 'auth/wrong-password') {
          Alert.alert('Invalid Password', 'Please enter the correct password associated with your account') 
        } else if (error.code == 'auth/internal-error') {
          Alert.alert('Login Failed', 'Please try again using a valid email/password combination. If the problem persists, try again later.')
        }
        console.log(error);
      });
    } else {
      Alert.alert("Invalid Credentials", "Email or Password are invalid.");
    }
  };

  // Function for handling user sign-out with Firebase Authentication
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

  // Sign-up handler for AccountScreen takes the user to the SignUpScreen.
  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };
  
  const handlePasswordReset = () => {
    navigation.navigate('PasswordReset');
  };

  const handleRedeemReward = () => {
    setShowConfirmation(true);
  };

  const handleConfirmRedeem = () => {
    // Update database to reflect that the reward has been used
    update(ref(database, `users/${user?.uid}`), {
      signUpRewardUsed: true,
    });
    setHasSignUpReward(false);
    setShowConfirmation(false);
  };

  if (user) {
    return (
      <View style={styles.container}>
        <Text style={[styles.titleText, styles.shadow]}>Hello, {user.displayName?.split(' ')[0]}!</Text>
        <Text style={[styles.titleText, styles.shadow]}>Rewards points: {userPoints}</Text>
        {hasSignUpReward && (
          <Pressable style={({pressed}) => [
            pressed ? [styles.shadow, styles.button, styles.buttonPressed] : [styles.shadow, styles.button, styles.buttonUnpressed],
          ]}
          onPress={handleRedeemReward}>
          {({pressed}) => (
              <Text style={styles.text}>Redeem your free roll!</Text>
          )}
          </Pressable>
        )}
        <Modal visible={showConfirmation}>
          <View style={styles.container}>
            <Text style={[styles.bodyText, styles.shadow]}>Are you sure you want to redeem your sign-up reward? This cannot be undone.</Text>
            <Pressable style={({pressed}) => [
                pressed ? [styles.shadow, styles.altButton, styles.buttonPressed] : [styles.shadow, styles.altButton, styles.buttonUnpressed],
              ]}
                onPress={handleConfirmRedeem}>
              {({pressed}) => (
                  <Text style={styles.altButtonText}>Confirm</Text>
              )}
            </Pressable>
            <Pressable style={({pressed}) => [
                pressed ? [styles.shadow, styles.altButton, styles.buttonPressed] : [styles.shadow, styles.altButton, styles.buttonUnpressed],
              ]}
                onPress={() => setShowConfirmation(false)}>
              {({pressed}) => (
                  <Text style={styles.altButtonText}>Cancel</Text>
              )}
            </Pressable>
          </View>
        </Modal>
        <Pressable style={({pressed}) => [
              pressed ? [styles.shadow, styles.button, styles.buttonPressed] : [styles.shadow, styles.button, styles.buttonUnpressed],
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
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            <Pressable style={({pressed}) => [
                pressed ? [styles.shadow, styles.button, styles.buttonPressed] : [styles.shadow, styles.button, styles.buttonUnpressed],
            ]}
            onPress={handleSignIn}>
            {({pressed}) => (
                <Text style={styles.text}>Log In</Text>
            )}
            </Pressable>
            <Pressable style={({pressed}) => [
                pressed ? [styles.shadow, styles.altButton, styles.buttonPressed] : [styles.shadow, styles.altButton, styles.buttonUnpressed],
            ]}
            onPress={handlePasswordReset}>
            {({pressed}) => (
                <Text style={styles.altButtonText}>Reset Password</Text>
            )}
            </Pressable>
          </View>
          <View style={styles.signUpContainer}>
            <Text style={[styles.shadow, styles.bodyText]}>First Time?</Text>
            <Pressable style={({pressed}) => [
                pressed ? [styles.shadow, styles.button, styles.buttonPressed] : [styles.shadow, styles.button, styles.buttonUnpressed],
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
  button: {
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
  buttonUnpressed: {
    backgroundColor: 'white',
  },
  buttonPressed: {
    backgroundColor: 'rgb(145, 145, 145)',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    fontFamily: 'Ubuntu',
    color: 'white'
  },
  bodyText: {
    fontSize: 24,
    fontFamily: 'Ubuntu',
    marginBottom: 30,
    color: 'white',
    textAlign: 'center',
    width: '90%'
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
  altButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 35,
    elevation: 3,
    borderWidth: 0,
    width: 200,
    height: 40,
    marginBottom: 20,
  },
  altButtonText: {
      fontSize: 13,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'rgb(135, 31, 31)',
      fontFamily: 'UbuntuBold'
  },
});

export default AccountScreen;