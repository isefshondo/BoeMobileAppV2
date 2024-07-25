import { StyleSheet } from 'react-native';
import {
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '../../../utils/screen-dimensions-converter/index.utils';
import { colors } from '../../../theme/colors';

export const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: responsiveVerticalScale(62),
    paddingVertical: 10,
    paddingHorizontal: 33,
    borderRadius: 13,
    backgroundColor: 'rgba(255, 84, 84, 0.15)',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 23,
    color: colors.LIGHT_RED,
  },
  textContainer: {
    width: responsiveHorizontalScale(193),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
