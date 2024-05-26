import {colors} from '@/themes/colors/index.themes';
import {
  responsiveFontSize,
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '@/utils/metrics/index.utils';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: responsiveVerticalScale(108),
    justifyContent: 'space-between',
  },
  inputLabelContainer: {
    width: responsiveHorizontalScale(193),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputLabel: {
    fontSize: responsiveFontSize(23),
    fontWeight: '500',
  },
  iconPassword: {
    width: responsiveHorizontalScale(24),
    height: responsiveVerticalScale(24),
  },
  passwordInput: {
    width: '100%',
    height: responsiveVerticalScale(55),
    borderWidth: 2,
    borderColor: colors.BLUE,
    borderRadius: 13,
    paddingHorizontal: responsiveHorizontalScale(37),
  },
});
