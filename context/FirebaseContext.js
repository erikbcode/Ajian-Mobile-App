import React, {useEffect, useState, useContext} from 'react';
import { Alert } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateProfile, updateEmail} from 'firebase/auth';
import { ref, update, get, set, child, remove} from 'firebase/database';
import { auth, database } from '../firebaseConfig';
import { encode } from 'base-64';

const FirebaseContext = React.createContext();

// Wrapper function for useContext() to make it easier to use in other files
export function useFirebase() {
    return useContext(FirebaseContext);
}

export function FirebaseProvider({children}) {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null); // Firebase auth user object
    const [userData, setUserData] = useState(null); // Contains data for user in object format {fullName: string, rewardsPoints: int, hasSignUpReward: boolean, userEmail: string, phoneNumber: string}

    // Function to sign a user up. Calls firebase method to create auth user, and then uses this new user to update the database and local state data.
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
            Alert.alert('Sign Up Failed', error.code);
        }
    }

    // Function to log a user into the platform. Calls Firebase auth method to sign in, and then accesses the database to update client-side state data.
    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const loggedUser = userCredential.user; // Grab user credentials of the user that was just signed in
            setUser(loggedUser); // Set the current user state to the logged in user
            const userDataRef = ref(database);
            get(child(userDataRef, `users/${loggedUser.uid}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    setIsLoading(true);
                    setUserData(snapshot.val()); // Set current state data to the user's existing data in realtime database if it exists
                } else {
                    console.log('No user data available.')
                }
            })
        }).catch((error) => {
            setIsLoading(false);
            console.log(error);
            Alert.alert('Log In Failed', error.code);
        });
    }

    // Logs a user out by calling the appropriate Firebase auth method
    function logOut() {
        setUserData(null);
        setUser(null);
        return signOut(auth);
    }

    // Sends a password reset email to the specified email address
    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    // Redeems a user's sign-up reward by updating their database field to false 
    function redeemReward() {
        // Update database to reflect that the reward has been used
        if (user) {
            // Update the reward status in realtime database
            update(ref(database, `users/${user.uid}`), {
                hasSignUpReward: false
            });
            // Update the reward status in local state
            setUserData({
                ...userData, // spready operator to copy all existing userData fields
                hasSignUpReward: false
            });
        }
    }

    // Effectively deletes a user's account by removing their data in the users database, then their authorization data, and then their data in the phoneNumbers database
    function deleteAccount() {
        // First remove data from the phoneNumbers database
        const phoneRef = ref(database, `phoneNumbers/${userData.phoneNumber}`);
        remove(phoneRef).then(() => {
            console.log('Phone number deleted successfully.');
            // Then remove data from the users database
            const userRef = ref(database, `users/${user.uid}`)
            remove(userRef).then(() => {
                console.log('User data deleted successfully');
                // Finally, remove the user's authorization data
                user.delete().then(() => {
                    setUser(null);
                    setUserData(null);
                    console.log('User account deleted successfully.');
                })
            })
        })
    }

    // Refresh local state for user data using info passed in
    function refreshUserData(fullName, rewardsPoints, hasSignUpReward, userEmail, phoneNumber) {
        setUserData({fullName: fullName, rewardsPoints: rewardsPoints, hasSignUpReward: hasSignUpReward, userEmail: userEmail, phoneNumber: phoneNumber});
    }
    
    // Event listener to check for change in user state
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

    useEffect(() => {
        setIsLoading(false);
    }, [userData])

    return (
        <FirebaseContext.Provider value={{ user, setUser, userData, setUserData, isLoading, signUp, logIn, logOut, resetPassword, redeemReward, deleteAccount, refreshUserData}}>
            {children}
        </FirebaseContext.Provider>
    )
}