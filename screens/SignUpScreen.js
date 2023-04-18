import React, { useState, useRef } from 'react';
import { View, TextInput, Alert, Pressable, Text, Keyboard, TouchableWithoutFeedback, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFirebase } from '../context/FirebaseContext';
import { useAccountStyles } from '../styles/AccountScreenStyles';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig, phoneProvider, auth } from '../firebaseConfig';
import { signInWithCredential, PhoneAuthProvider } from 'firebase/auth';

const SignUpScreen = () => {

  const firebaseContext = useFirebase();
  const styles = useAccountStyles();

  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [verificiationSent, setVerificationSent] = useState(false);
  const recaptchaVerifier = useRef(null);

  const navigation = useNavigation();

  const sendVerification = async () => {
    try {
      if (!validatePhoneNumber(phoneNumber)) {
        Alert.alert('Could Not Send Verification', 'Please enter a valid 10-digit phone number that is not in use.');
        return;
      }

      const verId = await phoneProvider.verifyPhoneNumber('+1'.concat(phoneNumber), recaptchaVerifier.current)
      setVerificationId(verId);
      setVerificationSent(true);  
    } catch (error) {
      Alert.alert('failed', error.message);
      console.log(error.message);
      console.log(error.code);
    }
  }

  const confirmCode = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, code);

      await signInWithCredential(auth, credential);
      setCode('');
      const currentPhoneUser = auth.currentUser;
      await currentPhoneUser.delete(); // Delete the phone number account that was created, it won't be used. 
      handleSignUp();
    } catch (error) {
      Alert.alert('Invalid code', 'Please enter a valid code from the text you received.');
      console.log(error.message);
      console.log(error.code);
    }
  }


  // Async function to sign a user in. Checks for valid input formats and then creates calls FirebaseContext method to attempt to sign up user.
  async function handleSignUp() {
    
    try {
      // Check for valid inputs before attempting to call signUp()
      if (firstName.length == 0 || lastName.length == 0) {
        Alert.alert("Sign Up Failed", "Please enter a valid first and last name");
        return;
      }

      if (!validateEmail(email)) {
        Alert.alert('Sign Up Failed', 'Please enter a valid email address');
        return;
      }

      if (!validatePhoneNumber(phoneNumber)) {
        Alert.alert('Sign Up Failed', 'Please enter a valid 10-digit phone number');
        return;
      }

      if (password.length < 6) { 
        Alert.alert('Sign Up Failed', 'Password must be at least 6 characters long');
        return;
      }

      if (password !== passwordConfirm) {
        Alert.alert('Sign Up Failed', 'Passwords do not match');
        return;
      }

      let name = firstName.trim().concat(' ', lastName.trim());

      // Call method to handle sign up and navigate back to account screen
      setIsLoading(true);
      await firebaseContext.signUp(email, password, name, phoneNumber);
      setIsLoading(false);
      navigation.goBack();
    } catch (error) {
        Alert.alert('Sign Up Failed', 'Sign up failed. Please enter valid info and try again.')
    }
  };

  // Function to validate email (Contains valid @ and .X format)
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.toLowerCase());
  }

  // Function to validate phone number (exists and is 10 digits)
  const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber || phoneNumber.length == 0) {
      return false;
    }

    return /^\d{10}$/.test(phoneNumber);
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={[styles.titleText]}>Loading...</Text>
      </View>
    );
  }
  if (verificiationSent) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
              <FirebaseRecaptchaVerifierModal 
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
              />
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
                      placeholder="Text Verification Code"
                      placeholderTextColor="grey" 
                      value={code}
                      onChangeText={setCode}
                  />
                  <TextInput
                      style={styles.longInput}
                      placeholder="Password"
                      placeholderTextColor="grey"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                  />
                  <TextInput
                      style={styles.longInput}
                      placeholder="Confirm Password"
                      placeholderTextColor="grey"
                      value={passwordConfirm}
                      onChangeText={setPasswordConfirm}
                      secureTextEntry
                  />
                  <Pressable style={({pressed}) => [
                    pressed ? [styles.shadow, styles.button, styles.buttonPressed] : [styles.shadow, styles.button, styles.buttonUnpressed],
                    ]}
                    onPress={confirmCode}>
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
  }
  return (
    <View style={styles.container}>
      <Text style={styles.bodyText}>Enter your phone number to receive a verification code</Text>
      <View style={styles.signUpContainer}>
        <FirebaseRecaptchaVerifierModal 
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />
        <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="grey" 
            value={phoneNumber}
            onChangeText={setPhoneNumber}
        />
        <Pressable style={({pressed}) => [
          pressed ? [styles.shadow, styles.button, styles.buttonPressed] : [styles.shadow, styles.button, styles.buttonUnpressed],
          ]}
          onPress={sendVerification}>
          {({pressed}) => (
              <Text style={styles.altButtonText}>Send Verification Code</Text>
          )}
        </Pressable>
        <Pressable style={({pressed}) => [
          pressed ? [styles.shadow, styles.altButton, styles.buttonPressed] : [styles.shadow, styles.altButton, styles.buttonUnpressed],
          ]}
          onPress={() => navigation.goBack()}>
          {({pressed}) => (
              <Text style={styles.altButtonText}>Back to Sign In</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
  
};

export default SignUpScreen;