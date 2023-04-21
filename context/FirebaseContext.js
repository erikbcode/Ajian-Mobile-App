import React, {useEffect, useState, useContext} from 'react';
import { Alert } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateProfile } from 'firebase/auth';
import { ref, get, set, child, remove} from 'firebase/database';
import { auth, database } from '../firebaseConfig';
import { encode } from 'base-64';

const FirebaseContext = React.createContext();

// Wrapper function for useContext() to make it easier to use in other files
export function useFirebase() {
    return useContext(FirebaseContext);
}

/*  FirebaseProvider provides functions that interact with the Firebase auth and realtime database services directly.
    It also provides the current user, userData, and isLoading state to the rest of the app. */
export function FirebaseProvider({children}) {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null); // Firebase auth user object
    const [userData, setUserData] = useState(null); // Contains data for user in object format {fullName: string, rewardsPoints: int, hasSignUpReward: boolean, userEmail: string, phoneNumber: string}

    /**
     * Function for signing up a new user with Firebase Authentication and updating the realtime database with their information
     */
    async function signUp(email, password, name, phoneNumber) {
        email = email.toLowerCase();

        const phoneRef = ref(database, `phoneNumbers/${phoneNumber}`);
        try {
            const snapshot = await get(phoneRef);
            // Phone number already in database, so cancel sign up
            if (snapshot.exists()) {
                Alert.alert('Sign Up Failed', 'Please enter a valid 10-digit phone number that is not in use')
                return;
            } else {
                // Create a new user with email and password
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const newUser = userCredential.user;

                // Update auth profile information for name and phone
                await updateProfile(newUser, { displayName: name, phoneNumber: phoneNumber });
                
                // Check if user has signed up with this email or phone number before 
                const encodedEmail = encode(email);
                const usedEmailRef = ref(database, `usedEmails/${encodedEmail}`);
                const usedPhoneRef = ref(database, `usedPhones/${phoneNumber}`);
                const emailSnapshot = await get(usedEmailRef);
                setIsLoading(true);
                if (emailSnapshot.exists()) {
                    setUserData({ fullName: name, rewardsPoints: 0, hasSignUpReward: false, userEmail: email, phoneNumber: phoneNumber })
                    // Set user data in users database
                    const userRef = ref(database, `users/${newUser.uid}`);
                    await set(userRef, {
                        fullName: name,
                        rewardsPoints: 0,
                        hasSignUpReward: false,
                        userEmail: email,
                        phoneNumber: phoneNumber
                    });
                } else {
                    const phoneSnapshot = await get(usedPhoneRef);
                    if (phoneSnapshot.exists()) {
                        setUserData({ fullName: name, rewardsPoints: 0, hasSignUpReward: false, userEmail: email, phoneNumber: phoneNumber })
                        // Set user data in users database
                        const userRef = ref(database, `users/${newUser.uid}`);
                        await set(userRef, {
                            fullName: name,
                            rewardsPoints: 0,
                            hasSignUpReward: false,
                            userEmail: email,
                            phoneNumber: phoneNumber
                        });
                    } else {
                        setUserData({ fullName: name, rewardsPoints: 0, hasSignUpReward: true, userEmail: email, phoneNumber: phoneNumber })
                        // Set user data in users database
                        const userRef = ref(database, `users/${newUser.uid}`);
                        await set(userRef, {
                            fullName: name,
                            rewardsPoints: 0,
                            hasSignUpReward: true,
                            userEmail: email,
                            phoneNumber: phoneNumber
                        });
                    }
                }
                await set(usedEmailRef, { email: email });
                await set(usedPhoneRef, { phoneNumber: phoneNumber });
                // Set user data in phoneNumbers database
                const phoneUserRef = ref(database, `phoneNumbers/${phoneNumber}`);
                await set(phoneUserRef, { fullName: name, userEmail: email, userId: newUser.uid });
                return newUser;
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            if (error.code == 'auth/email-already-in-use') {
                Alert.alert('Sign Up Failed', 'This email is already in use. Please enter a different email address.');
            } else {
                Alert.alert('Sign Up Failed', error.message);
            }
        }
    }

    /**
     * Function for logging in a user with Firebase Authentication and updating the current user and userData state
     */
    async function logIn(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const loggedUser = userCredential.user; // Grab user credentials of the user that was just signed in
            setUser(loggedUser); // Set the current user state to the logged in user
            const userDataRef = ref(database);
            const snapshot = await get(child(userDataRef, `users/${loggedUser.uid}`));
            if (snapshot.exists()) {
                setIsLoading(true);
                setUserData(snapshot.val()); // Set current state data to the user's existing data in realtime database if it exists
            } else {
                console.log('No user data available.')
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
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
    }

    /**
     * Function for logging out a user with Firebase Authentication and updating the current user and userData state  
     */
    async function logOut() {
        try {
            await signOut(auth);
            setUser(null);
            setUserData(null);  
        } catch (error) {
            Alert.alert("Couldn't Log Out", 'Please try again later');
            console.log(error.code);
        }
    }

    /**
     * Function for sending a password reset email to a user's email address with Firebase Authentication
     */
    async function resetPassword(email) {
        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert('Password Reset Email Sent', 'Please check your email for a password reset link');
        } catch (error) {
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

    /**
     * Function for deleting a user's account and all data associated with it with Firebase Authencation and realtime database
     */
    async function deleteAccount() {
        try {
            setIsLoading(true);
            // First remove data from the phoneNumbers database
            const phoneRef = ref(database, `phoneNumbers/${userData.phoneNumber}`);
            await remove(phoneRef);
            console.log('Phone number deleted successfully.');
        
            // Then remove data from the users database
            const userRef = ref(database, `users/${user.uid}`);
            await remove(userRef);
            console.log('User data deleted successfully.');
        
            // Finally, remove the user's authorization data
            await user.delete();
            setUser(null);
            setUserData(null);
            console.log('User account deleted successfully.');
        } catch (error) {
            Alert.alert('Account Deletion Failed', 'Please try again later', error.code);
            console.log(error);
        }
    }
    
    // Listens for change in user state
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // User is signed in.
                setUser(authUser);
            } else {
                // User is signed out.
                setUser(null);
            }
        })

        return unsubscribe;
    }, []);

    // Listens for a change in user data state, and setIsLoading to false when this data finishes updating
    useEffect(() => {
        setIsLoading(false);
    }, [userData])

    return (
        <FirebaseContext.Provider value={{ database, user, setUser, userData, setUserData, isLoading, setIsLoading, signUp, logIn, logOut, resetPassword, deleteAccount}}>
            {children}
        </FirebaseContext.Provider>
    )
}