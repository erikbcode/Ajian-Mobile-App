import React, {useEffect, useState, useContext} from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateProfile} from 'firebase/auth';
import { ref, update, get, child} from 'firebase/database';
import { auth, database } from '../firebaseConfig';

const FirebaseContext = React.createContext();

export function useFirebase() {
    return useContext(FirebaseContext);
}

export function FirebaseProvider({children}) {
    const [user, setUser] = useState(null); // Contains auth user object
    const [userData, setUserData] = useState(null); // Contains data for user in object format {fullName: string, rewardsPoints: int, hasSignUpReward: boolean, userEmail: string}
    const [hoursData, setHoursData] = useState(null);

    // Function to sign a user up. Calls firebase method to create auth user, and then uses this new user to update the database and local state data.
    function signUp(email, password, name) {
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const newUser = userCredential.user;
                const userRef = ref(database, `users/${newUser.uid}`);
                updateUserName(name)
                .then(() => {
                    update(userRef, {fullName: name, rewardsPoints: 0, hasSignUpReward: true, userEmail: email})
                    .then(() => {
                        setUser(newUser);
                        setUserData({name: newUser.displayName, email: newUser.email, rewardsPoints: 0, hasSignUpReward: true})
                        console.log(userData);
                        return newUser;
                    })
                })
            });
    }

    // Logs a user into the platform. Calls firebase method to sign in, and then accesses the database to update local data. 
    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const loggedUser = userCredential.user;
                setUser(loggedUser);
                const userDataRef = ref(database);
                get(child(userDataRef, `users/${loggedUser.uid}`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        setUserData(snapshot.val());
                        console.log(snapshot.val());
                    } else {
                        console.log('No data available')
                    }
                }).catch((error) => {
                    console.log(error)
                })
            });
    }

    // Logs a user out by calling the signOut() firebase method
    function logOut() {
        return signOut(auth);
    }

    // Updates the user's auth profile displayName field
    function updateUserName(name) {
        return updateProfile(user, {displayName: name});
    }

    // Sends a password reset email associated with the email 
    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    // Redeems a user's sign-up reward by updating their database field to false 
    function redeemReward() {
        // Update database to reflect that the reward has been used
        if (user) {
            update(ref(database, `users/${user.uid}`), {
                hasSignUpReward: false
            });
            setUserData({hasSignUpReward: false});
        };
    }

    // Queries the database for the current user, sets their data in state, 
    function getUserData() {
        try {
            if (user) {
                get(ref(database, `users/${user.uid}`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        setUserData(snapshot.val());
                        console.log(snapshot.val());
                        return userData
                    } else {
                        console.log('No data');
                    }
                })
            } else {
                console.log('getUserData() failed due to no user.');
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Error', error.code);
        }
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

    return (
        <FirebaseContext.Provider value={{user, userData, hoursData, signUp, logIn, logOut, updateUserName, resetPassword, redeemReward, getUserData}}>
            {children}
        </FirebaseContext.Provider>
    )
}