import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text, Button } from 'react-native';
import { auth } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const AccountScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // Check if a user is already signed in
    const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
            setLoggedIn(true)
            navigation.navigate('Home')
        }
    });

    return unsubscribe
  }, []);

  const handleSignUp = async () => {
    try {
      // Sign up with Firebase Authentication
      await createUserWithEmailAndPassword(auth, email, password);

      // Navigate to the Modal screen
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignIn = async () => {
    try {
      // Sign in with Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);

      // Navigate to the Home screen
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
        // Sign out with Firebase Authentication
        await signOut(auth);

        setLoggedIn(false);

        navigation.navigate('Home')
    } catch (error) {
        console.error(error);
    }
  }

  if (isLoggedIn == false) {
    return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account or Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title="Sign Up" onPress={handleSignUp} />
        <Text> or </Text>
        <Button title="Sign In" onPress={handleSignIn} />
      </View>
    </View>
    )
  }
    return (
    <View style={styles.container}>
        <Text style={styles.title}>Welcome, User</Text>
        <Button title="Sign Out" onPress={handleSignOut} />
    </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    margin: 8,
    width: '80%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
});

export default AccountScreen;

function componentDidMount() {
    throw new Error('Function not implemented.');
}
