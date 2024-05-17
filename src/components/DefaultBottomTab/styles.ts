import {colors} from '@/themes/colors/index.themes';
import {
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '@/utils/metrics/index.utils';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: responsiveVerticalScale(103.5),
    alignItems: 'center',
    backgroundColor: '#ff0000',
  },
  cameraButton: {
    width: responsiveHorizontalScale(73),
    height: responsiveVerticalScale(73),
    borderRadius: 100,
    backgroundColor: colors.BLUE,
  },
  format: {
    position: 'absolute',
  },
});
