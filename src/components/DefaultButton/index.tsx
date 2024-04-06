import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {verticalScale} from '../../utils/metrics/index.utils';
import {styles} from './styles';

interface DefaultButtonProps {
  buttonText: string;
  buttonPreferredPaddingVertical?: number;
  onButtonPress: () => void;
}

export const DefaultButton: React.FC<DefaultButtonProps> = ({
  buttonText,
  buttonPreferredPaddingVertical = 22.5,
  onButtonPress,
}: DefaultButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        {paddingVertical: verticalScale(buttonPreferredPaddingVertical)},
        styles.button,
      ]}
      onPress={onButtonPress}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};
