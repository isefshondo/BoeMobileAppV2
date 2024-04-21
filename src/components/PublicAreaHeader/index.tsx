import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import BackLeftIcon from '../../assets/back_left_icon.svg';
import BoeSymbol from '../../assets/boe_symbol.svg';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '../../utils/metrics/index.utils';

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
            width={responsiveHorizontalScale(33)}
            height={responsiveVerticalScale(33)}
          />
        </TouchableOpacity>
      )}
      <BoeSymbol
        width={responsiveHorizontalScale(25)}
        height={responsiveVerticalScale(33)}
      />
    </View>
  );
};
