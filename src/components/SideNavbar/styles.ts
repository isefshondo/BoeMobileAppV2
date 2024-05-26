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
    height: '100%',
    justifyContent: 'space-around',
  },
  closeButtonContainer: {
    width: '100%',
    paddingRight: responsiveHorizontalScale(39),
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionItemsContainer: {
    width: responsiveHorizontalScale(248),
    height: responsiveVerticalScale(546),
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  routesItemsContainer: {
    width: '100%',
    height: responsiveVerticalScale(205),
    justifyContent: 'space-between',
  },

  closeIcon: {
    width: responsiveHorizontalScale(34),
    height: responsiveVerticalScale(34),
  },
  signOutButtonContainer: {
    width: '100%',
    height: responsiveVerticalScale(57),
    paddingHorizontal: responsiveHorizontalScale(44),
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 84, 84, 0.15)',
    borderRadius: 70,
  },
  signOutVisualRepContainer: {
    width: responsiveHorizontalScale(81),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signOutLabel: {
    fontSize: responsiveFontSize(23),
    fontWeight: '600',
    color: colors.LIGHT_RED,
  },
  icons: {
    width: responsiveHorizontalScale(24),
    height: responsiveVerticalScale(24),
  },
  drawerItemLabel: {
    fontSize: responsiveFontSize(23),
    fontWeight: '600',
    color: '#000',
  },
  drawerRoutesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
