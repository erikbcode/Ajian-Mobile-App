import React, { useState } from 'react';
import { View, TextInput, Alert, Pressable, Text, Keyboard, TouchableWithoutFeedback, Touchable} from 'react-native';
import { useAccountStyles } from '../styles/AccountScreenStyles';
import { useFirebase } from '../context/FirebaseContext';

const PasswordResetScreen = () => {
  const firebaseContext = useFirebase();
  const accountStyles = useAccountStyles();

  const [email, setEmail] = useState('');

  // Function for handling password reset using Firebase function
  const handlePasswordReset = async () => {
    try {
        await firebaseContext.resetPassword(email);
        Alert.alert('Success', 'Please check your email to reset your Ajian password');
    } catch (error: any) {
        if (error.code == 'auth/missing-email') {
          Alert.alert('Password Reset Failed', 'Please enter a valid email associated with an Ajian account');
        } else if (error.code == 'auth/invalid-email') {
          Alert.alert('Password Reset Failed', 'Please enter a valid email associated with an Ajian account');
        } else if (error.code == 'auth/user-not-found') {
          Alert.alert('Password Reset Failed', 'Please enter a valid email associated with an Ajian account');
        } else {
          Alert.alert('Password Reset Failed', 'Please try again later');
        }
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={accountStyles.container}>
        <View style={accountStyles.resetContainer}>
          <Text style={[accountStyles.titleText, accountStyles.shadow]}>Reset Password</Text>
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