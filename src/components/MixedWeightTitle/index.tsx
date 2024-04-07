import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';

// TODO: Think of a new logic to join lines when it should not break on bold

interface MixedWeightTitleProps {
  titleBold: string;
  regularTitle: string;
  fontSize: {
    boldFontSize: number;
    regularFontSize?: number;
  };
  shouldBreakLineOnBold?: boolean;
  isBoldFirst?: boolean;
}

export const MixedWeightTitle: React.FC<MixedWeightTitleProps> = ({
  titleBold,
  regularTitle,
  fontSize,
  shouldBreakLineOnBold,
  isBoldFirst,
}) => {
  const renderText = (text: string, isBold: boolean, textFontSize: number) => (
    <Text
      style={[
        isBold ? styles.titleBold : styles.regularTitle,
        {fontSize: textFontSize},
      ]}>
      {text}
    </Text>
  );

  const firstText = isBoldFirst ? titleBold : regularTitle;
  const secondText = isBoldFirst ? regularTitle : titleBold;
  const firstFontSize = isBoldFirst
    ? fontSize.boldFontSize
    : fontSize.regularFontSize ?? fontSize.boldFontSize;
  const secondFontSize = isBoldFirst
    ? fontSize.regularFontSize ?? fontSize.boldFontSize
    : fontSize.boldFontSize;

  return (
    <View
      style={shouldBreakLineOnBold ? styles.breakLineOnBold : styles.joinTexts}>
      {renderText(firstText, !!isBoldFirst, firstFontSize)}
      {renderText(secondText, !isBoldFirst, secondFontSize)}
    </View>
  );
};
