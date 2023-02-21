import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Alert, Pressable, Text, Keyboard, TouchableWithoutFeedback} from 'react-native';
import { auth, database } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut, User, AuthError} from 'firebase/auth';
import { ref, update} from 'firebase/database';
import {} from 'firebase/database'

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('')

  const navigation = useNavigation();

  async function handleSignUp() {
    try {
        if (firstName && lastName && email && password) {
            const { user } = await createUserWithEmailAndPassword(auth, email, password)
            let name = firstName.trim() + ' ' + lastName.trim();
            await updateProfile(user, {
                displayName: name
            })
            update(ref(database, `users/${user.uid}`), {fullName: name, rewardsPoints: 0, signUpRewardUsed: false, userEmail: email})
            navigation.goBack();
        } else {
            Alert.alert('Invalid Info', 'Please fill out all information to sign up.')
        }
    } catch (error: any) {
        if (error.code == 'auth/email-already-in-use') {
            Alert.alert('Email Already in Use', 'The email address you entered is already in use.');
        } else {
            Alert.alert('Error', 'Sign up failed. Please enter valid info and try again.')
        }
    }
  };

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
    sideBySide: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    shortInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '49%',
        backgroundColor: 'white',
      },
    longInput: {
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
        width: 300,
        height: 60,
        marginBottom: 20,
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
      color: 'white'
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

export default SignUpScreen;