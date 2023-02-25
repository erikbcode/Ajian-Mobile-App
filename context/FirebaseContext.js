import React, {useEffect, useState, useContext} from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateProfile} from 'firebase/auth';
import { ref, update, get, child} from 'firebase/database';
import { auth, database } from '../firebaseConfig';

const FirebaseContext = React.createContext();

export function useFirebase() {
    return useContext(FirebaseContext);
}

export function FirebaseProvider({children}) {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [hoursData, setHoursData] = useState(null);

    function signUp(email, password, name) {
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const newUser = userCredential.user;
                const userRef = ref(database, `users/${newUser.uid}`);
                updateProfile(newUser, {displayName: name})
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

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const loggedUser = userCredential.user;
                const userDataRef = ref(database)
                get(child(userDataRef, `users/${loggedUser.uid}`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        setUserData(snapshot.val());
                        console.log(snapshot.val(), 'here');
                    } else {
                        console.log('No data available')
                    }
                }).catch((error) => {
                    console.log(error)
                })
            });
    }

    function logOut() {
        return signOut(auth);
    }

    function updateUserName(name) {
        return updateProfile(user, {displayName: name});
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    function redeemReward() {
        // Update database to reflect that the reward has been used
        if (user) {
            update(ref(database, `users/${user.uid}`), {
                hasSignUpReward: false
            });
            setUserData({hasSignUpReward: false});
        };
    }

    function getUserData() {
        if (user) {
            get(ref(database, `users/${user.uid}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    setUserData(snapshot.val())
                    console.log('snap: ', snapshot.val())
                    return userData
                } else {
                    console.log('no snapshot')
                }
            })
        }
    }
    
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