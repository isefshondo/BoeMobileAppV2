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
    height: responsiveVerticalScale(932),
    backgroundColor: '#fff',
    paddingHorizontal: responsiveHorizontalScale(31.5),
    paddingTop: responsiveVerticalScale(55),
    justifyContent: 'space-around',
  },
  header: {
    width: '100%',
    height: responsiveVerticalScale(36),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dataMainContainer: {
    width: '100%',
    height: responsiveVerticalScale(609),
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  greetingsContainer: {
    width: '100%',
    height: responsiveVerticalScale(219),
    justifyContent: 'space-between',
  },
  statisticsNumbersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  graphicsContainer: {
    width: '100%',
    height: responsiveVerticalScale(315),
    justifyContent: 'space-between',
  },
  graphicsContainerText: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  graphicsContainerTitle: {
    fontSize: responsiveFontSize(22),
    fontWeight: '600',
  },
  graphicsContainerDropdownLabel: {
    fontSize: responsiveFontSize(13),
    fontWeight: '600',
    color: colors.LIGHT_GRAY,
    textDecorationLine: 'underline',
  },
  greetingsContainerText: {
    flexDirection: 'row',
  },
  greetingsTextBold: {
    fontSize: responsiveFontSize(32),
    fontWeight: 'bold',
  },
  greetingsTextNormal: {
    fontSize: responsiveFontSize(32),
  },
  dynamicGraphicsContainer: {
    width: '100%',
    backgroundColor: '#fff',
    height: responsiveVerticalScale(259),
    borderRadius: 20,
    shadowColor: '#006277',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 21,
    shadowOpacity: 0.1,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skeletonCowIcon: {
    width: responsiveHorizontalScale(41),
    height: responsiveVerticalScale(34.81),
  },
  dynamicGraphicsContainerText: {
    fontSize: responsiveFontSize(17),
    color: colors.LIGHT_GRAY,
  },
  dynamicGraphicsContainerContent: {
    width: responsiveHorizontalScale(218),
    height: responsiveVerticalScale(71.81),
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphics: {
    width: responsiveHorizontalScale(298),
    height: responsiveVerticalScale(184),
  },
});
