import {colors} from '@/themes/colors/index.themes';
import {
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '@/utils/metrics/index.utils';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: responsiveVerticalScale(46),
    borderRadius: 23,
    backgroundColor: colors.LIGHT_GRAY,
    paddingVertical: responsiveVerticalScale(13),
    paddingHorizontal: responsiveVerticalScale(13),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 2,
  },
  searchBarIcon: {
    width: responsiveHorizontalScale(22),
    height: responsiveVerticalScale(22),
  },
});
