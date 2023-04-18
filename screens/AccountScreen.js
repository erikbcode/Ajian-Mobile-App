import React, { useState } from 'react';
import { View, TextInput, Text, Alert, Pressable, TouchableWithoutFeedback, Keyboard, Modal } from 'react-native';
import { useNavigation, useIsFocused} from '@react-navigation/native';
import { useFirebase } from '../context/FirebaseContext';
import { useAccountStyles } from '../styles/AccountScreenStyles';
import { update, ref } from 'firebase/database';

const AccountScreen = () => {
  const { user, userData, setUserData, database, logIn, logOut, deleteAccount, isLoading, setIsLoading} = useFirebase();
  const accountStyles = useAccountStyles();

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
    } catch (error) {
      console.log('Error when signing up:', error);
    } finally {
      setEmail('');
      setPassword('');
    }
  };


  // Redeems a user's sign-up reward by updating their database field to false 
  const redeemReward = async () => {
    // Update database to reflect that the reward has been used
    if (user) {
        // Update the reward status in realtime database
        await update(ref(database, `users/${user.uid}`), {
            hasSignUpReward: false
        });
        // Update the reward status in local state
        setIsLoading(true);
        setUserData({
            ...userData, // spready operator to copy all existing userData fields
            hasSignUpReward: false
        });
    }
    setShowRedeemConfirmation(false);
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

  if (isLoading) {
    return (
      <View style={accountStyles.container}>
        <Text style={[accountStyles.titleText, accountStyles.shadow]}>Loading...</Text>
      </View>
    )
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
          onPress={() => setShowRedeemConfirmation(true)}>
          <Text style={accountStyles.text}>Redeem your free roll!</Text>
          </Pressable>
        )}
        <Modal visible={showRedeemConfirmation}>
          <View style={accountStyles.container}>
            <Text style={[accountStyles.bodyText, accountStyles.shadow]}>Are you sure you want to redeem your sign-up reward? This cannot be undone.</Text>
            <Pressable style={({pressed}) => [
                pressed ? [accountStyles.shadow, accountStyles.altButton, accountStyles.buttonPressed] : [accountStyles.shadow, accountStyles.altButton, accountStyles.buttonUnpressed],
              ]}
                onPress={redeemReward}>
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
          onPress={() => navigation.navigate('UpdateAccount')}>
          {({pressed}) => (
              <Text style={accountStyles.text}>Update Account Information</Text>
          )}
        </Pressable>
        <Pressable style={({pressed}) => [
              pressed ? [accountStyles.shadow, accountStyles.button, accountStyles.buttonPressed] : [accountStyles.shadow, accountStyles.button, accountStyles.buttonUnpressed],
          ]}
          onPress={() => setShowDeleteConfirmation(true)}>
          {({pressed}) => (
              <Text style={accountStyles.text}>Delete Account</Text>
          )}
        </Pressable>
        <Pressable style={({pressed}) => [
              pressed ? [accountStyles.shadow, accountStyles.transparentButton, accountStyles.transparentButtonPressed] : [accountStyles.shadow, accountStyles.transparentButton, accountStyles.transparentButtonUnpressed],
          ]}
          onPress={() => logOut()}>
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
            onPress={() => navigation.navigate('PasswordReset')}>
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
            onPress={() => navigation.navigate('SignUp')}>
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