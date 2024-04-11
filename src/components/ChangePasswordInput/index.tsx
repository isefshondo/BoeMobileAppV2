import React from 'react';
import {Text, TextInput, View} from 'react-native';
import PasswordBlackIcon from '../../assets/key_black_icon.svg';
import {styles} from './styles';
import {Spacer} from '../Spacer';
import {horizontalScale} from '../../utils/metrics/index.utils';

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
      <View>
        <Text>Alterar a senha</Text>
        <Spacer
          spaceOrientation="column"
          spaceSize={{primarySpaceSize: horizontalScale(15)}}
        />
        <PasswordBlackIcon width={22} height={22} />
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
