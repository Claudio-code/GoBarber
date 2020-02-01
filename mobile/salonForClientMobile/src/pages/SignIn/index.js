import React from 'react';
import { View, Text } from 'react-native';

import Background from '../../components/background';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function SignIn() {
  return (
    <Background>
      <Text>SignIn</Text>
      <Input 
        style={{ marginTop: 30 }}
        icon="call" 
        placeholder="Digite seu nome" 
      />
      <Button> Login </Button>
    </Background>
  );
}
