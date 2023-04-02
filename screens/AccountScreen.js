import React, { useState } from 'react';
import { View, TextInput, Text, Alert, Pressable, TouchableWithoutFeedback, Keyboard, Modal } from 'react-native';
import { useNavigation, useIsFocused} from '@react-navigation/native';
import { useFirebase } from '../context/FirebaseContext';
import { useAccountStyles } from '../styles/AccountScreenStyles';

const AccountScreen = () => {
  const { user, userData, logIn, logOut, redeemReward, deleteAccount} = useFirebase();
  const accountStyles = useAccountStyles();
  const isFocused = useIsFocused();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userPoints, setUserPoints] = useState(0);
  const [showRedeemConfirmation, setShowRedeemConfirmation] = useState(false); // State for whether the user is trying to redeem their one-time reward, and a confirmation should therefore be dispalyed
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State for whether account deletion confirmation 

  const navigation = useNavigation();

  // Function for handling user sign-in with Firebase Authentication
  async function handleSignIn() {
    try {
      await logIn(email, password);
      setEmail('')
      setPassword('')
    } catch (error) {
      if (error.code == 'auth/user-not-found') {
        Alert.alert('Login Failed', 'Please enter a valid email/password combination');
      } else if (error.code == 'auth/invalid-email') {
        Alert.alert('Login Failed', 'Please enter a valid email/password combination');
      } else if (error.code == 'auth/wrong-password') {
        Alert.alert('Login Failed', 'Please enter a valid email/password combination');
      } else if (error.code == 'auth/internal-error') {
        Alert.alert('Login Failed', 'Please try again using a valid email/password combination. If the problem persists, try again later');
      } else {
        Alert.alert('Login Failed', 'Please try again using a valid email/password combination. If the problem persists, try again later');
      }
    }
  };

  // Function for handling user sign-out with Firebase Authentication
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      Alert.alert('Failed to log out', 'Error when logging out. Please try again.');
      console.log(error);
    }
  }

  // Sign-up handler for AccountScreen takes the user to the SignUpScreen.
  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };
  
  // Navigate to the password reset screen
  const handlePasswordReset = () => {
    navigation.navigate('PasswordReset');
  };

  const handleUpdateAccountNavigate = () => {
    navigation.navigate('UpdateAccount');
  }

  // When reward is redeemed, show the confirmation modal
  const handleRedeemReward = () => {
    setShowRedeemConfirmation(true);
  };

  // Function to update the user's data in the realtime db upon confirmation of redemption
  const handleConfirmRedeem = () => {
    // Update database to reflect that the reward has been used
    redeemReward();
    setShowRedeemConfirmation(false);
  };

  // Function to toggle confirmation for user account deletion
  const handleDeleteAccount = () => {
    setShowDeleteConfirmation(true);
  }

  // Wrapper function to delete a user's account and info associated with it 
  const handleConfirmDelete = () => {
    try {
      deleteAccount();
    } catch (error) {
      Alert.alert('Failed to delete account', 'Error when deleting account. Please try again.');
      console.log(error);
    } finally {
      setShowDeleteConfirmation(false);
    }
  }

  // If a user is logged in, display account info. Otherwise, display sign-in/sign-up
  if (user) {
    return (
      <View style={accountStyles.container}>
        <Text style={[accountStyles.titleText, accountStyles.shadow]}>Hello, {user.displayName?.split(' ').slice(0, -1).join(' ')}</Text>
        <Text style={[accountStyles.titleText, accountStyles.shadow]}>Rewards points: {userPoints}</Text>
        {userData && userData.hasSignUpReward && (
          <Pressable style={({pressed}) => [
            pressed ? [accountStyles.shadow, accountStyles.button, accountStyles.buttonPressed] : [accountStyles.shadow, accountStyles.button, accountStyles.buttonUnpressed],
          ]}
          onPress={handleRedeemReward}>
          {({pressed}) => (
              <Text style={accountStyles.text}>Redeem your free roll!</Text>
          )}
          </Pressable>
        )}
        <Modal visible={showRedeemConfirmation}>
          <View style={accountStyles.container}>
            <Text style={[accountStyles.bodyText, accountStyles.shadow]}>Are you sure you want to redeem your sign-up reward? This cannot be undone.</Text>
            <Pressable style={({pressed}) => [
                pressed ? [accountStyles.shadow, accountStyles.altButton, accountStyles.buttonPressed] : [accountStyles.shadow, accountStyles.altButton, accountStyles.buttonUnpressed],
              ]}
                onPress={handleConfirmRedeem}>
              {({pressed}) => (
                  <Text style={accountStyles.altButtonText}>Confirm</Text>
              )}
            </Pressable>
            <Pressable style={({pressed}) => [
                pressed ? [accountStyles.shadow, accountStyles.altButton, accountStyles.buttonPressed] : [accountStyles.shadow, accountStyles.altButton, accountStyles.buttonUnpressed],
              ]}
                onPress={() => setShowRedeemConfirmation(false)}>
              {({pressed}) => (
                  <Text style={accountStyles.altButtonText}>Cancel</Text>
              )}
            </Pressable>
          </View>
        </Modal>
        <Modal visible={showDeleteConfirmation}>
          <View style={accountStyles.container}>
            <Text style={[accountStyles.bodyText, accountStyles.shadow]}>Are you sure you want to delete your account and all of your rewards? This cannot be undone.</Text>
            <Pressable style={({pressed}) => [
                pressed ? [accountStyles.shadow, accountStyles.altButton, accountStyles.buttonPressed] : [accountStyles.shadow, accountStyles.altButton, accountStyles.buttonUnpressed],
              ]}
                onPress={handleConfirmDelete}>
              {({pressed}) => (
                  <Text style={accountStyles.altButtonText}>Confirm</Text>
              )}
            </Pressable>
            <Pressable style={({pressed}) => [
                pressed ? [accountStyles.shadow, accountStyles.altButton, accountStyles.buttonPressed] : [accountStyles.shadow, accountStyles.altButton, accountStyles.buttonUnpressed],
              ]}
                onPress={() => setShowDeleteConfirmation(false)}>
              {({pressed}) => (
                  <Text style={accountStyles.altButtonText}>Cancel</Text>
              )}
            </Pressable>
          </View>
        </Modal>
        <Pressable style={({pressed}) => [
              pressed ? [accountStyles.shadow, accountStyles.button, accountStyles.buttonPressed] : [accountStyles.shadow, accountStyles.button, accountStyles.buttonUnpressed],
          ]}
          onPress={handleUpdateAccountNavigate}>
          {({pressed}) => (
              <Text style={accountStyles.text}>Update Account Information</Text>
          )}
        </Pressable>
        <Pressable style={({pressed}) => [
              pressed ? [accountStyles.shadow, accountStyles.button, accountStyles.buttonPressed] : [accountStyles.shadow, accountStyles.button, accountStyles.buttonUnpressed],
          ]}
          onPress={handleDeleteAccount}>
          {({pressed}) => (
              <Text style={accountStyles.text}>Delete Account</Text>
          )}
        </Pressable>
        <Pressable style={({pressed}) => [
              pressed ? [accountStyles.transparentButton, accountStyles.shadow, accountStyles.transparentButtonPressed] : [accountStyles.transparentButton, accountStyles.shadow],
          ]}
          onPress={handleSignOut}>
          {({pressed}) => (
              <Text style={accountStyles.transparentText}>Log Out</Text>
          )}
        </Pressable>
      </View>
    );
  } else {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={accountStyles.container}>
          <Text style={[accountStyles.titleText, accountStyles.shadow]}>Welcome to Ajian</Text>
          <View style={accountStyles.logInContainer}>
            <TextInput
              style={accountStyles.input}
              placeholder="Email"
              placeholderTextColor="grey"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={accountStyles.input}
              placeholder="Password"
              placeholderTextColor="grey"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            <Pressable style={({pressed}) => [
                pressed ? [accountStyles.shadow, accountStyles.button, accountStyles.buttonPressed] : [accountStyles.shadow, accountStyles.button, accountStyles.buttonUnpressed],
            ]}
            onPress={handleSignIn}>
            {({pressed}) => (
                <Text style={accountStyles.text}>Log In</Text>
            )}
            </Pressable>
            <Pressable style={({pressed}) => [
                pressed ? [accountStyles.shadow, accountStyles.altButton, accountStyles.buttonPressed] : [accountStyles.shadow, accountStyles.altButton, accountStyles.buttonUnpressed],
            ]}
            onPress={handlePasswordReset}>
            {({pressed}) => (
                <Text style={accountStyles.altButtonText}>Reset Password</Text>
            )}
            </Pressable>
          </View>
          <View style={accountStyles.signUpContainer}>
            <Text style={[accountStyles.shadow, accountStyles.bodyText]}>First Time?</Text>
            <Pressable style={({pressed}) => [
                pressed ? [accountStyles.shadow, accountStyles.button, accountStyles.buttonPressed] : [accountStyles.shadow, accountStyles.button, accountStyles.buttonUnpressed],
            ]}
            onPress={handleSignUp}>
            {({pressed}) => (
                <Text style={accountStyles.text}>Create an Account</Text>
            )}
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

export default AccountScreen;