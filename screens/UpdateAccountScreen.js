import React, { useState, useEffect} from 'react';
import { View, TextInput, Alert, Pressable, Text, Keyboard, TouchableWithoutFeedback, Modal} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAccountStyles } from '../styles/AccountScreenStyles';
import { useFirebase } from '../context/FirebaseContext';
import { ref, get, set, remove} from 'firebase/database';
import { updateEmail, updateProfile } from 'firebase/auth';
import { database } from '../firebaseConfig';

// Component that displays a modal to update the user's name
const UpdateNameModal = ({ onClose, updateName, currentFirstName, currentLastName }) => {

    const accountStyles = useAccountStyles();

    const [firstName, setFirstName] = useState(currentFirstName);
    const [lastName, setLastName] = useState(currentLastName);

    // Checks that the user entered valid info for their name and calls the updateName function before closing the modal
    const onSubmit = async () => {
      try {
        if (firstName.length == 0 || lastName.length == 0 ) {
          Alert.alert('Invalid Name', 'Please enter a valid name.');
          onClose();
        } else {
          await updateName(firstName, lastName);
          onClose();
        }
      } catch (error) {
        console.log(error);
        onClose();
      }
    }

    return (
        <Modal visible={true}>
          <View style={accountStyles.container}>
            <View style={accountStyles.signUpContainer}>
              <TextInput
                style={accountStyles.longInput}
                placeholder={firstName}
                placeholderTextColor="grey"
                onChangeText = {setFirstName}
                value={firstName}
              />
              <TextInput
                style={accountStyles.longInput}
                placeholder={lastName}
                placeholderTextColor="grey"
                onChangeText = {setLastName}
                value={lastName}
              />
              <Pressable style={({pressed}) => [
                        pressed ? [accountStyles.shadow, accountStyles.altButton, accountStyles.buttonPressed] : [accountStyles.shadow, accountStyles.altButton, accountStyles.buttonUnpressed],
                    ]}
                    onPress={onSubmit}>
                    {({pressed}) => (
                        <Text style={accountStyles.altButtonText}>Update</Text>
                    )}
              </Pressable>
              <Pressable style={({pressed}) => [
                        pressed ? [accountStyles.shadow, accountStyles.altButton, accountStyles.buttonPressed] : [accountStyles.shadow, accountStyles.altButton, accountStyles.buttonUnpressed],
                    ]}
                    onPress={onClose}>
                    {({pressed}) => (
                        <Text style={accountStyles.altButtonText}>Cancel</Text>
                    )}
              </Pressable>
            </View>
          </View>
        </Modal>
    );
  };

  // Component that displays a modal to update the user's email
  const UpdateEmailModal = ({ onClose, currentEmail, updateEmail, emailSetter }) => {
    const accountStyles = useAccountStyles();
    const navigation = useNavigation();

    const [email, setEmail] = useState(currentEmail);

    const onSubmit = async () => {
      await updateEmail(email.trim());
      onClose();
    }
  
  
    return (
        <Modal visible={true}>
        <View style={accountStyles.container}>
          <View style={accountStyles.signUpContainer}>
            <TextInput
                  style={accountStyles.longInput}
                  placeholder={email}
                  placeholderTextColor="grey"
                  onChangeText = {setEmail}
                  value={email}
              />
            <Pressable style={({pressed}) => [
                      pressed ? [accountStyles.shadow, accountStyles.altButton, accountStyles.buttonPressed] : [accountStyles.shadow, accountStyles.altButton, accountStyles.buttonUnpressed],
                  ]}
                  onPress={onSubmit}>
                  {({pressed}) => (
                      <Text style={accountStyles.altButtonText}>Update</Text>
                  )}
            </Pressable>
            <Pressable style={({pressed}) => [
                      pressed ? [accountStyles.shadow, accountStyles.altButton, accountStyles.buttonPressed] : [accountStyles.shadow, accountStyles.altButton, accountStyles.buttonUnpressed],
                  ]}
                  onPress={onClose}>
                  {({pressed}) => (
                      <Text style={accountStyles.altButtonText}>Cancel</Text>
                  )}
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };

  // Component that displays a modal to update the user's phone number
  const UpdatePhoneModal = ({ onClose, currentPhone, updatePhone}) => {
    const accountStyles = useAccountStyles();

    const [phone, setPhone] = useState(currentPhone);
    
    onSubmit = async () => {
      if (phone.length != 10) {
        Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number');
        onClose();
      } else {
        await updatePhone(phone, currentPhone);
        onClose();
      }
    }
  
    return (
      <Modal visible={true}>
        <View style={accountStyles.container}>
          <View style={accountStyles.signUpContainer}>
            <TextInput
                  style={accountStyles.longInput}
                  placeholder={phone}
                  placeholderTextColor="grey"
                  onChangeText = {setPhone}
                  value={phone}
              />
            <Pressable style={({pressed}) => [
                        pressed ? [accountStyles.shadow, accountStyles.altButton, accountStyles.buttonPressed] : [accountStyles.shadow, accountStyles.altButton, accountStyles.buttonUnpressed],
                    ]}
                    onPress={onSubmit}>
                    {({pressed}) => (
                        <Text style={accountStyles.altButtonText}>Update</Text>
                    )}
            </Pressable>
            <Pressable style={({pressed}) => [
                      pressed ? [accountStyles.shadow, accountStyles.altButton, accountStyles.buttonPressed] : [accountStyles.shadow, accountStyles.altButton, accountStyles.buttonUnpressed],
                  ]}
                  onPress={onClose}>
                  {({pressed}) => (
                      <Text style={accountStyles.altButtonText}>Cancel</Text>
                  )}
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };


const UpdateAccountScreen = () => {
  const { user, setUser, userData, setUserData, refreshUserData } = useFirebase();
  const accountStyles = useAccountStyles();

  const [firstName, setFirstName] = useState(userData.fullName.split(' ').slice(0, -1).join(' '));
  const [lastName, setLastName] = useState(userData.fullName.split(' ')[userData.fullName.split(' ').length - 1]);
  const [email, setEmail] = useState(userData.userEmail);
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(''); // "name", "email", "phone"

  const navigation = useNavigation();

  useEffect(() => {
    console.log('userData:', userData);
  }, [modalVisible])

  const handleShowNameModal = () => {
    setModalType('name');
    setModalVisible(true);
  }

  const handleShowEmailModal = () => {
    setModalType('email');
    setModalVisible(true);
  }

  const handleShowPhoneModal = () => {
    setModalType('phone');
    setModalVisible(true);
  }

  const handleCloseModal = () => {
    setModalType('');
    setModalVisible(false);
  };

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
                    setFirstName(firstName);
                    setLastName(lastName);
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

  // Updates the users email in both their auth account and realtime database
  async function updateUserEmail(email) {
    email = email.toLowerCase();
    updateEmail(user, email).then(() => {
        const phoneRef = ref(database, `phoneNumbers/${userData.phoneNumber}/userEmail`);
        set(phoneRef, email).then(() => {
            const userRef = ref(database, `users/${user.uid}/userEmail`)
            set(userRef, email).then(() => {
                refreshUserData(userData.fullName, userData.rewardsPoints, userData.hasSignUpReward, email, userData.phoneNumber);
                setEmail(email);
                Alert.alert('Email successfully updated');
            });
        })
    }).catch((error) => {
      if (error.code == 'auth/email-already-in-use') {
        Alert.alert('Error when updating email', 'Email already in use.');
      } else {
        Alert.alert('Error when updating email', error.code);
      }
    });
  }

  // Updates the user's phone number in realtime database 
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
                        refreshUserData(userData.fullName, userData.rewardsPoints, userData.hasSignUpReward, userData.userEmail, newPhone);
                        setPhoneNumber(newPhone);
                        Alert.alert('Phone number successfully updated');
                    })
                })
            })
        }
    }).catch((error) => {
        console.log(error.message);
        Alert.alert('Error when updating phone number', error.message);
    })
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={accountStyles.container}>
        <Text style={[accountStyles.titleText, accountStyles.shadow]}>Update Account Info</Text>
        <Pressable style={({pressed}) => [
                    pressed ? [accountStyles.shadow, accountStyles.altButton, accountStyles.buttonPressed] : [accountStyles.shadow, accountStyles.altButton, accountStyles.buttonUnpressed],
                ]}
                onPress={handleShowNameModal}>
                {({pressed}) => (
                    <Text style={accountStyles.altButtonText}>Name</Text>
                )}
        </Pressable>
        <Pressable style={({pressed}) => [
                    pressed ? [accountStyles.shadow, accountStyles.altButton, accountStyles.buttonPressed] : [accountStyles.shadow, accountStyles.altButton, accountStyles.buttonUnpressed],
                ]}
                onPress={handleShowEmailModal}>
                {({pressed}) => (
                    <Text style={accountStyles.altButtonText}>Email</Text>
                )}
        </Pressable>
        <Pressable style={({pressed}) => [
                    pressed ? [accountStyles.shadow, accountStyles.altButton, accountStyles.buttonPressed] : [accountStyles.shadow, accountStyles.altButton, accountStyles.buttonUnpressed],
                ]}
                onPress={handleShowPhoneModal}>
                {({pressed}) => (
                    <Text style={accountStyles.altButtonText}>Phone Number</Text>
                )}
        </Pressable>
        {modalType === 'name' && <UpdateNameModal onClose={handleCloseModal} updateName={updateUserName} currentFirstName={firstName} currentLastName={lastName}/>}
        {modalType === 'email' && <UpdateEmailModal onClose={handleCloseModal} updateEmail={updateUserEmail} currentEmail={email} emailSetter = {setEmail}/>}
        {modalType === 'phone' && <UpdatePhoneModal onClose={handleCloseModal} updatePhone={updateUserPhone} currentPhone={phoneNumber}/>}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UpdateAccountScreen;