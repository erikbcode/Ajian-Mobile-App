import React, {useEffect, useState, useContext} from 'react';
import { Alert } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateProfile, updateEmail} from 'firebase/auth';
import { ref, update, get, set, child, remove} from 'firebase/database';
import { auth, database } from '../firebaseConfig';

const FirebaseContext = React.createContext();

export function useFirebase() {
    return useContext(FirebaseContext);
}

export function FirebaseProvider({children}) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null); // Contains auth user object
    const [userData, setUserData] = useState(null); // Contains data for user in object format {fullName: string, rewardsPoints: int, hasSignUpReward: boolean, userEmail: string, phoneNumber: string}
    const [hoursData, setHoursData] = useState(null);

    // Function to sign a user up. Calls firebase method to create auth user, and then uses this new user to update the database and local state data.
    async function signUp(email, password, name, phoneNumber) {

        email = email.toLowerCase();

        try {
            if (!phoneNumber) {
                Alert.alert('no phone', 'No phone number');
                return;
            }

            const phoneRef = ref(database, `phoneNumbers/${phoneNumber}`);

            get(phoneRef).then((snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.val())
                    Alert.alert('Phone Number In Use', 'Please enter a valid 10-digit phone number that is not in use.')
                    return;
                } else {
                    console.log(snapshot.val())
                    setLoading(true)
                    // Create a new user with email and password
                    createUserWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                            const newUser = userCredential.user;
                            updateProfile(newUser, {displayName: name, phoneNumber: phoneNumber}).then(() => {
                                setUserData({fullName: name, rewardsPoints: 0, hasSignUpReward: true, userEmail: email, phoneNumber: phoneNumber})
                                const userRef = ref(database, `users/${newUser.uid}`)
                                set(userRef, {
                                    fullName: name,
                                    rewardsPoints: 0,
                                    hasSignUpReward: true,
                                    userEmail: email,
                                    phoneNumber: phoneNumber
                                }).then(() => {
                                    const phoneUserRef = ref(database, `phoneNumbers/${phoneNumber}`)
                                    set(phoneUserRef, { fullName: name, userEmail: email, userId: newUser.uid}).then(() => {
                                        return(newUser);
                                    })
                                })
                            })
                        })
                        .catch((error) => {
                            if (error.code == 'auth/email-already-in-use') {
                                Alert.alert('Error', 'The specified email is already associated with an account.');
                            }
                            console.log(error);
                        });
                }
            })            
        } catch (error) {
            console.error('failed, ' +  error);
        }
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
    async function updateUserName(firstName, lastName) {
        try {
            let fullName = String(firstName).trim().concat(' ', String(lastName).trim())
            updateProfile(user, {displayName: fullName}).then(() => {
                setUser(user);
                setUserData({
                    ...userData,
                    fullName: fullName
                })
                const userRef = ref(database, `users/${user.uid}`)
                set(userRef, {
                    fullName: fullName,
                    hasSignUpReward: userData.hasSignUpReward,
                    phoneNumber: userData.phoneNumber,
                    rewardsPoints: userData.rewardsPoints,
                    userEmail: userData.userEmail
                }).then(() => {
                    const phoneRef = ref(database, `phoneNumbers/${userData.phoneNumber}`)
                    set(phoneRef, {fullName: fullName, userEmail: userData.userEmail, userId: user.uid}).then(() => {
                        Alert.alert("Name successfully updated");
                    });
                })
            }).catch((error) => {
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
    }

    async function updateUserEmail(email) {
        updateEmail(user, email).then(() => {
            const phoneRef = ref(database, `phoneNumbers/${userData.phoneNumber}/userEmail`);
            set(phoneRef, email).then(() => {
                const userRef = ref(database, `users/${user.uid}/userEmail`)
                set(userRef, email).then(() => {
                    Alert.alert('Email successfully updated');
                });
            })
        }).catch((error) => {
            Alert.alert('Error when updating email', error.code);
        });
    }

    async function updateUserPhone(newPhone, oldPhone) {
        const oldPhoneRef = ref(database, `phoneNumbers/${oldPhone}`)
        const phoneRef = ref(database, `phoneNumbers/${newPhone}`);
        get(phoneRef).then((snapshot) => {
            if (snapshot.exists()) {
                Alert.alert('Phone Number In Use', 'Please enter a valid 10-digit phone number that is not in use.');
                return;
            } else {
                remove(oldPhoneRef).then(() => {
                    console.log('Old phone entry deleted successfully');
                    set(phoneRef, {
                        fullName: userData.fullName,
                        userEmail: userData.userEmail,
                        userId: user.uid
                    }).then(() => {
                        const userRef = ref(database, `users/${user.uid}`);
                        set(userRef, {
                            ...userData,
                            phoneNumber: newPhone
                        }).then(() => {
                            refreshUserData(userData.fullName, userData.rewardsPoints, userData.hasSignUpReward, userData.userEmail, newPhone)
                        })
                    })
                })
            }
        }).catch((error) => {
        console.log(error);
    })
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
            setUserData({
                ...userData, // spready operator to copy all existing userData fields
                hasSignUpReward: false});
        };
    }

    // Effectively deletes a user's account by removing their data in the users database, then their authorization data, and then their data in the phoneNumbers database
    function deleteAccount() {
        console.log('userData: ', userData);
        const phoneRef = ref(database, `phoneNumbers/${userData.phoneNumber}`);
        remove(phoneRef).then(() => {
            console.log('Phone number deleted successfully.');
            const userRef = ref(database, `users/${user.uid}`)
            remove(userRef).then(() => {
                console.log('User data deleted successfully');
                user.delete().then(() => {
                    console.log('User account deleted successfully.');
                })
            })
        }).catch((error) => {
            console.log(error);
        });
    }

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
            setLoading(false);
        })

        return unsubscribe;
    }, []);

    return (
        <FirebaseContext.Provider value={{loading, user, userData, hoursData, signUp, logIn, logOut, resetPassword, redeemReward, deleteAccount, updateUserName, updateUserEmail, updateUserPhone}}>
            {children}
        </FirebaseContext.Provider>
    )
}