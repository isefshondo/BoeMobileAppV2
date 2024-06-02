import {StyleSheet} from 'react-native';
import {colors} from '../../themes/colors/index.themes';
import {responsiveVerticalScale} from '../../utils/metrics/index.utils';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    flexDirection: 'row',
  },
  labelText: {
    fontSize: 17,
    color: colors.LIGHT_GRAY,
  },
  input: {
    width: '100%',
    paddingHorizontal: 0,
    paddingVertical: responsiveVerticalScale(4),
    fontSize: 18,
    color: colors.GRAY,
    borderBottomWidth: 1.3,
  },
});
