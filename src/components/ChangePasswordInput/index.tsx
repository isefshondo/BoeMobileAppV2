import React from 'react';
import {Text, TextInput, View} from 'react-native';
import PasswordBlackIcon from '../../assets/key_black_icon.svg';
import {styles} from './styles';

interface ChangePasswordInputProps {
  inputCurrentValue: string;
  onInputChange: (text: string) => void;
}

export const ChangePasswordInput: React.FC<ChangePasswordInputProps> = ({
  inputCurrentValue,
  onInputChange,
}: ChangePasswordInputProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputLabelContainer}>
        <Text style={styles.inputLabel}>Alterar a senha</Text>
        <PasswordBlackIcon style={styles.iconPassword} />
      </View>
      <TextInput
        secureTextEntry={true}
        style={styles.passwordInput}
        value={inputCurrentValue}
        onChangeText={onInputChange}
      />
    </View>
  );
};
