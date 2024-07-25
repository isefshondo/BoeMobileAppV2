import { StyleSheet } from 'react-native';
import { responsiveVerticalScale } from '../../../utils/screen-dimensions-converter/index.utils';
import { colors } from '../../../theme/colors';

export const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: responsiveVerticalScale(72),
    borderRadius: 70,
    backgroundColor: colors.BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'Roboto',
    fontWeight: '600',
    fontSize: 23,
    color: '#FFF',
  },
});
