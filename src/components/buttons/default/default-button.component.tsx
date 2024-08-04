import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {DefaultButtonProps} from './types';

export const DefaultButton: React.FC<DefaultButtonProps> = ({
  children,
  onPress,
  icon,
}) => {
  function renderIcon() {
    return (
      icon && (
        <>
          <View style={{width: 13, height: '100%'}} />
          {icon}
        </>
      )
    );
  }
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
      {renderIcon()}
    </TouchableOpacity>
  );
};
