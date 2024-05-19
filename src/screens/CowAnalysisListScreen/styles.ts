import {
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '@/utils/metrics/index.utils';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveHorizontalScale(31),
    backgroundColor: '#fff',
    justifyContent: 'space-around',
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
});
