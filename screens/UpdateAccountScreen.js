import React, { useState, useEffect} from 'react';
import { View, TextInput, Alert, Pressable, Text, Keyboard, TouchableWithoutFeedback, Modal} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAccountStyles } from '../styles/AccountScreenStyles';
import { useFirebase } from '../context/FirebaseContext';

const UpdateNameModal = ({ onClose, updateName, currentFirstName, currentLastName, isVisible }) => {

    const accountStyles = useAccountStyles();

    const [firstName, setFirstName] = useState(currentFirstName);
    const [lastName, setLastName] = useState(currentLastName);

    const onSubmit = async () => {
      try {
        if (firstName.length == 0 || lastName.length == 0 ) {
          Alert.alert('Invalid Name', 'Please enter a valid name.');
          onClose();
        } else {
          await updateName(firstName, lastName);
        }
      } catch (error) {
        console.log(error);
        onClose();
      }
    }

    return (
          <Modal visible={true}>
          <View style={accountStyles.container}>
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
        </Modal>
    );
  };

  const UpdateEmailModal = ({ onClose, currentEmail, updateEmail }) => {
    const accountStyles = useAccountStyles();

    const [email, setEmail] = useState(currentEmail);

    const onSubmit = async () => {
      await updateEmail(email);
    }
  
  
    return (
        <Modal visible={true}>
        <View style={accountStyles.container}>
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
      </Modal>
    );
  };

  const UpdatePhoneModal = ({ onClose, currentPhone, updatePhone}) => {
    const accountStyles = useAccountStyles();

    const [phone, setPhone] = useState(currentPhone);
    
    onSubmit = async () => {
      if (phone.length != 10) {
        Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number');
        onClose();
      } else {
        await updatePhone(phone, currentPhone);
      }
      
    }
  
    return (
      <Modal visible={true}>
        <View style={accountStyles.container}>
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
      </Modal>
    );
  };


const UpdateAccountScreen = () => {
  const { user, userData, updateUserName, updateUserEmail, updateUserPhone} = useFirebase();
  const accountStyles = useAccountStyles();

  const [firstName, setFirstName] = useState(userData.fullName.split(' ').slice(0, -1).join(' '));
  const [lastName, setLastName] = useState(userData.fullName.split(' ')[userData.fullName.split(' ').length - 1]);
  const [email, setEmail] = useState(userData.userEmail);
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(''); // "name", "email", "phone"

  const navigation = useNavigation();

  useEffect(() => {
    console.log('modalVisible changed:', modalVisible);

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

  const updateName = async (firstName, lastName) => {
      updateUserName(firstName, lastName).then(() => {
        handleCloseModal();
      });
  }

  const updateEmail = async (email) => {
      updateUserEmail(email).then(() => {
        handleCloseModal();
      });
  }

  const updatePhone = async (phone, currentPhone) => {
    updateUserPhone(phone, currentPhone).then(() => {
      handleCloseModal();
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
        {modalType === 'name' && <UpdateNameModal onClose={handleCloseModal} updateName={updateName} currentFirstName={firstName} currentLastName={lastName}/>}
        {modalType === 'email' && <UpdateEmailModal onClose={handleCloseModal} updateEmail={updateEmail} currentEmail={email}/>}
        {modalType === 'phone' && <UpdatePhoneModal onClose={handleCloseModal} updatePhone={updatePhone} currentPhone={phoneNumber}/>}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UpdateAccountScreen;