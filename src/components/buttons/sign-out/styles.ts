import { StyleSheet } from 'react-native';
import { responsiveVerticalScale } from '../../../utils/screen-dimensions-converter/index.utils';
import { colors } from '../../../theme/colors';

export const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: responsiveVerticalScale(57),
    paddingHorizontal: 44,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 84, 84, 0.15)',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'Roboto',
    fontWeight: '600',
    fontSize: 23,
    color: colors.LIGHT_RED,
  },
});
