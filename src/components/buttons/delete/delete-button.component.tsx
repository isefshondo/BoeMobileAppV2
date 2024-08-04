import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {DeleteButtonProps} from './types';
import {styles} from './styles';

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  children,
  onPress,
  icon,
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{children}</Text>
        {icon}
      </View>
    </TouchableOpacity>
  );
};
