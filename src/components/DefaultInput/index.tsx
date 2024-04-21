import React from 'react';
import UsernameIcon from '../../assets/user_gray_icon.svg';
import EmailIcon from '../../assets/email_icon.svg';
import PasswordIcon from '../../assets/key_icon.svg';
import {View, Text, TextInput} from 'react-native';
import {styles} from './styles';
import {Spacer} from '../Spacer';
import {responsiveHorizontalScale} from '../../utils/metrics/index.utils';

interface DefaultInputProps {
  inputLabel: string;
  inputIcon?: 'name' | 'email' | 'password';
  inputCurrentValue: string;
  onInputChange: (text: string) => void;
  inputErrorMessage: string | null;
}

export const DefaultInput: React.FC<DefaultInputProps> = ({
  inputLabel,
  inputIcon,
  inputCurrentValue,
  onInputChange,
  inputErrorMessage,
}: DefaultInputProps) => {
  const renderInputIcon = {
    name: <UsernameIcon width={20} height={20} />,
    email: <EmailIcon width={20} height={20} />,
    password: <PasswordIcon width={20} height={20} />,
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.label}>
          <Text>{inputLabel}</Text>
          <Spacer
            spaceOrientation="column"
            spaceSize={{primarySpaceSize: responsiveHorizontalScale(12)}}
          />
          {inputIcon && renderInputIcon[inputIcon]}
        </View>
        <TextInput
          style={styles.input}
          value={inputCurrentValue}
          onChangeText={onInputChange}
        />
      </View>
      {inputErrorMessage && <Text>{inputErrorMessage}</Text>}
    </>
  );
};
