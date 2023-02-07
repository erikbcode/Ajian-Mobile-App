import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { RootTabScreenProps } from '../types';
import navButtonStyles from '../styles/NavButtonStyle';

interface Props {
  navigation: any;
  screen: string;
  buttonText: string;
}

const RedirectButton: React.FC<Props> = ({ navigation, screen, buttonText }) => {

    const [pressed, setPressed] = useState(false)
    
    const handlePress = () => {
        setPressed(true);
        navigation.navigate(screen);
        setPressed(false);
    };

  return (
    <TouchableOpacity
      style={pressed ? navButtonStyles.buttonPressed: navButtonStyles.buttonUnpressed}
      onPress={handlePress}
      onPressOut={() => setPressed(false)}
    >
      <Text style={navButtonStyles.text}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default RedirectButton;



