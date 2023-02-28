import React, { useState } from 'react';
import { View, TextInput, Alert, Pressable, Text, Keyboard, TouchableWithoutFeedback, Touchable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAccountStyles } from '../styles/AccountScreenStyles';
import { useFirebase } from '../context/FirebaseContext';

const PasswordResetScreen = () => {
  const firebaseContext = useFirebase();
  const accountStyles = useAccountStyles();

  const [email, setEmail] = useState('');

  const navigation = useNavigation();

  // Function for handling password reset using Firebase function
  const handlePasswordReset = async () => {
    try {
        await firebaseContext.resetPassword(email);
        Alert.alert('Check your email', 'Password reset email sent');
    } catch (error: any) {
        if (error.code == 'auth/missing-email') {
          Alert.alert('Error', 'Please enter a valid email associated with an Ajian account.');
        } else if (error.code == 'auth/invalid-email') {
          Alert.alert('Error', 'Please enter a valid email associated with an Ajian account.');
        } else {
          Alert.alert('Error', 'Error resetting password');
        }
        console.log(error);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={accountStyles.container}>
        <View style={accountStyles.resetContainer}>
          <TextInput
            style={accountStyles.longInput}
            placeholder="Email"
            placeholderTextColor="grey"
            value={email}
            onChangeText={setEmail}
          />
          <Pressable style={({pressed}) => [
                pressed ? [accountStyles.shadow, accountStyles.button, accountStyles.buttonPressed] : [accountStyles.shadow, accountStyles.button, accountStyles.buttonUnpressed],
            ]}
            onPress={handlePasswordReset}>
            {({pressed}) => (
                <Text style={accountStyles.text}>Send Reset Email</Text>
            )}
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PasswordResetScreen;