import {StyleSheet} from 'react-native';
import {colors} from '../../../themes/colors/index.themes';
import {responsiveVerticalScale} from '../../../utils/metrics/index.utils';

export const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: responsiveVerticalScale(76),
    padding: 10,
    borderRadius: 10,
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
