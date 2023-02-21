import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Alert, Pressable, Text, Keyboard, TouchableWithoutFeedback, Touchable} from 'react-native';
import { auth, database } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail} from 'firebase/auth';
import { ref, update} from 'firebase/database';
import {} from 'firebase/database'

const PasswordResetScreen = () => {
  const [email, setEmail] = useState('');

  const navigation = useNavigation();

  const handlePasswordReset = async () => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert('Password reset email sent');
    } catch (error) {
        Alert.alert('Error', 'Error resetting password');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.resetContainer}>
          <TextInput
            style={styles.longInput}
            placeholder="Email"
            placeholderTextColor="grey"
            value={email}
            onChangeText={setEmail}
          />
          <Pressable style={({pressed}) => [
                pressed ? [styles.shadow, styles.button, styles.buttonPressed] : [styles.shadow, styles.button, styles.buttonUnpressed],
            ]}
            onPress={handlePasswordReset}>
            {({pressed}) => (
                <Text style={styles.text}>Send Reset Email</Text>
            )}
          </Pressable>
        </View>
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
  resetContainer: {
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

export default PasswordResetScreen;