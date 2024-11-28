import {colors} from '@/themes/colors/index.themes';
import {
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '@/utils/metrics/index.utils';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Button {
  width: number;
  height: number;
  children: string;
  handlePress: () => void;
  isSmall?: boolean;
  isRoundedButton?: boolean;
  leftAssets?: JSX.Element;
  rightAssets?: JSX.Element;
}

export const Button: React.FC<Button> = ({
  width,
  height,
  children,
  handlePress,
  isSmall,
  isRoundedButton,
  leftAssets,
  rightAssets,
}) => {
  const fontSize = !isSmall ? 23 : 12;
  const bigOrSmallBorderRadius = !isSmall ? 10 : 7;
  const borderRadius = !isRoundedButton ? bigOrSmallBorderRadius : 70;
  function renderLeftAssets() {
    return (
      <View style={styles.flexDirectionRow}>
        {leftAssets}
        <View style={styles.firstSpace} />
      </View>
    );
  }
  function renderRightAssets() {
    return (
      <View style={styles.flexDirectionRow}>
        {rightAssets}
        <View style={styles.secondSpace} />
      </View>
    );
  }
  return (
    <TouchableOpacity
      style={[
        {
          width: responsiveHorizontalScale(width),
          height: responsiveVerticalScale(height),
          borderRadius,
        },
        styles.container,
      ]}
      onPress={() => handlePress()}  
    >
      {leftAssets && renderLeftAssets()}
      <Text style={[styles.text, {fontSize}]}>{children}</Text>
      {renderRightAssets()}
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontWeight: '600',
    color: '#fff',
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  firstSpace: {
    width: responsiveHorizontalScale(17),
    height: '100%',
  },
  secondSpace: {
    width: responsiveHorizontalScale(13),
    height: '100%',
  },
});
