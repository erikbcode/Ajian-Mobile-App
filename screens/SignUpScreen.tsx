import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Alert, Pressable, Text, Keyboard, TouchableWithoutFeedback} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFirebase } from '../context/FirebaseContext';
import { useAccountStyles } from '../styles/AccountScreenStyles';

const SignUpScreen = () => {
  const firebaseContext = useFirebase();
  const styles = useAccountStyles();

  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const navigation = useNavigation();

  // Async function to sign a user in. Checks for valid inputs and then creates the user and updates the realtime data base with their info. 
  async function handleSignUp() {
    try {

      if (!validatePhoneNumber(phoneNumber)) {
        Alert.alert('Error', 'Please enter a valid phone number')
        return;
      }

      if (firstName.length == 0 || lastName.length == 0) {
        Alert.alert("Invalid Name", "Please enter a valid first and last name.");
        return;
      }

      let name = firstName.trim().concat(' ', lastName.trim())
      firebaseContext.signUp(email, password, name, phoneNumber)
        .then(() => {
          navigation.goBack();
        })
      
    } catch (error: any) {
      if (error.code == 'auth/email-already-in-use') {
        Alert.alert('Email Already in Use', 'The email address you entered is already in use.');
      } else {
          Alert.alert('Error', 'Sign up failed. Please enter valid info and try again.')
      }
      console.log(error)
    }
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    return /^\d{10}$/.test(phoneNumber);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <Text style={[styles.titleText, styles.shadow]}>Create an Account</Text>
            <View style={styles.signUpContainer}>
                <View style={styles.sideBySide}>
                    <TextInput
                        style={styles.shortInput}
                        placeholder="First name"
                        placeholderTextColor="grey" 
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                    <TextInput
                        style={styles.shortInput}
                        placeholder="Last name"
                        placeholderTextColor="grey" 
                        value={lastName}
                        onChangeText={setLastName}
                    />
                </View>
                <TextInput
                    style={styles.longInput}
                    placeholder="Email"
                    placeholderTextColor="grey" 
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.longInput}
                    placeholder="Phone Number"
                    keyboardType="phone-pad"
                    placeholderTextColor="grey" 
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />
                <TextInput
                    style={styles.longInput}
                    placeholder="Password"
                    placeholderTextColor="grey"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Pressable style={({pressed}) => [
                pressed ? [styles.shadow, styles.button, styles.buttonPressed] : [styles.shadow, styles.button, styles.buttonUnpressed],
                ]}
                onPress={handleSignUp}>
                {({pressed}) => (
                    <Text style={styles.text}>Create Account</Text>
                )}
                </Pressable>
        </View>
        <Pressable style={({pressed}) => [
            pressed ? [styles.shadow, styles.altButton, styles.buttonPressed] : [styles.shadow, styles.altButton, styles.buttonUnpressed],
            ]}
            onPress={() => navigation.goBack()}>
            {({pressed}) => (
                <Text style={styles.altButtonText}>Back to Sign In</Text>
            )}
        </Pressable>
        </View>
    </TouchableWithoutFeedback>
  );
};


export default SignUpScreen;