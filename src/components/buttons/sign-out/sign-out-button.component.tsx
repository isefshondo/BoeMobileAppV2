import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {SignOutButtonProps} from './types';

export const SignOutButton: React.FC<SignOutButtonProps> = ({
  children,
  onPress,
  icon,
}) => {
  function renderIcon() {
    return (
      icon && (
        <>
          {icon}
          <View style={{width: 16, height: '100%'}} />
        </>
      )
    );
  }
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {renderIcon()}
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};
