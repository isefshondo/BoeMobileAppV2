import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import BackLeftIcon from '../../assets/back_left_icon.svg';
import BoeSymbol from '../../assets/boe_symbol.svg';
import {useNavigation} from '@react-navigation/native';
import {horizontalScale, verticalScale} from '../../utils/metrics/index.utils';

interface PublicAreaHeaderProps {
  hasBackButton?: boolean;
}

export const PublicAreaHeader: React.FC<PublicAreaHeaderProps> = ({
  hasBackButton,
}: PublicAreaHeaderProps) => {
  const navigation = useNavigation();
  return (
    <View style={hasBackButton ? styles.container : styles.noBackButton}>
      {hasBackButton && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackLeftIcon
            width={horizontalScale(33)}
            height={verticalScale(33)}
          />
        </TouchableOpacity>
      )}
      <BoeSymbol width={horizontalScale(25)} height={verticalScale(33)} />
    </View>
  );
};
