import {colors} from '@/themes/colors/index.themes';
import {
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '@/utils/metrics/index.utils';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

interface AvatarProps {
  width: number;
  height: number;
  image?: string;
  badge?: JSX.Element;
  badgeTop?: number;
  isSquaredDisplay?: boolean;
  isBorderedDisplay?: boolean;
  isClickable?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  width,
  height,
  image,
  badge,
  badgeTop,
  isSquaredDisplay,
  isBorderedDisplay,
  isClickable,
}) => {
  const borderRadius = isSquaredDisplay ? 10 : Math.round((width + height) / 2);
  const border = {
    borderWidth: isBorderedDisplay ? 5 : 0,
    borderColor: isBorderedDisplay ? colors.BLUE : 'transparent',
  };
  const src =
    image ??
    'https://fastly.picsum.photos/id/200/1920/1280.jpg?hmac=-eKjMC8-UrbLMpy1A4OWrK0feVPB3Ka5KNOGibQzpRU';
  const badgePaddingTop = badge && badgeTop ? badgeTop : 0;
  function renderBadge() {
    return (
      badge && (
        <View
          style={[
            styles.badge,
            {top: responsiveVerticalScale(badgePaddingTop)},
          ]}>
          {badge}
        </View>
      )
    );
  }
  return (
    <TouchableOpacity disabled={!!isClickable}>
      <Image
        style={{
          width: responsiveHorizontalScale(width),
          height: responsiveVerticalScale(height),
          borderRadius,
          borderWidth: border.borderWidth,
          borderColor: border.borderColor,
        }}
        src={src}
      />
      {renderBadge()}
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-end',
    position: 'absolute',
  },
});
