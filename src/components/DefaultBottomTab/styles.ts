import {colors} from '@/themes/colors/index.themes';
import {
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '@/utils/metrics/index.utils';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: responsiveVerticalScale(103.5),
    // backgroundColor: '#FFF',
  },
  routesButtonsContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
    flexDirection: 'row',
  },
  bottomTabBackground: {
    width: '100%',
    height: responsiveVerticalScale(92.5),
    alignSelf: 'center',
    position: 'absolute',
  },
  displayIcon: {
    width: responsiveHorizontalScale(28),
    height: responsiveVerticalScale(28),
  },
  cameraButton: {
    width: responsiveHorizontalScale(73),
    height: responsiveVerticalScale(73),
    borderRadius: 100,
    justifyContent: 'center',
    backgroundColor: colors.BLUE,
  },
  routesContainer: {
    flex: 1,
  },
  routesIconsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  routesButtonContainer: {
    alignItems: 'center',
  },
  underline: {
    width: responsiveHorizontalScale(13),
    height: responsiveVerticalScale(5),
    borderRadius: 5,
    backgroundColor: colors.BLUE,
    marginTop: responsiveVerticalScale(4),
  },
});
