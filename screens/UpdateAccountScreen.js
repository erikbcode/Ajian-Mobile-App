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

  const UpdateEmailModal = ({ onClose, currentEmail }) => {
    const accountStyles = useAccountStyles();

    const [email, setEmail] = useState(currentEmail);
  
  
    return (
        <Modal visible={true}>
        <View style={accountStyles.container}>
          <Text>Email</Text>
        </View>
      </Modal>
    );
  };

  const UpdatePhoneModal = ({ onClose, currentPhone }) => {
    const accountStyles = useAccountStyles();

    const [phone, setPhone] = useState(currentPhone);
  
  
    return (
        <Modal visible={true}>
        <View style={accountStyles.container}>
          <Text>Phone</Text>
        </View>
      </Modal>
    );
  };


const UpdateAccountScreen = () => {
  const { user, userData, loading, logIn, logOut, redeemReward, deleteAccount, updateUserName} = useFirebase();
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
    console.log('handling close');
    setModalType('');
    setModalVisible(false);
    console.log('done');
    console.log('modalVisible: ', modalVisible);
  };

  const updateName = async (firstName, lastName) => {
       console.log('updating name');
      await updateUserName(firstName, lastName);
      handleCloseModal();
      console.log('done');
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
                onPress={null}>
                {({pressed}) => (
                    <Text style={accountStyles.altButtonText}>Email</Text>
                )}
        </Pressable>
        <Pressable style={({pressed}) => [
                    pressed ? [accountStyles.shadow, accountStyles.altButton, accountStyles.buttonPressed] : [accountStyles.shadow, accountStyles.altButton, accountStyles.buttonUnpressed],
                ]}
                onPress={null}>
                {({pressed}) => (
                    <Text style={accountStyles.altButtonText}>Phone Number</Text>
                )}
        </Pressable>
        {modalType === 'name' && <UpdateNameModal onClose={handleCloseModal} updateName={updateName} currentFirstName={firstName} currentLastName={lastName}/>}
        {modalType === 'email' && <UpdateEmailModal onClose={handleCloseModal}/>}
        {modalType === 'phone' && <UpdatePhoneModal onClose={handleCloseModal}/>}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UpdateAccountScreen;