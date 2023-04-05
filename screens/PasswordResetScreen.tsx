import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, Keyboard, TouchableWithoutFeedback, Touchable} from 'react-native';
import { useAccountStyles } from '../styles/AccountScreenStyles';
import { useFirebase } from '../context/FirebaseContext';

const PasswordResetScreen = () => {
  const firebaseContext = useFirebase();
  const accountStyles = useAccountStyles();

  const [email, setEmail] = useState('');

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
            onPress={() => firebaseContext.resetPassword(email)}>
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