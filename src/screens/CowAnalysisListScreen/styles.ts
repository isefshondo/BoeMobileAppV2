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
    paddingTop: responsiveVerticalScale(55),
    paddingHorizontal: responsiveHorizontalScale(31),
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sideMenuIcon: {
    width: responsiveHorizontalScale(34),
    height: responsiveVerticalScale(34),
  },
  notificationBellIcon: {
    width: responsiveHorizontalScale(34),
    height: responsiveVerticalScale(36),
  },
  searchBarContainer: {
    width: '100%',
    height: responsiveVerticalScale(155),
    justifyContent: 'space-between',
  },
  filtersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filtersIcon: {
    width: responsiveHorizontalScale(28.02),
    height: responsiveVerticalScale(24.02),
  },
  registeredAnimalsContainer: {
    width: '100%',
    height: responsiveVerticalScale(391),
  },
  itemSeparatorComponent: {
    width: '100%',
    height: responsiveVerticalScale(35),
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  screenTitleContainer: {
    width: responsiveHorizontalScale(294),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  screenTitleNonBold: {
    fontSize: responsiveFontSize(32),
  },
  screenTitleBold: {
    fontSize: responsiveFontSize(32),
    fontWeight: '700',
  },
  flatListContainer: {
    flex: 1,
  },
  loadingFlatList: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skeletonCowIcon: {
    width: responsiveHorizontalScale(41),
    height: responsiveVerticalScale(34.81),
  },
  loadingText: {
    fontSize: responsiveFontSize(17),
    color: colors.LIGHT_GRAY,
  },
});
