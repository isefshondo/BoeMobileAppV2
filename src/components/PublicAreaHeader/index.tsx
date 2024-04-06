import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import BackLeftIcon from '../../assets/back_left_icon.svg';
import BoeSymbol from '../../assets/boe_symbol.svg';

interface PublicAreaHeaderProps {
  hasBackButton?: boolean;
  handleBackButtonPress: () => {};
}

export const PublicAreaHeader: React.FC<PublicAreaHeaderProps> = ({
  hasBackButton,
  handleBackButtonPress,
}: PublicAreaHeaderProps) => {
  return (
    <View style={hasBackButton ? styles.container : styles.noBackButton}>
      {hasBackButton && (
        <TouchableOpacity onPress={handleBackButtonPress}>
          <BackLeftIcon width={33} height={33} />
        </TouchableOpacity>
      )}
      <BoeSymbol width={25} height={33} />
    </View>
  );
};
